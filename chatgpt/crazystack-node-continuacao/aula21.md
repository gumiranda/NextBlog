---
title: 'Gerando CRUD de Product e Client no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubclientcontent.com/u/13774579?v=4'
date: '2022-06-04T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubclientcontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubclientcontent.com/u/13774579?v=4'
---
Nesta aula, você aprenderá como criar as funcionalidades básicas de um CRUD (Create, Read, Update e Delete) para o recurso "Client" e "Product". O objetivo é que você possa aplicar o mesmo padrão utilizado na criação do CRUD de "Categoria" e assim, possa desenvolver CRUDs para outros recursos da aplicação com facilidade. Serão criadas as seguintes interfaces de repositório:

1. addClientRepository
2. loadClientRepository
3. loadClientByPageRepository
4. deleteClientRepository
5. updateClientRepository

Além disso, serão criados os seguintes casos de uso:

1. addClient
2. loadClient
3. loadClientByPage
4. deleteClient
5. updateClient

Você também poderá aplicar as técnicas de validação de dados e tratamento de erros aprendidas nas aulas anteriores. Ao final desta aula, você terá uma base sólida para o desenvolvimento de futuros recursos da aplicação.

```typescript
export type ClientData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  cpf?: string;
  phone?: string;
  clientId: string;
  ownerId: string;
  birthDate?: Date;
  appointmentsTotal?: number;
};

export type ClientPaginated = {
  clients: ClientData[];
  total: number;
};

export class ClientEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  cpf?: string;
  phone?: string;
  clientId: string;
  ownerId: string;
  birthDate?: Date;
  appointmentsTotal?: number;
  constructor(data: ClientData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.phone = data.phone;
    this.cpf = data.cpf;
    this.clientId = data.clientId;
    this.ownerId = data.ownerId;
    this.birthDate = data.birthDate;
    this.appointmentsTotal = 0;
  }
}

```
A entidade "Client" representa um cliente que pode ser cadastrado na API de agendamentos online. Essa entidade tem informações como o nome do cliente, se ele está ativo, a data de criação e atualização, CPF, telefone, ID do usuário dono do cliente, ID do dono, data de nascimento e total de compromissos. 

A classe "ClientEntity" é uma classe construtora que permite criar instâncias da entidade com base em um objeto do tipo "ClientData". Além disso, a entidade "ClientPaginated" é um tipo que permite paginar os clientes retornados na API e contém o array de clientes e o total de clientes retornados.

A entidade cliente (ClientEntity) tem uma propriedade chamada "clientId" que armazena o ID do usuário (ClientEntity) relacionado a esse cliente. Isso significa que cada cliente tem uma referência para o usuário relacionado a ele. Essa relação é criada quando um usuário é cadastrado na aplicação e é associado a um cliente específico. E também tem a propriedade "ownerId" que armazena o ID do estabelecimento onde esse cliente comprou.

A entidade ClientData representa os dados de um cliente na API de agendamentos online. Cada campo representa uma informação específica sobre o cliente. Alguns dos campos incluem:

1. _id: um identificador único gerado pelo banco de dados para o cliente.

2. createdById: o ID do usuário que criou o cliente.

3. name: o nome do cliente.

4. active: indica se o cliente está ativo ou inativo.

5. createdAt: a data em que o cliente foi criado.

6. updatedAt: a data em que o cliente foi atualizado pela última vez.

7. cpf: o CPF do cliente.

8. phone: o número de telefone do cliente.

9. clientId: o ID do usuário associado ao cliente.

10. ownerId: o ID do proprietário do cliente.

11. birthDate: a data de nascimento do cliente.

12. appointmentsTotal: a quantidade total de compromissos do cliente.

Essa entidade se relaciona com a entidade ClientData porque o campo clientId armazena o ID do usuário associado ao cliente. Isso permite que a API faça consultas para recuperar informações do usuário relacionado ao cliente. E o campo ownerId armazena o ID do profissional proprietário do cliente.

```typescript
export type ProductData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  quantity: number;
};

export type ProductPaginated = {
  products: ProductData[];
  total: number;
};

export class ProductEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  quantity: number;
  constructor(data: ProductData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.quantity = data.quantity;
  }
}
``` 
A entidade "Product" representa um produto na API de agendamentos online. Ela tem diversos campos, como:

1. createdById: ID do usuário que criou o produto.
2. name: nome do produto.
3. active: indica se o produto está ativo ou não.
4. createdAt: data em que o produto foi criado.
5. updatedAt: data em que o produto foi atualizado pela última vez.
6. quantity: quantidade do produto.

A entidade "ProductEntity" é uma classe que representa esses dados, e é criada a partir de um objeto do tipo "ProductData". Ela possui métodos construtores que permitem criar uma instância dessa entidade a partir de um objeto "ProductData".

A entidade Product relaciona-se com a entidade Service porque pode ser necessário para realizar um determinado serviço uma quantidade específica de um produto. O campo 'productId' na entidade Service indica qual produto é necessário para realizar o serviço e o campo 'productsQuantityNeeded' indica a quantidade necessária desse produto. A entidade Product também armazena informações sobre a quantidade disponível de cada produto, que pode ser utilizada para verificar se a quantidade necessária está disponível antes de agendar o serviço.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)