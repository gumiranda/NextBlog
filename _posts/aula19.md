---
title: 'Gerando CRUD de User no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-02T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, você aprenderá como criar as funcionalidades básicas de um CRUD (Create, Read, Update e Delete) para o recurso "User". O objetivo é que você possa aplicar o mesmo padrão utilizado na criação do CRUD de "Categoria" e assim, possa desenvolver CRUDs para outros recursos da aplicação com facilidade. Serão criadas as seguintes interfaces de repositório:

1. addUserRepository
2. loadUserRepository
3. loadUserByPageRepository
4. deleteUserRepository
5. updateUserRepository

Além disso, serão criados os seguintes casos de uso:

1. addUser
2. loadUser
3. loadUserByPage
4. deleteUser
5. updateUser

Você também poderá aplicar as técnicas de validação de dados e tratamento de erros aprendidas nas aulas anteriores. Ao final desta aula, você terá uma base sólida para o desenvolvimento de futuros recursos da aplicação.

A entidade User é usada para representar os usuários da aplicação de agendamento online. Ela possui atributos que representam as informações importantes de um usuário, como nome, email, senha, endereço, plano, e outras informações relevantes.

```typescript
export type UserData = {
  _id?: string;
  createdById: string;
  name: string;
  email: string;
  role: string;
  confirmedEmail?: boolean;
  sendedEmail?: boolean;
  password: string;
  cardId?: string;
  ownerId?: string;
  myOwnerId?: string;
  payDay?: string;
  photoUrl?: string;
  cpf?: string;
  phone?: string;
  coord?: any;
  distance?: number;
  appointmentsTotal?: number;
  plan?: string;
  cnpj?: string;
  city?: string;
  uf?: string;
  address?: string;
  complement?: string;
  photoId?: string;
  cash?: boolean;
  creditcard?: boolean;
  debitcard?: boolean;
  transferbank?: boolean;
  cheque?: boolean;
  pix?: boolean;
  nextPlan?: string;
  addresses?: any;
  clientId?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserPaginated = {
  users: UserData[];
  total: number;
};

export class UserEntity {
  _id?: string;
  createdById: string;
  name: string;
  email: string;
  role: string;
  confirmedEmail?: boolean;
  sendedEmail?: boolean;
  password: string;
  cardId?: string;
  ownerId?: string;
  myOwnerId?: string;
  payDay?: string;
  photoUrl?: string;
  cpf?: string;
  phone?: string;
  coord?: any;
  distance?: number;
  appointmentsTotal?: number;
  plan?: string;
  cnpj?: string;
  city?: string;
  uf?: string;
  address?: string;
  complement?: string;
  photoId?: string;
  cash?: boolean;
  creditcard?: boolean;
  debitcard?: boolean;
  transferbank?: boolean;
  cheque?: boolean;
  pix?: boolean;
  nextPlan?: string;
  addresses?: any;
  clientId?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(data: UserData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.confirmedEmail = false;
    this.sendedEmail = false;
    this.password = data.password;
    this.cardId = data.cardId;
    this.ownerId = data.ownerId;
    this.myOwnerId = data.myOwnerId;
    this.payDay = data.payDay;
    this.photoUrl = data.photoUrl;
    this.cpf = data.cpf;
    this.phone = data.phone;
    this.coord = data.coord;
    this.distance = data.distance;
    this.appointmentsTotal = 0;
    this.plan = data.plan;
    this.cnpj = data.cnpj;
    this.city = data.city;
    this.uf = data.uf;
    this.address = data.address;
    this.complement = data.complement;
    this.photoId = data.photoId;
    this.cash = data.cash;
    this.creditcard = data.creditcard;
    this.debitcard = data.debitcard;
    this.transferbank = data.transferbank;
    this.cheque = data.cheque;
    this.pix = data.pix;
    this.nextPlan = data.nextPlan;
    this.addresses = data.addresses;
    this.clientId = data.clientId;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
``` 

Este código contém três partes: UserData, UserPaginated e UserEntity.

1. UserData é um tipo que representa as informações de um usuário, incluindo informações como nome, email, senha, endereço, plano e muito mais.

2. UserPaginated é um tipo que representa uma lista de usuários e o total de usuários.

3. UserEntity é uma classe que representa uma entidade de usuário e é instanciada com um objeto UserData. A classe possui uma função construtora que atribui os valores do objeto UserData aos atributos da entidade de usuário.

A classe UserEntity é usada para definir e implementar a entidade de usuário. Ela possui vários atributos que representam as informações de um usuário, como nome, email, senha, endereço, plano e muito mais. A classe também possui uma função construtora que é chamada quando uma nova instância é criada, a qual atribui os valores do objeto UserData passado como entrada aos atributos da entidade de usuário. Essa classe é usada para modelar e representar os dados de um usuário em sua aplicação.

Na aplicação de agendamento online, os usuários podem ser divididos em diferentes tipos como prestadores de serviços e clientes. Cada tipo de usuário pode ter permissões diferentes e acessar funcionalidades diferentes na aplicação. A classe UserEntity contém um atributo role que pode ser usado para identificar o tipo de usuário.

Os clientes podem usar a aplicação para procurar e agendar serviços, enquanto os prestadores de serviços podem usar a aplicação para gerenciar seus agendamentos, configurar suas disponibilidades e atualizar suas informações de perfil. A entidade User pode ser usada para autenticar e autorizar os usuários para acessar diferentes funcionalidades da aplicação.

Além disso, a entidadeUser também pode ser usada para armazenar informações adicionais sobre os usuários, como endereço, telefone, informações de pagamento e outras informações relevantes. Isso pode ser útil para fornecer uma melhor experiência aos usuários, como sugerir serviços próximos ao endereço de um cliente ou permitir que os prestadores de serviços atualizem suas informações de contato facilmente.

A entidade User também pode ser usada para gerenciar o status de confirmação de email, sendedEmail, e status de ativação do usuário, para garantir que somente usuários autenticados e ativos possam acessar a aplicação.

Em resumo, a entidade User é uma peça importante na aplicação de agendamento online, pois é usada para representar e gerenciar informações sobre os usuários, incluindo suas permissões, informações de contato, e status de ativação. Isso permite que a aplicação forneça uma experiência personalizada e segura para cada usuário.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)