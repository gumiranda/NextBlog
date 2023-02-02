---
title: 'Load Account Router + Test no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-12T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
A aula Load Account Router é responsável por estabelecer as rotas de requisições de carregamento de conta. Essas rotas são configuradas usando uma biblioteca de roteamento, como o Fastify, e usam o padrão de projeto Middleware para controlar a lógica de negócios relacionada ao carregamento de conta.

Nesta aula, você irá aprender a criar uma rota para o endpoint de atualização de token, que é responsável por fornecer ao cliente um novo token de acesso e refresh token. Esta rota irá usar um controlador, que foi construído na aula anterior, para manipular a lógica de negócios e retornar a resposta adequada para o cliente.

Ao final desta aula, você será capaz de criar rotas completas para gerenciar o carregamento de conta em sua aplicação e testar as requisições usando uma ferramenta de teste de API, como o Postman ou Insomnia.

Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
const headersRefreshJsonSchema = {
  type: "object",
  required: ["refreshtoken"],
  properties: {
    refreshtoken: { type: "string" },
  },
};
const refreshResponse = {
  200: {
    type: "object",
    properties: {
      refreshToken: { type: "string" },
      accessToken: { type: "string" },
    },
  },
};
export const refreshGetSchema = {
  schema: {
    headers: headersRefreshJsonSchema,
    response: refreshResponse,
  },
};
``` 
Este código é uma definição de esquema para a rota de atualização de token (refresh). Ele está sendo usado para validar a requisição e a resposta para esta rota.

A constante headersRefreshJsonSchema é uma definição de objeto JSON que descreve os cabeçalhos da requisição. É esperado que haja um cabeçalho "refreshtoken" na requisição, e ele deve ser uma string.

A constante refreshResponse é uma definição de objeto JSON que descreve a resposta da rota. A resposta deve ser um objeto com dois campos: "refreshToken" e "accessToken", ambos do tipo string.

A constante refreshGetSchema é uma definição completa do esquema da rota, incluindo a descrição dos cabeçalhos da requisição e da resposta. Esta constante é usada para validar as requisições e respostas da rota de atualização de token.
```typescript
import { refreshtokenLogged } from "@/application/infra/middlewares";
import { refreshAdapter } from "./accountAdapter";
import { refreshGetSchema } from "./accountSchema";

async function account(fastify: any, options: any) {
  fastify.addHook("preHandler", refreshtokenLogged());
  fastify.get("/account/refresh", refreshGetSchema, refreshAdapter());
}
export { account };
``` 
Esse código é uma rota que é adicionada a uma aplicação Fastify para atualizar o token de acesso de uma conta.

A primeira linha adiciona um hook "preHandler" que é o middleware "refreshtokenLogged".

Na segunda linha, o método GET para a rota "/account/refresh" é adicionado ao Fastify, passando o esquema de resposta esperado "refreshGetSchema" e o adaptador "refreshAdapter".

Ao chamar essa rota, o middleware "refreshtokenLogged" será executado primeiro e depois o adaptador "refreshAdapter".

O front-end precisa chamar esses endpoints de refresh token após o login inicial ou quando o token de acesso for expirado. Isso é necessário para a renovação do token de acesso sem ter que pedir novamente as credenciais do usuário.

A ideia é que, após o login inicial, o front-end receba um token de acesso e um token de refresh, ambos com tempo de expiração. Quando o token de acesso expirar, o front-end pode usar o token de refresh para solicitar um novo token de acesso sem ter que pedir as credenciais do usuário novamente. Para isso, o front-end fará uma chamada ao endpoint especificado para renovação de token (geralmente "/account/refresh") enviando o token de refresh no header da requisição.

Esse endpoint verificará a validade do token de refresh e, caso seja válido, retornará um novo token de acesso ao front-end, que pode ser usado nas próximas requisições.

Dessa forma, é possível manter a sessão do usuário sem ter que pedir as credenciais dele novamente, mesmo após o token de acesso ter expirado.

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

describe("Route api/account", () => {
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
  describe("GET /api/account/refresh", () => {
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
        url: "/api/account/refresh",
        headers: { refreshtoken },
      });
      const responseBodyRefresh = JSON.parse(responseRefresh.body);
      expect(responseRefresh.statusCode).toBe(200);
      expect(responseBodyRefresh.accessToken).toBeTruthy();
      expect(responseBodyRefresh.refreshToken).toBeTruthy();
    });
    test("Should return 400 for bad requests", async () => {
      await userCollection.insertOne(userBody);
      const response = await fastify.inject({
        method: "GET",
        url: "/api/account/refresh",
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized refresh token", async () => {
      await userCollection.insertOne(userBody);
      const response = await fastify.inject({
        method: "GET",
        url: "/api/account/refresh",
        headers: { refreshtoken: "invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
  });
});
``` 
Este é um teste de integração do endpoint de refresh de token de autenticação. Ele testa três casos de uso:

1.  Deve retornar 200 ao atualizar o token: O teste envia uma requisição de POST para o endpoint de cadastro para criar um usuário, em seguida, envia uma requisição GET para o endpoint de refresh, passando o token de refresh obtido na resposta anterior como cabeçalho. É esperado que o código de resposta seja 200 e que o corpo da resposta contenha os novos tokens de acesso e refresh.
    
2.  Deve retornar 400 para requisições mal formadas: O teste envia uma requisição GET para o endpoint de refresh sem incluir o token de refresh no cabeçalho. É esperado que o código de resposta seja 400, indicando que a requisição é inválida.
    
3.  Deve retornar 401 para token de refresh não autorizado: O teste envia uma requisição GET para o endpoint de refresh incluindo um token de refresh inválido no cabeçalho. É esperado que o código de resposta seja 401, indicando que o token de refresh não é válido.
    

O teste usa o pacote Jest para gerenciar o fluxo de teste e o pacote Fastify para simular o servidor HTTP que responde às requisições. O banco de dados MongoDB é usado para armazenar os dados do usuário.
https://github.com/gumiranda/CrazyStackNodeJs/commit/0d99575813180f428305a57c025a7ca4a5fa1bf2


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)