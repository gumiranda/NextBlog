---
title: 'Criando LogController e LogRepository para geração de logs de erro CrazyStack Node.js'
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
export interface LogRepository {
  logError(domain: string, stack: string): Promise<void>;
}
```
```typescript
import { MongoHelper } from "@/application/infra";
import { LogRepository } from "@/application/infra/contracts";

export class LogMongoRepository implements LogRepository {
  async logError(domain: string, stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection("errors");
    await errorCollection.insertOne({ domain, stack, date: new Date() });
  }
}
``` 
```typescript
import { Controller, LogRepository } from "@/application/infra/contracts";
import { HttpRequest, HttpResponse } from "../helpers";
export class LogController implements Controller {
  constructor(
    private readonly domain: string,
    private readonly controller: Controller,
    private readonly logRepository: LogRepository
  ) {}
  execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    return this.controller.execute(httpRequest);
  }
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const httpResponse = await this.execute(httpRequest);
    if (httpResponse?.statusCode === 500) {
      await this.logRepository.logError(this.domain, httpResponse?.data);
    }
    return httpResponse;
  }
}
``` 
 


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)