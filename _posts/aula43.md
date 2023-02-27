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
Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

A aula de Repository genérico trata sobre a criação de uma classe abstrata "Repository" que é utilizada como base para a criação de repositórios de dados. Esta classe define os métodos básicos que um repositório deve ter, como:

1. Adicionar um item
2. Atualizar um item
3. Incrementar valores de um item
4. Deletar um item
5. Buscar um único item
6. Buscar todos os itens
7. Buscar itens com paginação
8. Contar itens
9. Agregar dados

Essa classe abstrata ajuda a manter o padrão de programação, ajudando na criação de repositórios mais consistentes e fáceis de manter. Além disso, é possível herdar da classe Repository e implementar funcionalidades específicas, tornando a criação de repositórios mais rápida e eficiente.

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