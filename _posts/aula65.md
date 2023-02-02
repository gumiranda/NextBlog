---
title: 'Endpoint de SignUp nas Routes do Fastify no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-09T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Bem vindos à aula sobre o endpoint de SignUp nas rotas do Fastify. Neste módulo, aprenderemos como criar o endpoint de registro de usuários em nossa API. Discutiremos como configurar as rotas no Fastify e como ligá-las ao controlador de registro de usuários. Além disso, mostraremos como lidar com erros e fornecer uma resposta apropriada para o cliente. Ao final desta aula, você terá uma compreensão clara de como implementar o endpoint de registro de usuários em sua API com Fastify.

Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
import { requestContext } from "@fastify/request-context";
import { HttpRequest } from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";

export const adaptRoute = (controller: Controller) => {
  return async (request: any, reply: any) => {
    const { body, params, query, headers } = request;
    const { userId = null, userLogged = null } = requestContext.get("context") || {};
    const httpRequest: HttpRequest = {
      body,
      params,
      headers,
      userId,
      query,
      userLogged,
    };
    const { statusCode, data } = await controller.handle(httpRequest);
    reply.code(statusCode).send(data);
  };
};
``` 
Essa é uma função que adapta um controller da aplicação para ser utilizado como uma rota do Fastify. A função recebe um objeto do tipo Controller e retorna uma nova função, que será usada como endpoint na rota. Essa função de endpoint recebe como parâmetros o request e o reply, que são padrões do Fastify.

A função de endpoint extrai informações importantes do request, como o corpo (body), parâmetros (params), query, headers, informações do usuário logado e o seu ID, e as armazena em um objeto HttpRequest. Essas informações serão passadas para o método handle do controller, que deverá tratar essa requisição e retornar um objeto com o statusCode e os dados para a resposta.

Por fim, a função de endpoint seta o statusCode retornado pelo controller como o código HTTP da resposta e envia os dados como corpo da resposta.
Caso estivéssemos usando Express no projeto a adaptação da rota seria da seguinte forma:
```typescript
import { Request, Response } from "express";
import { Controller } from "@/application/infra/contracts";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers,
      query: req.query,
      userId: req.userId,
      userLogged: req.user,
    };
    const { statusCode, data } = await controller.handle(httpRequest);
    res.status(statusCode).send(data);
  };
};
``` 
Neste exemplo, a função adaptRoute recebe um objeto do tipo Controller e retorna uma função que recebe dois parâmetros req e res. Estes parâmetros representam, respectivamente, a requisição feita pelo usuário e a resposta que será enviada para ele.

A função adaptRoute é responsável por transformar as informações da requisição em um objeto HttpRequest e passá-lo para o método handle do objeto controller. Em seguida, ela captura a resposta retornada pelo controller e a envia de volta para o usuário, configurando o código de status da resposta com o valor de statusCode e os dados com o valor de data.

```typescript
import { adaptRoute } from "@/application/adapters";
import { makeSignupController } from "@/slices/user/controllers";

export const signupAdapter = () => adaptRoute(makeSignupController());
``` 
O código acima é uma implementação de um adapter para a rota de signup no Fastify. A função adaptRoute é importada do módulo de adapters e é usada para adaptar o controlador makeSignupController a uma função que possa ser usada em uma rota do Fastify.
A função makeSignupController retorna um controlador de signup configurado e pronto para ser usado. O adapter é responsável por encapsular a lógica do controlador e adaptá-lo a uma função que possa ser usada como rota pelo Fastify.

```typescript
const bodyJsonSchema = {
  type: "object",
  required: ["email", "password", "passwordConfirmation", "name", "role", "coord"],
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    passwordConfirmation: { type: "string" },
    coord: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["Point"] },
        coordinates: { type: "array", items: { type: "number" } },
      },
    },
    role: { type: "string", enum: ["client", "owner", "visitor"] },
  },
};
const signupResponse = {
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
export const signupPostSchema = {
  schema: {
    body: bodyJsonSchema,
    response: signupResponse,
  },
};
``` 
Essa é uma definição de JSON Schema para a rota de signup em uma API. Ele define o corpo da requisição e a resposta esperada.

A propriedade "body" especifica os campos obrigatórios que devem estar presentes na requisição POST: "email", "password", "passwordConfirmation", "name", "role" e "coord". Cada um desses campos tem seu próprio tipo de dado especificado (por exemplo, "email" é do tipo "string").

A propriedade "response" especifica a resposta esperada da API, caso a requisição seja bem-sucedida (statusCode 200). A resposta inclui um refreshToken, um accessToken, e um objeto de usuário, cada um com seus próprios campos.

Este JSON Schema é usado para validar a entrada e a saída da API e garantir que a API esteja funcionando corretamente.
```typescript
import { signupAdapter } from "./authAdapter";
import { signupPostSchema } from "./authSchema";

async function auth(fastify: any, options: any) {
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
}
export { auth };
``` 
Este é o arquivo de rotas de autenticação no Fastify. Aqui, estamos importando a função signupAdapter do arquivo authAdapter e o esquema de validação de solicitação signupPostSchema do arquivo authSchema.

Em seguida, estamos criando a função auth que registra uma rota POST para o endpoint /auth/signup e passa o signupPostSchema como o esquema de validação de solicitação. Além disso, a função signupAdapter é passada como o tratador da rota para manipular as solicitações deste endpoint.
Se estivéssemos usando Express, para implementar a mesma coisa ficaria da seguinte forma:
```typescript
import express from "express";
import { signupAdapter } from "./signupAdapter";

const app = express();

app.post("/signup", signupAdapter());
``` 
Neste exemplo, uma nova rota é criada usando o método post do Express, com o endpoint /signup. A função retornada pelo adapter signupAdapter é passada como segundo argumento para a rota. Quando uma requisição POST é feita para o endpoint /signup, a função adaptada será executada e fará o trabalho de lidar com a requisição, validar os dados, e retornar uma resposta adequada.

[LINK DO COMMIT](https://github.com/gumiranda/CrazyStackNodeJs/commit/149a0c759b8a6396f7bf26fffe4b2873394c7f80)


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)