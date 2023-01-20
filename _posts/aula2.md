---
title: 'Aula 2 do CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-20T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Começamos com a criação da entidade de categoria

```typescript
export type CategoryData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    description?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type CategoryPaginated = {
    categorys: CategoryData[];
    total: number;
};

export class CategoryEntity {
    createdById: string;
    name: string;
    active?: boolean;
    description?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(data: CategoryData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.description = data.description;
        this.image = data.image;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
```

Este código contém três tipos de exportação: *CategoryData*, *CategoryPaginated* e a classe *CategoryEntity*.

*CategoryData* é um tipo de dado que representa uma categoria.
Ele contém campos como _id, createdById, name, active, description, image, createdAt e updatedAt. Nota-se que alguns campos são opcionais, como _id, active, description e image.

*CategoryPaginated* é um tipo de dado que representa uma lista paginada de categorias. Ele contém dois campos: categorys (uma matriz de *CategoryData*) e total (o número total de categorias).

*CategoryEntity* é uma classe que representa uma entidade de categoria. Ele contém os mesmos campos que *CategoryData*, além de um construtor que recebe um objeto *CategoryData* e atribui seus valores aos campos da classe.
Além disso, ele inicializa active como falso e createdAt e updatedAt como a data atual.

A classe CategoryEntity representa uma entidade de categoria em um sistema de agendamentos online.
Ela pode ser usada para armazenar informações sobre as categorias de serviços oferecidos pelo sistema, como por exemplo: cabeleireiro, estética, massagem, etc.

Os campos da classe CategoryEntity contém informações sobre cada categoria, incluindo:

1. createdById: o ID do usuário que criou a categoria.
2. name: o nome da categoria.
3. active: um booleano que indica se a categoria está ativa ou não.
4. description: uma descrição opcional da categoria.
5. image: uma imagem opcional da categoria.
6. createdAt: a data em que a categoria foi criada.
7. updatedAt: a data em que a categoria foi atualizada.

O construtor da classe CategoryEntity é usado para inicializar uma nova instância da classe com os dados de uma categoria. Ele recebe um objeto CategoryData e atribui seus valores aos campos da classe. Além disso, ele inicializa active como falso e createdAt e updatedAt como a data atual.

A classe CategoryEntity pode ser usada para criar, ler, atualizar e excluir categorias através de uma API REST. Exemplos de operações comuns incluem:

1. Obtendo uma lista de todas as categorias ativas
2. Criando uma nova categoria
3. Atualizando uma categoria existente
4. Excluindo uma categoria

A classe CategoryPaginated é usada para representar uma lista paginada de categorias, o que é útil quando há muitas categorias e precisamos mostrá-las em várias páginas. Ela contém dois campos: categorys (uma matriz de CategoryData) e total (o número total de categorias).

Este exemplo de código mostra como a entidade categoria é estruturada e como ela é usada para representar as categorias de serviços oferecidos pelo sistema de agendamentos online, permitindo a criação, leitura, atualização e exclusão de categorias através de uma API REST.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)