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
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
import {
  validateAvailableTimes,
  ValidateAvailableTimes,
} from "@/slices/appointment/useCases";
/* eslint-disable no-unsafe-optional-chaining */
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
    const appointmentLoaded = await this.loadAvailableTimes(httpRequest?.query);
    return ok(appointmentLoaded);
  }
}
``` 
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
```typescript
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadRatingResult } from "@/slices/ratingResult/useCases";

export class LoadRatingResultController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadRatingResult: LoadRatingResult
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const ratingResultLoaded = await this.loadRatingResult({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(ratingResultLoaded);
  }
}
``` 
```typescript
import { MongoRepository } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import {
  loadAverageRatingResult,
  LoadAverageRatingResult,
} from "@/slices/ratingResult/useCases";

export const makeLoadAverageRatingResultFactory = (): LoadAverageRatingResult => {
  const repository = new RatingResultRepository(new MongoRepository("ratingResult"));
  return loadAverageRatingResult(repository);
};
``` 
 
https://github.com/gumiranda/CrazyStackNodeJs/commit/d0bbb57db62ed27bdf9f1424ef32c6a2558a3a63


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)