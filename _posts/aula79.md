---
title: 'Owner e RatingResult Controllers no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Na arquitetura de uma aplicação, os controllers são responsáveis por receber as requisições HTTP e delegar as tarefas aos use cases, que por sua vez realizam as regras de negócio da aplicação.

Nesta aula, vamos aprender a criar os controllers "Owner" e "RatingResult", que terão a função de gerenciar as requisições relacionadas aos donos e resultados de avaliações de uma aplicação.

Vamos começar entendendo como funciona a comunicação entre as camadas da aplicação e, em seguida, implementaremos cada um dos controllers e suas respectivas validações, usando as boas práticas de programação.

Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

```typescript
import {
  validateAvailableTimes,
  ValidateAvailableTimes,
} from "@/slices/appointment/useCases";
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddAppointment } from "@/slices/appointment/useCases";

export class AddAppointmentController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAppointment: AddAppointment,
    private readonly validateAvailableTimes: ValidateAvailableTimes
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const appointmentIsValid = await this.validateAvailableTimes({
      date: httpRequest?.body?.initDate,
      initDate: httpRequest?.body?.initDate,
      endDate: httpRequest?.body?.endDate,
      professionalId: httpRequest?.body?.professionalId,
      ownerId: httpRequest?.body?.ownerId,
      serviceId: httpRequest?.body?.serviceId,
    });
    if (!appointmentIsValid) {
      return badRequest(errors);
    }
    const appointmentCreated = await this.addAppointment({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(appointmentCreated);
  }
}
``` 
Este é o código para o controller "AddAppointmentController". Ele é responsável por criar um novo agendamento na aplicação. O controlador possui três dependências: uma classe de validação, um caso de uso "AddAppointment" e um caso de uso "ValidateAvailableTimes".

A classe de validação é usada para verificar se todos os campos obrigatórios estão presentes no corpo da solicitação HTTP. O caso de uso "AddAppointment" é responsável por adicionar um novo agendamento no banco de dados. O caso de uso "ValidateAvailableTimes" é responsável por verificar se o horário desejado para o agendamento está disponível.

O método execute () é o método que é invocado quando a rota de agendamento é acionada. Ele valida primeiro os dados da solicitação HTTP usando a classe de validação e verifica se o horário desejado para o agendamento está disponível usando o caso de uso "ValidateAvailableTimes". Se ambos estiverem válidos, o caso de uso "AddAppointment" é executado para adicionar um novo agendamento no banco de dados. Finalmente, uma resposta HTTP é retornada para indicar se o agendamento foi criado com sucesso ou não.
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import {
  makeAddAppointmentFactory,
  makeValidateAvailableTimesFactory,
} from "@/slices/appointment/useCases";
import { AddAppointmentController } from "@/slices/appointment/controllers";

export const makeAddAppointmentController = (): Controller => {
  const requiredFields = [
    "requestId",
    "message",
    "serviceId",
    "ownerId",
    "clientId",
    "professionalId",
    "createdForId",
    "status",
    "initDate",
    "endDate",
  ];
  return makeLogController(
    "addAppointment",
    new AddAppointmentController(
      makeValidationComposite(requiredFields),
      makeAddAppointmentFactory(),
      makeValidateAvailableTimesFactory()
    )
  );
};
``` 
Este é o código de um controlador de atualização de solicitação que faz parte de uma aplicação de gerenciamento de agendamentos. O controlador é responsável por atualizar os dados de uma solicitação de agendamento no banco de dados.

O controlador estende a classe `Controller` e possui uma dependência de quatro objetos: `Validation` para validação dos dados da requisição, `IUpdateRequestById` para a atualização da solicitação, `ValidateAvailableTimes` para validar a disponibilidade dos horários de agendamento e `HttpRequest` e `HttpResponse` para manipular as requisições e respostas HTTP.

No método `execute`, primeiro são validados os dados presentes nas query e body da requisição HTTP. Em caso de erros na validação, a função `badRequest` é retornada. Em seguida, é feita uma verificação da disponibilidade dos horários de agendamento. Se o horário não estiver disponível, o status da solicitação é alterado de acordo com o status original especificado.

Por fim, o método `updateRequestById` é chamado para atualizar a solicitação no banco de dados. O retorno da função é o objeto atualizado. Se não houver erros, a função `ok` é retornada com o objeto atualizado.
```typescript
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadAvailableTimes } from "@/slices/appointment/useCases";

export class LoadAvailableTimesController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadAvailableTimes: LoadAvailableTimes
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const availableTimes = await this.loadAvailableTimes(httpRequest?.query);
    return ok(availableTimes);
  }
}
``` 
Este código define uma classe `LoadAvailableTimesController` que herda de uma classe abstrata `Controller` do pacote `@/application/infra/contracts`. A classe `Controller` é usada para definir contratos comuns para controladores que irão tratar requisições HTTP.

A classe `LoadAvailableTimesController` tem dois parâmetros de construtor: `validation` e `loadAvailableTimes`. A primeira é uma dependência de tipo `Validation`, que será usada para validar os dados recebidos na requisição. A segunda é uma dependência do tipo `LoadAvailableTimes`, que é uma interface que representa uma camada de serviço responsável por carregar os horários disponíveis para marcar uma consulta.

A classe `LoadAvailableTimesController` define um método `execute` que recebe como parâmetro uma requisição HTTP de tipo `HttpRequest`. Este método verifica se há erros na validação dos dados da requisição usando a propriedade `validation`. Se houver erros, o método retorna uma resposta HTTP com o código de status 400 (Bad Request) e os erros encontrados.

Se a validação for bem-sucedida, o método invoca o método `loadAvailableTimes` passando como parâmetro os dados da requisição (`httpRequest.query`), que devem conter informações suficientes para carregar os horários disponíveis. O resultado é uma lista de horários disponíveis. Finalmente, o método retorna uma resposta HTTP com o código de status 200 (OK) e os dados dos horários disponíveis.

Os pacotes `HttpRequest`, `HttpResponse`, `Validation`, `badRequest` e `ok` são importados do pacote `@/application/helpers` e fornecem auxílios para manipular requisições e respostas HTTP.
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadAvailableTimesFactory } from "@/slices/appointment/useCases";
import { LoadAvailableTimesController } from "@/slices/appointment/controllers";

export const makeLoadAvailableTimesController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadAvailableTimes",
    new LoadAvailableTimesController(
      makeValidationComposite(requiredFields),
      makeLoadAvailableTimesFactory()
    )
  );
};
``` 
Este código define uma factory function `makeLoadAvailableTimesController` que retorna um objeto do tipo `Controller`. Essa factory function é responsável por criar uma instância de `LoadAvailableTimesController` e aplicar um decorator `makeLogController` nessa instância.

A factory function `makeLoadAvailableTimesController` inicia criando uma lista de campos obrigatórios chamada `requiredFields` que, neste caso, contem apenas um item: "_id". Em seguida, é chamada a factory function `makeLogController` passando o nome da operação "loadAvailableTimes" e uma instância de `LoadAvailableTimesController`.

`LoadAvailableTimesController` é uma classe que extende a classe `Controller` da aplicação e é responsável por gerenciar a requisição de carregamento de horários disponíveis para um determinado serviço. A classe possui um construtor que recebe duas dependências: uma instância de `Validation` e uma instância de `LoadAvailableTimes`.

O método `execute` da classe é responsável por executar a lógica de negócio da requisição de carregamento de horários disponíveis. O método começa validando o objeto `query` da requisição `httpRequest` usando o objeto `validation`. Se houver algum erro na validação, a função `badRequest` é chamada retornando os erros. Se não houver erros, o método `loadAvailableTimes` é chamado passando o objeto `query` da requisição `httpRequest` e o resultado é retornado com a função `ok`.
```typescript
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddOwner, LoadOwner } from "@/slices/owner/useCases";
import { daysValidator, handleHoursErrors } from "@/slices/owner/validations";

export class AddOwnerController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addOwner: AddOwner,
    private readonly loadOwner: LoadOwner
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    daysValidator({ errors, body: httpRequest?.body });
    handleHoursErrors({ errors, body: httpRequest?.body });
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const ownerExists = await this.loadOwner({
      fields: { createdById: httpRequest?.userId },
      options: {},
    });
    if (ownerExists) {
      return badRequest([{ field: "createdById", message: "Owner already exists" }]);
    }
    const ownerCreated = await this.addOwner({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(ownerCreated);
  }
}
``` 
Este código apresenta uma classe `AddOwnerController` que é uma subclasse da classe `Controller` importada do pacote `@/application/infra/contracts`. A classe `AddOwnerController` é responsável por adicionar um novo proprietário ao sistema.

A classe tem três construtores como argumentos:

1. `validation: Validation`: uma instância de uma classe de validação que é responsável por validar os dados da solicitação.
2. `addOwner: AddOwner`: uma instância da classe `AddOwner` que é responsável por adicionar o proprietário ao sistema.
3. `loadOwner: LoadOwner`: uma instância da classe `LoadOwner` que é responsável por carregar o proprietário existente a partir do sistema.

A classe tem uma única função `execute` que recebe uma `HttpRequest` como argumento e retorna uma `HttpResponse`. A função é responsável por validar os dados da solicitação usando a classe de validação e também verifica se o proprietário já existe no sistema usando a classe `LoadOwner`. Se houver erros de validação ou se o proprietário já existir, a função retorna um `badRequest` com a lista de erros. Caso contrário, a função adiciona o proprietário ao sistema usando a classe `AddOwner` e retorna um `ok` com o proprietário criado.

```typescript
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { UpdateOwner } from "@/slices/owner/useCases";
import { daysValidator, handleHoursErrors } from "@/slices/owner/validations";

export class UpdateOwnerController extends Controller {
  constructor(
    private readonly validationQuery: Validation,
    private readonly validationBody: Validation,
    private readonly updateOwner: UpdateOwner
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errorsBody = this.validationBody.validate(httpRequest?.body);
    daysValidator({ errors: errorsBody, body: httpRequest?.body });
    if (
      httpRequest?.body?.hourStart1 ||
      httpRequest?.body?.hourEnd1 ||
      httpRequest?.body?.hourStart2 ||
      httpRequest?.body?.hourEnd2 ||
      httpRequest?.body?.hourStart3 ||
      httpRequest?.body?.hourEnd3 ||
      httpRequest?.body?.hourLunchStart1 ||
      httpRequest?.body?.hourLunchEnd1 ||
      httpRequest?.body?.hourLunchStart2 ||
      httpRequest?.body?.hourLunchEnd2 ||
      httpRequest?.body?.hourLunchStart3 ||
      httpRequest?.body?.hourLunchEnd3
    ) {
      handleHoursErrors({ errors: errorsBody, body: httpRequest?.body });
    }
    if (errorsBody?.length > 0) {
      return badRequest(errorsBody);
    }
    const errorsQuery = this.validationQuery.validate(httpRequest?.query);
    if (errorsQuery?.length > 0) {
      return badRequest(errorsQuery);
    }
    const ownerUpdated = await this.updateOwner(
      {
        fields: {
          ...httpRequest?.query,
          createdById: httpRequest?.userId,
        },
        options: {},
      },
      httpRequest?.body
    );
    return ok(ownerUpdated);
  }
}
``` 
Esse código é uma classe chamada "UpdateOwnerController" que é responsável por atualizar os dados do dono do estabelecimento. Antes de atualizar esses dados, são feitas diversas validações para garantir que o horário de funcionamento do estabelecimento esteja válido. Isso é importante porque, se o horário de funcionamento estiver inválido, pode haver erros na aplicação de agendamentos online, como por exemplo, na hora de calcular o horário disponível. As validações são feitas com o objetivo de prevenir erros e garantir a integridade dos dados.

Ele  é um controlador de atualização de proprietários em uma aplicação. É responsável por receber uma requisição HTTP, realizar validações tanto no corpo da requisição quanto na query e, caso não haja erros, invocar o caso de uso de atualização de proprietários.

O controlador extende a classe "Controller" e possui três dependências injetadas no seu construtor: "validationQuery", "validationBody" e "updateOwner". Estes serão objetos que serão utilizados para validação dos dados da requisição e atualização do proprietário, respectivamente.

O método "execute" é o método principal desta classe e é invocado ao receber uma requisição HTTP. Primeiro, ele realiza a validação do corpo da requisição com a função "validate" da dependência "validationBody", armazenando o resultado em "errorsBody". Em seguida, ele invoca a função "daysValidator" passando "errorsBody" e "httpRequest.body" como argumentos, a fim de realizar validações adicionais sobre os dias da semana.

Se existirem propriedades relacionadas a horários na requisição, ele invoca a função "handleHoursErrors" passando "errorsBody" e "httpRequest.body" como argumentos, para validar esses horários.

Caso "errorsBody.length" seja maior que 0, significa que houve erros na validação do corpo da requisição, então ele retorna uma resposta "badRequest" passando "errorsBody" como argumento.

Em seguida, ele realiza a validação da query da requisição com a função "validate" da dependência "validationQuery", armazenando o resultado em "errorsQuery". Se "errorsQuery.length" for maior que 0, significa que houve erros na validação da query, então ele retorna uma resposta "badRequest" passando "errorsQuery" como argumento.

Se não houve erros nas validações, ele invoca a dependência "updateOwner" passando um objeto com os campos da requisição e outro objeto vazio como opções, juntamente com o corpo da requisição. O resultado é armazenado em "ownerUpdated".

Por fim, ele retorna uma resposta "ok" passando "ownerUpdated" como argumento.
```typescript
import { UpdateOwnerRepository } from "@/slices/owner/repositories";
import { OwnerData } from "@/slices/owner/entities";
import { Query } from "@/application/types";
import { cleanDataObject } from "@/application/helpers";

export type UpdateOwner = (query: Query, data: OwnerData) => Promise<OwnerData | null>;
export type UpdateOwnerSignature = (updateOwner: UpdateOwnerRepository) => UpdateOwner;
export const updateOwner: UpdateOwnerSignature =
  (updateOwnerRepository: UpdateOwnerRepository) =>
  async (query: Query, data: OwnerData) => {
    return updateOwnerRepository.updateOwner(
      query,
      cleanDataObject({
        forbiddenFields: ["_id", "createdById", "active"],
        allowedFields: [
          "hourStart1",
          "hourEnd1",
          "hourLunchStart1",
          "hourLunchEnd1",
          "hourStart2",
          "hourEnd2",
          "hourLunchStart2",
          "hourLunchEnd2",
          "hourStart3",
          "hourEnd3",
          "hourLunchStart3",
          "hourLunchEnd3",
          "days1",
          "days2",
          "days3",
        ],
        bodyObject: data,
      })
    );
  };
``` 
Esse código define um caso de uso para atualizar os dados do proprietário do estabelecimento. É composto por três elementos:

1.  A tipagem UpdateOwner, que define o tipo de uma função que será usada para atualizar os dados do proprietário. Ela recebe dois argumentos, um "query" (consulta) e um objeto de dados do proprietário.
    
2.  A tipagem UpdateOwnerSignature, que define o tipo de uma função de assinatura. Ela recebe um objeto de repositório UpdateOwnerRepository e retorna uma função UpdateOwner.
    
3.  A função updateOwner, que é uma implementação da assinatura UpdateOwnerSignature. Ela usa o objeto de repositório UpdateOwnerRepository para atualizar os dados do proprietário, passando como argumento a consulta e os dados limpos. O método cleanDataObject é usado para remover campos proibidos, como "_id", "createdById" e "active", e permitir apenas campos específicos, como horários de funcionamento e dias de funcionamento, antes de passá-los como argumento.
```typescript
import { MissingParamError } from "@/application/errors";

export const daysValidator = ({ errors, body }: any) => {
  if (body?.days1 && body?.days2) {
    const { days1, days2 } = body;
    let days3 = {
      monday3: false,
      sunday3: false,
      thursday3: false,
      wednesday3: false,
      tuesday3: false,
      friday3: false,
      saturday3: false,
    };
    if (body?.days3) {
      days3 = body?.days3;
    }
    const arrDays1 = Object.values(days1);
    const arrDays2 = Object.values(days2);
    const arrDays3 = Object.values(days3);
    for (let i = 0; i < arrDays1.length; i++) {
      if (
        (arrDays1[i] === true && (arrDays2[i] === true || arrDays3[i] === true)) ||
        (arrDays2[i] === true && arrDays3[i] === true)
      ) {
        errors.push(new MissingParamError("days1"));
      }
    }
  }
};
``` 
Essa é uma validação que verifica se existem conflitos entre os horários de funcionamento que o dono do estabelecimento está tentando salvar. É importante validar esses horários antes de salvá-los no banco de dados para evitar erros na aplicação.

A validação checa se existe algum dia da semana que o estabelecimento está marcado como aberto em mais de um período de funcionamento (days1, days2 e days3). Se isso acontecer, uma nova instância de MissingParamError com a mensagem "days1" é adicionada ao vetor de erros.

Essa validação é importante porque, caso sejam salvos horários de funcionamento inválidos, isso pode afetar a forma como a aplicação calcula horários disponíveis para agendamentos online.
```typescript
import { MissingParamError } from "@/application/errors";
import { mapBusinessHours, startOfDay } from "@/application/helpers";

export const useMapBusinessHours = ({ body, index = 1 }: any) => {
  if (!body) {
    return null;
  }
  return mapBusinessHours({
    infoOwner: {
      ...body,
      [`days${index}`]: {
        [`monday${index}`]: true,
        [`sunday${index}`]: true,
        [`tuesday${index}`]: true,
        [`thursday${index}`]: true,
        [`friday${index}`]: true,
        [`wednsday${index}`]: true,
        [`saturday${index}`]: true,
      },
    },
    dateQuery: startOfDay(new Date("2099-09-18T10:00:00.000Z")),
    dayOfWeekFound: "friday",
  });
};
type handleHoursErrorsInput = {
  errors: any;
  body: HourValidatorInput;
};
export const handleHoursErrors = ({ body, errors }: handleHoursErrorsInput) => {
  const isValid = validateHours(body);
  if (!isValid) {
    errors.push(new MissingParamError("hourStart1"));
  }
};
export const validateHours = (body: HourValidatorInput) => {
  const arrayValidations = [1];
  if (body?.hourStart2 && body?.hourEnd2) {
    arrayValidations.push(2);
  }
  if (body?.hourStart3 && body?.hourEnd3) {
    arrayValidations.push(3);
  }
  for (let i = 0; i < arrayValidations.length; i++) {
    const isValid = hourValidator(body, arrayValidations[i]);
    if (!isValid) {
      return false;
    }
  }
  return true;
};
export type HourValidatorInput = {
  hourStart1: string;
  hourEnd1: string;
  hourLunchStart1?: string;
  hourLunchEnd1?: string;
  hourStart2?: string;
  hourEnd2?: string;
  hourLunchStart2?: string;
  hourLunchEnd2?: string;
  hourStart3?: string;
  hourEnd3?: string;
  hourLunchStart3?: string;
  hourLunchEnd3?: string;
};
export const hourValidator = (body: HourValidatorInput, index = 1) => {
  const { hourStart, hourEnd, hourLunchStart, hourLunchEnd, haveLunchTime } =
    useMapBusinessHours({ body, index }) || {};
  if (!hourStart || !hourEnd) {
    return false;
  }
  if (hourEnd <= hourStart) {
    return false;
  }
  if (haveLunchTime && hourLunchEnd && hourLunchStart) {
    if (hourLunchEnd <= hourLunchStart) {
      return false;
    }
    if (hourLunchStart <= hourStart) {
      return false;
    }
    if (hourLunchEnd >= hourEnd) {
      return false;
    }
  }
  return true;
};
``` 
Este código é uma implementação de várias funções relacionadas à validação de horários de funcionamento.

A função useMapBusinessHours é usada para mapear as horários de funcionamento. Ela recebe um objeto como parâmetro, que deve conter um atributo body. Se o atributo body não estiver presente, a função retorna null. Caso contrário, a função retorna o resultado de chamar a função mapBusinessHours com um objeto contendo informações sobre as horas de funcionamento e uma data específica (18/09/2099).

A função handleHoursErrors é usada para lidar com erros na validação de horários de funcionamento. Ela recebe um objeto com dois atributos: body e errors. A função chama a função validateHours com o atributo body e verifica se o resultado é válido. Se não for válido, a função adiciona uma nova instância de MissingParamError com a mensagem "hourStart1" ao array errors.

A função validateHours é usada para validar as horário de funcionamento. Ela recebe um objeto body que contém informações sobre as horário de funcionamento. A função cria um array chamado arrayValidations e adiciona o número 1 a ele. Em seguida, verifica se os atributos hourStart2 e hourEnd2 estão presentes no objeto body. Se estiverem, adiciona o número 2 ao array arrayValidations. O mesmo processo é repetido para os atributos hourStart3 e hourEnd3. Finalmente, a função itera sobre o array arrayValidations e chama a função hourValidator para cada item do array. Se todas as chamadas retornarem true, a função validateHours retorna true. Caso contrário, retorna false.

A função hourValidator é usada para validar uma única entrada de horários de funcionamento. Ela recebe um objeto body que contém informações sobre as horário de funcionamento e um índice opcional (padrão é 1). A função usa a função useMapBusinessHours para obter informações sobre as horário de funcionamento e verifica se os atributos hourStart, hourEnd, hourLunchStart e hourLunchEnd estão presentes. Se o atributo hourEnd for menor ou igual ao atributo hourStart, a função retorna false. Se o atributo haveLunchTime for verdadeiro, a função verifica se o horário de almoço é válido verificando se o hourLunchStart está entre o hourStart e hourEnd e se o hourLunchEnd está entre o hourLunchStart e hourEnd. Se tudo estiver correto, a função retorna true. Caso contrário, retorna false.

Resumindo, as funções descritas são importantes para uma API de agendamentos online pois garantem a validação correta dos horários de funcionamento, o que é fundamental para evitar erros e garantir a eficiência e confiabilidade da API. A função useMapBusinessHours é responsável por mapear os horários de funcionamento e verificar se os dados necessários estão presentes. A função handleHoursErrors é importante para lidar com erros na validação dos horários, garantindo que o sistema não seja comprometido por dados inválidos. A função validateHours é responsável por realizar a validação dos horários de funcionamento e garantir que eles estejam corretos. Finalmente, a função hourValidator é responsável por validar cada entrada individualmente, garantindo que os horários estejam corretos e evitando erros de entrada de dados. Todas essas funções trabalham juntas para garantir que a API de agendamentos online seja confiável e eficiente, o que é fundamental para o sucesso do sistema.
```typescript
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadAverageRatingResult } from "@/slices/ratingResult/useCases";

export class LoadAverageRatingResultController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadAverageRatingResult: LoadAverageRatingResult
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const { page, sortBy, typeSort = "asc", ...rest } = httpRequest?.query || {};
    const fields = rest;
    const sort = { [sortBy]: typeSort === "asc" ? 1 : -1 };
    const options = { sort, page };
    const ratingResultLoaded = await this.loadAverageRatingResult({
      fields,
      options,
    });
    return ok(ratingResultLoaded);
  }
}
``` 
Este é um controller responsável por listar a média de estrelas de cada avaliação. O controller é definido a partir da classe LoadAverageRatingResultController que estende a classe Controller.

A classe possui um construtor que recebe como parâmetros uma instância da classe Validation e uma instância da classe LoadAverageRatingResult. Essas duas instâncias são usadas dentro do método execute.

O método execute é usado para executar a ação de listagem da média de estrelas. Ele recebe como parâmetro um objeto HttpRequest que contém informações sobre a requisição HTTP feita para a API.

A primeira ação do método é validar os parâmetros recebidos na requisição HTTP. Se houver erros na validação, a função retorna um objeto HttpResponse com o código HTTP 400 (badRequest).

Em seguida, o método extrai as informações relevantes dos parâmetros da requisição (como página, ordenação, tipo de ordenação, etc.) e as armazena em variáveis diferentes.

Depois disso, o método chama a função loadAverageRatingResult passando informações sobre os campos a serem listados e as opções de ordenação. O resultado da chamada é armazenado em uma variável.

Por fim, o método retorna um objeto HttpResponse com o código HTTP 200 (ok) e o resultado da chamada da função loadAverageRatingResult.

Em resumo, este controller é importante para que a API de agendamentos possa listar a média de estrelas das avaliações de forma organizada e de acordo com os parâmetros fornecidos na requisição HTTP.
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadAverageRatingResultFactory } from "@/slices/ratingResult/useCases";
import { LoadAverageRatingResultController } from "@/slices/ratingResult/controllers";

export const makeLoadAverageRatingResultController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadAverageRatingResult",
    new LoadAverageRatingResultController(
      makeValidationComposite(requiredFields),
      makeLoadAverageRatingResultFactory()
    )
  );
};
``` 
Este é um exemplo de factory que retorna uma instância do controller `LoadAverageRatingResultController`. Ele utiliza outras factories para criar suas dependências, como a `makeValidationComposite` que recebe uma lista de campos obrigatórios e retorna uma instância de validação, e a `makeLoadAverageRatingResultFactory` que retorna uma instância da funcionalidade de carregar a média de estrelas de cada avaliação. Além disso, o factory envolve o controller em uma outra camada, o `makeLogController`, que adiciona log a cada execução do controller. O retorno final da factory seria uma instância do controller já configurado com suas dependências e log adicionado.




[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)