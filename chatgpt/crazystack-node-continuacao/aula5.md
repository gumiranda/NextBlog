---
title: 'Criando interface addCategoryRepository no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-22T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
A aula "Criando interface addCategoryRepository" vai mostrar como criar uma interface que será usada para definir os métodos que devem ser implementados por uma classe de repositório de categoria. Uma interface é um contrato que especifica a assinatura dos métodos que precisam ser implementados, sem especificar sua implementação. Isso permite que classes diferentes possam ser usadas como repositórios de categoria, desde que implementem os métodos especificados na interface. Com essa abstração, é possível substituir ou adicionar novos repositórios de categoria sem precisar alterar a camada de serviço ou a camada de apresentação da aplicação.

Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
import { CategoryData } from "@/slices/category/entities";

export interface AddCategoryRepository {
    addCategory(category: CategoryData): Promise<CategoryData | null>;
}
```
Este código contém uma interface chamada AddCategoryRepository. Esta interface define um método chamado addCategory que recebe um parâmetro category do tipo CategoryData e retorna uma promessa que, quando resolvida, retorna um objeto CategoryData ou null.

A interface AddCategoryRepository é usada para definir a estrutura de um repositório de categorias que implementa a funcionalidade de inserção de uma categoria. Ele espera que qualquer classe ou objeto que implemente essa interface tenha um método chamado addCategory que aceita um objeto CategoryData como entrada e retorna uma promessa com o objeto CategoryData adicionado ou null caso ocorra algum erro.

O import { CategoryData } from "@/slices/category/entities" é usado para importar o tipo CategoryData do módulo "entities" dentro do diretório "category" dentro do diretório "slices" da raiz do projeto. Isso permite que o tipo CategoryData seja usado como o tipo de entrada do método addCategory na interface AddCategoryRepository.

Assim, este código é usado para definir uma interface que espera que as classes que implementem ela tenham um método chamado addCategory que retorna uma promessa de sucesso com um objeto CategoryData ou null.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)