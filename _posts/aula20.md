---
title: 'Gerando CRUD de Service no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-03T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
export type ServiceData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  categoryId: string;
  duration: number;
  description?: string;
  productsQuantityNeeded?: number;
  productId?: string;
  promotionalPrice?: number;
  price?: number;
  finalPrice?: number;
  comission?: number;
  havePromotionalPrice?: boolean;
  hasFidelityGenerator?: boolean;
  generateHowManyPoints?: number;
  appointmentsTotal?: number;
  canPayWithFidelityPoints?: boolean;
  howManyPointsIsNeededToRescue?: number;
};

export type ServicePaginated = {
  services: ServiceData[];
  total: number;
};

export class ServiceEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  categoryId: string;
  duration: number;
  description?: string;
  productsQuantityNeeded?: number;
  productId?: string;
  promotionalPrice?: number;
  price?: number;
  finalPrice?: number;
  comission?: number;
  havePromotionalPrice?: boolean;
  hasFidelityGenerator?: boolean;
  generateHowManyPoints?: number;
  appointmentsTotal?: number;
  canPayWithFidelityPoints?: boolean;
  howManyPointsIsNeededToRescue?: number;
  constructor(data: ServiceData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.name = data.name;
    this.description = data.description;
    this.createdById = data.createdById;
    this.productsQuantityNeeded = data.productsQuantityNeeded;
    this.productId = data.productId;
    this.promotionalPrice = data.promotionalPrice;
    this.price = data.price;
    this.finalPrice = data.finalPrice;
    this.comission = data.comission;
    this.havePromotionalPrice = data.havePromotionalPrice;
    this.hasFidelityGenerator = data.hasFidelityGenerator;
    this.appointmentsTotal = 0;
    this.canPayWithFidelityPoints = data.canPayWithFidelityPoints;
    this.categoryId = data.categoryId;
    this.duration = data.duration;
  }
}

``` 
A entidade Service representa os serviços oferecidos na aplicação de agendamentos online. Ele contém informações como o nome do serviço, a categoria a qual pertence, a duração do serviço, descrição, preço, comissão, preço promocional e outras informações relevantes para o serviço.

Além disso, a entidade Service também pode conter informações sobre a quantidade de produtos necessários para realizar o serviço, se há preço promocional ou se o serviço gera pontos de fidelidade para o cliente e outras informações de gerenciamento de fidelidade.

Essas informações são usadas para exibir e gerenciar os serviços disponíveis na aplicação e permitir que os clientes pesquisem e agendem serviços. Além disso, essas informações também podem ser usadas para fornecer relatórios e estatísticas sobre os serviços mais populares e para garantir que os serviços oferecidos estejam atualizados e precisos.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)