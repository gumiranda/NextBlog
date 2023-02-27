---
title: 'Criando contract loadCategoryByPageRepository no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-27T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Na aula "Criando contract loadCategoryByPageRepository", vamos criar um contrato para o nosso repositório de categoria que irá implementar a funcionalidade de carregar as categorias por página. Este contrato irá definir a interface que o nosso repositório deve seguir para implementar essa funcionalidade.

Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

Ele pode ser implementado usando diversas tecnologias, como banco de dados SQL ou NoSQL, arquivos, etc. O importante é que ele segue a interface definida no contrato para que possa ser usado pelo nosso use case "loadCategoryByPage".

Este contrato é importante porque nos permite ter flexibilidade na implementação da nossa aplicação e facilidade na manutenção, pois caso precise mudar a forma como a funcionalidade é implementada, basta mudar a implementação do repositório sem precisar mexer em nenhuma outra parte da aplicação.

```typescript
import { Query } from "@/application/types";
import { CategoryPaginated } from "@/slices/category/entities";

export interface LoadCategoryByPageRepository {
    loadCategoryByPage(query: Query): Promise<CategoryPaginated | null>;
}
``` 

Este código contém uma interface chamada LoadCategoryByPageRepository. Esta interface define um método chamado loadCategoryByPage que recebe um parâmetro query do tipo Query e retorna uma promessa que, quando resolvida, retorna um objeto CategoryPaginated ou null.

A interface LoadCategoryByPageRepository é usada para definir a estrutura de um repositório de categorias que implementa a funcionalidade de carregar categorias por página. Ele espera que qualquer classe ou objeto que implemente essa interface tenha um método chamado loadCategoryByPage que aceita um objeto Query como entrada e retorna uma promessa com o objeto CategoryPaginated correspondente ou null caso ocorra algum erro.

O import { Query } from "@/application/types" é usado para importar o tipo Query do módulo "types" dentro do diretório "application" da raiz do projeto. Isso permite que o tipo Query seja usado como o tipo de entrada do método loadCategoryByPage na interface LoadCategoryByPageRepository.

O import { CategoryPaginated } from "@/slices/category/entities" é usado para importar o tipo CategoryPaginated do módulo "entities" dentro do diretório "category" dentro do diretório "slices" da raiz do projeto. Isso permite que o tipo CategoryPaginated seja usado como o tipo de retorno do método loadCategoryByPage na interface LoadCategoryByPageRepository.

Assim, este código é usado para definir uma interface que espera que as classes que implementem ela tenham um método chamado loadCategoryByPage que retorna uma promessa de sucesso com um objeto CategoryPaginated ou null.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)