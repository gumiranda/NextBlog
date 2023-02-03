---
title: 'Update e Delete Category Controller no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-16T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, você aprenderá sobre o Update e Delete Category Controller. Estes controladores são responsáveis por atualizar e remover categoria(s) na base de dados. Vamos discutir como eles funcionam e como são integrados com as camadas de negócio e infraestrutura da aplicação. Além disso, você verá como criar controladores seguros e eficientes para garantir que as atualizações e exclusões de categoria sejam realizadas corretamente. Esta é uma parte fundamental da construção de uma aplicação de gerenciamento de categorias, então fique atento!

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
import { DeleteCategory } from "@/slices/category/useCases";

export class DeleteCategoryController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteCategory: DeleteCategory
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const categoryDeleteed = await this.deleteCategory({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(categoryDeleteed);
  }
}
``` 
Este é o código para o controlador de exclusão de categoria. Ele extende a classe abstrata "Controller" e implementa o método "execute".

O método "execute" aceita uma requisição HTTP como entrada e retorna uma resposta HTTP. Primeiro, ele valida os dados da requisição usando o objeto "Validation" e retorna uma resposta "badRequest" com os erros, se houver algum. Em seguida, ele chama o caso de uso "deleteCategory" para excluir a categoria especificada. Finalmente, ele retorna uma resposta "ok" com os dados da categoria excluída.
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeDeleteCategoryFactory } from "@/slices/category/useCases";
import { DeleteCategoryController } from "@/slices/category/controllers";

export const makeDeleteCategoryController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "deleteCategory",
    new DeleteCategoryController(
      makeValidationComposite(requiredFields),
      makeDeleteCategoryFactory()
    )
  );
};
``` 
Este código é uma implementação do controlador de exclusão de categoria. O arquivo exporta uma função chamada `makeDeleteCategoryController`, que retorna um objeto do tipo `Controller`.

A função `makeDeleteCategoryController` usa a função `makeLogController` do módulo `@/application/decorators/logControllerFactory`, que é um decorador que adiciona logging às requisições HTTP. Em seguida, ela cria uma instância de `DeleteCategoryController` passando como parâmetros um objeto de validação e uma fábrica de caso de uso de exclusão de categoria.

A validação é criada usando a função `makeValidationComposite` do módulo `@/application/factories`, que é responsável por criar um objeto de validação. Nesta implementação, a validação exige que o campo `_id` esteja presente.

O caso de uso de exclusão de categoria é criado usando a função `makeDeleteCategoryFactory` do módulo `@/slices/category/useCases`.

O controlador de exclusão de categoria implementa a função `execute`, que é chamada para manipular a requisição HTTP. Esta função valida se os campos requeridos estão presentes, executa o caso de uso de exclusão de categoria e, em seguida, retorna uma resposta HTTP bem-sucedida com o resultado da exclusão.

```typescript
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { UpdateCategory } from "@/slices/category/useCases";

export class UpdateCategoryController extends Controller {
  constructor(
    private readonly validationQuery: Validation,
    private readonly validationBody: Validation,
    private readonly updateCategory: UpdateCategory
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
    const categoryUpdated = await this.updateCategory(
      {
        fields: {
          ...httpRequest?.query,
          createdById: httpRequest?.userId,
        },
        options: {},
      },
      httpRequest?.body
    );
    return ok(categoryUpdated);
  }
}
``` 
Este é o código de um controlador de atualização de categoria. Ele é responsável por atualizar uma categoria existente com base em um objeto HTTPRequest.

A classe herda da classe Controller, que é uma interface para controladores em geral. O construtor da classe recebe duas instâncias da classe Validation (para validar o corpo da requisição e a query) e uma instância da classe UpdateCategory, que é responsável por atualizar a categoria.

O método execute() desta classe é chamado para tratar uma requisição HTTP. Ele valida o corpo e a query da requisição e, se não houver erros, chama o método updateCategory() passando as informações necessárias. Finalmente, ele retorna uma resposta HTTP com o resultado da atualização da categoria.
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateCategoryFactory } from "@/slices/category/useCases";
import { UpdateCategoryController } from "@/slices/category/controllers";

export const makeUpdateCategoryController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateCategory",
    new UpdateCategoryController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateCategoryFactory()
    )
  );
};
``` 
Este é um código para criar um controlador de atualização de categoria. Primeiro, ele importa a função `makeLogController` do decorador `logControllerFactory`, a função `makeValidationComposite` da fábrica de validação, a interface `Controller` da infraestrutura de contratos, a fábrica `makeUpdateCategoryFactory` de casos de uso de atualização de categoria e o controlador `UpdateCategoryController`.

Em seguida, a função `makeUpdateCategoryController` é exportada e retorna o controlador de atualização de categoria, que é uma instância da classe `UpdateCategoryController`. Ele cria dois objetos de validação, um para a query e outro para o corpo da requisição HTTP. O primeiro objeto de validação é criado com o campo obrigatório "_id", enquanto o segundo objeto de validação não tem campos obrigatórios.

Por fim, a função `makeLogController` é chamada para criar o controlador logado e retorna o controlador atualizado de categoria.

Estes controllers de categoria (add, delete, update, load, loadbypage) são uma base valiosa para o desenvolvimento de outras funcionalidades dentro da nossa aplicação. Eles servem como modelos para a geração de controllers de outros domínios através do uso da lib plop.js.

Com a plop.js, podemos gerar novos controllers de maneira rápida e eficiente, personalizando-os de acordo com as necessidades do novo domínio, sem precisar escrever todo o código do zero. Isso garante que todos os controllers gerados tenham a mesma estrutura, o que facilita a manutenção e o entendimento do código por outros desenvolvedores.

Além disso, a utilização dos controllers de categoria como base para outros controllers garante a consistência na implementação das funcionalidades da nossa aplicação, tornando-a mais coesa e organizada.

Em resumo, os controllers de categoria são uma ferramenta valiosa para a geração de controllers de outros domínios da nossa aplicação, ajudando a manter a consistência e a organização do código, além de tornar o desenvolvimento mais rápido e eficiente.

https://github.com/gumiranda/CrazyStackNodeJs/commit/3c15745f1b5e8c26a2e213b13934635fec9b52b2


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)