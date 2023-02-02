---
title: 'Criando Middleware de autenticação no CrazyStack Node.js'
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
Middleware é uma camada intermediária que permite a manipulação de requisições e respostas HTTP antes que cheguem ao seu destino final. Em uma aplicação web, o middleware é usado para adicionar recursos comuns a todas as requisições, como autenticação, validação de dados, tratamento de erros, entre outros.

Na aula de criação de Middleware de autenticação, você aprenderá a criar uma camada de segurança para sua aplicação, garantindo que somente usuários autenticados tenham acesso a determinadas rotas. Para isso, será implementado um middleware que verificará a presença de um token de autenticação na requisição HTTP, e caso ele não exista, retornará uma resposta de erro.

Além disso, você verá como incluir o middleware em suas rotas, permitindo que somente usuários autenticados possam acessá-las. Ao final da aula, você terá uma compreensão sólida do que é um middleware e como criar um para autenticação em sua aplicação.

```typescript
import { Middleware } from "@/application/infra/contracts";
import { HttpRequest } from "@/application/helpers";
import { ServerError } from "@/application/errors";
export const adaptMiddleware = (middleware: Middleware) => {
  return async (request: any, reply: any) => {
    const httpRequest: HttpRequest = { headers: request.headers };
    const httpResponse = await middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      request.requestContext.set("context", httpResponse?.data);
    } else if (httpResponse?.data) {
      reply.code(httpResponse.statusCode).send(httpResponse.data);
    } else {
      reply.code(500).send(new ServerError(new Error("Internal Server Error")));
    }
  };
};
``` 
Este código define a função `adaptMiddleware`, que recebe como parâmetro um middleware de autenticação. A função serve como adaptador, transformando a interface do middleware para uma interface específica de uma biblioteca ou framework.

A função retorna uma nova função que é responsável por processar o objeto de requisição (`request`) e o objeto de resposta (`reply`). A função interna cria um objeto `HttpRequest` a partir do objeto de requisição, e então chama o método `handle` do middleware de autenticação passando esse objeto `HttpRequest`.

Se a resposta for um código de status 200 (sucesso), o objeto `request` é atualizado com o contexto retornado pela resposta do middleware. Se a resposta for outro código de status, o objeto `reply` é atualizado com esse código de status e a mensagem de erro retornada pela resposta do middleware. Se a resposta não tiver nenhuma mensagem de erro, o objeto `reply` é atualizado com o código de erro 500 e uma mensagem de erro padrão "Internal Server Error".

Se estivessemos usando o Express, a única coisa que precisaríamos mudar seria a chamada da variável "reply" para "response". Isso porque, no Express, a variável "response" é usada para responder ao cliente com as informações da requisição. Já a função "send" é utilizada para enviar a resposta para o cliente. Portanto, para fazer a mudança, bastaria mudar a seguinte linha:
 
`reply.code(httpResponse.statusCode).send(httpResponse.data);` 

para:

`response.status(httpResponse.statusCode).send(httpResponse.data);`

```typescript
import jwt from "jsonwebtoken";
import {
  forbidden,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  unauthorized,
} from "@/application/helpers";
import { Middleware } from "@/application/infra/contracts";
import { LoadUser } from "@/slices/user/useCases/loadUser";
import { AccessDeniedError } from "@/application/errors";
import { env } from "@/application/infra/config";
import { ObjectId } from "mongodb";

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadUser: LoadUser, private readonly roles: string[]) {}
  private async verifyToken(token: string, secret: string): Promise<any> {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const authHeader = httpRequest?.headers?.["authorization"];
      if (authHeader) {
        const [, accessToken] = authHeader?.split?.(" ");
        if (accessToken) {
          const decoded = await this.verifyToken(accessToken, env.jwtSecret);
          if (!decoded) {
            return unauthorized();
          }
          const { _id } = decoded;
          const query = {
            fields: {
              _id: new ObjectId(_id),
              role: { $in: this.roles },
            },
            options: { projection: { password: 0 } },
          };
          const user = await this.loadUser(query);
          if (user) {
            return ok({ userId: user?._id, userLogged: user });
          }
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}
``` 
Essa classe é uma implementação de um Middleware de autenticação. Ela é responsável por verificar se o token de acesso enviado na requisição é válido e se o usuário logado tem permissão para acessar a rota específica.

Ela usa a biblioteca `jsonwebtoken` para decodificar o token de acesso e verificar sua validade. O método `verifyToken` decodifica o token e retorna suas informações decodificadas ou `null` caso o token seja inválido.

O método `handle` faz o tratamento da requisição para verificar se o usuário está autenticado. Ele verifica se há um cabeçalho `Authorization` na requisição. Se houver, ele extrai o token de acesso da string e verifica sua validade. Caso o token seja válido, ele carrega as informações do usuário associado a ele e verifica se ele tem permissão para acessar a rota. Caso tudo esteja ok, ele retorna um objeto com os dados do usuário logado. Caso contrário, ele retorna uma resposta com o status `401` (não autorizado) ou `403` (proibido) dependendo do caso.

A classe recebe como parâmetros o caso de uso `LoadUser` e um array de strings com os roles que têm permissão para acessar a rota.
```typescript
import { adaptMiddleware } from "@/application/adapters";
import { Middleware } from "@/application/infra/contracts";
import { makeLoadUserFactory } from "@/slices/user/useCases/loadUser/loadUserFactory";
import { AuthMiddleware } from "@/application/infra/middlewares";
export const makeAuthMiddleware = (roles: string[]): Middleware => {
  return new AuthMiddleware(makeLoadUserFactory(), roles);
};

//roles

export const authClient = () => adaptMiddleware(makeAuthMiddleware(["client", "admin"]));
export const authAdmin = () => adaptMiddleware(makeAuthMiddleware(["admin"]));
export const authOwner = () => adaptMiddleware(makeAuthMiddleware(["owner", "admin"]));
export const authProfessional = () =>
  adaptMiddleware(makeAuthMiddleware(["owner", "professional", "admin"]));
export const authVisitor = () =>
  adaptMiddleware(
    makeAuthMiddleware(["owner", "professional", "client", "visitor", "admin"])
  );
export const authLogged = () =>
  adaptMiddleware(makeAuthMiddleware(["owner", "professional", "client", "admin"]));
``` 
Este código cria algumas funções que retornam middlewares de autenticação adaptados. O middleware é usado para verificar se o usuário que está fazendo uma solicitação possui a autorização adequada.

A função `makeAuthMiddleware` recebe uma lista de papéis e cria uma instância de `AuthMiddleware` passando a fábrica de carregamento de usuário `makeLoadUserFactory` e a lista de papéis como parâmetros.

As funções `authClient`, `authAdmin`, `authOwner`, `authProfessional`, `authVisitor` e `authLogged` retornam uma instância de middleware de autenticação adaptada para diferentes papéis, com base nas permissões necessárias para acessar determinadas rotas.

A função `adaptMiddleware` é importada de `@/application/adapters` e é responsável por adaptar o middleware para o formato esperado pelo framework de rotas que está sendo usado.

Classe RefreshTokenMiddleware
=============================

Esta é uma classe de middleware responsável por gerenciar o refresh de tokens de autenticação. Ela implementa a interface `Middleware` e recebe como parâmetros a função `loadUser` e um array de roles.

```typescript
import jwt from "jsonwebtoken";
import { forbidden, HttpRequest, HttpResponse, ok, serverError, unauthorized } from "@/application/helpers";
import { Middleware } from "@/application/infra/contracts";
import { LoadUser } from "@/slices/user/useCases/loadUser";
import { AccessDeniedError } from "@/application/errors";
import { env } from "@/application/infra/config";
import { ObjectId } from "mongodb";

export class RefreshTokenMiddleware implements Middleware {
``` 

Construtor
----------

O construtor recebe dois parâmetros, a função `loadUser` e um array de roles. Estes são armazenados como propriedades de leitura privadas da classe.

```typescript
constructor(private readonly loadUser: LoadUser, private readonly roles: string[]) {}
``` 

Método verifyToken
------------------

Este é um método privado que é responsável por verificar se um token é válido. Ele recebe um token e uma chave secreta como parâmetros e retorna o payload decodificado se o token for válido, caso contrário retorna `null`.

```typescript
 private async verifyToken(token: string, secret: string): Promise<any> {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
``` 

Método handle
-------------

Este é o método principal da classe que será executado quando a classe for usada como middleware. Ele recebe um objeto `httpRequest` como parâmetro e retorna um objeto `HttpResponse`.
 
```typescript
async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
``` 

### Verificação do cabeçalho de autorização

Primeiro, é verificado se o cabeçalho `refreshtoken` existe no objeto `httpRequest`. Se ele existir, é decodificado usando o método `verifyToken`.

```typescript
try {
  const authHeader = httpRequest?.headers?.["refreshtoken"];
      if (authHeader) {
        const decoded = await this.verifyToken(authHeader, env.jwtSecret);
        if (!decoded) {
          return unauthorized();
        }` 
```

### Busca do usuário

Em seguida, é buscado o usuário usando a função `loadUser` passada no construtor. O id do usuário é extraído do payload decodificado e é passado como filtro para a busca. Além disso, é definido um construtor que inicializa o middleware com o uso do caso de uso `LoadUser` e as funções `roles` que serão usadas mais adiante.

Há também uma função `verifyToken` que irá verificar se o token enviado é válido, utilizando a biblioteca `jsonwebtoken`.

A função `handle` é onde ocorre a lógica principal do middleware. Primeiro é verificado se há um cabeçalho "refreshtoken" no `httpRequest`. Se houver, ele é decodificado com a chave secreta especificada em `env.jwtSecret`. Se o token não for válido, é retornado o status `unauthorized`.

Se o token for válido, é feita uma consulta no banco de dados com o id presente no token e com a condição de que a role esteja dentro das `roles` inicializadas no construtor. Se houver um usuário com esses critérios, é retornado um objeto com as informações do usuário e seu id.

Se não houver um cabeçalho "refreshtoken" no `httpRequest` ou se o usuário não foi encontrado, é retornado o status `forbidden` com a mensagem de erro `AccessDeniedError`.

Em caso de erro durante o processo, é retornado o status `serverError` com a mensagem de erro.

## Código final
```typescript
import jwt from "jsonwebtoken";
import {
  forbidden,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  unauthorized,
} from "@/application/helpers";
import { Middleware } from "@/application/infra/contracts";
import { LoadUser } from "@/slices/user/useCases/loadUser";
import { AccessDeniedError } from "@/application/errors";
import { env } from "@/application/infra/config";
import { ObjectId } from "mongodb";

export class RefreshTokenMiddleware implements Middleware {
  constructor(private readonly loadUser: LoadUser, private readonly roles: string[]) {}
  private async verifyToken(token: string, secret: string): Promise<any> {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const authHeader = httpRequest?.headers?.["refreshtoken"];
      if (authHeader) {
        const decoded = await this.verifyToken(authHeader, env.jwtSecret);
        if (!decoded) {
          return unauthorized();
        }
        const { _id } = decoded;
        const query = {
          fields: {
            _id: new ObjectId(_id),
            role: { $in: this.roles },
          },
          options: { projection: { password: 0 } },
        };
        const user = await this.loadUser(query);
        if (user) {
          return ok({ userId: user?._id, userLogged: user });
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}
``` 
```typescript
import { adaptMiddleware } from "@/application/adapters";
import { Middleware } from "@/application/infra/contracts";
import { makeLoadUserFactory } from "@/slices/user/useCases/loadUser/loadUserFactory";
import { RefreshTokenMiddleware } from "@/application/infra/middlewares";
export const makeRefreshTokenMiddleware = (roles: string[]): Middleware => {
  return new RefreshTokenMiddleware(makeLoadUserFactory(), roles);
};

//roles

export const authClient = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["client", "admin"]));
export const authAdmin = () => adaptMiddleware(makeRefreshTokenMiddleware(["admin"]));
export const authOwner = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["owner", "admin"]));
export const authProfessional = () =>
  adaptMiddleware(makeRefreshTokenMiddleware(["owner", "professional", "admin"]));
export const authVisitor = () =>
  adaptMiddleware(
    makeRefreshTokenMiddleware(["owner", "professional", "client", "visitor", "admin"])
  );
export const authLogged = () =>
  adaptMiddleware(
    makeRefreshTokenMiddleware(["owner", "professional", "client", "admin"])
  );
``` 
```typescript
import { Authentication } from "@/application/helpers/contracts";
import { HashComparer, TokenGenerator } from "@/application/infra";
import { LoadUserRepository } from "@/slices/user/repositories";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadUserRepository: LoadUserRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly refreshTokenGenerator: TokenGenerator
  ) {}
  async auth(email: string, password: string): Promise<any> {
    const user = await this.loadUserRepository.loadUser({
      fields: { email },
      options: { projection: {} },
    });
    if (user?._id && user?.password) {
      const isValid = await this.hashComparer.compare(password, user.password);
      if (isValid) {
        const { accessToken, refreshToken } =
          (await this.authRefreshToken(user._id)) || {};
        return { accessToken, refreshToken };
      }
    }
    return null;
  }
  async authRefreshToken(userId: string): Promise<any> {
    const accessToken = await this.tokenGenerator.generate(userId);
    const refreshToken = await this.refreshTokenGenerator.generate(userId);
    return { accessToken, refreshToken };
  }
}
``` 
Esse é um código em JavaScript que define a classe "DbAuthentication", responsável por implementar uma interface de autenticação. Essa classe possui as seguintes responsabilidades:

* Verificar se as credenciais fornecidas (email e senha) correspondem a algum usuário registrado no banco de dados.
* Gerar tokens de acesso e refresh (em caso de sucesso na autenticação).

A classe possui uma dependência de três objetos, que são inicializados através de seu construtor:

* loadUserRepository: Um repositório responsável por carregar informações de usuários.
* hashComparer: Um objeto que compara hashes de senhas.
* tokenGenerator: Um gerador de tokens de acesso.
* refreshTokenGenerator: Um gerador de tokens de refresh.

A classe possui dois métodos:

* auth: Verifica as credenciais fornecidas e gera tokens de acesso e refresh em caso de sucesso.
* authRefreshToken: Recebe o ID do usuário e gera tokens de acesso e refresh.

```typescript
import { BcryptAdapter, env, JwtAdapter, MongoRepository } from "@/application/infra";
import { DbAuthentication, Authentication } from "@/application/helpers";
import { UserRepository } from "@/slices/user/repositories";
export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret, "1d");
  const jwtRefreshTokenAdapter = new JwtAdapter(env.jwtRefreshSecret, "10d");
  const userMongoRepository = new MongoRepository("user");
  const userRepository = new UserRepository(userMongoRepository);
  return new DbAuthentication(
    userRepository,
    bcryptAdapter,
    jwtAdapter,
    jwtRefreshTokenAdapter
  );
};
``` 
Este código define uma função chamada `makeDbAuthentication` que retorna uma instância da classe `DbAuthentication`.

A função começa declarando uma constante `salt` com o valor 12, que será usado para criar uma instância da classe `BcryptAdapter`. Em seguida, duas instâncias da classe `JwtAdapter` são criadas, uma para gerar tokens de acesso e outra para tokens de atualização de token.

Em seguida, uma instância da classe `MongoRepository` é criada com o nome da coleção "users". Uma instância da classe `UserRepository` é criada com base na instância de `MongoRepository`.

Finalmente, uma instância da classe `DbAuthentication` é retornada, usando as instâncias criadas anteriormente como argumentos.

A ideia é que `makeDbAuthentication` é uma factory que retorna uma instância de `DbAuthentication` pronta para ser usada.

Somente o Refresh Token e os dados de autenticação são armazenados em um banco de dados, normalmente MongoDB, com o objetivo de garantir a segurança dos dados do usuário. A biblioteca MongoRepository é usada para se conectar ao banco de dados e manipular as informações do usuário.

O Access Token é usado para autenticar as requisições do usuário e fornecer acesso aos recursos protegidos. É gerado pelo TokenGenerator e é válido por um curto período de tempo, como 120 dias. Se a sessão do usuário expirar antes desse período, ele precisará fazer login novamente.

O Refresh Token é usado para renovar o Access Token sem que o usuário precise fazer login novamente. Ele é gerado pelo RefreshTokenGenerator e é válido por um período de tempo mais longo do que o Access Token. Se o Access Token expirar, o usuário pode usar o Refresh Token para obter um novo Access Token sem precisar fazer login novamente.

Em resumo, o uso de Access Token e Refresh Token aumenta a segurança da aplicação, já que o usuário precisa fazer login apenas uma vez e pode continuar usando a aplicação sem precisar fazer login novamente, desde que seu Refresh Token esteja válido. Além disso, a biblioteca BcryptAdapter é usada para criptografar a senha do usuário antes de armazená-la no banco de dados, garantindo a segurança dos dados sensíveis do usuário.

```typescript
import { MongoRepository } from "@/application/infra/database/mongodb";
import { UserRepository } from "@/slices/user/repositories";
import { loadUser, LoadUser } from "@/slices/user/useCases/loadUser";
export const makeLoadUserFactory = (): LoadUser => {
  const userMongoRepository = new MongoRepository("users");
  const userRepository = new UserRepository(userMongoRepository);
  return loadUser(userRepository);
};
``` 
Este código exporta uma função factory `makeLoadUserFactory` que retorna uma instância de `LoadUser`. A função factory utiliza o módulo `MongoRepository` para criar uma instância do repositório de usuários, que é então usada para criar uma instância do caso de uso `loadUser`.

O caso de uso `loadUser` é importado do módulo `@/slices/user/useCases/loadUser` e é responsável por carregar um usuário a partir de seus dados de identificação, como o e-mail ou o ID do usuário. Esse caso de uso usa o repositório de usuários para realizar a tarefa de recuperar as informações do usuário.

Em resumo, a função factory `makeLoadUserFactory` retorna uma instância do caso de uso `loadUser` que foi inicializada com uma instância do repositório de usuários.



[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)