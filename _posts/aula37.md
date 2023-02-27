---
title: 'UseCase ValidateAvailableTimes no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-20T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

A aula "UseCase ValidateAvailableTimes" é destinada a criar uma camada de validação para garantir que o horário selecionado pelo usuário esteja disponível para agendamento. Ela irá utilizar o UseCase "LoadAvailableTimes" criado na aula anterior e comparar o horário selecionado pelo usuário com o array de horários disponíveis retornados pelo "LoadAvailableTimes". Se o horário estiver disponível, a função retornará verdadeiro, caso contrário, retornará falso. Dessa forma, é possível garantir que o horário agendado seja válido e evitar problemas com horários duplicados ou já agendados.

```typescript
import { intervalsOverlapping } from "@/application/helpers/dateFns";
import { QueryVerifyAvailableTimes } from "@/slices/appointment/entities/AppointmentEntity";
import { LoadAvailableTimes } from "@/slices/appointment/useCases/loadAvailableTimes";
export type ValidateAvailableTimes = (
  query: QueryVerifyAvailableTimes
) => Promise<any | null>;
export const validateAvailableTimes =
  (loadAvailableTimes: LoadAvailableTimes) => async (query: QueryVerifyAvailableTimes) => {
    const { initDate = null, endDate = null } = query || {};
    if (
      !initDate ||
      !endDate ||
      endDate === initDate ||
      new Date(endDate).getTime() <= new Date(initDate).getTime()
    ) {
      return false;
    }
    const { timeAvailable = null, timeAvailableProfessional = null } =
      (await loadAvailableTimes(query)) || {};
    if (!timeAvailable && !timeAvailableProfessional) {
      return false;
    }
    const result = timeAvailable?.find(({ time }: any) => {
      return new Date(time).getTime() === new Date(initDate).getTime();
    });
    if (!result) {
      const resultAlternative = timeAvailableProfessional?.find((time: any) => {
        return intervalsOverlapping(
          new Date(initDate),
          new Date(endDate),
          new Date(time.initDate),
          new Date(time.endDate)
        );
      });
      return !!resultAlternative;
    }
    return true;
  };
``` 
Esse use case é importante em um sistema de agendamentos online porque ele permite verificar se um determinado horário está disponível para agendamento. Ele é responsável por validar se as datas de início e fim do agendamento são válidas e se estão disponíveis no sistema. Ele utiliza a função "loadAvailableTimes" para carregar os horários disponíveis para o profissional e o estabelecimento, e em seguida, verifica se o horário solicitado está contido nesses horários. Ele também utiliza a função "intervalsOverlapping" para verificar se o horário solicitado colide com horários já agendados. Com esse use case, é possível garantir que os agendamentos são feitos de forma precisa e evitar conflitos de horários.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)