---
title: 'Teste de Integração do Endpoint de Cadastro no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-10T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).
Bem-vindo à aula de Teste de Integração do Endpoint de Cadastro! Neste curso, você aprenderá a escrever testes de integração para o endpoint de cadastro de usuários. Testes de integração são essenciais para garantir que sua aplicação funcione corretamente em todos os níveis, desde o nível da camada de banco de dados até a camada de interface do usuário. Aprenderemos a usar ferramentas como Jest e Fastify inject para criar testes que cobrirão todos os cenários importantes do endpoint de cadastro, incluindo sucesso e falhas de validação. Então, pegue sua caixa de ferramentas de teste e vamos começar!

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
 
O conjunto de testes usa Jest para testar e faz uso do método inject do Fastify para simular solicitações HTTP à API. Ele se conecta a uma instância do MongoDB antes de cada teste e se desconecta depois de cada teste. O conjunto de testes também tem um tempo limite de 50 segundos.
```typescript
import "./application/infra/config/module-alias";
import { env, routes, MongoHelper } from "@/application/infra";
import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
const { fastifyRequestContextPlugin } = require("@fastify/request-context");
export const makeFastifyInstance = async (externalMongoClient = null) => {
  const fastify: FastifyInstance = Fastify({ logger: true });
  try {
    const client = externalMongoClient ?? (await MongoHelper.connect(env.mongoUri));
    await fastify.register(require("@fastify/helmet"), {
      contentSecurityPolicy: false,
      global: true,
    });
    await fastify.register(import("@fastify/rate-limit"), {
      max: 100,
      timeWindow: "10 minutes",
    });
    await fastify.register(cors, {
      origin: "*",
      methods: ["POST", "GET", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization", "authorization", "refreshtoken"],
    });
    await fastify.register(fastifyRequestContextPlugin, {
      hook: "onRequest",
      defaultStoreValues: {
        user: { insertedId: "system" },
      },
    });
    await fastify.register(require("@fastify/mongodb"), {
      forceClose: true,
      client,
    });
    for (const route of routes) {
      fastify.register(route, { prefix: "/api" });
    }
    return fastify;
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
// Run the server!
const start = async () => {
  const fastifyInstance = await makeFastifyInstance();
  if (!fastifyInstance) return;
  const port: any = env?.port ?? 3000;
  await fastifyInstance.listen({ port, host: "0.0.0.0" });
  fastifyInstance.log.info(`server listening on ${port}`);
};
if (env.environment === "production") {
  start();
} 
``` 
Este é o código de um arquivo que inicializa e configura uma instância do framework Fastify. Ele usa MongoDB como banco de dados para armazenar dados do usuário.

O código registra vários plugins Fastify, como o @fastify/helmet (para segurança HTTP), o @fastify/rate-limit (para limitar o número de requisições), o @fastify/cors (para gerenciamento de políticas de origem), e o fastifyRequestContextPlugin (para gerenciamento de contextos de requisição). Também registra todas as rotas definidas em routes.

A função makeFastifyInstance cria uma nova instância de Fastify e registra todos os plugins necessários. Se for fornecido um cliente MongoDB externo, ele será usado; caso contrário, uma nova conexão será criada usando MongoHelper.connect.

A função start cria uma instância de Fastify chamando makeFastifyInstance, inicia o servidor na porta especificada em env.port ou na porta 3000 (padrão), e imprime uma mensagem de log indicando que o servidor está ouvindo. O servidor só será iniciado se o ambiente atual for "production".
 
[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)