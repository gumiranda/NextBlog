---
title: 'Criando Log Controller e SignupController Factories no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-08T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

Bem-vindos à aula de Implementação de LogController e SignupController Factories! Neste módulo, vocês aprenderão como criar as fábricas desses controladores, que são responsáveis por gerenciar e validar as requisições de cadastro de usuários e login. Ao fim desta aula, vocês serão capazes de implementar controladores robustos e flexíveis para seu sistema, além de ter um melhor entendimento sobre a utilização de fábricas para facilitar a manutenção e evolução da aplicação. Vamos lá!

Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).
```typescript
import { Controller } from "@/application/infra/contracts";
import { LogMongoRepository } from "@/application/infra/database/mongodb/repository";
import { LogController } from "@/application/decorators";
export const makeLogController = (domain: string, controller: Controller): Controller => {
  return new LogController(domain, controller, new LogMongoRepository());
};
``` 
Este é o código para a criação de uma fábrica de LogController. A fábrica é responsável por criar uma instância de LogController decorado em torno de outro controlador especificado como um argumento. O LogController é responsável por registrar todas as ações do usuário em um banco de dados MongoDB usando o LogMongoRepository. A fábrica é útil porque permite a reutilização de código de log e a separação de preocupações, mantendo a lógica de log separada da lógica principal do aplicativo.
 
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
Essa é uma factory de criação de `SignupController`. A factory retorna um objeto do tipo `Controller` que é decorado pelo `makeLogController`, que adiciona funcionalidade de log ao controlador.

O `SignupController` é criado com várias dependências:

* `makeValidationComposite`, que fornece validação de campos obrigatórios.
* `makeAddUserFactory`, que fornece a lógica de inserção de usuário.
* `makeLoadUserFactory`, que fornece a lógica de carregamento de usuários.
* `makeDbAuthentication`, que fornece autenticação de banco de dados.
* `makeAddAccountFactory`, que fornece a lógica de inserção de conta.

Essas dependências são passadas para o construtor de `SignupController`, e a factory retorna o objeto decorado pelo `makeLogController`, que adiciona funcionalidade de log ao controlador.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)