---
title: 'Introduzindo MongoDB no CrazyStack Node.js'
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
import { MongoClient, Collection } from "mongodb";

export const MongoHelper = {
  client: null as unknown as MongoClient | any,
  uri: null as unknown as string,
  session: null as unknown as any,
  async connect(connectionUrl: string) {
    this.uri = connectionUrl;
    this.client = await MongoClient.connect(connectionUrl, {
      retryReads: true,
      retryWrites: true,
    });
    return this?.client?.connect?.();
  },
  async disconnect() {
    if (this?.client) {
      await this.endSession();
      await this.client.close();
      this.client = null;
    }
  },
  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri);
    }
    return this?.client?.db?.()?.collection?.(name);
  },
  mapPassword(collection: any): any {
    return { ...collection, password: null };
  },
  mapCollectionPassword(collection: any[]): any[] {
    return collection?.map?.((coll) => MongoHelper.mapPassword(coll));
  },
  async startSession() {
    const session = await this?.client?.startSession?.();
    this.session = session;
    return session;
  },
  async getSession() {
    return this.session;
  },
  async endSession() {
    if (this.session) {
      await this.session.endSession();
    }
    this.session = null;
  },
};
``` 
O código acima é uma classe de helper para acesso ao banco de dados MongoDB. Ele fornece funções para conectar e desconectar do banco de dados, recuperar uma coleção específica, remover a senha de um objeto da coleção, remover a senha de vários objetos da coleção, iniciar e finalizar uma sessão no MongoDB e recuperar a sessão atual. Ele também armazena o cliente Mongo, a URI de conexão e a sessão atual como variáveis de instância.

```typescript
import {
  mapAnyToMongoObject,
  mapQueryParamsToQueryMongo,
  MongoHelper,
} from "@/application/infra/database/mongodb";
import { Repository } from "@/application/infra/contracts/repository";
import { Collection, ObjectId } from "mongodb";

export class MongoRepository extends Repository {
  public collectionName: string;
  constructor(collectionName: string) {
    super();
    this.collectionName = collectionName;
  }
  private async getCollection(): Promise<Collection> {
    return MongoHelper.getCollection(this.collectionName);
  }
  async insertOne(data: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    return collection.insertOne(mapAnyToMongoObject(data), { session });
  }
  async add(data: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    const { insertedId } = (await this.insertOne(data)) || {};
    if (!!insertedId) {
      const objInserted = await collection.findOne(
        { _id: new ObjectId(insertedId) },
        { session }
      );
      return MongoHelper.mapPassword(objInserted);
    }
    return null;
  }
  async updateOne(query: any, data: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    if (query._id) {
      query._id = new ObjectId(query._id);
    }
    return collection.updateOne(
      mapQueryParamsToQueryMongo(query),
      { $set: mapAnyToMongoObject(data) },
      { upsert: false, session }
    );
  }
  async update(query: any, data: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    const result = await this.updateOne(query, data);
    if (result?.modifiedCount === 1) {
      return collection.findOne(mapQueryParamsToQueryMongo(query), { session });
    }
    return null;
  }
  async incrementOne(query: any, data: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    if (query._id) {
      query._id = new ObjectId(query._id);
    }
    return collection.updateOne(
      mapQueryParamsToQueryMongo(query),
      { $inc: mapAnyToMongoObject(data) },
      { upsert: false, session }
    );
  }
  async increment(query: any, data: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    const result = await this.incrementOne(query, data);
    if (result?.modifiedCount === 1) {
      return collection.findOne(mapQueryParamsToQueryMongo(query), { session });
    }
    return null;
  }
  async deleteOne(query: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    if (query._id) {
      query._id = new ObjectId(query._id);
    }
    const result = (await collection.deleteOne(mapQueryParamsToQueryMongo(query), {
      session,
    })) as any;
    if (result?.deletedCount === 1) {
      return true;
    }
    return false;
  }
  async getOne(query: any, options?: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    if (query?._id) {
      query._id = new ObjectId(query._id);
    }
    return collection.findOne(mapQueryParamsToQueryMongo(query), {
      ...options,
      session,
    });
  }
  async getAll(query: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    return collection.find(mapQueryParamsToQueryMongo(query), { session }).toArray();
  }
  async getPaginate(
    page: number,
    query: any,
    sort: any,
    limit: number,
    projection: any
  ): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    if (query._id) {
      query._id = new ObjectId(query._id);
    }
    return collection
      .find(mapQueryParamsToQueryMongo(query), { session })
      .project(projection)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort)
      .toArray();
  }
  async getCount(query: any): Promise<any> {
    const collection = await this.getCollection();
    if (query._id) {
      query._id = new ObjectId(query._id);
    }
    return collection.countDocuments(mapQueryParamsToQueryMongo(query));
  }
  async aggregate(query: any): Promise<any> {
    const collection = await this.getCollection();
    const session = await MongoHelper.getSession();
    return collection.aggregate(query, { session }).toArray();
  }
}
``` 
Este é um código de uma classe chamada "MongoRepository" que herda de uma classe chamada "Repository". Esta classe fornece uma estrutura básica para acessar e manipular dados armazenados em um banco de dados MongoDB. Ele contém métodos para inserir, atualizar, excluir e recuperar dados, bem como métodos para paginação, contagem e agregação de dados. Ele também usa outras classes para ajudar a mapear os dados entre o aplicativo e o banco de dados, e para gerenciar a conexão com o banco de dados.

## Em breve
Em breve no curso vocês entenderão o poder de utilizar essa classe abstrata Repository. Por exemplo, caso queiramos usar um ORM como o prisma poderíamos fazer um PrismaRepository:
```typescript
import { PrismaClient } from '@prisma/client'
import { Repository } from '@/application/infra/contracts/repository'

export class PrismaRepository extends Repository {
  private prisma: PrismaClient

  constructor() {
    super()
    this.prisma = new PrismaClient()
  }

  async insertOne(data: any): Promise<any> {
    return this.prisma.create(this.collectionName, data)
  }

  async add(data: any): Promise<any> {
    return this.prisma.create(this.collectionName, data)
  }

  async updateOne(query: any, data: any): Promise<any> {
    return this.prisma.update(this.collectionName, { data, where: query })
  }

  async update(query: any, data: any): Promise<any> {
    const result = await this.updateOne(query, data)
    if (result) {
      return this.getOne(query)
    }
    return null
  }

  async deleteOne(query: any): Promise<any> {
    return this.prisma.delete(this.collectionName, { where: query })
  }

  async getOne(query: any, options?: any): Promise<any> {
    return this.prisma.findOne(this.collectionName, { where: query, ...options })
  }

  async getAll(query: any): Promise<any> {
    return this.prisma.findMany(this.collectionName, { where: query })
  }

  async getPaginate(
    page: number,
    query: any,
    sort: any,
    limit: number,
    projection: any
  ): Promise<any> {
    const skip = (page - 1) * limit
    return this.prisma.findMany(this.collectionName, {
      where: query,
      skip,
      take: limit,
      orderBy: sort,
      select: projection,
    })
  }

  async getCount(query: any): Promise<any> {
    return this.prisma.count(this.collectionName, { where: query })
  }

  async aggregate(query: any): Promise<any> {
    // Not supported by Prisma
    return null
  }
}
``` 

Ou um SupaBaseRepository
```typescript
import { Repository } from "@/application/infra/contracts/repository";
import { Supabase } from "@supabase/supabase-js";

export class SupabaseRepository extends Repository {
  private supabase: Supabase;

  constructor(supabase: Supabase) {
    super();
    this.supabase = supabase;
  }

  async insertOne(tableName: string, data: any): Promise<any> {
    return this.supabase.from(tableName).insert(data).one();
  }

  async add(tableName: string, data: any): Promise<any> {
    const result = await this.insertOne(tableName, data);
    if (result?.inserted_id) {
      return this.supabase
        .from(tableName)
        .select("*")
        .where({ id: result.inserted_id })
        .one();
    }
    return null;
  }

  async updateOne(tableName: string, query: any, data: any): Promise<any> {
    return this.supabase
      .from(tableName)
      .update(data)
      .where(query)
      .returning("*")
      .one();
  }

  async update(tableName: string, query: any, data: any): Promise<any> {
    const result = await this.updateOne(tableName, query, data);
    if (result) {
      return result;
    }
    return null;
  }

  async deleteOne(tableName: string, query: any): Promise<boolean> {
    const result = await this.supabase
      .from(tableName)
      .delete()
      .where(query)
      .returning("*")
      .one();
    if (result) {
      return true;
    }
    return false;
  }

  async getOne(tableName: string, query: any): Promise<any> {
    return this.supabase
      .from(tableName)
      .select("*")
      .where(query)
      .one();
  }
  ///resto
}
```

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)