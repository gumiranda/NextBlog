---
title: 'Padrão Composite para Validações e Account Use Cases Factories CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-06T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, vamos aprender sobre o Padrão Composite para Validações e como criar as Factories para os Use Cases de contas de usuário. O Padrão Composite é uma estrutura de design que permite que vários objetos sejam tratados como um único objeto. Isso é útil quando temos várias validações que precisam ser realizadas e precisamos garantir que todas sejam atendidas antes de continuarmos. Além disso, as Factories de Use Cases de contas de usuários são importantes porque nos permitem criar instâncias dos Use Cases de forma fácil e consistente em todo o aplicativo.

Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

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
Este código apresenta a implementação de uma classe de validação para verificar se um dado de entrada é um valor booleano válido (verdadeiro ou falso). A classe implementa a interface Validation e possui um construtor que aceita o nome do campo que será validado. O método validate é responsável por validar a entrada e retornar uma lista de erros, que pode estar vazia se não houver nenhum erro na validação. Se a entrada for diferente de verdadeiro ou falso, é retornado um erro InvalidParamError com o nome do campo que não está válido.

A seguir veremos os códigos de implementação de 4 validações diferentes:

* BooleanValidation: verifica se o valor de um determinado campo é booleano.
* CompareFieldsValidation: verifica se o valor de dois campos são iguais.
* EmailValidation: verifica se o valor de um campo é um endereço de email válido.
* RequiredFieldValidation: verifica se o valor de um campo é presente (não é nulo, indefinido ou vazio).

Essas validações são classes que implementam a interface Validation e retornam um array de erros caso a validação não passe.

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
Esta é a classe `CompareFieldsValidation` que implementa a interface `Validation`. Ela tem como objetivo validar se o valor de um campo é igual ao de outro campo.

A classe tem dois atributos: `fieldName` e `fieldToCompareName`, que são nomes de campos a serem comparados. O método `validate` recebe um objeto `input` como entrada e verifica se o valor do campo `fieldName` é igual ao valor do campo `fieldToCompareName`. Se eles forem diferentes, retorna uma instância de `InvalidParamError` com o nome do campo `fieldToCompareName`. Caso sejam iguais, retorna um array vazio, indicando que a validação foi bem-sucedida.

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
Este código implementa a classe `EmailValidation` que faz parte da camada de validação da aplicação. Ela é responsável por validar se o valor de um determinado campo de entrada é um endereço de email válido.

A classe implementa a interface `Validation` e tem um único atributo, `fieldName`, que é o nome do campo de entrada que será validado.

O método `validate` recebe como entrada um objeto `input` e retorna uma lista de erros. Se o valor do campo de entrada não for um endereço de email válido (verificado através de uma expressão regular), é retornado um objeto `InvalidParamError` indicando o nome do campo que está inválido. Caso contrário, a lista de erros estará vazia.

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
Este é um exemplo de uma classe de validação de número. Ela é usada para garantir que um determinado campo de entrada seja um número válido. Se o campo de entrada não for um número, a classe retorna um erro "InvalidParamError". O construtor da classe recebe o nome do campo que deseja validar, que é usado para acessar o valor do campo na entrada. A função "validate" é chamada para validar o valor do campo, e retorna uma lista de erros, que pode estar vazia ou conter um erro "InvalidParamError" se o valor do campo não for um número válido.
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
Este código implementa uma classe chamada `RequiredFieldValidation` que é responsável por validar se um determinado campo é obrigatório ou não. A classe implementa a interface `Validation`, que é uma interface para validações.

A classe tem um construtor que recebe o nome do campo que deve ser validado, que é armazenado como uma propriedade privada.

A classe tem uma única função, `validate`, que recebe como entrada um objeto `input` e retorna uma lista de erros. A validação é feita verificando se o valor do campo especificado no construtor existe no objeto `input` ou se é igual a 0 ou false. Caso não exista ou não seja nenhum desses valores, é retornado um erro `MissingParamError` especificando o nome do campo que está faltando. Caso contrário, a função retorna uma lista vazia de erros.

A classe `MissingParamError` é importada do arquivo `@/application/errors` e é usada para indicar que um parâmetro obrigatório está faltando.

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
Este é um código para a classe de validação composta. É responsável por agrupar várias validações em uma única entidade, de modo que possam ser executadas em conjunto.

A classe implementa a interface `Validation` e tem uma propriedade privada `validations` que armazena uma lista de objetos de validação. O construtor recebe uma lista de validações e inicializa a propriedade.

A função `validate` é responsável por executar as validações armazenadas na lista de validações. Ele cria uma matriz de erros e, em seguida, executa cada validação da lista, adicionando qualquer erro retornado à matriz de erros. Finalmente, retorna a matriz de erros.
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
Este código é uma função que retorna uma instância da classe `ValidationComposite`. Essa classe é responsável por juntar várias validações diferentes em um só lugar e retornar todos os erros de uma só vez.

A função `makeValidationComposite` tem como entrada um array de nomes de campos que são obrigatórios. A partir desse array, a função instancia vários objetos de validação diferentes, dependendo do tipo de campo.

Os tipos de validações incluem verificar se um campo é obrigatório (`RequiredFieldValidation`), verificar se dois campos são iguais (`CompareFieldsValidation`), verificar se um campo é um email válido (`EmailValidation`), verificar se um campo é um número válido (`NumberValidation`) e verificar se um campo é um valor booleano (`BooleanValidation`).

Ao final, todos esses objetos de validação são adicionados a um array e usados para instanciar um objeto da classe `ValidationComposite`. Esse objeto é retornado pela função.

O padrão Composite permite a construção de uma estrutura de objetos em forma de árvore, em que cada nó da árvore é composto por objetos do mesmo tipo. Isso facilita a validação de campos vindos de uma request HTTP, pois é possível agrupar vários objetos de validação (que podem ser simples ou compostos) em um único objeto, tratando-os de forma homogênea.

Por exemplo, se houver vários campos obrigatórios na request HTTP, em vez de se criar uma validação para cada um deles, é possível criar um único objeto composto por vários objetos de validação de campos obrigatórios. Essa abordagem torna o código mais fácil de manter, pois permite a inserção ou remoção de campos a serem validados de forma simples, sem a necessidade de mudanças complexas no código. Além disso, é possível adicionar facilmente outros tipos de validação, como validações de tipo de dado, validações de comparação entre campos, entre outras, sem afetar as validações já existentes.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)