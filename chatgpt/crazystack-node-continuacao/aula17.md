---
title: 'Criando contract updateCategoryRepository no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-30T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, vamos criar o contrato para o repositório que será responsável por atualizar categorias em nossa aplicação. O contrato é uma interface que define as assinaturas de métodos que devem ser implementados pelo repositório concreto. Ele serve como um acordo entre o repositório concreto e o uso caso para garantir que ambos estejam trabalhando com as mesmas expectativas.

A interface updateCategoryRepository será responsável por definir o método update, que deverá receber uma categoria e suas novas informações para realizar a atualização. A implementação desse método será feita no repositório concreto, que será criado posteriormente.

Criar um contrato é uma boa prática para manter a boa organização do código e facilitar a manutenção do sistema. Além disso, permite a reutilização do código, pois o uso caso pode trabalhar com diferentes implementações do repositório, desde que sigam o contrato definido.

```typescript
import { Query } from "@/application/types";
import { CategoryData } from "@/slices/category/entities";

export interface UpdateCategoryRepository {
  updateCategory(query: Query, data: CategoryData): Promise<CategoryData | null>;
}
``` 
Este código contém uma interface chamada UpdateCategoryRepository. Esta interface define um método chamado updateCategory que recebe dois parâmetros, query do tipo Query e data do tipo CategoryData, e retorna uma promessa que, quando resolvida, retorna um objeto CategoryData atualizado ou null.

A interface UpdateCategoryRepository é usada para definir a estrutura de um repositório de categorias que implementa a funcionalidade de atualizar uma categoria. Ele espera que qualquer classe ou objeto que implemente essa interface tenha um método chamado updateCategory que aceita dois objetos como entrada, um objeto Query e um objeto CategoryData e retorna uma promessa com o objeto CategoryData atualizado ou null caso ocorra algum erro.

O import { Query } from "@/application/types" é usado para importar o tipo Query do módulo "types" dentro do diretório "application" da raiz do projeto. Isso permite que o tipo Query seja usado como o primeiro tipo de entrada do método updateCategory na interface UpdateCategoryRepository.

O import { CategoryData } from "@/slices/category/entities" é usado para importar o tipo CategoryData do módulo "entities" dentro do diretório "category" dentro do diretório "slices" da raiz do projeto. Isso permite que o tipo CategoryData seja usado como o segundo tipo de entrada do método updateCategory e o tipo de retorno do mesmo.

Assim, este código é usado para definir uma interface que espera que as classes que implementem ela tenham um método chamado updateCategory que recebe dois parâmetros, um objeto Query e um objeto CategoryData e retorna uma promessa de sucesso com um objeto CategoryData atualizado ou null.

Esse método seria usado para atualizar uma categoria específica no banco de dados utilizando o objeto query como parâmetro para encontrar a categoria e o objeto data com as informações atualizadas para serem persistidas no banco de dados.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)