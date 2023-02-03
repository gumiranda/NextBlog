---
title: 'Validando Refresh Token com o LoadAccountController no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-11T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
A aula de Validando Refresh Token com o LoadAccountController irá abordar uma importante funcionalidade para a segurança de nossa aplicação, a validação de tokens de refresh. Neste momento, discutiremos como utilizar o LoadAccountController para verificar se um token de refresh é válido e atualizá-lo, garantindo que nossos usuários tenham acesso às informações protegidas da aplicação. Veremos também como este controlador é importante para o funcionamento de outras partes da aplicação, como o acesso a informações sensíveis do usuário ou o gerenciamento de sessões. Aprenderemos a implementar esta funcionalidade e a integrá-la com outras partes da aplicação para criar um sistema seguro e confiável.

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
import { LoadAccount, AddAccount } from "@/slices/account/useCases";
import { EmailInUseError } from "@/application/errors";

export class LoadAccountController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadAccount: LoadAccount,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const accountExists = await this.loadAccount({
      fields: {
        userId: httpRequest?.userId,
        refreshToken: httpRequest?.headers?.refreshtoken,
        isFutureexpiresAt: new Date(),
      },
      options: {},
    });
    if (!accountExists) {
      return unauthorized();
    }
    const { accessToken = null, refreshToken = null } =
      (await this.authentication.authRefreshToken(httpRequest?.userId as string)) || {};
    if (!accessToken || !refreshToken) {
      return unauthorized();
    }
    await this.addAccount({
      createdById: httpRequest?.userId as string,
      name: accountExists?.name as string,
      refreshToken,
      active: true,
      expiresAt: addDays(new Date(), 1) as unknown as string,
    });
    return ok({ accessToken, refreshToken });
  }
}
``` 
Esse é o código de uma classe LoadAccountController que tem como objetivo validar o refresh token enviado pelo usuário e, em caso de sucesso, retornar um novo token de acesso e refresh token.

A classe LoadAccountController é uma subclasse de Controller e recebe, via injeção de dependências, a validação, a função para carregar o usuário, a função para adicionar o usuário e a função de autenticação.

O método execute() recebe uma requisição HTTP e verifica se ela possui todos os campos necessários utilizando a validação. Em caso de erro, é retornado um badRequest. Em seguida, o método verifica se o usuário existe usando o método loadAccount(). Se o usuário não existir, é retornado um unauthorized.

Em seguida, o método chama a função authentication.authRefreshToken() para gerar um novo token de acesso e refresh token. Se os tokens não forem gerados corretamente, é retornado um unauthorized. Por fim, o método adiciona o usuário usando a função addAccount() e retorna os novos tokens gerados no formato de um objeto HTTP response com status code 200 e corpo de resposta contendo os tokens.
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeDbAuthentication, makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddAccountFactory, makeLoadAccountFactory } from "@/slices/account/useCases";
import { LoadAccountController } from "@/slices/account/controllers";

export const makeLoadAccountController = (): Controller => {
  const requiredFields: string[] = [];
  return makeLogController(
    "loadAccount",
    new LoadAccountController(
      makeValidationComposite(requiredFields),
      makeLoadAccountFactory(),
      makeAddAccountFactory(),
      makeDbAuthentication()
    )
  );
};
``` 
 A função makeLoadAccountController retorna uma instância da classe LoadAccountController decorada com a função makeLogController. A classe LoadAccountController possui um construtor que recebe quatro dependências:

Validation: Uma instância do composite de validação é criada usando makeValidationComposite e passando uma matriz vazia de campos obrigatórios.

LoadAccount: Uma instância do uso LoadAccount é criada usando makeLoadAccountFactory.

AddAccount: Uma instância do uso AddAccount é criada usando makeAddAccountFactory.

Authentication: Uma instância da implementação de autenticação é criada usando makeDbAuthentication.

Este controlador decorado pode ser usado para lidar com solicitações de carregamento de conta. O método execute da classe LoadAccountController valida a solicitação de entrada, chama o uso LoadAccount para ver se a conta existe e, se existir, chama o método authRefreshToken da implementação de autenticação para obter um token de acesso e de atualização. Se os tokens forem retornados, o uso AddAccount é chamado para armazenar o token de atualização atualizado. Finalmente, uma resposta JSON com os tokens de acesso e atualização é retornada ao cliente.


https://github.com/gumiranda/CrazyStackNodeJs/commit/6be37c86b4d3ceac3597d2b45ce37be8c5fd4ad7


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)