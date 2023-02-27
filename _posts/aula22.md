---
title: 'Gerando CRUD de Owner no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-05T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

Nesta aula, você aprenderá como criar as funcionalidades básicas de um CRUD (Create, Read, Update e Delete) para o recurso "Owner". O objetivo é que você possa aplicar o mesmo padrão utilizado na criação do CRUD de "Categoria" e assim, possa desenvolver CRUDs para outros recursos da aplicação com facilidade. Serão criadas as seguintes interfaces de repositório:

1. addOwnerRepository
2. loadOwnerRepository
3. loadOwnerByPageRepository
4. deleteOwnerRepository
5. updateOwnerRepository

Além disso, serão criados os seguintes casos de uso:

1. addOwner
2. loadOwner
3. loadOwnerByPage
4. deleteOwner
5. updateOwner

Você também poderá aplicar as técnicas de validação de dados e tratamento de erros aprendidas nas aulas anteriores. Ao final desta aula, você terá uma base sólida para o desenvolvimento de futuros recursos da aplicação.

```typescript
export type OwnerData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  appointmentsTotal: number;
  ratingsTotal: number;
  haveDelivery: boolean;
  typeTax: string; //fixed or bytime
  costByTimeDriving?: number;
  fidelityTaxPoints?: number; //percentage of service
  fixedTax?: number;
  minimumTimeForReSchedule?: number; //in minutes
  description?: string;
  days1?: any;
  days2?: any;
  hourStart1?: string;
  hourStart2?: string;
  hourEnd1?: string;
  hourEnd2?: string;
  hourLunchStart1?: string;
  hourLunchEnd1?: string;
  hourLunchStart2?: string;
  hourLunchEnd2?: string;
  days3?: any;
  days4?: any;
  hourStart3?: string;
  hourStart4?: string;
  hourEnd3?: string;
  hourEnd4?: string;
  hourLunchStart3?: string;
  hourLunchEnd3?: string;
  hourLunchStart4?: string;
  hourLunchEnd4?: string;
};

export type OwnerPaginated = {
  owners: OwnerData[];
  total: number;
};

export class OwnerEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  appointmentsTotal: number;
  ratingsTotal: number;
  haveDelivery: boolean;
  typeTax: string; //fixed or bytime
  costByTimeDriving?: number;
  fidelityTaxPoints?: number; //percentage of service
  fixedTax?: number;
  minimumTimeForReSchedule?: number; //in minutes
  description?: string;
  days1?: any;
  days2?: any;
  hourStart1?: string;
  hourStart2?: string;
  hourEnd1?: string;
  hourEnd2?: string;
  hourLunchStart1?: string;
  hourLunchEnd1?: string;
  hourLunchStart2?: string;
  hourLunchEnd2?: string;
  days3?: any;
  days4?: any;
  hourStart3?: string;
  hourStart4?: string;
  hourEnd3?: string;
  hourEnd4?: string;
  hourLunchStart3?: string;
  hourLunchEnd3?: string;
  hourLunchStart4?: string;
  hourLunchEnd4?: string;
  constructor(data: OwnerData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.appointmentsTotal = 0;
    this.ratingsTotal = 0;
    this.haveDelivery = data.haveDelivery;
    this.typeTax = data.typeTax;
    this.costByTimeDriving = data.costByTimeDriving;
    this.fidelityTaxPoints = data.fidelityTaxPoints;
    this.fixedTax = data.fixedTax;
    this.minimumTimeForReSchedule = data.minimumTimeForReSchedule;
    this.description = data.description;
    this.days1 = data.days1;
    this.days2 = data.days2;
    this.hourStart1 = data.hourStart1;
    this.hourStart2 = data.hourStart2;
    this.hourEnd1 = data.hourEnd1;
    this.hourEnd2 = data.hourEnd2;
    this.hourLunchStart1 = data.hourLunchStart1;
    this.hourLunchEnd1 = data.hourLunchEnd1;
    this.hourLunchStart2 = data.hourLunchStart2;
    this.hourLunchEnd2 = data.hourLunchEnd2;
    this.days3 = data.days3;
    this.days4 = data.days4;
    this.hourStart3 = data.hourStart3;
    this.hourStart4 = data.hourStart4;
    this.hourEnd3 = data.hourEnd3;
    this.hourEnd4 = data.hourEnd4;
    this.hourLunchStart3 = data.hourLunchStart3;
    this.hourLunchEnd3 = data.hourLunchEnd3;
    this.hourLunchStart4 = data.hourLunchStart4;
    this.hourLunchEnd4 = data.hourLunchEnd4;
  }
}
``` 
A entidade Owner representa os proprietários de estabelecimentos que oferecem serviços de agendamento online. Ela contém informações sobre o nome do estabelecimento, se ele oferece entrega, tipo de taxa cobrada (fixa ou por tempo), custo por tempo de deslocamento, porcentagem de taxa de fidelidade, taxa fixa, tempo mínimo para remarcação de agendamentos, descrição, dias e horários de funcionamento, entre outros. Essa entidade é utilizada para gerenciar os estabelecimentos cadastrados na plataforma e fornecer informações sobre eles aos usuários.

O campo "createdById" guarda o ID do usuário que criou a entidade Owner, provavelmente o próprio proprietário da empresa. O campo "userId" guarda o ID do usuário que é o responsável pela conta e pode gerenciar a empresa. E os funcionários (employees) são registrados como "createdById" ou "userId" dependendo do caso.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)