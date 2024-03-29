---
title: 'Gerando CRUD de Order no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-10T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, você aprenderá como criar as funcionalidades básicas de um CRUD (Create, Read, Update e Delete) para o recurso "Order". O objetivo é que você possa aplicar o mesmo padrão utilizado na criação do CRUD de "Categoria" e assim, possa desenvolver CRUDs para outros recursos da aplicação com facilidade. Serão criadas as seguintes interfaces de repositório:

1. addOrderRepository
2. loadOrderRepository
3. loadOrderByPageRepository
4. deleteOrderRepository
5. updateOrderRepository

Além disso, serão criados os seguintes casos de uso:

1. addOrder
2. loadOrder
3. loadOrderByPage
4. deleteOrder
5. updateOrder

Você também poderá aplicar as técnicas de validação de dados e tratamento de erros aprendidas nas aulas anteriores. Ao final desta aula, você terá uma base sólida para o desenvolvimento de futuros recursos da aplicação.

```typescript
export type OrderData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  percentageAdopted?: number;
  paymentForm?: string;
  orderPaidByClient?: boolean;
  comissionPaidByOwner?: boolean;
  comissionValue?: number;
  totalValue?: number;
  professionalId?: string;
  ownerId?: string;
  requestId?: string;
  clientId?: string;
  extraCost?: number;
  normalCost?: number;
  haveFidelity?: boolean;
  haveDelivery?: boolean;
  pointsUsed?: number;
  appointmentDate?: Date;
};

export type OrderPaginated = {
  orders: OrderData[];
  total: number;
};

export class OrderEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  percentageAdopted?: number;
  paymentForm?: string;
  orderPaidByClient?: boolean;
  comissionPaidByOwner?: boolean;
  comissionValue?: number;
  totalValue?: number;
  professionalId?: string;
  ownerId?: string;
  requestId?: string;
  clientId?: string;
  extraCost?: number;
  normalCost?: number;
  haveFidelity?: boolean;
  haveDelivery?: boolean;
  pointsUsed?: number;
  appointmentDate?: Date;
  constructor(data: OrderData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.percentageAdopted = data.percentageAdopted;
    this.paymentForm = data.paymentForm;
    this.orderPaidByClient = data.orderPaidByClient;
    this.comissionPaidByOwner = data.comissionPaidByOwner;
    this.comissionValue = data.comissionValue;
    this.totalValue = data.totalValue;
    this.professionalId = data.professionalId;
    this.ownerId = data.ownerId;
    this.requestId = data.requestId;
    this.clientId = data.clientId;
    this.extraCost = data.extraCost;
    this.normalCost = data.normalCost;
    this.haveFidelity = data.haveFidelity;
    this.haveDelivery = data.haveDelivery;
    this.pointsUsed = data.pointsUsed;
    this.appointmentDate = data.appointmentDate;
  }
}

``` 
A entidade OrderEntity é usada para armazenar informações relacionadas a uma ordem de serviço em um sistema de agendamento online. Ela contém informações como o id do usuário que criou a ordem, o formato de pagamento escolhido, se a ordem foi paga pelo cliente, se a comissão foi paga pelo proprietário, o valor total da ordem, o id do profissional responsável, o id do dono do estabelecimento, o id do cliente, o custo adicional, o custo normal, se há fidelidade e se há entrega, os pontos usados, e a data de compromisso. Essa entidade pode ser usada para rastrear e gerenciar informações sobre as ordens de serviço em um sistema de agendamento online.

A entidade OrderEntity é utilizada para armazenar informações sobre uma ordem realizada no sistema de agendamento online. Ela é criada quando uma solicitação de agendamento é aceita e o cliente efetiva o pagamento. Essa entidade armazena informações como o formato de pagamento utilizado, se o pagamento foi realizado pelo cliente, se a comissão foi paga pelo proprietário, o valor total da ordem, entre outros. Ela também guarda informações sobre o uso de pontos fidelidade e a entrega do serviço. Ela é utilizada para controlar o fluxo de pagamento e garantir que o sistema esteja sempre atualizado com as últimas informações sobre os pedidos realizados.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)