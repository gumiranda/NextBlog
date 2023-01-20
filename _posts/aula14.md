---
title: 'Criando useCase loadCategoryByPage no CrazyStack Node.js'
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
import { LoadCategoryByPageRepository } from "@/slices/category/repositories";
import { CategoryPaginated } from "@/slices/category/entities";
import { Query } from "@/application/types";

export type LoadCategoryByPage = (query: Query) => Promise<CategoryPaginated | null>;
export type LoadCategoryByPageSignature = (
  loadCategoryByPage: LoadCategoryByPageRepository
) => LoadCategoryByPage;
export const loadCategoryByPage: LoadCategoryByPageSignature =
  (loadCategoryByPageRepository: LoadCategoryByPageRepository) => async (query: Query) => {
    return loadCategoryByPageRepository.loadCategoryByPage(query);
  };
``` 
Este código contém três exportações: LoadCategoryByPage, LoadCategoryByPageSignature, e loadCategoryByPage.

1. LoadCategoryByPage é uma função que recebe um objeto Query como entrada e retorna uma promessa que, quando resolvida, retorna um objeto CategoryPaginated ou null.

2. LoadCategoryByPageSignature é uma função que recebe um objeto LoadCategoryByPageRepository como entrada e retorna a função LoadCategoryByPage.

3. loadCategoryByPage é uma constante que é uma instância da função LoadCategoryByPageSignature e foi já passado como entrada um objeto loadCategoryByPageRepository.

A função LoadCategoryByPage é usada para carregar as categorias do sistema por página. Ela recebe um objeto Query como entrada e retorna uma promessa que, quando resolvida, retorna um objeto CategoryPaginated correspondente ou null caso ocorra algum erro.

A função LoadCategoryByPageSignature é usada para criar uma assinatura para a função LoadCategoryByPage, ela espera receber como entrada um objeto do tipo LoadCategoryByPageRepository e retorna a função LoadCategoryByPage.

A constante loadCategoryByPage é uma instância da função LoadCategoryByPageSignature já passando como entrada o objeto loadCategoryByPageRepository. Ele é usado para carregar as categorias do sistema por página, Ele passa o objeto query para o objeto loadCategoryByPageRepository para carregar as categorias correspondentes do banco de dados.

Este código é usado para definir e implementar a funcionalidade de carregar categorias por página. Ele utiliza a interface LoadCategoryByPageRepository para carregar as categorias do banco de dados e retorna uma promessa com o objeto CategoryPaginated correspondente ou null caso ocorra algum erro.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)