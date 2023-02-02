---
title: 'Criando usecase deleteCategory no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-29T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
A aula "Criando usecase deleteCategory" é onde você irá implementar a lógica para excluir uma categoria em sua aplicação. Isso incluirá a criação de um novo caso de uso chamado "deleteCategory". Este caso de uso será responsável por receber uma requisição de exclusão de categoria, validar a requisição, e então remover a categoria do repositório.

Nesta aula, você irá trabalhar com o contract deleteCategoryRepository, que irá garantir que a classe de repositório de categoria tenha as funcionalidades necessárias para remover uma categoria.

Você também irá utilizar o tipo genérico Query, que foi criado na aula anterior, para passar as informações da categoria a ser excluída para o repositório.

Este é um passo importante para garantir a integridade dos dados em sua aplicação, e é fundamental que você siga todas as boas práticas de programação para garantir a segurança e a qualidade do seu código.

```typescript
import { Query } from "@/application/types";
import { CategoryData } from "@/slices/category/entities";

export interface DeleteCategoryRepository {
  deleteCategory(query: Query): Promise<CategoryData | null>;
}
``` 

Este código contém uma interface chamada DeleteCategoryRepository. Esta interface define um método chamado deleteCategory que recebe um parâmetro query do tipo Query e retorna uma promessa que, quando resolvida, retorna um objeto CategoryData ou null.

A interface DeleteCategoryRepository é usada para definir a estrutura de um repositório de categorias que implementa a funcionalidade de deletar uma categoria. Ele espera que qualquer classe ou objeto que implemente essa interface tenha um método chamado deleteCategory que aceita um objeto Query como entrada e retorna uma promessa com o objeto CategoryData correspondente ou null caso ocorra algum erro.

O import { Query } from "@/application/types" é usado para importar o tipo Query do módulo "types" dentro do diretório "application" da raiz do projeto. Isso permite que o tipo Query seja usado como o tipo de entrada do método deleteCategory na interface DeleteCategoryRepository.

O import `{ CategoryData } from "@/slices/category/entities" é usado para importar o tipoCategoryDatado módulo "entities" dentro do diretório "category" dentro do diretório "slices" da raiz do projeto. Isso permite que o tipo CategoryData seja usado como o tipo de retorno do método deleteCategory na interface DeleteCategoryRepository.

Assim, este código é usado para definir uma interface que espera que as classes que implementem ela tenham um método chamado deleteCategory que retorna uma promessa de sucesso com um objeto CategoryData ou null. Esse método seria usado para deletar uma categoria específica no banco de dados utilizando o objeto query como parâmetro para encontrar e deletar a categoria.

```typescript
import { DeleteCategoryRepository } from "@/slices/category/repositories";
import { CategoryData } from "@/slices/category/entities";
import { Query } from "@/application/types";

export type DeleteCategory = (query: Query) => Promise<CategoryData | null>;
export type DeleteCategorySignature = (
  deleteCategory: DeleteCategoryRepository
) => DeleteCategory;
export const deleteCategory: DeleteCategorySignature =
  (deleteCategoryRepository: DeleteCategoryRepository) => (query: Query) => {
    return deleteCategoryRepository.deleteCategory(query);
  };
``` 
Este código contém três exportações: DeleteCategory, DeleteCategorySignature, e deleteCategory.

1. DeleteCategory é uma função que recebe um objeto Query como entrada e retorna uma promessa que, quando resolvida, retorna um objeto CategoryData ou null.

2. DeleteCategorySignature é uma função que recebe um objeto DeleteCategoryRepository como entrada e retorna a função DeleteCategory.

3. deleteCategory é uma constante que é uma instância da função DeleteCategorySignature e foi já passado como entrada um objeto deleteCategoryRepository

A função DeleteCategory é usada para deletar uma categoria do sistema. Ela recebe um objeto Query como entrada e retorna uma promessa que, quando resolvida, retorna um objeto CategoryData correspondente ou null caso ocorra algum erro.

A função DeleteCategorySignature é usada para criar uma assinatura para a função DeleteCategory, ela espera receber como entrada um objeto do tipo DeleteCategoryRepository e retorna a função DeleteCategory.

A constante deleteCategory é uma instância da função DeleteCategorySignature já passando como entrada o objeto deleteCategoryRepository. Ele é usado para deletar uma categoria do sistema, Ele passa o objeto query para o objeto deleteCategoryRepository para deletar a categoria correspondente do banco de dados.

Este código é usado para definir e implementar a funcionalidade de deletar uma categoria. Ele utiliza a interface DeleteCategoryRepository para deletar uma categoria do banco de dados e retorna uma promessa com o objeto CategoryData correspondente ou null caso ocorra algum erro.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)