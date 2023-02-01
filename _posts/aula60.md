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
```typescript
import { BcryptAdapter, env, JwtAdapter, MongoRepository } from "@/application/infra";
import { DbAuthentication, Authentication } from "@/application/helpers";
import { UserRepository } from "@/slices/user/repositories";
export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret, "120d");
  const jwtRefreshTokenAdapter = new JwtAdapter(env.jwtRefreshSecret, "120d");
  const userMongoRepository = new MongoRepository("users");
  const userRepository = new UserRepository(userMongoRepository);
  return new DbAuthentication(
    userRepository,
    bcryptAdapter,
    jwtAdapter,
    jwtRefreshTokenAdapter
  );
};
``` 

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




[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)