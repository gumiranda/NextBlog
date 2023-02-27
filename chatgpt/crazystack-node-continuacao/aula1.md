---
title: 'Criando todas as rotas de Category no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-22T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, vamos criar todas as rotas de categoria, para que possamos interagir com as informações de categoria na nossa API. As rotas que vamos criar incluem:

1.  Criar categoria
2.  Atualizar categoria
3.  Excluir categoria
4.  Listar categorias por página ou por query específica

Antes de criarmos as rotas, precisamos garantir que tenhamos todos os controladores e usos casos necessários para cada rota implementados e disponíveis. Em seguida, podemos usar uma biblioteca de rotas, como Fastify, para configurar cada rota com o controlador correto e as opções de rota apropriadas, como o método HTTP (GET, POST, PUT, DELETE) e o caminho da rota.

Depois de ter criado as rotas, poderemos testá-las usando uma ferramenta como o Postman para garantir que elas estejam funcionando como esperado.

Ao final da aula, teremos uma API completa para gerenciar categorias, permitindo que os usuários criem, atualizem, excluam e listem as informações de categoria em nossa aplicação.

Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

```typescript
const bodyAddCategoryJsonSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addCategoryResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addCategoryPostSchema = {
  schema: {
    body: bodyAddCategoryJsonSchema,
    response: { 200: addCategoryResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadCategorySchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const loadCategoryResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadCategoryGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadCategorySchema,
    response: {
      200: loadCategoryResponse,
    },
  },
};
const deleteCategoryResponse = { type: "boolean" };
const queryStringJsonDeleteCategorySchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
export const deleteCategorySchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteCategorySchema,
    response: {
      200: deleteCategoryResponse,
    },
  },
};
const queryStringJsonUpdateCategorySchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const updateCategoryResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    name: { type: "string" },
    createdById: { type: "string" },
  },
};
const updateCategoryBody = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
};
export const updateCategorySchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateCategorySchema,
    body: updateCategoryBody,
    response: {
      200: updateCategoryResponse,
    },
  },
};
const queryStringJsonLoadCategoryByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadCategoryByPageResponse = {
  type: "object",
  properties: {
    categorys: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: { type: "string", maxLength: 24, minLength: 24 },
          name: { type: "string" },
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadCategoryByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadCategoryByPageSchema,
    response: {
      200: loadCategoryByPageResponse,
    },
  },
};
```
Essas são as definições de esquema JSON que serão utilizadas com o Fastify para validar o request e o response em cada rota da categoria. O Fastify usa esquemas JSON para definir o formato esperado de entrada e saída de dados nas rotas. Aqui estão algumas explicações para cada esquema JSON:

1.  bodyAddCategoryJsonSchema: Este esquema define o formato do corpo da solicitação que será enviada para a rota de inserção de categoria. Ele especifica que o tipo do objeto deve ser "object", e que um campo "name" é obrigatório. O campo "name" deve ser do tipo "string".
    
2.  headersJsonSchema: Este esquema define o formato do cabeçalho da solicitação que será enviada para todas as rotas. Ele especifica que o tipo do objeto deve ser "object", e que um campo "authorization" é obrigatório. O campo "authorization" deve ser do tipo "string".
    
3.  addCategoryResponse: Este esquema define o formato da resposta que será enviada pela rota de inserção de categoria. Ele especifica que o tipo da resposta é um objeto, e que ele tem vários campos, incluindo "\_id", "name", "active", "createdById" e "createdAt". Todos esses campos têm tipos específicos, por exemplo, "\_id" deve ser do tipo "string" com comprimento mínimo de 24 caracteres e comprimento máximo de 24 caracteres.
    
4.  queryStringJsonLoadCategorySchema: Este esquema define o formato da query string que será enviada para a rota de carregamento de categoria. Ele especifica que o tipo do objeto deve ser "object", e que um campo "\_id" é obrigatório. O campo "\_id" deve ser do tipo "string" com comprimento mínimo de 24 caracteres e comprimento máximo de 24 caracteres.
    
5.  loadCategoryResponse: Este esquema define o formato da resposta que será enviada pela rota de carregamento de categoria. Ele especifica que o tipo da resposta é um objeto, e que ele tem vários campos, incluindo "\_id", "name", "active", "createdById" e "createdAt". Todos esses campos têm tipos específicos, por exemplo, "\_id" deve ser do tipo "string" com comprimento mínimo de 24 caracteres e comprimento máximo de 24 caracteres.
    
6.  deleteCategoryResponse: Este esquema define o formato da resposta que será enviada pela rota de exclusão de categoria. Ele especifica que o tipo da resposta é "boolean". 
```typescript
import { authLogged } from "@/application/infra/middlewares";
import {
  addCategoryAdapter,
  loadCategoryAdapter,
  deleteCategoryAdapter,
  updateCategoryAdapter,
  loadCategoryByPageAdapter,
} from "./categoryAdapter";
import {
  addCategoryPostSchema,
  loadCategoryGetSchema,
  deleteCategorySchema,
  updateCategorySchema,
  loadCategoryByPageGetSchema,
} from "./categorySchema";

async function category(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/category/add", addCategoryPostSchema, addCategoryAdapter());
  fastify.get("/category/load", loadCategoryGetSchema, loadCategoryAdapter());
  fastify.get(
    "/category/loadByPage",
    loadCategoryByPageGetSchema,
    loadCategoryByPageAdapter()
  );
  fastify.delete("/category/delete", deleteCategorySchema, deleteCategoryAdapter());
  fastify.patch("/category/update", updateCategorySchema, updateCategoryAdapter());
}
export { category };
``` 

Antes de começarmos as rotas em si, temos a importação de alguns arquivos necessários para o funcionamento dessas rotas:

* `authLogged`: é uma função middleware que verifica se o usuário está autenticado antes de acessar a rota.
* `categoryAdapter`: é um arquivo que contém as implementações das lógicas de negócios para cada rota.
* `categorySchema`: é um arquivo que contém os esquemas de validação das requisições para cada rota.

Em seguida, temos a função `category`, que é responsável por criar as rotas do Fastify para as categorias. A função recebe como parâmetros o objeto Fastify e as opções para o Fastify.

O primeiro passo dentro da função é adicionar o middleware `authLogged` como um hook de pré-tratamento de requisições, ou seja, este middleware será executado antes de cada requisição para as rotas definidas neste arquivo.

Em seguida, temos 5 rotas diferentes para as categorias:

1.  `POST /category/add`: rota para adicionar uma nova categoria. Ela usa o schema `addCategoryPostSchema` para validar a requisição e a lógica de negócios é implementada na função `addCategoryAdapter`.
    
2.  `GET /category/load`: rota para carregar todas as categorias. Ela usa o schema `loadCategoryGetSchema` para validar a requisição e a lógica de negócios é implementada na função `loadCategoryAdapter`.
    
3.  `GET /category/loadByPage`: rota para carregar as categorias por página. Ela usa o schema `loadCategoryByPageGetSchema` para validar a requisição e a lógica de negócios é implementada na função `loadCategoryByPageAdapter`.
    
4.  `DELETE /category/delete`: rota para deletar uma categoria. Ela usa o schema `deleteCategorySchema` para validar a requisição e a lógica de negócios é implementada na função `deleteCategoryAdapter`.
    
5.  `PATCH /category/update`: rota para atualizar uma categoria. Ela usa o schema `updateCategorySchema` para validar a requisição e a lógica de negócios é implementada na função `updateCategoryAdapter`.
    

Por fim, exportamos a função `category` para que possa ser reconhecido no nosso array de rotas do Fastify.

```typescript
import { makeFastifyInstance } from "@/index";
import { Collection, ObjectId } from "mongodb";
import { MongoHelper, env } from "@/application/infra";
import { sign } from "jsonwebtoken";
jest.setTimeout(50000);

let userCollection: Collection;
let categoryCollection: Collection;

const userBody = {
  email: "gustavoteste41@hotmail.com",
  name: "Gustavo",
  role: "client",
  password: "123456",
  passwordConfirmation: "123456",
  coord: { type: "Point", coordinates: [-46.693419, -23.568704] },
};
const categoryBody = {
  name: "test",
};
const makeAccessToken = async (role: string, password: string): Promise<any> => {
  const result = await userCollection.insertOne({ ...userBody, password, role });
  const _id = result?.insertedId;
  return { _id, token: sign({ _id }, env.jwtSecret) };
};
describe("Route api/category", () => {
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
    categoryCollection = await MongoHelper.getCollection("category");
    await userCollection.deleteMany({});
    await categoryCollection.deleteMany({});
  });
  describe("POST /api/category/add", () => {
    test("Should return 200 on add", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/category/add",
        headers: { authorization: `Bearer ${token}` },
        payload: categoryBody,
      });
      const responseBodyAdd = JSON.parse(responseAdd.body);
      expect(responseAdd.statusCode).toBe(200);
      expect(responseBodyAdd._id).toBeTruthy();
    });
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const categoryWrongBody = { ...categoryBody, name: null };
      const responseAdd = await fastify.inject({
        method: "POST",
        url: "/api/category/add",
        headers: { authorization: `Bearer ${token}` },
        payload: categoryWrongBody,
      });
      expect(responseAdd.statusCode).toBe(400);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/category/add",
        headers: { authorization: "Bearer invalid_token" },
        payload: categoryBody,
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "POST",
        url: "/api/category/add",
        payload: categoryBody,
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("GET /api/category/load", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/category/load",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on load", async () => {
      const { insertedId } = await categoryCollection.insertOne(categoryBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/category/load?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody._id).toEqual(insertedId.toString());
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/category/load?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/category/load",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("GET /api/category/loadByPage", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: "/api/category/loadByPage",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on loadByPage", async () => {
      await categoryCollection.insertOne(categoryBody);
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "GET",
        url: `/api/category/loadByPage?page=${1}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.categorys).toBeTruthy();
      expect(responseBody.total).toBeTruthy();
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: `/api/category/loadByPage?page=${1}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "GET",
        url: "/api/category/loadByPage",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("DELETE /api/category/delete", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/category/delete",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on delete", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await categoryCollection.insertOne({
        ...categoryBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/category/delete?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody).toEqual(true);
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: `/api/category/delete?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "DELETE",
        url: "/api/category/delete",
      });
      expect(response.statusCode).toBe(400);
    });
  });
  describe("PATCH /api/category/update", () => {
    test("Should return 400 for bad requests", async () => {
      const { token } = await makeAccessToken("admin", "password");
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/category/update",
        headers: { authorization: `Bearer ${token}` },
      });
      expect(response.statusCode).toBe(400);
    });
    test("Should return 200 on update", async () => {
      const { token, _id } = await makeAccessToken("admin", "password");
      const { insertedId } = await categoryCollection.insertOne({
        ...categoryBody,
        createdById: _id,
      });
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/category/update?_id=${insertedId.toString()}`,
        headers: { authorization: `Bearer ${token}` },
        body: { name: "new name" },
      });
      const responseBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(responseBody.name).toEqual("new name");
    });
    test("Should return 401 for unauthorized access token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: `/api/category/update?_id=${new ObjectId().toString()}`,
        headers: { authorization: "Bearer invalid_token" },
        body: { name: "new name" },
      });
      expect(response.statusCode).toBe(401);
    });
    test("Should return 400 if i dont pass any token", async () => {
      const response = await fastify.inject({
        method: "PATCH",
        url: "/api/category/update",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
``` 
Estes são testes de integração para as rotas de categoria de um sistema de agendamento online. Eles são feitos usando a biblioteca Jest e testam a funcionalidade de inserção, carregamento,listagem e exclusão de categorias.

Os testes de integração visam verificar se os diferentes componentes de um sistema estão funcionando corretamente juntos. No caso deste sistema de agendamentos online, estamos testando a integração entre o servidor, o banco de dados e as rotas da API relacionadas às categorias.

Antes de cada teste, é necessário se conectar ao banco de dados MongoDB e criar uma instância do Fastify, uma biblioteca de roteamento para aplicativos Node.js. Em seguida, as coleções de usuários e categorias são limpas.

Os testes são realizados usando a biblioteca Jest, que permite escrever testes unitários e de integração de maneira simples e clara. Cada teste é escrito dentro de uma função `test`, que especifica o comportamento esperado do sistema.

O código inicializa o servidor e o banco de dados antes de cada teste, e desconecta tudo após todos os testes terem sido realizados. Isso garante que cada teste execute em um ambiente limpo e não sejam afetados pelos resultados dos testes anteriores.

Os testes são divididos em vários grupos: "POST /api/category/add", "GET /api/category/load",PATCH e DELETE.

Em cada grupo, são testados quatro casos diferentes:

1.  Verifica se a resposta é 200 (OK) ao adicionar uma categoria com um token de autorização válido
2.  Verifica se a resposta é 400 (Bad Request) ao adicionar uma categoria com dados inválidos
3.  Verifica se a resposta é 401 (Unauthorized) ao tentar adicionar uma categoria sem um token de autorização válido
4.  Verifica se a resposta é 400 (Bad Request) ao tentar adicionar uma categoria sem passar um token de autorização
 
## Como gerar as próximas rotas dinamicamente?

A lib plop.js é uma biblioteca de geração de código baseada em um modelo, que permite a criação de rotas dinâmicas para outros domínios da aplicação a partir de modelos pré-definidos. Para isso, você precisa criar modelos para suas rotas de categorias e testes de integração que representem as estruturas de suas rotas e testes.

Em seguida, você pode usar esses modelos como base para geração dinâmica de novas rotas e testes para outros domínios da aplicação. O plop.js irá ler os modelos e gerar automaticamente o código para as novas rotas e testes, tornando o processo mais rápido e eficiente. Além disso, você pode personalizar o plop.js para adicionar ou remover informações de seus modelos para ajustá-los ao seu projeto.

De forma geral, o uso da lib plop.js permite a automação do processo de criação de rotas e testes, facilitando o desenvolvimento e a manutenção do código em seu projeto.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)