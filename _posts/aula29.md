---
title: 'Gerando CRUD de RatingResult no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-12T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, você aprenderá como criar as funcionalidades básicas de um CRUD (Create, Read, Update e Delete) para o recurso "RatingResult". O objetivo é que você possa aplicar o mesmo padrão utilizado na criação do CRUD de "Categoria" e assim, possa desenvolver CRUDs para outros recursos da aplicação com facilidade. Serão criadas as seguintes interfaces de repositório:

1. addRatingResultRepository
2. loadRatingResultRepository
3. loadRatingResultByPageRepository
4. deleteRatingResultRepository
5. updateRatingResultRepository

Além disso, serão criados os seguintes casos de uso:

1. addRatingResult
2. loadRatingResult
3. loadRatingResultByPage
4. deleteRatingResult
5. updateRatingResult

Você também poderá aplicar as técnicas de validação de dados e tratamento de erros aprendidas nas aulas anteriores. Ao final desta aula, você terá uma base sólida para o desenvolvimento de futuros recursos da aplicação.
```typescript
type RatingResultStarsModel = {
  rating: string;
  stars: number;
  comment: any;
  count: number;
  percent: number;
};
export type RatingResultData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  ratingId: string;
  rating?: string;
  comment?: string;
  requestId: string;
  ratingType: string;
  ratingForId: string;
  ratings: RatingResultStarsModel[];
};
export type RatingResultAverage = {
  ratingId: string;
  ratingType: string;
  createdAt: Date;
  starsAvg: number;
  ratings: Array<{
    count: number;
    stars: number;
    percent: number;
    rating: string;
    comments: any;
  }>;
};

export type RatingResultPaginated = {
  ratingResults: RatingResultData[];
  total: number;
};

export class RatingResultEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  ratingId: string;
  rating?: string;
  comment?: string;
  requestId: string;
  ratingType: string;
  ratingForId: string;
  ratings: RatingResultStarsModel[];
  constructor(data: RatingResultData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.ratingId = data.ratingId;
    this.requestId = data.requestId;
    this.ratingType = data.ratingType;
    this.ratingForId = data.ratingForId;
    this.ratings = data.ratings;
    this.rating = data.rating;
    this.comment = data.comment;
  }
}

``` 
Este código representa uma entidade de "RatingResult" que é utilizada para armazenar os resultados de avaliações. Ela possui informações como o ID da avaliação, o tipo de avaliação, o ID da pessoa ou empresa que está sendo avaliada, os comentários feitos e as estrelas dadas para cada tipo de avaliação. Essa entidade também pode ser utilizada para calcular a média de estrelas de uma avaliação e as porcentagens de cada tipo de avaliação. Isso pode ser útil para fornecer uma visão geral das avaliações de um determinado prestador de serviços ou empresa.

A classe RatingResultEntity é usada para armazenar os resultados de avaliações específicas, enquanto a classe RatingEntity é usada para armazenar os tipos de avaliação disponíveis. A RatingResultEntity tem uma relação de n:1 com a RatingEntity, onde cada resultado de avaliação está associado a um tipo específico de avaliação (armazenado na classe RatingEntity). Por exemplo, se um cliente avaliar o atendimento de um profissional, um novo resultado de avaliação seria criado e associado ao tipo de avaliação "atendimento" armazenado na classe RatingEntity.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)