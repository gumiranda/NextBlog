---
title: 'Criando contract loadCategoryRepository no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-25T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
import { Query } from "@/application/types";
import { CategoryData } from "@/slices/category/entities";

export interface LoadCategoryRepository {
    loadCategory(query: Query): Promise<CategoryData | null>;
}
```
Este código contém uma interface chamada LoadCategoryRepository. Esta interface define um método chamado loadCategory que recebe um parâmetro query do tipo Query e retorna uma promessa que, quando resolvida, retorna um objeto CategoryData ou null.

A interface LoadCategoryRepository é usada para definir a estrutura de um repositório de categorias que implementa a funcionalidade de carregar uma categoria. Ele espera que qualquer classe ou objeto que implemente essa interface tenha um método chamado loadCategory que aceita um objeto Query como entrada e retorna uma promessa com o objeto CategoryData correspondente ou null caso ocorra algum erro.

O import { Query } from "@/application/types" é usado para importar o tipo Query do módulo "types" dentro do diretório "application" da raiz do projeto. Isso permite que o tipo Query seja usado como o tipo de entrada do método loadCategory na interface LoadCategoryRepository.

Assim, este código é usado para definir uma interface que espera que as classes que implementem ela tenham um método chamado loadCategory que retorna uma promessa de sucesso com um objeto CategoryData ou null.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)