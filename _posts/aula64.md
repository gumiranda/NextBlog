---
title: 'Criando Log Controller e SignupController Factories no CrazyStack Node.js'
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
import { Controller } from "@/application/infra/contracts";
import { LogMongoRepository } from "@/application/infra/database/mongodb/repository";
import { LogController } from "@/application/decorators";
export const makeLogController = (domain: string, controller: Controller): Controller => {
  return new LogController(domain, controller, new LogMongoRepository());
};
``` 

 
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeDbAuthentication, makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddAccountFactory } from "@/slices/account/useCases";
import { SignupController } from "@/slices/user/controllers";
import { makeAddUserFactory, makeLoadUserFactory } from "@/slices/user/useCases";

export const makeSignupController = (): Controller => {
  const requiredFields = [
    "email",
    "name",
    "password",
    "passwordConfirmation",
    "coord",
    "role",
  ];
  return makeLogController(
    "signup",
    new SignupController(
      makeValidationComposite(requiredFields),
      makeAddUserFactory(),
      makeLoadUserFactory(),
      makeDbAuthentication(),
      makeAddAccountFactory()
    )
  );
};
``` 



[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)