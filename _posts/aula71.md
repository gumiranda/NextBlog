---
title: 'Criando o AddCategoryController no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-14T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Bem-vindo à aula de Criando o AddCategoryController! Neste curso, você aprenderá como construir uma funcionalidade importante para aplicações web: adicionar categorias a um sistema. Aprenderá a trabalhar com rotas, controllers, validações e interações com o banco de dados. Ao final desta aula, você terá desenvolvido habilidades fundamentais para criar aplicações web dinâmicas e escaláveis. Vamos começar!

Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddCategory } from "@/slices/category/useCases";

export class AddCategoryController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addCategory: AddCategory
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const categoryCreated = await this.addCategory({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(categoryCreated);
  }
}
``` 
Este é o código do AddCategoryController, responsável por adicionar uma categoria. Ele é uma classe que implementa a interface Controller. O construtor recebe duas dependências: a validação e o caso de uso AddCategory. O método execute recebe como entrada uma requisição HTTP, e retorna uma resposta HTTP.

Antes de prosseguir com a execução do caso de uso, é feita uma validação dos dados da requisição, caso existam erros de validação, é retornado um bad request. Caso contrário, o caso de uso é invocado com os dados da requisição e o ID do usuário que fez a requisição. A resposta é um objeto com a categoria criada.
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeAddCategoryFactory } from "@/slices/category/useCases";
import { AddCategoryController } from "@/slices/category/controllers";

export const makeAddCategoryController = (): Controller => {
  const requiredFields = ["name"];
  return makeLogController(
    "addCategory",
    new AddCategoryController(
      makeValidationComposite(requiredFields),
      makeAddCategoryFactory()
    )
  );
};
``` 
Este é um código de factory que é responsável por criar uma instância do controlador `AddCategoryController`. A factory usa as factories `makeValidationComposite` e `makeAddCategoryFactory` para criar uma instância da camada de validação e da camada de caso de uso, respectivamente. Além disso, a factory também usa o `makeLogController` para adicionar a capacidade de log ao controlador antes de retorná-lo.

A factory `makeValidationComposite` é chamada com o array de campos obrigatórios "name" e retorna uma instância da camada de validação. A factory `makeAddCategoryFactory` não precisa de nenhum parâmetro e retorna uma instância da camada de caso de uso.

Finalmente, a factory `makeLogController` é chamada com os nomes "addCategory" e a instância do controlador `AddCategoryController` criada com as factories anteriores como parâmetros. Isso adiciona a capacidade de log ao controlador e retorna a instância modificada.

https://github.com/gumiranda/CrazyStackNodeJs/commit/4dd1d8657acd8e91e27e23e669c38285ebc36f89

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)