---
title: 'Gerando CRUD de Account e Appointment no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-06T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
export type AppointmentData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  requestId?: string;
  message?: string;
  service?: string;
  ownerId?: string;
  clientId?: string;
  professionalId?: string;
  serviceId?: string;
  status?: string;
  createdForId?: string;
  read?: boolean;
  cancelled?: boolean;
  push?: boolean;
  email?: boolean;
  initDate?: Date;
  endDate?: Date;
  cancelledAt?: Date | null;
  cancelledBy?: string;
};

export type AppointmentPaginated = {
  appointments: AppointmentData[];
  total: number;
};

export class AppointmentEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  requestId?: string;
  message?: string;
  service?: string;
  ownerId?: string;
  clientId?: string;
  professionalId?: string;
  serviceId?: string;
  status?: string;
  createdForId?: string;
  read?: boolean;
  cancelled?: boolean;
  push?: boolean;
  email?: boolean;
  initDate?: Date;
  endDate?: Date;
  cancelledAt?: Date | null;
  cancelledBy?: string;
  constructor(data: AppointmentData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.requestId = data.requestId;
    this.message = data.message;
    this.serviceId = data.serviceId;
    this.ownerId = data.ownerId;
    this.clientId = data.clientId;
    this.professionalId = data.professionalId;
    this.status = data.status;
    this.createdForId = data.createdForId;
    this.read = data.read;
    this.cancelled = false;
    this.push = data.push;
    this.email = data.email;
    this.initDate = data.initDate;
    this.endDate = data.endDate;
    this.cancelledAt = data.cancelledAt;
    this.cancelledBy = data.cancelledBy;
  }
}
export type OwnerAppointmentInfo = {
  hourEnd1: any;
  hourLunchEnd1?: any;
  hourLunchStart1?: any;
  hourStart1: any;
  hourEnd2?: any;
  hourEnd3?: any;
  hourLunchEnd2?: any;
  hourLunchEnd3?: any;
  hourLunchStart2?: any;
  hourLunchStart3?: any;
  hourStart2?: any;
  hourStart3?: any;
  days1: any;
  days2?: any;
  days3?: any;
};
export type AvailableTimesModelRepository = {
  _id: OwnerAppointmentInfo;
  data: Array<any>;
};
export type QueryAvailableTimesRepository = {
  professionalId: string | undefined;
  endDay: string | undefined;
  initDay: string | undefined;
};
export type QueryAvailableTimes = {
  professionalId: string | null;
  date: string | null;
  serviceId: string | null;
  ownerId: string | null;
};
export type QueryVerifyAvailableTimes = QueryAvailableTimes & {
  initDate: Date | string | null;
  endDate: Date | string | null;
};

``` 
A entidade AppointmentEntity representa um agendamento dentro da API. Ela possui campos que armazenam informações como o id da pessoa que criou o agendamento, o id do cliente, do profissional, do serviço, do estabelecimento, a data de início e fim, entre outros.

Os campos ownerId e professionalId se relacionam com a entidade user e funcionários, respectivamente, pois armazenam o id do proprietário do estabelecimento e o id do profissional responsável pelo atendimento.

A classe AvailableTimesModelRepository representa a estrutura de dados que é usada para armazenar as informações sobre os horários disponíveis de um estabelecimento. Ela possui campos para armazenar informações sobre os dias e horários de funcionamento do estabelecimento e uma lista de horários disponíveis para agendamento.

As classes QueryAvailableTimesRepository, QueryAvailableTimes e QueryVerifyAvailableTimes representam os parâmetros de consulta que são usados para buscar informações sobre horários disponíveis, incluindo o id do profissional, a data inicial e final, o id do serviço e do estabelecimento.

```typescript
export type AccountData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken: string;
  expiresAt?: string;
};

export type AccountPaginated = {
  accounts: AccountData[];
  total: number;
};

export class AccountEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken: string;
  expiresAt?: string;
  constructor(data: AccountData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.refreshToken = data.refreshToken;
    this.expiresAt = data.expiresAt;
    this.active = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

``` 
Este código representa uma entidade de "Account" (conta) para uma API de agendamento online. A entidade contém informações básicas sobre uma conta, como quem a criou, o nome da conta, se ela está ativa ou não, data de criação e atualização, além de informações de autenticação, como o token de atualização e a data de expiração. A classe "AccountEntity" é usada para criar instâncias da entidade, que podem ser usadas para salvar e recuperar informações de conta de um banco de dados. A "AccountPaginated" é um tipo de dado que contém uma lista de contas e o total de contas.

Essas informações são importantes para implementar o mecanismo de segurança JWT (JSON Web Token) e garantir que somente usuários autenticados possam acessar recursos protegidos na API. Quando um usuário se autentica, é gerado um token de acesso (access token) com um tempo de expiração curto, e um token de atualização com tempo de expiração mais longo. Quando o token de acesso expira, o usuário pode usar o token de atualização para obter um novo token de acesso sem precisar se autenticar novamente. Dessa forma, a entidade Account garante que somente usuários com tokens válidos possam acessar recursos protegidos na API.

Mais pra frente na aula de JWT vocês verão isso com mais detalhes.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)