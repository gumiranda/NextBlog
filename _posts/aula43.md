---
title: 'Repository genérico no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-23T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
export abstract class Repository {
  abstract add(data: any): Promise<any>;
  abstract update(query: any, data: any): Promise<any>;
  abstract incrementOne(query: any, data: any): Promise<any>;
  abstract deleteOne(query: any): Promise<any>;
  abstract getOne(query: any): Promise<any>;
  abstract getAll(query: any): Promise<any>;
  abstract getPaginate(
    page: number,
    query: any,
    sort: any,
    limit: number,
    projection: any
  ): Promise<any>;
  abstract getCount(query: any): Promise<any>;
  abstract aggregate(query: any): Promise<any>;
}
``` 
Classe abstrata Repository é uma classe base para criação de repositórios de dados. Ela define os métodos básicos que um repositório deve ter, como adicionar, atualizar, incrementar, deletar, buscar por um único item, buscar todos os itens, buscar com paginação, contar itens, e agregar dados. Esses métodos são todos abstratos e devem ser implementados em classes filhas para funcionar corretamente


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)