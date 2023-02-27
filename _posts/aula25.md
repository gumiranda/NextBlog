---
title: 'Gerando CRUD de Ride no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-08T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

Nesta aula, você aprenderá como criar as funcionalidades básicas de um CRUD (Create, Read, Update e Delete) para o recurso "Fidelity". O objetivo é que você possa aplicar o mesmo padrão utilizado na criação do CRUD de "Categoria" e assim, possa desenvolver CRUDs para outros recursos da aplicação com facilidade. Serão criadas as seguintes interfaces de repositório:

1. addFidelityRepository
2. loadFidelityRepository
3. loadFidelityByPageRepository
4. deleteFidelityRepository
5. updateFidelityRepository

Além disso, serão criados os seguintes casos de uso:

1. addFidelity
2. loadFidelity
3. loadFidelityByPage
4. deleteFidelity
5. updateFidelity

Você também poderá aplicar as técnicas de validação de dados e tratamento de erros aprendidas nas aulas anteriores. Ao final desta aula, você terá uma base sólida para o desenvolvimento de futuros recursos da aplicação.

```typescript
export type RideData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  driverUserType: string;
  requestId: any;
  origin: any;
  destiny: any;
  status: number;
  distance: number;
  distanceTime: number; //in minutes
  maxCostEstimated: number;
  minCostEstimated: number;
  finalCost: number;
  costDefinedByOwner: number;
  initDate: Date;
  endDateEstimated: Date;
  endDate: Date;
};

export type RidePaginated = {
  rides: RideData[];
  total: number;
};

export class RideEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  requestId: any;
  driverUserType: string;
  origin: any;
  destiny: any;
  status: number;
  distance: number;
  distanceTime: number; //in minutes
  maxCostEstimated: number;
  minCostEstimated: number;
  finalCost: number;
  costDefinedByOwner: number;
  initDate: Date;
  endDateEstimated: Date;
  endDate: Date;
  constructor(data: RideData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.driverUserType = data.driverUserType;
    this.origin = data.origin;
    this.destiny = data.destiny;
    this.status = data.status;
    this.distance = data.distance;
    this.distanceTime = data.distanceTime;
    this.maxCostEstimated = data.maxCostEstimated;
    this.minCostEstimated = data.minCostEstimated;
    this.finalCost = data.finalCost;
    this.costDefinedByOwner = data.costDefinedByOwner;
    this.initDate = data.initDate;
    this.endDateEstimated = data.endDateEstimated;
    this.endDate = data.endDate;
    this.requestId = data.requestId;
  }
}

``` 
A entidade Ride (viagem/corrida) é usada para armazenar informações sobre uma determinada viagem realizada por um usuário, como o usuário que solicitou a viagem (createdById), o tipo de usuário que realizou a viagem (driverUserType), o endereço de origem e destino (origin e destiny), o status da viagem (status), a distância percorrida (distance), o tempo de duração da viagem (distanceTime), o custo estimado máximo e mínimo (maxCostEstimated e minCostEstimated), o custo final (finalCost), o custo definido pelo dono do veículo (costDefinedByOwner), a data de início e fim prevista e real (initDate, endDateEstimated e endDate) e um identificador único para a solicitação (requestId). Essa entidade pode ser usada para rastrear as viagens realizadas e calcular estatísticas e relatórios.

Além disso o foco dessa entidade é armazenar dados relacionados às corridas realizadas por prestadores de serviços a domicílio, como entregadores ou motoristas de aplicativo. Ela guarda informações como o ID do usuário que criou a corrida, o tipo de usuário (motorista), o endereço de origem e destino, o status da corrida, a distância percorrida, o tempo de duração da corrida, o custo estimado e o custo final, entre outros. Essas informações podem ser utilizadas para gerenciar as corridas, calcular estatísticas e faturamento, e fornecer relatórios para os clientes e proprietários dos prestadores de serviços.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)