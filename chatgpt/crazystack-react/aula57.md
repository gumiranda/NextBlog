---
title: 'Explorando novos Plugins e Hooks no Fastify do CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-02T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
A aula "Explorando novos Plugins e Hooks no Fastify" tem como objetivo apresentar e explorar os recursos avançados do framework Fastify. Serão abordados tópicos como plugins e hooks, que permitem ampliar a funcionalidade do Fastify e adaptá-lo a diferentes necessidades de projeto. Além disso, serão apresentados exemplos práticos de como utilizar esses recursos em sua API. Ao final da aula, os participantes terão uma compreensão mais profunda do Fastify e sua capacidade de personalização, tornando-se aptos a utilizar esses recursos de maneira eficaz em seus projetos.

Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
    const client = await MongoHelper.connect(env.mongoUri);
    await fastify.register(require("@fastify/helmet"), {
      contentSecurityPolicy: false,
      global: true,
    });
    await fastify.register(import("@fastify/rate-limit"), {
      max: 10,
      timeWindow: "10 minutes",
    });
    await fastify.register(require("@fastify/under-pressure"), {
      maxEventLoopDelay: 1000,
      maxHeapUsedBytes: 100000000,
      maxRssBytes: 100000000,
      maxEventLoopUtilization: 0.98,
      message: "Estamos sobrecarregados!",
      retryAfter: 50,
    });
    await fastify.register(fastifyRequestContextPlugin, {
      hook: "onRequest",
      defaultStoreValues: {
        user: { insertedId: "system" },
      },
    });
``` 
Esses são exemplos de plugins e hooks registrados para serem utilizados na aplicação com o Fastify.

O plugin @fastify/helmet é usado para garantir a segurança da aplicação, bloqueando ameaças conhecidas de segurança na web.

O plugin @fastify/rate-limit é usado para limitar o número de requisições que podem ser feitas ao servidor em um determinado período de tempo, evitando sobrecarga na aplicação.

O plugin @fastify/under-pressure é usado para monitorar o uso de recursos do sistema, como CPU, memória e tempo de execução do loop de eventos. Em caso de sobrecarga, ele exibirá uma mensagem de erro personalizada.

O plugin fastifyRequestContextPlugin é usado para gerenciar o contexto de cada requisição, permitindo que dados sejam compartilhados entre vários middlewares da aplicação. O hook "onRequest" é usado para garantir que o plugin seja iniciado a cada nova requisição.
```typescript
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

export const userPostSchema = {
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
``` 
Essa é uma definição de JSON Schema que pode ser usada para validar diferentes partes de uma requisição HTTP.

`bodyJsonSchema` define a estrutura esperada para o corpo da requisição. Exige que a chave "requiredKey" esteja presente e que tenha algumas propriedades específicas (string, número, array de números com no máximo 3 itens, número nulo ou outro tipo, entre outras).

`queryStringJsonSchema` define a estrutura esperada para o query string da requisição. Espera uma propriedade "ids" que é um array de valores padrão vazio.

`paramsJsonSchema` define a estrutura esperada para os parâmetros na rota da requisição. Espera duas propriedades "par1" (string) e "par2" (número).

`headersJsonSchema` define a estrutura esperada para os cabeçalhos da requisição. Espera uma propriedade "test" (string) e exige que ela esteja presente.

`userPostSchema` é o objeto final que agrupa todas as definições acima em um único objeto. O atributo "schema" é usado para validar diferentes partes da requisição (query string, corpo, parâmetros de rota e cabeçalhos). A resposta da requisição também é definida como sendo um objeto com as propriedades "acknowledged" (tipo booleano) e "insertedId" (tipo string).

## E no Express como isso seria feito?
No Express, os schemas JSON são implementados geralmente com a biblioteca de validação JOI ou o middleware body-parser para verificar se o corpo da requisição está no formato correto. Além disso, o uso de outras bibliotecas ou middlewares é necessário para validar os parâmetros da query, cabeçalhos, etc. Isso pode tornar a implementação de schemas JSON no Express mais complicada e menos eficiente.

No Fastify, a validação de schemas JSON é integrada ao próprio framework, tornando a implementação mais fácil e eficiente. Ao definir um schema JSON para a rota, o Fastify faz automaticamente a validação dos parâmetros de requisição, incluindo o corpo, query, parâmetros de URL e cabeçalhos. Além disso, o Fastify tem uma sintaxe de definição de schema muito clara e concisa, tornando a implementação ainda mais fácil. Em resumo, o Fastify simplifica e acelera a implementação de schemas JSON em comparação com o Express.

```typescript
import { userPostSchema } from "./userSchema";
import { userHandler } from "./userHandler";
async function user(fastify: any, options: any) {
  fastify.addHook("preHandler", (request: any, reply: any, done: any) => {
    done();
  });
  fastify.post("/user", userPostSchema, userHandler(fastify));
}
export { user };
``` 
Este é um exemplo de uma rota POST que é adicionada ao Fastify, que permite que você crie um novo usuário. Aqui, estamos importando o `userPostSchema` e o `userHandler` de outros arquivos. Em seguida, estamos definindo a rota usando o método `fastify.post()`.

A primeira coisa a notar é que o método `fastify.post()` recebe três parâmetros: o caminho da rota, o esquema de validação de corpo de solicitação e o manipulador de rota. O esquema de validação é importado da `userSchema` e é usado para verificar se a solicitação está de acordo com as regras especificadas no esquema. Se a solicitação não estiver de acordo com as regras, o Fastify automaticamente responderá com um erro de validação.

Em seguida, estamos adicionando um gancho "preHandler" usando o método `fastify.addHook()`. Este gancho é executado antes do manipulador da rota ser chamado e pode ser usado para executar qualquer logica pré-tratamento, por exemplo, autenticação.

No Fastify, a implementação de esquemas JSON é mais fácil do que no Express, pois o Fastify oferece uma validação de esquema JSON integrada que é altamente personalizável e fácil de usar. Além disso, a validação é executada automaticamente antes da rota ser manipulada, o que significa que você não precisa escrever código adicional para garantir que a solicitação seja válida.

No Express, você precisa instalar e configurar uma biblioteca de validação separada, como o `express-validator`, e escrever código adicional para verificar se a solicitação é válida antes de chamar o manipulador de rota. Além disso, o Express não oferece suporte nativo ao gancho "preHandler", então você precisa escrever esse tipo de logica personalizada você mesmo.


```typescript
import { MongoHelper } from "@/application/infra";
export const userHandler = (fastify: any) => async (request: any, reply: any) => {
  const collection = await MongoHelper.getCollection("test");
  const userInserted = await collection.insertOne(request.body);
  reply.send(userInserted);
};    
``` 

A função `userHandler` é uma factory que retorna a função de manipulação de requisições para o endpoint `/user` do Fastify. Esta função interna se conecta ao MongoDB usando a classe `MongoHelper` e insere o corpo da requisição em uma coleção chamada `test`. Depois de inserir o documento, ele envia a resposta, que inclui o resultado da operação de inserção.

Em geral, a utilização de uma factory é útil quando queremos ter acesso a dependências que são carregadas fora da função de manipulação, como é o caso da instância do Fastify. Dessa forma, evitamos a necessidade de passar a instância do Fastify como argumento para cada uma das funções de manipulação de requisições.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)