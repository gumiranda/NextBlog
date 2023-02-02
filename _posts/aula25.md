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
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

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