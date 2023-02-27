---
title: 'Criação da primeira entidade do projeto do CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br)


Nesta aula, você vai criar a primeira classe que representará a categoria de serviços da API. A classe de categoria é uma parte fundamental do modelo de dados da sua aplicação e será usada em vários lugares ao longo do desenvolvimento.

Para criar a classe de categoria, você precisará definir sua estrutura, incluindo os atributos e métodos que farão parte dela. Além disso, você precisará implementar as validações e as regras de negócio relacionadas à categoria. É importante que você organize o código da classe de forma clara e legível, para que seja fácil manter e evoluir a aplicação ao longo do tempo.

Após criar a classe de categoria, você pode testá-la para garantir que está funcionando corretamente. Isso pode ser feito através de testes unitários, que verificam se cada método da classe está funcionando como esperado. Esses testes também ajudam a garantir que sua aplicação será estável e confiável ao longo do tempo.

Depois de criar a classe de categoria, você pode usar a biblioteca Plop.js para gerar automaticamente classes para novos domínios de negócios, baseado no modelo que você definiu. Isso permitirá que você rapidamente adicione novas classes à aplicação sem precisar escrever código manualmente para cada uma delas.

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