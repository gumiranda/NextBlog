---
title: 'Endpoint que retorna User dono do Refresh Token no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-13T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Bem-vindos à aula sobre o endpoint que retorna o usuário proprietário do refresh token. Neste tutorial, aprenderemos como criar uma rota na nossa API que irá permitir a renovação de um token de acesso a partir de um token de renovação válido. É uma funcionalidade importante para garantir a segurança e a privacidade dos dados do usuário, uma vez que o token de renovação é enviado em uma requisição separada da autenticação inicial. Além disso, também veremos como validar as requisições a este endpoint para garantir que apenas usuários autorizados possam renovar seus tokens. Então, fiquem ligados e preparem-se para aprender mais sobre o desenvolvimento de aplicações seguras e escaláveis!

Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).
```typescript
import {
  Authentication,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  unauthorized,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadAccount } from "@/slices/account/useCases";
import { LoadUser } from "@/slices/user/useCases";

export class WhoAmIController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadAccount: LoadAccount,
    private readonly loadUser: LoadUser,
    private readonly authentication: Authentication
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const accountExists = await this.loadAccount({
      fields: {
        createdById: httpRequest?.userId,
        refreshToken: httpRequest?.headers?.refreshtoken,
        isFutureexpiresAt: new Date(),
      },
      options: {},
    });
    if (!accountExists) {
      return unauthorized();
    }
    const { accessToken = null, refreshToken = null } =
      (await this.authentication.authRefreshToken(httpRequest?.userId as string)) || {};
    if (!accessToken || !refreshToken) {
      return unauthorized();
    }
    const user = await this.loadUser({
      fields: { _id: httpRequest?.userId as string },
      options: {},
    });
    if (!user) {
      return unauthorized();
    }
    return ok({ user });
  }
}
``` 
Esse é um exemplo de uma classe de controlador para um endpoint que retorna o usuário dono de um token de atualização. A classe estende a classe "Controller" e utiliza outras classes auxiliares, como "Validation", "LoadAccount" e "Authentication", para executar sua função.

A função "execute" verifica se o corpo da requisição HTTP é válido, se o token de atualização pertence a um conta existente, se o token de acesso e o token de atualização são válidos, e finalmente, se existe um usuário associado à conta. Se tudo estiver correto, o usuário é retornado como resposta, caso contrário, uma resposta "Unauthorized" é retornada.
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeDbAuthentication, makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadAccountFactory } from "@/slices/account/useCases";
import { WhoAmIController } from "@/slices/account/controllers";
import { makeLoadUserFactory } from "@/slices/user/useCases";

export const makeWhoAmIController = (): Controller => {
  const requiredFields: string[] = [];
  return makeLogController(
    "loadAccount",
    new WhoAmIController(
      makeValidationComposite(requiredFields),
      makeLoadAccountFactory(),
      makeLoadUserFactory(),
      makeDbAuthentication()
    )
  );
};
``` 
O código acima cria uma função "makeWhoAmIController" que retorna uma instância de um controlador. Esse controlador é criado a partir da classe "WhoAmIController", que recebe quatro dependências como argumento no construtor:

1.  makeValidationComposite: é uma função que cria uma instância de validação composta, usada para verificar se os dados enviados na requisição possuem todos os campos obrigatórios.
    
2.  makeLoadAccountFactory: é uma função que cria uma fábrica para o caso de uso "LoadAccount", que carrega a conta de um usuário.
    
3.  makeLoadUserFactory: é uma função que cria uma fábrica para o caso de uso "LoadUser", que carrega o usuário pelo seu ID.
    
4.  makeDbAuthentication: é uma função que cria uma instância de autenticação com base em banco de dados, usada para autenticar o token de refresh enviado na requisição.
    

Depois de criar a instância do controlador, a função "makeWhoAmIController" aplica o decorador "makeLogController" para adicionar funcionalidade de log ao controlador. O resultado final é retornado como uma instância de um controlador.
```typescript
import {
  makeLoadAccountController,
  makeWhoAmIController,
} from "@/slices/account/controllers";
 
export const whoAmIAdapter = () => adaptRoute(makeWhoAmIController());
``` 
Este código está definindo um adaptador para uma rota para lidar com uma solicitação "WhoAmI". O adaptador está usando a função adaptRoute para envolver a instância do WhoAmIController que está sendo criada usando a fábrica makeWhoAmIController.

O adaptador está usando a função adaptRoute para adicionar alguma funcionalidade adicional ao WhoAmIController antes de ser usado para lidar com uma solicitação "WhoAmI".  

```typescript
import { refreshAdapter, whoAmIAdapter } from "./accountAdapter";
const whoAmIResponse = {
  200: {
    type: "object",
    properties: {
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

export const whoAmIGetSchema = {
  schema: {
    headers: headersRefreshJsonSchema,
    response: whoAmIResponse,
  },
};
  fastify.get("/account/whoami", whoAmIGetSchema, whoAmIAdapter());
``` 
Esse trecho de código está definindo uma rota para a URL "/account/whoami" no Fastify. Ele está importando duas funções (`refreshAdapter` e `whoAmIAdapter`) do arquivo `./accountAdapter` e usando a função `whoAmIAdapter` como o endpoint da rota.

A rota espera que o header da requisição contenha uma propriedade "refreshtoken", que é definida no objeto `headersRefreshJsonSchema`. Além disso, ele define o esquema de resposta esperado para a rota na constante `whoAmIResponse`.

Finalmente, a rota é registrada no Fastify com a função `fastify.get`, passando como primeiro argumento a URL, segundo argumento o esquema da requisição e da resposta, e terceiro argumento a função que será executada quando a rota for acessada.

```typescript
  describe("GET /api/account/whoAmI", () => {
    test("Should return 200 on refresh", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: userBody,
      });
      const responseBody = JSON.parse(response.body);
      const refreshtoken = responseBody.refreshToken;
      expect(response.statusCode).toBe(200);
      expect(responseBody.user).toBeTruthy();
      expect(responseBody.accessToken).toBeTruthy();
      expect(responseBody.refreshToken).toBeTruthy();
      const responseRefresh = await fastify.inject({
        method: "GET",
        url: "/api/account/whoami",
        headers: { refreshtoken },
      });
      const responseBodyRefresh = JSON.parse(responseRefresh.body);
      expect(responseRefresh.statusCode).toBe(200);
      expect(responseBodyRefresh.user).toBeTruthy();
    });
    test("Should return 400 for bad requests", async () => {
      await userCollection.insertOne(userBody);
      const response = await fastify.inject({
        method: "GET",
        url: "/api/account/whoami",
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized refresh token", async () => {
      await userCollection.insertOne(userBody);
      const response = await fastify.inject({
        method: "GET",
        url: "/api/account/whoami",
        headers: { refreshtoken: "invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
  });
``` 
Essa é uma descrição de um teste para a rota GET /api/account/whoAmI.

O primeiro teste, "Should return 200 on refresh", verifica se a resposta retornada será 200 (sucesso) quando for fornecido um token de atualização válido. Ele faz isso realizando uma chamada POST para a rota de registro, recebendo um token de atualização e, em seguida, faz uma chamada GET para a rota whoAmI, fornecendo o token de atualização. O teste verifica se o código de resposta é 200 e se o corpo da resposta inclui um objeto de usuário.

O segundo teste, "Should return 400 for bad requests", verifica se a resposta retornada será 400 (bad request) quando não for fornecido um token de atualização. Ele insere um usuário na coleção de usuários e, em seguida, faz uma chamada GET para a rota whoAmI sem fornecer um token de atualização. O teste verifica se o código de resposta é 400.

O terceiro teste, "Should return 401 for unauthorized refresh token", verifica se a resposta retornada será 401 (não autorizado) quando for fornecido um token de atualização inválido. Ele insere um usuário na coleção de usuários e, em seguida, faz uma chamada GET para a rota whoAmI fornecendo um token de atualização inválido. O teste verifica se o código de resposta é 401.

https://github.com/gumiranda/CrazyStackNodeJs/commit/1dfd34a81ba25283b551225a71f9cdd5a8120126

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)