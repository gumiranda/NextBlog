---
title: 'Criando tipo genérico Query no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-24T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, vamos criar um tipo genérico "Query" com base no código apresentado. A ideia é usar este tipo para representar todas as consultas que serão realizadas na aplicação, incluindo as que serão feitas ao banco de dados.

O tipo "Query" consiste em dois objetos: "fields" e "options". O primeiro objeto, "fields", representa os campos que serão selecionados na consulta. O segundo objeto, "options", representa as opções adicionais que podem ser passadas para a consulta, como o tipo de ordenação, a página que será retornada, o limite de resultados e o ID do usuário logado, entre outros.

O tipo "QueryOptions" é usado para especificar essas opções adicionais, incluindo a projeção, a ordenação, a página, o limite, o ID do usuário logado e o índice a ser criado. Este tipo é opcional e pode ser omitido caso não sejam necessárias as opções adicionais.

Ao final da aula, teremos um tipo genérico "Query" que será útil para representar todas as consultas da aplicação e facilitar a manutenção do código.

Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
export type Query = {
    fields: unknown;
    options?: QueryOptions;
};

export type QueryOptions = {
    projection?: unknown;
    sort?: unknown;
    page?: number;
    limit?: number;
    userLoggedId?: string;
    indexToCreate?: any;
};
```
Este código contém dois tipos de exportação: Query e QueryOptions.

1. Query é um tipo que representa uma consulta a um banco de dados. Ele contém dois campos:

1.1. fields: um objeto que contém os campos que serão usados para filtrar os resultados da consulta.
1.2. options: (opcional) um objeto do tipo QueryOptions que contém opções adicionais para a consulta.
2. QueryOptions é um tipo que representa as opções adicionais para uma consulta. Ele contém vários campos opcionais:
2.1. projection: (opcional) um objeto que especifica quais campos serão incluídos ou excluídos na consulta.
2.2. sort: (opcional) um objeto que especifica como os resultados serão classificados.
2.3. page: (opcional) um número que especifica qual página de resultados deve ser retornada.
2.4. limit: (opcional) um número que especifica quantos resultados devem ser retornados por página.
2.5. userLoggedId: (opcional) uma string que contém o id do usuário logado
2.6. indexToCreate: (opcional) um objeto que especifica quais índices devem ser criados antes de realizar a consulta

Este código define os tipos Query e QueryOptions que são usados para representar consultas a um banco de dados, incluindo campos de filtragem e opções adicionais para a consulta, como projeção, classificação, paginação e limite de resultados.

Esses tipos podem ser usados para definir a estrutura de uma requisição de consulta a um banco de dados, incluindo quais campos devem ser incluídos ou excluídos, como os resultados devem ser classificados e quais páginas de resultados devem ser retornadas.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)