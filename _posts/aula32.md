---
title: 'Gerando CRUD para Request no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-15T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

Nesta aula, você aprenderá como criar as funcionalidades básicas de um CRUD (Create, Read, Update e Delete) para o recurso "Request". O objetivo é que você possa aplicar o mesmo padrão utilizado na criação do CRUD de "Categoria" e assim, possa desenvolver CRUDs para outros recursos da aplicação com facilidade. Serão criadas as seguintes interfaces de repositório:

1. addRequestRepository
2. loadRequestRepository
3. loadRequestByPageRepository
4. deleteRequestRepository
5. updateRequestRepository

Além disso, serão criados os seguintes casos de uso:

1. addRequest
2. loadRequest
3. loadRequestByPage
4. deleteRequest
5. updateRequest

Você também poderá aplicar as técnicas de validação de dados e tratamento de erros aprendidas nas aulas anteriores. Ao final desta aula, você terá uma base sólida para o desenvolvimento de futuros recursos da aplicação.

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

1. createdById: ID do usuário que criou a requisição.
2. name: Nome da requisição.
3. active: Indica se a requisição está ativa ou não. Valor padrão é "false".
4. createdAt: Data e hora em que a requisição foi criada. Valor padrão é a data e hora atuais.
5. updatedAt: Data e hora em que a requisição foi atualizada. Valor padrão é a data e hora atuais.
6. message: Mensagem associada à requisição.
7. serviceId: ID do serviço relacionado à requisição.
8. ownerId: ID do proprietário relacionado à requisição.
9. clientId: ID do cliente relacionado à requisição.
10. clientUserId: ID do usuário do cliente relacionado à requisição.
11. professionalId: ID do profissional relacionado à requisição.
12. status: Status da requisição. O valor padrão é 0.
13. createdForId: ID da pessoa para quem a requisição foi criada.
14. updatedById: ID do usuário que atualizou a requisição. O valor padrão é "null".
15. updatedByRole: Papel do usuário que atualizou a requisição. O valor padrão é "null".
16. read: Indica se a requisição foi lida ou não. Valor padrão é "false".
17. push: Indica se uma notificação push deve ser enviada para o cliente quando a requisição for atualizada.
18. email: Indica se um e-mail deve ser enviado para o cliente quando a requisição for atualizada.
19. haveDelivery: Indica se a requisição tem entrega associada.
20. haveRecurrence: Indica se a requisição tem recorrência associada.
21. haveFidelity: Indica se a requisição tem programa de fidelidade associado.
22. haveRide: Indica se a requisição tem transporte associado.
23. fidelity: Dados do programa de fidelidade associado à requisição.
24. ride: Dados do transporte associado à requisição.
25. recurrence: Dados da recorrência associada à requisição.
26. order: Dados da ordem associada à requisição.
27. initDate: Data inicial da requisição.
28. endDate: Data final da requisição.
29. cancelledAt: Data e hora em que a requisição foi cancelada. O valor padrão é "null".


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)