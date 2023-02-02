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
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

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