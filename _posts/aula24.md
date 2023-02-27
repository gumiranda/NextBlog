---
title: 'Gerando CRUD de Fidelity no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-07T05:35:07.322Z'
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
export type FidelityData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  ownerId: string;
  requestId: string;
  points: number;
  clientId: string;
};

export type FidelityPaginated = {
  fidelitys: FidelityData[];
  total: number;
};

export class FidelityEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  ownerId: string;
  requestId: string;
  points: number;
  clientId: string;
  constructor(data: FidelityData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.ownerId = data.ownerId;
    this.requestId = data.requestId;
    this.clientId = data.clientId;
    this.points = data.points;
  }
}

``` 
A classe FidelityEntity representa a entidade de fidelidade no sistema de agendamento online. Ela contém informações como o ID do criador, nome, status de atividade, data de criação e atualização, ID do proprietário, ID da solicitação, pontos, e ID do cliente. Essa entidade é usada para gerenciar e manter registros dos pontos de fidelidade dos clientes, que podem ser usados para recompensas ou descontos em futuros agendamentos. A classe também possui uma interface de paginação para lidar com a listagem de entidades de fidelidade e o total de entidades retornadas.

Além disso essa entidade pode ser usada para armazenar informações sobre os pontos de fidelidade de um cliente. A cada vez que um cliente realiza um serviço, os pontos correspondentes podem ser adicionados à sua conta de fidelidade. Esses pontos podem então ser usados para descontos em serviços futuros ou para pagamentos parciais ou completos.

Existem várias maneiras de implementar essa funcionalidade. Por exemplo, o proprietário do estabelecimento pode especificar um valor em pontos para cada serviço e, quando um cliente reserva um serviço, os pontos correspondentes são adicionados à sua conta de fidelidade. Ou, o proprietário pode especificar um valor em dinheiro para um certo número de pontos e, quando um cliente tem pontos suficientes, eles podem ser usados para pagar parcial ou completamente por um serviço.

Além disso, a entidade FidelityEntity também pode armazenar informações sobre quais serviços foram pagos com pontos, quem adicionou os pontos à conta do cliente (seja o próprio cliente ou um funcionário), quando os pontos foram adicionados e quando eles expiram. Também pode ser usado para armazenar informações sobre o ID do proprietário do estabelecimento, que pode ser usado para verificar se um cliente tem pontos válidos em uma determinada loja.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)