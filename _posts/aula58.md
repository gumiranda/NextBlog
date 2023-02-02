---
title: 'Criando interfaces e classes abstratas na camada main da aplicação no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-03T05:35:07.322Z'
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
Essa classe `HttpResponse` é uma classe helper para trabalhar com respostas HTTP em sua aplicação. É uma boa prática ter uma classe dessas para padronizar as respostas HTTP, tornando o código mais legível e fácil de manter.

A classe `HttpResponse` define um tipo `HttpResponse<T = any>` que consiste em um objeto com duas propriedades: `statusCode` e `data`. `statusCode` é o código HTTP da resposta e `data` é os dados que serão retornados para o cliente.

A classe também define funções `ok`, `badRequest`, `unauthorized`, `forbidden` e `serverError`, que retornam uma resposta HTTP com o respectivo status code.

Por exemplo, se você quiser retornar uma resposta 200 (OK) para o cliente com algum dado, você pode usar a função `ok` da seguinte maneira:
 

```typescript
const data = { message: "Hello World" };
const response = ok(data);
console.log(response);
// Output: { statusCode: 200, data: { message: "Hello World" } }` 
```

Da mesma forma, se você quiser retornar uma resposta 401 (Unauthorized), você pode usar a função `unauthorized`:


```typescript
const response = unauthorized();

console.log(response);
// Output: { statusCode: 401, data: UnauthorizedError {} }` 
```

A classe `HttpRequest` é semelhante à classe `HttpResponse`, porém serve para definir o formato da requisição HTTP. Ela define um tipo `HttpRequest<T = any>` que consiste em um objeto com propriedades para o corpo da requisição, cabeçalhos, parâmetros da rota, query string e informações do usuário logado (se houver).



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
Este código define a classe abstrata `Controller` em uma aplicação. Essa classe tem dois métodos: `execute` e `handle`.

O método `execute` é uma função abstrata, ou seja, deve ser implementada pelas classes filhas de `Controller`. Ele recebe um objeto `httpRequest` e retorna uma promessa que, quando resolvida, irá retornar um objeto `HttpResponse`.

O método `handle` é uma função concreta, ou seja, já está implementada na classe `Controller`. Ele também recebe um objeto `httpRequest`, mas antes de chamar o `execute`, ele faz uma tentativa de capturar qualquer erro que possa ocorrer durante a execução. Caso ocorra algum erro, ele retorna o resultado da função `serverError` passando o erro como argumento. Se não houver erro, o método `execute` é chamado normalmente e o resultado é retornado.

Note que as funções `HttpRequest`, `HttpResponse` e `serverError` são importadas do módulo `@/application/helpers`.

A classe abstrata `Controller` é extendida por todos os controllers da API de agendamentos online, pois ela fornece uma estrutura básica para todos os controllers seguirem. Ela fornece um método `handle` que é responsável por manipular a lógica principal dos controllers.

A lógica principal é implementada pelo método `execute`, que é declarado como abstrato na classe `Controller` e é obrigatório ser implementado em todas as subclasses. O método `execute` é responsável por receber uma requisição HTTP e retornar uma resposta HTTP.

Se algum erro ocorrer durante a execução do método `execute`, ele é capturado pelo bloco try-catch no método `handle` e a função `serverError` é chamada para retornar uma resposta HTTP de erro.

Assim, a classe abstrata `Controller` fornece uma estrutura padronizada e confiável para todos os controllers da API de agendamentos online seguirem e implementarem a lógica principal.

Em comparação, no NestJS, a estruturação dos controllers é feita a partir da utilização de decorators e classes que já possuem métodos implementados. Por exemplo, ao invés de ter que implementar manualmente o método `handle`, o NestJS fornece uma classe chamada `Controller` que já possui esse comportamento. Além disso, o NestJS também fornece outras funcionalidades como injeção de dependências e validação de entrada, tornando o desenvolvimento mais ágil e eficiente.

Ambas as abordagens são válidas e cada uma possui suas vantagens e desvantagens. A escolha por uma ou outra dependerá das necessidades e preferências da equipe de desenvolvimento.

Optar por uma classe abstrata para os controllers em vez de utilizar a estrutura pronta de um framework, como o NestJS, pode trazer vários benefícios para o desenvolvimento de uma aplicação. O principal é a independência do framework, ou seja, a possibilidade de mudar de framework sem que isso afete a camada de controle.

Ao utilizar a classe abstrata, o código fica mais flexível e menos preso ao framework, o que é importante porque o framework pode mudar ou ser descontinuado ao longo do tempo. Além disso, a classe abstrata permite uma melhor separação das camadas da aplicação, permitindo que elas possam ser testadas e reutilizadas mais facilmente.

Outra vantagem da classe abstrata é que ela fornece uma estrutura básica para todos os controllers da aplicação, tornando mais fácil para os desenvolvedores implementarem novos controllers de maneira consistente. Além disso, a classe abstrata pode ser estendida para adicionar funcionalidades extras que são comuns a todos os controllers, como o tratamento de erros ou o acesso a dados.

Em resumo, usar uma classe abstrata para os controllers em vez de depender de uma estrutura pronta do framework traz benefícios como a independência do framework, uma melhor separação de camadas e uma estrutura básica consistente para todos os controllers. Ao considerar esses benefícios, é fácil entender porque muitos desenvolvedores optam por essa abordagem em vez de usar uma estrutura pronta.


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

Esse código é uma função que remove determinados campos de um objeto de requisição HTTP (`bodyObject`). Ela cria um novo objeto vazio (`cleanObject`), e verifica cada propriedade do objeto original. Se a propriedade estiver na lista de campos proibidos (`forbiddenFields`), ele não adiciona ao novo objeto. Se a propriedade estiver na lista de campos permitidos (`allowedFields`), ele adiciona ao novo objeto. Por fim, retorna o objeto limpo.

Essa função pode ser útil para garantir que apenas os campos permitidos sejam usados para criar ou atualizar recursos em sua aplicação. Ao invés de permitir que o objeto de requisição tenha todos os campos, você pode especificar apenas aqueles que são realmente necessários e relevantes para a sua aplicação, aumentando a segurança e evitando possíveis erros.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)