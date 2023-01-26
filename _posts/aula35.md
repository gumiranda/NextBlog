---
title: 'Contract LoadAvailableTimesRepository no CrazyStack Node.js'
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
import {
  AvailableTimesModelRepository,
  QueryAvailableTimesRepository,
} from "@/slices/appointment/entities";

export interface LoadAvailableTimesRepository {
  loadAvailableTimes(
    query: QueryAvailableTimesRepository
  ): Promise<AvailableTimesModelRepository | null>;
}
``` 
Esse código importa dois tipos de entidades, AvailableTimesModelRepository e QueryAvailableTimesRepository, ambas de uma pasta específica dentro do projeto. Ele também define uma interface chamada LoadAvailableTimesRepository, que especifica um método chamado "loadAvailableTimes" que deve ser implementado por qualquer classe ou objeto que implemente essa interface. Esse método recebe um parâmetro chamado "query" do tipo QueryAvailableTimesRepository e retorna uma Promessa de um objeto do tipo AvailableTimesModelRepository ou null. A ideia é que essa interface seja implementada por uma classe ou objeto que se comunique com uma fonte de dados (como uma API) para carregar os horários disponíveis de algum serviço.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)