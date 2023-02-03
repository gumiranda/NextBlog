---
title: 'Criando useCase loadCategory no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-26T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
A aula "Criando useCase loadCategory" tem como objetivo criar uma lógica de negócios para carregar uma categoria existente. Para isso, vamos utilizar o contrato "loadCategoryRepository", que foi criado anteriormente, para acessar a camada de persistência de dados e recuperar as informações da categoria requisitada.

Nesta aula, vamos implementar a função loadCategory e sua assinatura, que deve receber como parâmetro uma query de uma categoria a ser carregada e retornar uma Promise que, ao ser resolvida, deve retornar um objeto do tipo Categoria. Também vamos tratar possíveis erros que possam ocorrer durante a execução da operação, como, por exemplo, a categoria não existir no banco de dados.

Este useCase é importante porque ele permite a recuperação das informações de uma categoria específica, o que é útil em muitas situações, como, por exemplo, a exibição detalhada de uma categoria na interface do usuário.

```typescript
import { LoadCategoryRepository } from "@/slices/category/repositories";
import { CategoryData } from "@/slices/category/entities";
import { Query } from "@/application/types";

export type LoadCategory = (query: Query) => Promise<CategoryData | null>;
export type LoadCategorySignature = (loadCategory: LoadCategoryRepository) => LoadCategory;
export const loadCategory: LoadCategorySignature =
    (loadCategoryRepository: LoadCategoryRepository) => async (query: Query) => {
        return loadCategoryRepository.loadCategory(query);
    };
``` 

Este código contém três exportações: LoadCategory, LoadCategorySignature, e loadCategory.

1. LoadCategory é uma função que recebe um objeto Query como entrada e retorna uma promessa que, quando resolvida, retorna um objeto CategoryData ou null.
2. LoadCategorySignature é uma função que recebe um objeto LoadCategoryRepository como entrada e retorna a função LoadCategory.
3. loadCategory é uma constante que é uma instância da função LoadCategorySignature e foi já passado como entrada um objeto loadCategoryRepository.

A função LoadCategory é usada para carregar uma categoria do sistema. Ela recebe um objeto Query como entrada e retorna uma promessa que, quando resolvida, retorna um objeto CategoryData correspondente ou null caso ocorra algum erro.

A função LoadCategorySignature é usada para criar uma assinatura para a função LoadCategory, ela espera receber como entrada um objeto do tipo LoadCategoryRepository e retorna a função LoadCategory.

A constante loadCategory é uma instância da função LoadCategorySignature já passando como entrada o objeto loadCategoryRepository. Ele é usado para carregar uma categoria do sistema, Ele passa o objeto query para o objeto loadCategoryRepository para carregar a categoria correspondente do banco de dados.

Este código é usado para definir e implementar a funcionalidade de carregar uma categoria. Ele utiliza a interface LoadCategoryRepository para carregar uma categoria do banco de dados e retorna uma promessa com o objeto CategoryData correspondente ou null caso ocorra algum erro.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)