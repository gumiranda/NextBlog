---
title: 'Listagem de usuários usando GeoSpatial Queries com Mongo Db no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-26T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, você irá aprender sobre como usar consultas GeoSpatial no MongoDB para listar usuários. O MongoDB tem suporte a vários tipos de consultas GeoSpatial, como consultas de índice espacial 2D, consultas de índice espacial 2D com raio, consultas de índice espacial 3D, consultas poligonais e consultas de linhas. Você aprenderá como usar estas consultas para encontrar usuários que estejam dentro de uma determinada área geográfica, usando a latitude e longitude do usuário. Isso permitirá que você implemente recursos de pesquisa por localização em sua aplicação, como por exemplo, encontrar todos os usuários em um raio de X km de um ponto específico.

```typescript
export class QueryBuilder {
  private readonly query: any = [];
  match(data: any): QueryBuilder {
    this.query.push({ $match: data });
    return this;
  }
  group(data: any): QueryBuilder {
    this.query.push({ $group: data });
    return this;
  }
  count(data: any): QueryBuilder {
    this.query.push({ $count: data });
    return this;
  }
  geoNear(data: any): QueryBuilder {
    this.query.push({ $geoNear: data });
    return this;
  }
  project(data: any): QueryBuilder {
    this.query.push({ $project: data });
    return this;
  }
  skip(data: any): QueryBuilder {
    this.query.push({ $skip: data });
    return this;
  }
  limit(data: any): QueryBuilder {
    this.query.push({ $limit: data });
    return this;
  }
  lookup(data: any): QueryBuilder {
    this.query.push({ $lookup: data });
    return this;
  }
  sort(data: any): QueryBuilder {
    this.query.push({ $sort: data });
    return this;
  }
  unwind(data: any): QueryBuilder {
    this.query.push({ $unwind: data });
    return this;
  }
  build(): QueryBuilder {
    return this.query;
  }
}
``` 
Este é um código de um construtor de consultas para o MongoDB escrito em TypeScript. A classe QueryBuilder cria uma consulta de agregação para o MongoDB, armazenando as etapas da consulta em um array privado, query.

Os métodos na classe QueryBuilder adicionam diferentes etapas da consulta de agregação ao array query. Por exemplo, o método match adiciona a etapa $match, o método group adiciona a etapa $group, e assim por diante. Cada um destes métodos retorna this, permitindo que você encadeie vários métodos juntos para construir sua consulta de agregação.

Finalmente, o método build retorna o array query completo com todas as etapas da consulta de agregação adicionadas.

Este construtor de consultas é útil porque permite que você construa uma consulta de agregação de forma programática, em vez de escrever manualmente a consulta no formato JSON. Isso pode ser útil em aplicativos em que a consulta precisa ser construída dinamicamente baseada em entradas do usuário ou outros fatores.


```typescript
import { Query } from "@/application/types";
import { UserPaginated } from "@/slices/user/entities";

export interface LoadUserByPageGeoNearRepository {
  loadUserByPageGeoNear(query: Query): Promise<UserPaginated | null>;
}
``` 
Este código representa uma interface para um repositório que carrega usuários por página com base em uma consulta geoNear para o MongoDB. A interface LoadUserByPageGeoNearRepository define um único método, loadUserByPageGeoNear, que aceita uma consulta do tipo Query e retorna uma Promise que, quando resolvida, retorna um objeto do tipo UserPaginated ou null se não houver resultados.

A interface LoadUserByPageGeoNearRepository é utilizada para garantir que qualquer classe que a implemente tenha um método loadUserByPageGeoNear que siga a mesma assinatura de função. Isso é útil porque permite que você troque a implementação concreta do repositório sem que isso afete o resto do código que depende dele.

A interface também fornece uma maneira de documentar a funcionalidade esperada de qualquer classe que a implemente, tornando mais fácil para outros desenvolvedores entenderem como a classe deve ser usada.

```typescript
import { LoadUserByPageGeoNearRepository } from "@/slices/user/repositories";
import { UserPaginated } from "@/slices/user/entities";
import { Query } from "@/application/types";

export type LoadUserByPageGeoNear = (query: Query) => Promise<UserPaginated | null>;
export type LoadUserByPageGeoNearSignature = (
  loadUserByPageGeoNear: LoadUserByPageGeoNearRepository
) => LoadUserByPageGeoNear;
export const loadUserByPageGeoNear: LoadUserByPageGeoNearSignature =
  (loadUserByPageGeoNearRepository: LoadUserByPageGeoNearRepository) =>
  async (query: Query) => {
    return loadUserByPageGeoNearRepository.loadUserByPageGeoNear(query);
  };
``` 
Este código define uma função loadUserByPageGeoNear que serve como uma camada de abstração entre a camada de aplicação e a camada de persistência de dados. A função loadUserByPageGeoNear é definida como um "adapter", que recebe uma instância de LoadUserByPageGeoNearRepository e retorna uma função que, por sua vez, aceita uma consulta do tipo Query e retorna uma Promise que, quando resolvida, retorna um objeto do tipo UserPaginated ou null se não houver resultados.

A função loadUserByPageGeoNear é usada para lidar com a chamada para o repositório, evitando que a camada de aplicação tenha que conhecer detalhes sobre a implementação concreta do repositório. Isso permite que você altere a implementação do repositório sem que isso afete o resto do código que depende dele.

A vantagem de se usar uma camada de abstração como esta é que você pode reutilizar a lógica da função loadUserByPageGeoNear em vários pontos da aplicação, sem que haja a necessidade de escrever código duplicado. Além disso, essa camada de abstração é útil porque permite que você teste a camada de aplicação de forma isolada, sem a necessidade de acessar o banco de dados.


```typescript
  async loadUserByPageGeoNear(query: Query): Promise<UserPaginated | null> {
    if (!query?.options?.userLoggedId) {
      return null;
    }
    const { coord = null } =
      (await this.repository.getOne(
        { _id: new ObjectId(query?.options?.userLoggedId) },
        { projection: { password: 0 } }
      )) || {};
    const queryMongo = mapQueryParamsToQueryMongo({
      ...((query?.fields ?? {}) as object),
      active: true,
      _id: { $ne: new ObjectId(query?.options?.userLoggedId) },
    });
    if (queryMongo?.$text) {
      const resultPaginatedArray =
        (await this.repository.getPaginate(
          query?.options?.page ?? 0,
          queryMongo,
          query?.options?.sort ?? { createdAt: -1 },
          10,
          query?.options?.projection ?? {}
        )) ?? [];
      const totalPaginated = (await this.repository.getCount(queryMongo)) ?? 0;
      return { users: resultPaginatedArray, total: totalPaginated };
    }
    if (!coord?.coordinates) return null;
    const { coordinates } = coord;
    const queryBuilded = new QueryBuilder()
      .geoNear(mountGeoNearQuery({ query: queryMongo, coordinates }))
      .sort({ distance: 1 })
      .skip(((query?.options?.page ?? 0) - 1) * 10)
      .limit(10)
      .project({ password: 0 })
      .build();
    const totalQueryBuilded = new QueryBuilder()
      .geoNear(mountGeoNearQuery({ query: queryMongo, coordinates }))
      .count("name")
      .build();
    const resultGeoNearPaginatedArray =
      (await this.repository.aggregate(queryBuilded)) ?? [];
    const totalResult = (await this.repository.aggregate(totalQueryBuilded)) ?? null;
    const total = totalResult?.[0]?.name ?? 0;
    return { users: resultGeoNearPaginatedArray, total };
  }
``` 
O método loadUserByPageGeoNear é um método que retorna uma lista paginada de usuários baseados em uma consulta dada. Ele primeiro verifica se o userLoggedId existe nas opções de consulta. Se não existir, ele retorna null. Em seguida, ele recupera o usuário com o userLoggedId dado e seu valor coord.

Ele constrói duas consultas MongoDB usando a classe QueryBuilder - uma para buscar uma lista paginada de usuários e outra para contar o número total de usuários. A primeira consulta usa o método geoNear para classificar os usuários com base na proximidade de um determinado conjunto de coordenadas (que foram recuperadas do usuário com o userLoggedId dado). A consulta também limita os resultados a 10 usuários por página e exclui o campo password do conjunto de resultados.

A segunda consulta usa o método count para contar o número de usuários que atendem aos critérios. Finalmente, o método agrega ambas as consultas e retorna o resultado como um objeto UserPaginated, que contém uma matriz de usuários e uma contagem total.

Resumindo:
Este é um método que carrega usuários por página baseado em sua localização geográfica. Ele começa verificando se o ID do usuário logado foi fornecido na consulta. Em seguida, ele recupera as coordenadas do usuário logado e, em seguida, constrói duas consultas: uma para os usuários e outra para o total de usuários. Se a consulta incluir um termo de busca ($text), a consulta retornará uma lista de usuários paginação e o total de usuários correspondendo aos critérios de busca. Caso contrário, a consulta retornará usuários que estão próximos geograficamente ao usuário logado. A consulta também especifica a página, a classificação, a projeção e a quantidade de resultados a serem retornados.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)