---
title: 'Gerando CRUD de Recurrence no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-09T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
export type RecurrenceData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  type: number; //0 is weekly 1 is monthly
  accept: boolean;
  appointmentsWasInserted: boolean;
  frequency: number;
  initDate: Date;
  endDate: Date;
  professionalId: string;
  requestId: string;
  clientId: string;
  ownerId: string;
  serviceId: string;
};

export type RecurrencePaginated = {
  recurrences: RecurrenceData[];
  total: number;
};

export class RecurrenceEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  type: number; //0 is weekly 1 is monthly
  accept: boolean;
  appointmentsWasInserted: boolean;
  frequency: number;
  initDate: Date;
  endDate: Date;
  professionalId: string;
  requestId: string;
  clientId: string;
  ownerId: string;
  serviceId: string;
  constructor(data: RecurrenceData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.accept = data.accept;
    this.appointmentsWasInserted = data.appointmentsWasInserted;
    this.frequency = data.frequency;
    this.initDate = data.initDate;
    this.endDate = data.endDate;
    this.professionalId = data.professionalId;
    this.requestId = data.requestId;
    this.clientId = data.clientId;
    this.ownerId = data.ownerId;
    this.serviceId = data.serviceId;
    this.type = data.type;
  }
}

``` 
A classe RecurrenceEntity representa uma entidade de recorrência de agendamentos. Ela é usada para armazenar informações sobre agendamentos que devem ser repetidos com uma certa frequência, como agendamentos semanais ou mensais. Essa entidade contém informações como o tipo de recorrência (semanal ou mensal), a frequência da recorrência, as datas de início e fim da recorrência, o ID do profissional responsável pelo agendamento, o ID do cliente, o ID do proprietário e o ID do serviço. A entidade também contém informações sobre se a recorrência foi aceita e se os agendamentos foram inseridos. Essa entidade é usada para gerenciar recorrências de agendamentos e pode ser usada para automatizar a criação de agendamentos recorrentes e garantir que eles sejam criados de maneira consistente e precisa.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)