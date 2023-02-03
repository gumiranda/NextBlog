---
title: 'Criando usecase updateCategory no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-01T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
A aula de "Criando usecase updateCategory" irá mostrar como implementar a funcionalidade de atualização de categoria em sua aplicação. Nesta aula, você aprenderá como usar o contrato "updateCategoryRepository" que foi criado anteriormente.

Este usecase é responsável por atualizar as informações de uma categoria específica no banco de dados. Para isso, ele receberá um id da categoria a ser atualizada e as informações a serem atualizadas. Este usecase irá verificar se as informações fornecidas são válidas e, em seguida, irá passar as informações para o contrato "updateCategoryRepository" para que ele as atualize no banco de dados. O resultado da atualização será então retornado para o usuário.

```typescript
import { UpdateCategoryRepository } from "@/slices/category/repositories";
import { CategoryData } from "@/slices/category/entities";
import { Query } from "@/application/types";

export type UpdateCategory = (
  query: Query,
  data: CategoryData
) => Promise<CategoryData | null>;
export type UpdateCategorySignature = (
  updateCategory: UpdateCategoryRepository
) => UpdateCategory;
export const updateCategory: UpdateCategorySignature =
  (updateCategoryRepository: UpdateCategoryRepository) =>
  async (query: Query, data: CategoryData) => {
    return updateCategoryRepository.updateCategory(query, data);
  };

``` 

Este código contém três exportações: UpdateCategory, UpdateCategorySignature, e updateCategory.

1. UpdateCategory é uma função que recebe dois objetos como entrada, um objeto Query e um objeto CategoryData, e retorna uma promessa que, quando resolvida, retorna um objeto CategoryData atualizado ou null.

2. UpdateCategorySignature é uma função que recebe um objeto UpdateCategoryRepository como entrada e retorna a função UpdateCategory.

3. updateCategory é uma constante que é uma instância da função UpdateCategorySignature e foi já passado como entrada um objeto updateCategoryRepository.

A função UpdateCategory é usada para atualizar uma categoria do sistema. Ela recebe dois objetos como entrada, um objeto Query e um objeto CategoryData e retorna uma promessa que, quando resolvida, retorna um objeto CategoryData atualizado ou null caso ocorra algum erro.

A função UpdateCategorySignature é usada para criar uma assinatura para a função UpdateCategory, ela espera receber como entrada um objeto do tipo UpdateCategoryRepository e retorna a função UpdateCategory.

A constante updateCategory é uma instância da função UpdateCategorySignature já passando como entrada o objeto updateCategoryRepository. Ele é usado para atualizar uma categoria do sistema, Ele passa os objetos query e data para o objeto updateCategoryRepository para atualizar a categoria correspondente no banco de dados.

Este código é usado para definir e implementar a funcionalidade de atualizar uma categoria. Ele utiliza a interface UpdateCategoryRepository para atualizar uma categoria no banco de dados e retorna uma promessa com o objeto CategoryData atualizado ou null caso ocorra algum erro.




[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)