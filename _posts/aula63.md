---
title: 'Implementando Cadastro com o SignUpController no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-20T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Bem-vindo à aula de Implementação do Cadastro com o SignUpController! Neste curso, vamos aprender a implementar uma rota de cadastro para a nossa aplicação. Para isso, vamos criar um controlador específico para gerenciar essa rota, chamado de SignUpController.

Começaremos pela criação das entidades que serão utilizadas no nosso processo de cadastro, como Usuário e Dados do Usuário. Em seguida, criaremos as validações necessárias para garantir a integridade dos dados que serão enviados na requisição.

Finalmente, implementaremos o SignUpController, que será responsável por realizar as validações, criar as entidades e salvar os dados no banco de dados. Além disso, vamos aprender como tratar erros e retornar mensagens apropriadas ao cliente.

Esta aula é importante para entender como gerenciar a entrada de dados em uma aplicação e como implementar uma rota de cadastro de forma segura e confiável. Vamos começar?

Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
import {
  Authentication,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  forbidden,
  unauthorized,
  addDays,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddUser, LoadUser } from "@/slices/user/useCases";
import { AddAccount } from "@/slices/account/useCases";
import { EmailInUseError, InvalidParamError } from "@/application/errors";
import emailValidator from "deep-email-validator";
import { env } from "@/application/infra";

export class SignupController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addUser: AddUser,
    private readonly loadUser: LoadUser,
    private readonly authentication: Authentication,
    private readonly addAccount: AddAccount
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { email, password } = httpRequest?.body;
    if (env.environment !== "test") {
      const { validators = null } = (await emailValidator(email)) || {};
      const {
        regex = null,
        typo = null,
        disposable = null,
        smtp = null,
        mx = null,
      } = validators || {};
      if (
        !regex?.valid ||
        !typo?.valid ||
        !disposable?.valid ||
        (!smtp?.valid && smtp?.reason !== "Timeout") ||
        !mx?.valid
      ) {
        return badRequest([new InvalidParamError("email")]);
      }
    }
    const userExists = await this.loadUser({
      fields: { email },
      options: { projection: { password: 0 } },
    });
    if (userExists) {
      return forbidden(new EmailInUseError());
    }
    delete httpRequest?.body?.passwordConfirmation;
    const userCreated = await this.addUser(httpRequest?.body);
    const { accessToken = null, refreshToken = null } =
      (await this.authentication.auth(email, password)) || {};
    if (!accessToken || !refreshToken) {
      return unauthorized();
    }
    await this.addAccount({
      createdById: userCreated?._id as string,
      name: userCreated?.name as string,
      refreshToken,
      active: true,
      expiresAt: addDays(new Date(), 1) as unknown as string,
    });
    return ok({ user: userCreated, accessToken, refreshToken });
  }
}
``` 
Essa é a classe `SignupController` que é responsável por gerenciar o cadastro de usuários. Ela é uma subclasse da classe `Controller` e possui várias dependências, como `Validation`, `AddUser`, `LoadUser`, `Authentication` e `AddAccount`.

A função `execute` é o ponto central desta classe, ela é responsável por validar os dados enviados na requisição (usando a dependência `Validation`), verificar se o email já está em uso (usando a dependência `LoadUser`) e, caso tudo esteja correto, adicionar o usuário e a conta ao banco de dados (usando as dependências `AddUser` e `AddAccount`).

Finalmente, a função retorna um objeto de resposta HTTP com o status 200 (ok) e os dados do usuário e dos tokens de acesso e refresh. Se algum erro ocorrer, a função retorna um objeto de resposta HTTP com o status adequado e a mensagem de erro correspondente.
```typescript
import { AddUserRepository } from "@/slices/user/repositories";
import { UserEntity, UserData } from "@/slices/user/entities";
import { Encrypter } from "@/application/infra";

export type AddUser = (data: UserData) => Promise<UserEntity | null>;
export type AddUserSignature = (
  addUser: AddUserRepository,
  encrypter: Encrypter
) => AddUser;
export const addUser: AddUserSignature =
  (addUserRepository: AddUserRepository, encrypter: Encrypter) =>
  async (data: UserData) => {
    const hashedText = await encrypter.encrypt(data.password);
    return addUserRepository.addUser(new UserEntity({ ...data, password: hashedText }));
  };
``` 
O código apresentado cria a função `addUser` que tem como objetivo adicionar um novo usuário a um repositório. Ele usa duas dependências: `AddUserRepository` e `Encrypter`.

A `AddUserRepository` é usada para salvar o novo usuário no repositório. A `Encrypter` é usada para cifrar a senha do usuário antes de salvar no repositório. A função `addUser` recebe os dados do usuário, cifra a senha e cria uma nova entidade `UserEntity` com os dados fornecidos. Em seguida, ele chama o método `addUser` na `AddUserRepository` passando a nova entidade `UserEntity`. O resultado é a promessa da entidade `UserEntity` salva ou `null` em caso de falha.

```typescript
import { BcryptAdapter, MongoRepository } from "@/application/infra";
import { UserRepository } from "@/slices/user/repositories";
import { addUser, AddUser } from "@/slices/user/useCases";

export const makeAddUserFactory = (): AddUser => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const repository = new UserRepository(new MongoRepository("user"));
  return addUser(repository, bcryptAdapter);
};
``` 

Este é um código para a criação de uma fábrica de casos de uso de adição de usuários. A fábrica cria uma instância do BcryptAdapter com um salto de 12, uma instância de UserRepository que usa o MongoRepository como sua base de dados, e retorna a função addUser injetando essas instâncias como dependências.

Isso é útil porque separa a responsabilidade de instanciar dependências da implementação do caso de uso, tornando-o mais fácil de testar e mudar as dependências.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)