---
title: 'Padrão Composite para Validações e Account Use Cases Factories CrazyStack Node.js'
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
import { InvalidParamError } from "@/application/errors";
import { Validation } from "@/application/helpers/contracts";

export class BooleanValidation implements Validation {
  constructor(private readonly fieldName: string) {
    this.fieldName = fieldName;
  }
  validate(input: any): Error[] {
    if (input[this.fieldName] !== true && input[this.fieldName] !== false) {
      return [new InvalidParamError(this.fieldName)];
    }
    return [];
  }
}
``` 

```typescript
import { InvalidParamError } from "@/application/errors";
import { Validation } from "@/application/helpers/contracts";

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {
    this.fieldName = fieldName;
    this.fieldToCompareName = fieldToCompareName;
  }
  validate(input: any): Error[] {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return [new InvalidParamError(this.fieldToCompareName)];
    }
    return [];
  }
}
``` 

```typescript
import { InvalidParamError } from "@/application/errors";
import { Validation } from "@/application/helpers/contracts";

export class EmailValidation implements Validation {
  constructor(private readonly fieldName: string) {
    this.fieldName = fieldName;
  }
  validate(input: any): Error[] {
    const regexEmail = new RegExp(/^\w+([-+,']\w+)*@\w+([-,]\w+)*\.\w+([-.]\w+)*$/);
    if (!regexEmail.test(input[this.fieldName])) {
      return [new InvalidParamError(this.fieldName)];
    }
    return [];
  }
}
``` 

```typescript
import { InvalidParamError } from "@/application/errors";
import { Validation } from "@/application/helpers/contracts";

export class NumberValidation implements Validation {
  constructor(private readonly fieldName: string) {
    this.fieldName = fieldName;
  }
  validate(input: any): Error[] {
    if (isNaN(Number(input[this.fieldName]))) {
      return [new InvalidParamError(this.fieldName)];
    }
    return [];
  }
}
``` 
```typescript
import { MissingParamError } from "@/application/errors";
import { Validation } from "@/application/helpers/contracts";

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {
    this.fieldName = fieldName;
  }
  validate(input: any): Error[] {
    if (
      !input[this.fieldName] &&
      input[this.fieldName] !== 0 &&
      input[this.fieldName] !== false
    ) {
      return [new MissingParamError(this.fieldName)];
    }
    return [];
  }
}
``` 
```typescript
import { Validation } from "@/application/helpers/contracts";

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {
    this.validations = validations;
  }
  validate(input: any): Error[] {
    const arrayErrors = [];
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error) {
        arrayErrors.push(...error);
      }
    }
    return arrayErrors;
  }
}
``` 

```typescript
import {
  Validation,
  RequiredFieldValidation,
  CompareFieldsValidation,
  EmailValidation,
  numberFields,
  NumberValidation,
  booleanFields,
  BooleanValidation,
  ValidationComposite,
} from "@/application/helpers";

export const makeValidationComposite = (requiredFields: Array<string>): Validation => {
  const validations: Validation[] = [];
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field));
  }
  if (requiredFields?.includes?.("passwordConfirmation")) {
    validations.push(new CompareFieldsValidation("password", "passwordConfirmation"));
  }
  if (requiredFields?.includes?.("email")) {
    validations.push(new EmailValidation("email"));
  }
  for (const currentNumberField of numberFields) {
    if (requiredFields?.includes?.(currentNumberField)) {
      validations.push(new NumberValidation(currentNumberField));
    }
  }
  for (const currentBooleanField of booleanFields) {
    if (requiredFields?.includes?.(currentBooleanField)) {
      validations.push(new BooleanValidation(currentBooleanField));
    }
  }
  return new ValidationComposite(validations);
};
``` 



[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)