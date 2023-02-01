---
title: 'Endpoint de SignUp nas Routes do Fastify no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-20T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
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
```typescript
import { adaptRoute } from "@/application/adapters";
import { makeSignupController } from "@/slices/user/controllers";

export const signupAdapter = () => adaptRoute(makeSignupController());
``` 
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
```typescript
import { signupAdapter } from "./authAdapter";
import { signupPostSchema } from "./authSchema";

async function auth(fastify: any, options: any) {
  fastify.post("/auth/signup", signupPostSchema, signupAdapter());
}
export { auth };
``` 
```typescript

``` 
```typescript

``` 
https://github.com/gumiranda/CrazyStackNodeJs/commit/149a0c759b8a6396f7bf26fffe4b2873394c7f80


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)