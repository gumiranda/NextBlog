---
title: 'Controllers de Request no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-19T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Bem-vindo à aula sobre Controllers de Request! Neste tópico, você aprenderá a importância dos controllers na arquitetura de aplicações, como eles se relacionam com as camadas de aplicação e como implementá-los para garantir uma boa experiência de usuário e uma boa performance. Além disso, você verá exemplos práticos de como criar e gerenciar requisições HTTP através de controllers eficientes e bem estruturados. Não perca esta oportunidade de aprimorar suas habilidades em arquitetura de software!

Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

```typescript
import { ValidateAvailableTimes } from "@/slices/appointment/useCases";
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { IUpdateRequestById } from "@/slices/request/useCases";

export class UpdateRequestController extends Controller {
  constructor(
    private readonly validationQuery: Validation,
    private readonly validationBody: Validation,
    private readonly updateRequest: IUpdateRequestById,
    private readonly validateAvailableTimes: ValidateAvailableTimes
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errorsBody = this.validationBody.validate(httpRequest?.body);
    if (errorsBody?.length > 0) {
      return badRequest(errorsBody);
    }
    const errorsQuery = this.validationQuery.validate(httpRequest?.query);
    if (errorsQuery?.length > 0) {
      return badRequest(errorsQuery);
    }
    const appointmentIsValid = await this.validateAvailableTimes({
      date: httpRequest?.body?.date,
      initDate: httpRequest?.body?.initDate,
      endDate: httpRequest?.body?.endDate,
      professionalId: httpRequest?.body?.professionalId,
      ownerId: httpRequest?.body?.ownerId,
      serviceId: httpRequest?.body?.serviceId,
    });
    let newStatus = httpRequest?.body?.status;
    const validStatusArray = [0, 5, 6];
    if (!appointmentIsValid && validStatusArray?.includes?.(newStatus)) {
      return badRequest(errorsBody);
    }
    const confirmedStatusArray = [1, 7];
    if (!appointmentIsValid && confirmedStatusArray?.includes?.(newStatus)) {
      newStatus = 4;
    }
    const requestUpdated = await this.updateRequest.updateRequestById(
      httpRequest?.query?._id,
      {
        ...httpRequest?.body,
        updatedById: httpRequest?.userId,
        updatedByRole: httpRequest?.userLogged?.role,
        status: newStatus,
      }
    );
    return ok(requestUpdated);
  }
}
``` 
Este é o código de um controlador de atualização de solicitação que faz parte de uma aplicação de gerenciamento de agendamentos. O controlador é responsável por atualizar os dados de uma solicitação de agendamento no banco de dados.

O controlador estende a classe `Controller` e possui uma dependência de quatro objetos: `Validation` para validação dos dados da requisição, `IUpdateRequestById` para a atualização da solicitação, `ValidateAvailableTimes` para validar a disponibilidade dos horários de agendamento e `HttpRequest` e `HttpResponse` para manipular as requisições e respostas HTTP.

No método `execute`, primeiro são validados os dados presentes nas query e body da requisição HTTP. Em caso de erros na validação, a função `badRequest` é retornada. Em seguida, é feita uma verificação da disponibilidade dos horários de agendamento. Se o horário não estiver disponível, o status da solicitação é alterado de acordo com o status original especificado.

Por fim, o método `updateRequestById` é chamado para atualizar a solicitação no banco de dados. O retorno da função é o objeto atualizado. Se não houver erros, a função `ok` é retornada com o objeto atualizado.
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateRequestByIdFactory } from "@/slices/request/useCases";
import { UpdateRequestController } from "@/slices/request/controllers";
import { makeValidateAvailableTimesFactory } from "@/slices/appointment/useCases";

export const makeUpdateRequestController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody = ["status"];
  return makeLogController(
    "updateRequest",
    new UpdateRequestController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateRequestByIdFactory(),
      makeValidateAvailableTimesFactory()
    )
  );
};
``` 
Este código representa uma fabrica de construção de um controlador para atualização de requests. A função `makeUpdateRequestController` retorna uma instância do controlador.

O controlador é criado com a função `new UpdateRequestController` que requer 4 dependências:

* `makeValidationComposite(requiredFieldsQuery)`: é uma validação das queries da requisição, onde `requiredFieldsQuery` é um array com os campos obrigatórios.
* `makeValidationComposite(requiredFieldsBody)`: é uma validação do corpo da requisição, onde `requiredFieldsBody` é um array com os campos obrigatórios.
* `makeUpdateRequestByIdFactory()`: é a fábrica de construção de uma use case de atualização de request pelo id.
* `makeValidateAvailableTimesFactory()`: é a fábrica de construção de uma use case de validação de horários disponíveis.

A função `makeLogController` é uma função decoradora que adiciona funcionalidades de logging ao controlador. A função recebe 2 argumentos:

* "updateRequest": é a ação que está sendo realizada.
* `new UpdateRequestController`: é a instância do controlador.

Ao final, a função `makeUpdateRequestController` retorna a instância decorada do controlador.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)