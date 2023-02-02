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
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

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

explique como essas rotas de categorias serão usadas como modelo para geração dinâmica de rotas para outros domínios da aplicação através do uso da lib plop.js


https://github.com/gumiranda/CrazyStackNodeJs/commit/57296ee1bead7114679ce7c474916aa2819df0fa


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)