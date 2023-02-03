---
title: 'Introduzindo Fastify no projeto do CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-01T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.
## Sobre o Fastify
O Fastify é uma biblioteca de roteamento para Node.js que oferece uma alta performance, baixa latência e alta escalabilidade. Ele é uma opção popular para o desenvolvimento de APIs modernas, pois oferece recursos avançados, tais como suporte a plugins, facilidade de uso e uma arquitetura rápida e eficiente.

Em comparação com o Express, o Fastify oferece uma série de vantagens. Além de ser mais rápido e escalável, o Fastify possui uma API mais limpa e organizada, tornando-o mais fácil de usar e manter. Além disso, ele oferece suporte nativo para gerenciamento de erros, interceptação de requisições e verificações de tipo de dados.

Outro ponto forte do Fastify é a sua integração com outras bibliotecas, como o MongoDB. Isso permite que você possa configurar e gerenciar facilmente sua base de dados e seus dados, sem precisar lidar com uma série de outras ferramentas.

Em resumo, o Fastify é uma opção altamente recomendada para o desenvolvimento de APIs de agendamentos online, devido à sua alta performance, escalabilidade, facilidade de uso e integração com outras tecnologias.

```typescript
import { env, routes } from "@/application/infra";
import Fastify, { FastifyInstance } from "fastify";
const fastify: FastifyInstance = Fastify({ logger: true });

// Run the server!
const start = async () => {
  try {
    await fastify.register(require("@fastify/mongodb"), {
      // force to close the mongodb connection when app stopped
      // the default value is false
      forceClose: true,
      url: env.mongoUri,
    });
    for (const route of routes) {
      fastify.register(route);
    }
    const port: any = env?.port ?? 3000;
    await fastify.listen({ port, host: "0.0.0.0" });
    fastify.log.info(`server listening on ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
``` 
Este trecho de código é parte de um servidor feito com a biblioteca Fastify, que é uma biblioteca para construção de APIs RESTful.

Ele registra uma conexão com um banco de dados MongoDB usando a biblioteca "@fastify/mongodb", e também registra todas as rotas fornecidas no array "routes". Em seguida, ele inicia o servidor e especifica que ele escute na porta definida no ambiente (em caso de erro na obtenção da porta, será usada a porta 3000). O endereço de escuta será "0.0.0.0", o que significa que o servidor estará disponível para requisições a partir de qualquer endereço IP.

```typescript
async function user(fastify: any, options: any) {
  const bodyJsonSchema = {
    type: "object",
    required: ["requiredKey"],
    properties: {
      someKey: { type: "string" },
      someOtherKey: { type: "number" },
      requiredKey: {
        type: "array",
        maxItems: 3,
        items: { type: "integer" },
      },
      nullableKey: { type: ["number", "null"] }, // or { type: 'number', nullable: true }
      multipleTypesKey: { type: ["boolean", "number"] },
      multipleRestrictedTypesKey: {
        oneOf: [
          { type: "string", maxLength: 5 },
          { type: "number", minimum: 10 },
        ],
      },
      enumKey: {
        type: "string",
        enum: ["John", "Foo"],
      },
      notTypeKey: {
        not: { type: "array" },
      },
    },
  };
  const queryStringJsonSchema = {
    type: "object",
    properties: {
      ids: {
        type: "array",
        default: [],
      },
    },
  };
  const paramsJsonSchema = {
    type: "object",
    properties: {
      par1: { type: "string" },
      par2: { type: "number" },
    },
  };

  const headersJsonSchema = {
    type: "object",
    properties: {
      test: { type: "string" },
    },
    required: ["test"],
  };

  const opts = {
    schema: {
      querystring: queryStringJsonSchema,
      body: bodyJsonSchema,
      params: paramsJsonSchema,
      headers: headersJsonSchema,
      response: {
        200: {
          type: "object",
          properties: {
            acknowledged: { type: "boolean" },
            insertedId: { type: "string" },
          },
        },
      },
    },
  };
  fastify.post("/user", opts, async (request: any, reply: any) => {
    const userInserted = await fastify.mongo.db.collection("test").insertOne(request.body);
    reply.send(userInserted);
  });
  fastify.get("/user/:id", async (request: any, reply: any) => {
    // Or this.mongo.client.db('mydb').collection('users')
    const users = await fastify.mongo.db.collection("test");

    // if the id is an ObjectId format, you need to create a new ObjectId
    const _id = fastify.mongo.ObjectId(request.params.id);
    const user = await users.findOne({ _id });
    reply.send(user);
  });
  fastify.get("/users", async (request: any, reply: any) => {
    // Or this.mongo.client.db('mydb').collection('users')
    const users = await fastify.mongo.db.collection("test").find({}).toArray();
    reply.send(users);
  });
}
export { user };
``` 
Este código define as rotas para um recurso de usuário. As rotas incluem:

1.  POST /user - Insere um novo usuário na coleção "test" do banco de dados MongoDB.
2.  GET /user/:id - Obtém um usuário específico com base em seu ID.
3.  GET /users - Obtém todos os usuários da coleção "test".

A validação de dados é realizada usando o esquema JSON Schema nas seguintes partes da solicitação:

1.  querystring
2.  body
3.  params
4.  headers

Além disso, o esquema de resposta para o código de status HTTP 200 também é definido.

A lógica da rota é implementada usando a função de retorno de chamada async. O fastify.mongo é usado para se conectar ao banco de dados MongoDB.

## E no Express como isso seria feito?
No Express, os schemas JSON são implementados geralmente com a biblioteca de validação JOI ou o middleware body-parser para verificar se o corpo da requisição está no formato correto. Além disso, o uso de outras bibliotecas ou middlewares é necessário para validar os parâmetros da query, cabeçalhos, etc. Isso pode tornar a implementação de schemas JSON no Express mais complicada e menos eficiente.

No Fastify, a validação de schemas JSON é integrada ao próprio framework, tornando a implementação mais fácil e eficiente. Ao definir um schema JSON para a rota, o Fastify faz automaticamente a validação dos parâmetros de requisição, incluindo o corpo, query, parâmetros de URL e cabeçalhos. Além disso, o Fastify tem uma sintaxe de definição de schema muito clara e concisa, tornando a implementação ainda mais fácil. Em resumo, o Fastify simplifica e acelera a implementação de schemas JSON em comparação com o Express.
[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)