---
title: 'Criando interfaces e classes abstratas na camada main da aplicação no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-20T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

Nesta aula, vamos explorar o uso de interfaces e classes abstratas na camada principal da aplicação. Vamos ver como essas abstrações podem ser usadas para tornar o código mais flexível e escalável, ao mesmo tempo que melhoram a organização e entendimento.

Veremos como definir interfaces para representar ações da aplicação, e como usar classes abstratas para fornecer uma estrutura comum para vários tipos de objetos relacionados. Veremos como essas abstrações podem ser usadas para melhorar a manutenibilidade do código, ao facilitar a criação de novas funcionalidades e a alteração de funcionalidades existentes sem prejudicar o resto da aplicação.

No final desta aula, você terá uma compreensão mais clara de como interfaces e classes abstratas podem ser usadas na camada principal da aplicação e como essas técnicas podem ser aplicadas em seus próprios projetos.
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
import { HttpRequest, HttpResponse } from "@/application/helpers";
export interface Middleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
``` 
Esta é uma interface "Middleware" que define o método "handle" para receber um objeto "HttpRequest" e retornar uma promessa de objeto "HttpResponse". Ela é usada para fornecer uma estrutura para criar camadas de middleware na aplicação. O objeto "HttpRequest" representa a solicitação HTTP e o objeto "HttpResponse" representa a resposta HTTP.

As classes que implementam essa interface são responsáveis por realizar tarefas específicas, como autenticação, validação de dados, manipulação de erros, entre outras, antes de enviar a solicitação para o próximo middleware ou para o controlador de destino.

```typescript
export interface Authentication {
  auth(email: string, password: string): Promise<any>;
  authRefreshToken(userId: string): Promise<any>;
}
``` 
A interface `Authentication` define dois métodos: `auth` e `authRefreshToken`. O método `auth` recebe dois parâmetros: `email` e `password`, e retorna uma promessa que, quando resolvida, retorna um valor qualquer. Já o método `authRefreshToken` recebe um único parâmetro `userId` e também retorna uma promessa.

Esta interface é utilizada para definir a forma como a autenticação deve ser realizada em uma aplicação. Quem implementa esta interface é responsável por definir o comportamento dos métodos para realizar a autenticação de acordo com as regras da aplicação.
```typescript
export interface Validation {
  validate(input: any): Error[];
}
``` 
Esta interface `Validation` define um método chamado `validate` que recebe um parâmetro `input` e retorna um array de erros. A implementação desta interface seria responsável por validar os dados de entrada de acordo com algum critério específico. Por exemplo, se os dados de entrada devem seguir um formato específico ou se algum dos valores é obrigatório, essa validação seria feita na implementação desta interface.

Interfaces e classes abstratas são formas de implementar políticas de projeto e garantir a consistência do código, especialmente quando se trata de separação de responsabilidades e de padrões de projeto.

Neste caso, as interfaces Middleware, Authentication e Validation são usadas para definir a interface para implementações futuras. Isso permite que novos componentes sejam adicionados ao sistema com maior facilidade, pois eles precisam seguir as definições dessas interfaces.

```typescript
export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}
export class ForbiddenError extends Error {
  constructor(error: any) {
    super("Forbidden");
    this.name = "ForbiddenError";
    this.stack = error?.stack;
  }
}
export class ServerError extends Error {
  constructor(error: any) {
    super("Internal Server Error");
    this.name = "ServerError";
    this.stack = error?.stack;
  }
}
export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = "MissingParamError";
  }
}
export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`);
    this.name = "InvalidParamError";
  }
}
export class EmailInUseError extends Error {
  constructor() {
    super(`The received email is already in use`);
    this.name = "EmailInUseError";
  }
}
export class AccessDeniedError extends Error {
  constructor() {
    super("Access denied");
    this.name = "AccessDeniedError";
  }
}
export class AuthenticationError extends Error {
  constructor() {
    super("Authentication failed");
    this.name = "AuthenticationError";
  }
}
``` 
As classes de erro (UnauthorizedError, ForbiddenError, etc) são usadas para garantir a consistência do tratamento de erros em todo o aplicativo. Ao invés de simplesmente lançar uma exceção genérica, essas classes personalizadas podem ser usadas para identificar com mais precisão o tipo de erro que ocorreu, tornando mais fácil para os desenvolvedores lidarem com esses erros e corrigi-los.

```typescript
import { ForbiddenError, UnauthorizedError, ServerError } from "@/application/errors";
export type HttpResponse<T = any> = { statusCode: number; data: T };
export type HttpRequest<T = any> = {
  body?: T;
  headers?: T;
  params?: T;
  query?: T;
  userLogged?: T;
  userId?: string;
};

export const ok = <T = any>(data: T): HttpResponse<T> => ({ statusCode: 200, data });
export const badRequest = <T = any>(error: T): HttpResponse<T> => ({
  statusCode: 400,
  data: error,
});
export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  data: new UnauthorizedError(),
});
export const forbidden = (error: any): HttpResponse<Error> => ({
  statusCode: 403,
  data: new ForbiddenError(error),
});
export const serverError = (error: any): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error),
});
``` 
```typescript
export const cleanDataObject = (
  forbiddenFields: string[],
  allowedFields: string[],
  bodyObject: any
) => {
  const cleanObject: any = {};
  Object.keys(bodyObject).forEach((key) => {
    if (forbiddenFields.includes(key)) {
      return;
    }
    if (allowedFields.includes(key)) {
      cleanObject[key] = bodyObject[key];
    }
  });
  return cleanObject;
};
``` 
```typescript
import { HttpRequest, HttpResponse, serverError } from "@/application/helpers";

export abstract class Controller {
  abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return this.execute(httpRequest);
    } catch (error) {
      return serverError(error);
    }
  }
}
``` 
```typescript

``` 
```typescript

``` 
```typescript

``` 
```typescript

``` 
```typescript

``` 
```typescript

``` 
```typescript

``` 



[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)