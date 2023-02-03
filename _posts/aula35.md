---
title: 'Contract LoadAvailableTimesRepository no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-18T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, você aprenderá sobre o contrato de repositório "LoadAvailableTimesRepository". Este contrato representa a interface que deve ser implementada para fornecer a funcionalidade de carregar horários disponíveis. É uma camada intermediária entre a camada de serviço e a camada de armazenamento de dados, que define a funcionalidade que deve ser fornecida pelo repositório de dados para a camada de serviço. A implementação desse contrato fornecerá a abstração necessária para a camada de serviço para acessar os dados de horários disponíveis de maneira genérica e sem se preocupar com a fonte de dados específica.

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