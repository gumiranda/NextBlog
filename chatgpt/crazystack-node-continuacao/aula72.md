---
title: 'LoadCategory e ByPage Controllers no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-15T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Bem-vindo à aula sobre LoadCategory e ByPage Controllers!

Nesta aula, você aprenderá como criar dois importantes controladores em sua aplicação: o LoadCategory Controller e o LoadByPage Controller. Esses controladores são responsáveis por lidar com as requisições relacionadas à categoria, como carregar uma categoria específica e listar categorias por página.

Você aprenderá a usar técnicas como injeção de dependência, criação de fábricas de casos de uso e validações para garantir a consistência e a segurança dos dados. Além disso, você também aprenderá sobre o padrão de projeto Controller, que é uma camada intermediária entre as requisições HTTP e as camadas de negócios de sua aplicação.

Prepare-se para aprender sobre conceitos importantes em desenvolvimento de aplicações e construir controladores poderosos e flexíveis!

Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

```typescript
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadCategory } from "@/slices/category/useCases";

export class LoadCategoryController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadCategory: LoadCategory
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const categoryLoaded = await this.loadCategory({
      fields: httpRequest?.query,
      options: {},
    });
    return ok(categoryLoaded);
  }
}
``` 
Este é o LoadCategoryController, ele é responsável por carregar categorias de acordo com os campos e opções especificados. Ele usa a classe LoadCategory, que é uma das UseCases criadas para gerenciar as categorias, para obter as informações.

O LoadCategoryController é um tipo de Controller, que é uma camada intermediária entre a camada de roteamento e a camada de negócio. Ele tem a função de validar os dados da requisição, chamar a UseCase, processar a resposta e retornar uma resposta HTTP para o cliente.

A validação é feita através da classe Validation, que verifica se todos os campos necessários para a requisição estão presentes. Se houver algum erro na validação, é retornado um código HTTP 400 (bad request) com a lista de erros.

Se a validação for bem-sucedida, o LoadCategoryController chama a UseCase LoadCategory passando os campos e opções da requisição. O resultado é processado e retornado ao cliente como uma resposta HTTP 200 (ok) com os dados da categoria carregada.
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadCategoryFactory } from "@/slices/category/useCases";
import { LoadCategoryController } from "@/slices/category/controllers";

export const makeLoadCategoryController = (): Controller => {
  const requiredFields = ["_id"];
  return makeLogController(
    "loadCategory",
    new LoadCategoryController(
      makeValidationComposite(requiredFields),
      makeLoadCategoryFactory()
    )
  );
};
``` 
Este código é uma implementação de um controlador responsável por carregar uma categoria a partir de um id fornecido como parâmetro.

Ele importa diversas funções e classes do pacote "@/application" e "@/slices/category". Em seguida, é definida a classe LoadCategoryController que herda da classe Controller. A classe LoadCategoryController possui uma instância da classe Validation e da função makeLoadCategoryFactory.

A função execute recebe um objeto HttpRequest e retorna uma Promise que, ao ser resolvida, retorna um objeto HttpResponse. A função valida se o id da categoria está presente na query do HttpRequest. Se houver algum erro de validação, a função retorna um objeto HttpResponse com o status code 400 (bad request) e a lista de erros. Caso contrário, a função loadCategory é invocada com o id da categoria e uma lista vazia de opções e o resultado é retornado como um objeto HttpResponse com o status code 200 (ok).

Por fim, é definida a função makeLoadCategoryController que, quando invocada, cria uma instância da classe LoadCategoryController e a envolve com a função makeLogController para habilitar o log de suas invocações. Esta função é útil para fornecer uma instância já configurada do LoadCategoryController a ser utilizada em outras partes do sistema.
```typescript
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { LoadCategoryByPage } from "@/slices/category/useCases";

export class LoadCategoryByPageController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadCategoryByPage: LoadCategoryByPage
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
    const categoryLoaded = await this.loadCategoryByPage({
      fields,
      options,
    });
    return ok(categoryLoaded);
  }
}
``` 
Esse é o código de um controlador da aplicação que é responsável por carregar categorias por página. Ele usa a classe LoadCategoryByPageController que é uma subclasse da classe Controller do módulo "@/application/infra/contracts".

O controlador recebe uma requisição HTTP como entrada e retorna uma resposta HTTP. A requisição pode conter consulta na URL e o controlador acessa esta informação através do objeto httpRequest.

O construtor da classe LoadCategoryByPageController recebe duas dependências: a primeira é uma instância da classe Validation e a segunda é uma instância da classe LoadCategoryByPage. As dependências são usadas para validar os dados da requisição e carregar as categorias por página, respectivamente.

O método execute() é chamado para processar a requisição. Nele, os dados da requisição são validados usando a instância da classe Validation. Se houver erros de validação, a função retorna um objeto de resposta HTTP com o status 400 (bad request) e os erros encontrados.

Se não houver erros de validação, o controlador extrai os dados da requisição, como page, sortBy, typeSort, e os campos restantes. Em seguida, ele usa a instância da classe LoadCategoryByPage para carregar as categorias por página. O resultado é retornado como objeto de resposta HTTP com o status 200 (ok).
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadCategoryByPageFactory } from "@/slices/category/useCases";
import { LoadCategoryByPageController } from "@/slices/category/controllers";

export const makeLoadCategoryByPageController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadCategoryByPage",
    new LoadCategoryByPageController(
      makeValidationComposite(requiredFields),
      makeLoadCategoryByPageFactory()
    )
  );
};
``` 
Este código é a fábrica que cria o controlador `LoadCategoryByPageController`.

A função `makeLoadCategoryByPageController` retorna uma instância do `Controller`, que é uma interface comum para todos os controladores da aplicação.

A fábrica utiliza o decorador `makeLogController` para logar as ações realizadas pelo controlador.

A fábrica também cria a validação dos campos obrigatórios com `makeValidationComposite` (nesse caso, apenas o campo "page" é obrigatório).

Por fim, a fábrica instancia o `LoadCategoryByPageController` com as dependências já criadas (validação e a fábrica de carregamento de categorias por página), passando as informações para o decorador `makeLogController`, que retorna o controlador final.
https://github.com/gumiranda/CrazyStackNodeJs/commit/543020d4f9383c89f0f4aac892fe961086362e6e


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)