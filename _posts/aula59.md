---
title: 'Criando LogController e LogRepository para geração de logs de erro CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-04T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, vamos criar dois novos componentes na nossa arquitetura de aplicação, o LogController e o LogRepository, responsáveis por gerar logs de erros em nossa API.
Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

O LogController será uma classe extendida da nossa classe abstrata Controller, e será responsável por receber as informações de erro e enviá-las para o LogRepository para serem registradas.

Já o LogRepository será responsável por armazenar os logs de erro de forma persistente, seja em um banco de dados relacional, arquivo ou qualquer outra forma de armazenamento.

Esses componentes serão importantes para garantir a qualidade e a segurança da nossa aplicação, já que os logs de erro nos permitirão identificar e corrigir rapidamente possíveis falhas ou problemas. Além disso, a classe abstrata Controller nos permite ter uma implementação padronizada e genérica para todos os nossos controladores, o que facilita a manutenção e o desenvolvimento da aplicação.

Em resumo, a criação de um LogController e um LogRepository é uma boa prática para garantir a qualidade e a segurança da nossa API, e a utilização da classe abstrata Controller é uma forma de garantir a padronização e a facilidade na manutenção da nossa aplicação.

Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).
```typescript
export interface LogRepository {
  logError(domain: string, stack: string): Promise<void>;
}
```
Essa é uma interface que define o comportamento esperado de um repositório de logs de erro. Ela contém um método, `logError(domain: string, stack: string)`, que aceita dois parâmetros: `domain` (um string que representa o domínio onde o erro ocorreu) e `stack` (um string que representa a pilha de chamadas que causou o erro). O método retorna uma Promise que, quando resolvida, indica que o log de erro foi registrado com sucesso. Esta interface é utilizada para garantir que todas as implementações de repositórios de log tenham a mesma funcionalidade básica.
```typescript
import { MongoHelper } from "@/application/infra";
import { LogRepository } from "@/application/infra/contracts";

export class LogMongoRepository implements LogRepository {
  async logError(domain: string, stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection("errors");
    await errorCollection.insertOne({ domain, stack, date: new Date() });
  }
}
``` 
Este código representa uma implementação da interface `LogRepository` usando MongoDB como base de dados. A classe `LogMongoRepository` implementa o método `logError` que salva um log de erro em uma coleção "errors".

O método `logError` recebe como parâmetros o nome do domínio onde o erro ocorreu e a pilha de erro (`stack`). Em seguida, usa a classe `MongoHelper` para obter uma instância da coleção "errors" no MongoDB. Por fim, insere um novo documento na coleção com as informações do erro (domínio, pilha e data atual).
```typescript
import { Controller, LogRepository } from "@/application/infra/contracts";
import { HttpRequest, HttpResponse } from "../helpers";
export class LogController implements Controller {
  constructor(
    private readonly domain: string,
    private readonly controller: Controller,
    private readonly logRepository: LogRepository
  ) {}
  execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    return this.controller.execute(httpRequest);
  }
  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const httpResponse = await this.execute(httpRequest);
    if (httpResponse?.statusCode === 500) {
      await this.logRepository.logError(this.domain, httpResponse?.data);
    }
    return httpResponse;
  }
}
``` 
 
Este é o código de uma classe de controlador de log, que implementa a interface `Controller` e utiliza a interface `LogRepository` para armazenar informações sobre erros ocorridos em sua execução. Ele funciona como uma camada de logging de erro adicional que registra erros específicos para o domínio que representa.

A classe tem uma construção que recebe três parâmetros:

* `domain`: representa o domínio específico para o qual o log está sendo gerado.
* `controller`: é um controlador que será envolta pelo controlador de log.
* `logRepository`: é uma instância da classe `LogRepository`, responsável por armazenar os dados de log de erro.

A classe possui dois métodos:

* `execute`: é uma delegação para o método `execute` do controlador que está sendo envolta.
* `handle`: é o método principal da classe, responsável por capturar a resposta HTTP do controlador e verificar se o código de status é 500. Se for, ele utiliza o método `logError` do `logRepository` para armazenar os dados de erro no banco de dados. Em seguida, retorna a resposta HTTP para o controlador original.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)