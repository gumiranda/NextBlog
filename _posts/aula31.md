---
title: 'Gerando CRUD para Request no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-20T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
import { FidelityData } from "@/slices/fidelity/entities";
import { OrderData } from "@/slices/order/entities";
import { RecurrenceData } from "@/slices/recurrence/entities";
import { RideData } from "@/slices/ride/entities";

export type RequestData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  message: string;
  serviceId: string;
  ownerId: string;
  clientId: string;
  clientUserId?: string;
  professionalId: string;
  status: number;
  createdForId: string;
  updatedById?: string | null;
  updatedByRole?: string | null;
  read: boolean;
  push: boolean;
  email: boolean;
  haveDelivery?: boolean;
  haveRecurrence?: boolean;
  haveFidelity?: boolean;
  haveRide?: boolean;
  fidelity?: FidelityData;
  ride?: RideData;
  recurrence?: RecurrenceData;
  order?: OrderData;
  initDate: string;
  endDate: string;
  cancelledAt?: Date | null;
};

export type RequestPaginated = {
  requests: RequestData[];
  total: number;
};

export class RequestEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  message: string;
  serviceId: string;
  ownerId: string;
  clientId: string;
  clientUserId?: string;
  professionalId: string;
  status: number;
  createdForId: string;
  updatedById?: string | null;
  updatedByRole?: string | null;
  read: boolean;
  push: boolean;
  email: boolean;
  haveDelivery?: boolean;
  haveRecurrence?: boolean;
  haveFidelity?: boolean;
  haveRide?: boolean;
  fidelity?: FidelityData;
  ride?: RideData;
  recurrence?: RecurrenceData;
  order?: OrderData;
  initDate: string;
  endDate: string;
  cancelledAt?: Date | null;
  constructor(data: RequestData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.message = data.message;
    this.serviceId = data.serviceId;
    this.ownerId = data.ownerId;
    this.clientId = data.clientId;
    this.clientUserId = data.clientUserId;
    this.professionalId = data.professionalId;
    this.status = 0;
    this.createdForId = data.createdForId;
    this.read = false;
    this.push = data.push;
    this.email = data.email;
    this.haveDelivery = data.haveDelivery;
    this.haveRecurrence = data.haveRecurrence;
    this.haveFidelity = data.haveFidelity;
    this.haveRide = data.haveRide;
    this.initDate = data.initDate;
    this.endDate = data.endDate;
    this.cancelledAt = data.cancelledAt;
    this.fidelity = data.fidelity;
    this.recurrence = data.recurrence;
    this.order = data.order;
    this.ride = data.ride;
    this.updatedById = null;
    this.updatedByRole = null;
  }
}
``` 
O uso da classe RequestEntity é importante na aplicação pois ela representa a entidade de requisição do sistema. Ela contém informações como os ids de quem criou e atualizou a requisição, informações de contato, status, data de criação e atualização, entre outros. Essas informações são usadas em diferentes partes do sistema, como para mostrar ao usuário as requisições pendentes ou para manter registro das requisições realizadas. A classe também possibilita que sejam incluídos outros objetos como FidelityData, RecurrenceData, RideData e OrderData, que podem ser usados para armazenar informações adicionais relacionadas à requisição.

createdById: ID do usuário que criou a requisição.
name: Nome da requisição.
active: Indica se a requisição está ativa ou não. Valor padrão é "false".
createdAt: Data e hora em que a requisição foi criada. Valor padrão é a data e hora atuais.
updatedAt: Data e hora em que a requisição foi atualizada. Valor padrão é a data e hora atuais.
message: Mensagem associada à requisição.
serviceId: ID do serviço relacionado à requisição.
ownerId: ID do proprietário relacionado à requisição.
clientId: ID do cliente relacionado à requisição.
clientUserId: ID do usuário do cliente relacionado à requisição.
professionalId: ID do profissional relacionado à requisição.
status: Status da requisição. O valor padrão é 0.
createdForId: ID da pessoa para quem a requisição foi criada.
updatedById: ID do usuário que atualizou a requisição. O valor padrão é "null".
updatedByRole: Papel do usuário que atualizou a requisição. O valor padrão é "null".
read: Indica se a requisição foi lida ou não. Valor padrão é "false".
push: Indica se uma notificação push deve ser enviada para o cliente quando a requisição for atualizada.
email: Indica se um e-mail deve ser enviado para o cliente quando a requisição for atualizada.
haveDelivery: Indica se a requisição tem entrega associada.
haveRecurrence: Indica se a requisição tem recorrência associada.
haveFidelity: Indica se a requisição tem programa de fidelidade associado.
haveRide: Indica se a requisição tem transporte associado.
fidelity: Dados do programa de fidelidade associado à requisição.
ride: Dados do transporte associado à requisição.
recurrence: Dados da recorrência associada à requisição.
order: Dados da ordem associada à requisição.
initDate: Data inicial da requisição.
endDate: Data final da requisição.
cancelledAt: Data e hora em que a requisição foi cancelada. O valor padrão é "null".


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)