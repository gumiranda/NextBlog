---
title: 'Gerando CRUD de Rating no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-11T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

Nesta aula, você aprenderá como criar as funcionalidades básicas de um CRUD (Create, Read, Update e Delete) para o recurso "Rating". O objetivo é que você possa aplicar o mesmo padrão utilizado na criação do CRUD de "Categoria" e assim, possa desenvolver CRUDs para outros recursos da aplicação com facilidade. Serão criadas as seguintes interfaces de repositório:

1. addRatingRepository
2. loadRatingRepository
3. loadRatingByPageRepository
4. deleteRatingRepository
5. updateRatingRepository

Além disso, serão criados os seguintes casos de uso:

1. addRating
2. loadRating
3. loadRatingByPage
4. deleteRating
5. updateRating

Você também poderá aplicar as técnicas de validação de dados e tratamento de erros aprendidas nas aulas anteriores. Ao final desta aula, você terá uma base sólida para o desenvolvimento de futuros recursos da aplicação.

```typescript
export type RatingStarsModel = {
  rating: string;
  stars: number;
};
export type RatingData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  ratingType: string;
  ratings: RatingStarsModel[];
};

export type RatingPaginated = {
  ratings: RatingData[];
  total: number;
};

export class RatingEntity {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  ratingType: string;
  ratings: RatingStarsModel[];
  constructor(data: RatingData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.ratingType = data.ratingType;
    this.ratings = data.ratings;
  }
}

``` 
A entidade RatingEntity é usada para armazenar informações sobre avaliações feitas por clientes. Ela possui campos como "ratingType" que armazena o tipo de avaliação, por exemplo "atendimento" ou "pontualidade", e "ratings" que armazena uma lista de objetos do tipo RatingStarsModel, que possuem a avaliação em si (em forma de estrelas) e uma descrição da avaliação. Esta entidade pode ser usada para armazenar avaliações feitas por clientes para os profissionais/prestadores de serviço e para os serviços oferecidos. Ela pode ser usada para calcular a média de avaliações, para identificar tendências e para fornecer feedback para os profissionais e proprietários.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)