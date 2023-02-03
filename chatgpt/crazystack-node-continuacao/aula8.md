---
title: 'Criando useCase addCategory no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-23T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
A aula "Criando useCase addCategory" é uma aula importante no desenvolvimento da aplicação, na qual será abordado a implementação do caso de uso de inserção de categoria. Nesta aula, será criada a classe "AddCategory" que representa a lógica de negócio para adicionar uma categoria ao sistema. Esta classe será responsável por validar os dados de entrada, executar as regras de negócio e comunicar-se com o repositório de categoria para persistir as informações. Além disso, será criado o teste de unidade para garantir o funcionamento correto desta funcionalidade. Esta aula é fundamental para entender como as operações de negócio são implementadas e como são realizados os testes para garantir a qualidade do software.

Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
import { AddCategoryRepository } from "@/slices/category/repositories";
import { CategoryEntity, CategoryData } from "@/slices/category/entities";

export type AddCategory = (data: CategoryData) => Promise<CategoryEntity | null>;
export type AddCategorySignature = (addCategory: AddCategoryRepository) => AddCategory;
export const addCategory: AddCategorySignature =
    (addCategoryRepository: AddCategoryRepository) => (data: CategoryData) => {
        return addCategoryRepository.addCategory(new CategoryEntity(data));
    };
```
Este código contém três exportações: AddCategory, AddCategorySignature, e addCategory.

AddCategory é uma função que recebe um objeto CategoryData como entrada e retorna uma promessa que, quando resolvida, retorna um objeto CategoryEntity ou null.

AddCategorySignature é uma função que recebe um objeto AddCategoryRepository como entrada e retorna a função AddCategory
addCategory é uma constante que é uma instância da função AddCategorySignature e foi já passado como entrada um objeto addCategoryRepository

A função AddCategory é usada para adicionar uma categoria ao sistema. Ela recebe um objeto CategoryData como entrada e retorna uma promessa que, quando resolvida, retorna um objeto CategoryEntity que representa a categoria adicionada ou null caso ocorra algum erro.

A função AddCategorySignature é usada para criar uma assinatura para a função AddCategory, ela espera receber como entrada um objeto do tipo AddCategoryRepository e retorna a função AddCategory.

A constante addCategory é uma instância da função AddCategorySignature já passando como entrada o objeto addCategoryRepository. Ele é usado para adicionar uma categoria ao sistema, ele cria uma instância de CategoryEntity com os dados recebidos e passa para o objeto addCategoryRepository para salvar no banco de dados.

Este código é usado para definir e implementar a funcionalidade de inserção de uma categoria. Ele utiliza a interface AddCategoryRepository para adicionar uma categoria ao banco de dados e retorna uma promessa com o objeto CategoryEntity adicionado ou null caso ocorra algum erro.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)