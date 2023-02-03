---
title: 'Endpoint de Login nas Routes do Fastify no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-11T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
--- 
Nesta aula, você aprenderá como criar um endpoint de login para a sua aplicação usando o Fastify. O objetivo é fornecer aos usuários a capacidade de fazer login na sua aplicação e obter um token de acesso válido para acessar outros recursos da API.

Para isso, você utilizará o conceito de controller e algumas boas práticas de programação, como validação de dados de entrada, tratamento de erros e geração de tokens. Além disso, você implementará o uso de camadas de abstração, que permitirão a separação das responsabilidades e uma melhor organização do código.

Ao final da aula, você terá uma compreensão clara de como implementar um endpoint de login usando o Fastify e terá a base necessária para criar outros endpoints para a sua aplicação.

```typescript
const bodyLoginJsonSchema = {
  type: "object",
  required: ["email", "password", "passwordConfirmation"],
  properties: {
    email: { type: "string" },
    password: { type: "string" },
    passwordConfirmation: { type: "string" },
  },
};
const loginResponse = {
  200: {
    type: "object",
    properties: {
      refreshToken: { type: "string" },
      accessToken: { type: "string" },
      user: {
        type: "object",
        properties: {
          _id: { type: "string" },
          email: { type: "string" },
          name: { type: "string" },
          role: { type: "string" },
          active: { type: "boolean" },
          coord: {
            type: "object",
            properties: {
              type: { type: "string", enum: ["Point"] },
              coordinates: { type: "array", items: { type: "number" } },
            },
          },
        },
      },
    },
  },
};
export const loginPostSchema = {
  schema: {
    body: bodyLoginJsonSchema,
    response: loginResponse,
  },
};
``` 
Este código é uma definição do formato esperado para uma requisição HTTP `POST` para o endpoint de login, e o formato da resposta esperada para esse endpoint.

A primeira constante, `bodyLoginJsonSchema`, define o esquema JSON para o corpo da requisição, ou seja, o formato do objeto que será enviado com a requisição HTTP. Ele especifica que é esperado um objeto, com três propriedades obrigatórias: `email`, `password`, e `passwordConfirmation`. O tipo de cada uma dessas propriedades é especificado como sendo uma string.

A segunda constante, `loginResponse`, define o formato do objeto de resposta para o endpoint de login. É especificado que o status HTTP da resposta será 200 (OK), e que o corpo da resposta será um objeto com três propriedades: `refreshToken`, `accessToken` e `user`. A propriedade `user` é um objeto com informações do usuário, incluindo sua ID, e-mail, nome, papel, se está ativo, e sua localização (representada como um objeto "Point" com coordenadas).

Por fim, a constante `loginPostSchema` é uma definição de rota que combina as especificações de corpo de requisição e resposta em um único objeto. Esse objeto será usado para validar a requisição e a resposta, para garantir que estejam no formato esperado.
```typescript
import {
  Authentication,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  forbidden,
  unauthorized,
  addDays,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadUser } from "@/slices/user/useCases";
import { AddAccount } from "@/slices/account/useCases";
import { EmailInUseError } from "@/application/errors";

export class LoginController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUser: LoadUser,
    private readonly authentication: Authentication,
    private readonly addAccount: AddAccount
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { email, password } = httpRequest?.body;

    const userExists = await this.loadUser({
      fields: { email },
      options: { projection: { password: 0 } },
    });
    if (!userExists) {
      return forbidden(new EmailInUseError());
    }
    delete httpRequest?.body?.passwordConfirmation;
    const { accessToken = null, refreshToken = null } =
      (await this.authentication.auth(email, password)) || {};
    if (!accessToken || !refreshToken) {
      return unauthorized();
    }
    await this.addAccount({
      createdById: userExists?._id as string,
      name: userExists?.name as string,
      refreshToken,
      active: true,
      expiresAt: addDays(new Date(), 1) as unknown as string,
    });
    return ok({ user: userExists, accessToken, refreshToken });
  }
}
``` 
Este é o código de um controlador de login na aplicação. O controlador é responsável por gerenciar o processo de login de um usuário.

O construtor do controlador recebe quatro dependências:

* A validação: responsável por validar os dados recebidos na requisição.
* LoadUser: uma classe de caso de uso responsável por carregar um usuário com base em seu email.
* A autenticação: responsável por autenticar o usuário com base nas informações fornecidas.
* Adicionar Conta: uma classe de caso de uso responsável por adicionar uma nova conta para o usuário.

O método execute() é responsável por processar a requisição de login. Ele começa verificando se há erros na validação dos dados da requisição. Se houver erros, ele retorna uma resposta HTTP com o código 400 (Bad Request) e a lista de erros.

Em seguida, ele usa o LoadUser para carregar o usuário com base no email fornecido na requisição. Se o usuário não existir, ele retorna uma resposta HTTP com o código 403 (Forbidden) e uma mensagem de erro.

Se o usuário existir, ele usa o objeto de autenticação para autenticar o usuário com base nas informações de email e senha fornecidas na requisição. Se a autenticação falhar, ele retorna uma resposta HTTP com o código 401 (Unauthorized).

Se a autenticação for bem-sucedida, ele usa a classe Adicionar Conta para adicionar uma nova conta para o usuário, com o token de atualização e a data de expiração. Finalmente, ele retorna uma resposta HTTP com o código 200 (OK) e os dados do usuário, incluindo o token de acesso e o token de atualização.
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeDbAuthentication, makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddAccountFactory } from "@/slices/account/useCases";
import { LoginController } from "@/slices/user/controllers";
import { makeLoadUserFactory } from "@/slices/user/useCases";

export const makeLoginController = (): Controller => {
  const requiredFields = ["email", "password", "passwordConfirmation"];
  return makeLogController(
    "login",
    new LoginController(
      makeValidationComposite(requiredFields),
      makeLoadUserFactory(),
      makeDbAuthentication(),
      makeAddAccountFactory()
    )
  );
};
```  
Esse código define uma função que cria um controlador de login para a aplicação. A função `makeLoginController` retorna um objeto que implementa a interface `Controller` com os métodos necessários para realizar uma ação.

O controlador é criado a partir da função `makeLogController`, que aceita como argumentos uma string para identificar o tipo de ação (neste caso, "login") e uma instância de `LoginController`.

A instância de `LoginController` é criada a partir de vários componentes que são criados usando outras funções de fábrica, como `makeValidationComposite`, `makeLoadUserFactory`, `makeDbAuthentication` e `makeAddAccountFactory`. Estas funções de fábrica são responsáveis por criar instâncias dos componentes necessários para a autenticação e validação dos dados do usuário.

Os campos obrigatórios que são necessários para realizar a ação de login são especificados como uma array de strings no início da função `makeLoginController`, na variável `requiredFields`.
## Testes de integração

```typescript
import { makeFastifyInstance } from "@/index";
import { Collection } from "mongodb";
import { MongoHelper } from "@/application/infra";
import { hash } from "bcrypt";
jest.setTimeout(50000);

let userCollection: Collection;

const userBody = {
  email: "gustavoteste41@hotmail.com",
  name: "Gustavo",
  role: "client",
  password: "123456",
  passwordConfirmation: "123456",
  coord: { type: "Point", coordinates: [-46.693419, -23.568704] },
};

describe("Route api/auth", () => {
  let fastify: any;
  beforeAll(async () => {
    const client = await MongoHelper.connect(process.env.MONGO_URL as string);
    fastify = await makeFastifyInstance(client);
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  });
  afterAll(async () => {
    await fastify.close();
    await MongoHelper.disconnect();
    fastify = null;
  });
  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection("user");
    await userCollection.deleteMany({});
  });
  describe("POST /api/auth/signup", () => {
    test("Should return 200 on signup", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: userBody,
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.user).toBeTruthy();
      expect(responseBody.accessToken).toBeTruthy();
      expect(responseBody.refreshToken).toBeTruthy();
    });
    test("Should return 403 if email is already in use", async () => {
      await userCollection.insertOne(userBody);
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: userBody,
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(403);
      expect(responseBody).toEqual({
        error: "Forbidden",
        statusCode: 403,
        message: "The received email is already in use",
      });
    });
    test("Should return 400 if password and passwordConfirmation are different", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: {
          ...userBody,
          passwordConfirmation: "1234567",
        },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(400);
      expect(responseBody).toEqual([
        { mensagem: "Invalid param: passwordConfirmation", name: "InvalidParamError" },
      ]);
    });
    test("Should return 400 if email is invalid", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: {
          ...userBody,
          email: "gustavoteste41hotmail.com",
        },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(400);
      expect(responseBody).toEqual([
        { mensagem: "Invalid param: email", name: "InvalidParamError" },
      ]);
    });
  });

  describe("POST /api/auth/login", () => {
    test("Should return 403 on login if user does not exists", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: userBody,
      });

      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(403);
      expect(responseBody).toEqual({
        error: "Forbidden",
        statusCode: 403,
        message: "The received email is already in use",
      });
    });
    test("Should return 200 if user exists and password is correct", async () => {
      const password = await hash(userBody.password, 12);
      await userCollection.insertOne({ ...userBody, password });
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: userBody,
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.user).toBeTruthy();
      expect(responseBody.accessToken).toBeTruthy();
      expect(responseBody.refreshToken).toBeTruthy();
    });
    test("Should return 400 if password is different", async () => {
      const password = await hash(userBody.password, 12);
      await userCollection.insertOne({ ...userBody, password });
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: {
          ...userBody,
          passwordConfirmation: "1234567",
          password: "1234567",
        },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(401);
      expect(responseBody).toEqual({
        error: "Unauthorized",
        statusCode: 401,
        message: "Unauthorized",
      });
    });
    test("Should return 400 if email is invalid", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: {
          ...userBody,
          email: "gustavoteste41hotmail.com",
        },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(400);
      expect(responseBody).toEqual([
        { mensagem: "Invalid param: email", name: "InvalidParamError" },
      ]);
    });
  });
});
``` 
Este é um conjunto de testes para uma API REST construída usando o framework Fastify e o MongoDB para armazenar dados de usuários. A API tem dois endpoints para autenticação: POST /api/auth/signup e POST /api/auth/login.

O endpoint de registro permite que os usuários criem uma conta enviando uma carga JSON com seu email, nome, senha, confirmação de senha e coordenadas. A API retornará um código de status 200 e uma resposta JSON com o usuário criado e dois tokens (acesso e atualização) se a carga for válida e o email não estiver sendo usado. Se o email já estiver sendo usado, a API retornará um código de status 403 e uma mensagem de erro JSON. Se a senha e a confirmação de senha não corresponderem, ou se o email for inválido, a API retornará um código de status 400 e uma mensagem de erro JSON.

O endpoint de login permite que os usuários façam login enviando uma carga JSON com seu email e senha. A API retornará um código de status 200 e uma resposta JSON com o usuário logado e dois tokens se o email existir e a senha estiver correta. Se o email não existir ou se a senha estiver incorreta, a API retornará um código de status 403 e uma mensagem de erro JSON.

O conjunto de testes usa Jest para testar e faz uso do método inject do Fastify para simular solicitações HTTP à API. Ele se conecta a uma instância do MongoDB antes de cada teste e se desconecta depois de cada teste. O conjunto de testes também tem um tempo limite de 50 segundos.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)