---
title: 'Controllers de User no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-20T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Bem-vindos à aula de Controllers de User. Neste tópico, abordaremos como construir os controllers de User utilizando as operações de inserção, exclusão, atualização, carregamento e paginação dos usuários. Veremos como utilizar as Use Cases para manipular a camada de negócio, enquanto que os controllers ficarão responsáveis por lidar com a requisição HTTP e a resposta a ser retornada ao cliente. Também abordaremos sobre a criação de um padrão de construção de controllers, utilizando o padrão de projeto de fábricas, para a geração dinâmica de controllers em outros domínios da aplicação.

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
import { LoadUserByPageGeoNear } from "@/slices/user/useCases";

export class LoadUserByPageGeoNearController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUserByPageGeoNear: LoadUserByPageGeoNear
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
    const options = { sort, page, userLoggedId: httpRequest?.userId };
    const userLoaded = await this.loadUserByPageGeoNear({
      fields,
      options,
    });
    return ok(userLoaded);
  }
}
``` 
Este é o código de um controlador que carrega usuários por página usando a funcionalidade "GeoNear". O controlador estende a classe "Controller" da camada de infraestrutura.

O controlador tem dois atributos: "validation" e "loadUserByPageGeoNear". A primeira é uma instância de "Validation" e a segunda é uma instância de "LoadUserByPageGeoNear". Estes dois atributos são passados para o controlador através do construtor.

O método "execute" é implementado na classe "LoadUserByPageGeoNearController". Este método recebe uma solicitação HTTP como entrada e retorna uma resposta HTTP.

Primeiro, o método verifica se existem erros na query da solicitação HTTP usando a classe "Validation". Se houver erros, o método retorna uma resposta HTTP com o status "400 (Bad Request)" e os erros.

Em seguida, o método desestrutura os dados da query da solicitação HTTP em três variáveis: "page", "sortBy" e "typeSort". A variável "rest" armazena todos os outros campos da query.

A variável "sort" é criada a partir dos dados da query, usando "sortBy" para especificar o nome do campo a ser usado para classificar os usuários e "typeSort" para especificar se a classificação é "asc"endente ou "desc"endente. Se "typeSort" não for especificado, o valor padrão é "asc".

A variável "options" é criada a partir das informações de "page", "sort" e o ID do usuário logado.

Finalmente, o método "loadUserByPageGeoNear" é chamado com os campos da query e as opções como entrada e a resposta é retornada como resposta HTTP com o status "200 (OK)".
```typescript
import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeLoadUserByPageGeoNearFactory } from "@/slices/user/useCases";
import { LoadUserByPageGeoNearController } from "@/slices/user/controllers";

export const makeLoadUserByPageGeoNearController = (): Controller => {
  const requiredFields = ["page"];
  return makeLogController(
    "loadUserByPageGeoNear",
    new LoadUserByPageGeoNearController(
      makeValidationComposite(requiredFields),
      makeLoadUserByPageGeoNearFactory()
    )
  );
};
``` 
Esse código é uma função factory que retorna um novo controlador para carregar usuários por página utilizando uma busca próxima geográfica. Ela importa vários módulos e utiliza uma função factory para criar um conjunto de validação de campos obrigatórios e uma função factory para criar uma instância da camada de negócios que carrega usuários por página e geolocalização. Além disso, ele aplica um decorador de log que registra as informações da chamada para esse controlador. Por fim, ele retorna uma nova instância do controlador LoadUserByPageGeoNearController, que utiliza essas duas instâncias de camada de negócios e validação para executar a ação de carregamento de usuários.


https://github.com/gumiranda/CrazyStackNodeJs/commit/e9853764214a2c1ebe875508e4b1ae1e78b4ada8


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)