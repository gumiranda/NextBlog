---
title: 'UseCase LoadAvailableTimes no CrazyStack Node.js'
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
import { LoadServiceRepository } from "@/slices/service/repositories";
import { LoadAvailableTimesRepository } from "@/slices/appointment/repositories";
import {
  AvailableTimesModelRepository,
  QueryAvailableTimesRepository,
  OwnerAppointmentInfo,
  QueryAvailableTimes,
} from "@/slices/appointment/entities";
import { getArrayTimes, queryDateGenerator } from "@/application/helpers/date";
import { LoadUserRepository } from "@/slices/user/repositories";
import { LoadOwnerRepository } from "@/slices/owner/repositories";
import { OwnerData } from "@/slices/owner/entities";

export type LoadAvailableTimes = (query: QueryAvailableTimes) => Promise<any | null>;
export type LoadAvailableTimesSignature = (
  loadAvailableTimesRepository: LoadAvailableTimesRepository,
  serviceRepository: LoadServiceRepository,
  userRepository: LoadUserRepository,
  ownerRepository: LoadOwnerRepository
) => LoadAvailableTimes;
export const loadAvailableTimes: LoadAvailableTimesSignature =
  (loadAvailableTimesRepository, serviceRepository, userRepository, ownerRepository) =>
  async (query: QueryAvailableTimes) => {
    const {
      date = null,
      serviceId = null,
      professionalId = null,
      ownerId = null,
    } = query || {};
    if (!date || !serviceId || !professionalId) {
      return null;
    }
    const service = await serviceRepository.loadService({
      fields: { _id: serviceId },
      options: {},
    });
    if (service?.duration) {
      const {
        dayOfWeekFound = null,
        endDay = null,
        initDay = null,
        dateQuery = null,
      } = queryDateGenerator(date) || {};
      if (!dayOfWeekFound || !endDay || !initDay || !dateQuery) {
        return null;
      }
      const { _id: infoOwner = null, data: appointments = null } =
        (await loadAvailableTimesRepository.loadAvailableTimes({
          professionalId,
          endDay,
          initDay,
        })) || {};
      if (infoOwner && appointments) {
        //esse é o caso em que existem agendamentos para o profissional no dia
        return getArrayTimes({
          infoOwner,
          appointments,
          dateQuery: dateQuery as Date,
          dayOfWeekFound,
          duration: service?.duration,
        });
      }
      if (ownerId) {
        const { ownerId: _id = null }: any =
          (await userRepository.loadUser({
            fields: { _id: ownerId },
            options: {},
          })) || {};
        if (_id) {
          const {
            hourEnd1 = null,
            hourLunchEnd1 = null,
            hourLunchStart1 = null,
            hourStart1 = null,
            hourEnd2 = null,
            hourLunchEnd2 = null,
            hourLunchStart2 = null,
            hourStart2 = null,
            days1 = null,
            days2 = null,
            hourEnd3 = null,
            hourLunchEnd3 = null,
            hourLunchStart3 = null,
            hourStart3 = null,
            days3 = null,
          }: any = (await ownerRepository.loadOwner({
            fields: { _id },
            options: {},
          })) || {};
          if (!days1 || !hourEnd1 || !hourStart1) {
            return null;
          }
          const infoOwnerAux: OwnerAppointmentInfo = {
            hourEnd1,
            hourLunchEnd1,
            hourLunchStart1,
            hourStart1,
            hourEnd2,
            hourLunchEnd2,
            hourLunchStart2,
            hourStart2,
            days1,
            days2,
            hourEnd3,
            hourLunchEnd3,
            hourLunchStart3,
            hourStart3,
            days3,
          };
          return getArrayTimes({
            infoOwner: infoOwnerAux,
            appointments: [],
            dateQuery: dateQuery as Date,
            dayOfWeekFound,
            duration: service?.duration,
          });
        }
      }
    }
    return null;
  };
``` 
Este código é uma função chamada "loadAvailableTimes", que é responsável por carregar os horários disponíveis para agendamento de um serviço de um profissional específico em uma data específica. 
Ela recebe quatro parâmetros: loadAvailableTimesRepository, serviceRepository, userRepository e ownerRepository. Esses parâmetros são repositórios que contêm informações sobre os serviços disponíveis, os usuários e os proprietários. A função também recebe um parâmetro "query", que é um objeto com informações sobre a data, o ID do serviço, o ID do profissional e o ID do proprietário.

Verificamos se os parâmetros necessários (data, ID do serviço e ID do profissional) foram fornecidos e, se não, retorna nulo. Em seguida, a função carrega informações sobre o serviço especificado usando o serviceRepository. Se as informações do serviço forem encontradas e incluírem a duração do serviço, usamos a função "queryDateGenerator" para gerar informações sobre o dia da semana, o dia de início e o dia de término. Se as informações geradas forem válidas, a função usa o loadAvailableTimesRepository para carregar agendamentos existentes para o profissional especificado no intervalo de data especificado. Se esses agendamentos existirem, a função usa a função "getArrayTimes" para gerar um array de horários disponíveis com base nas informações dos agendamentos e das informações do serviço.

Se não houver agendamentos existentes para o profissional, a função verifica se o ID do proprietário foi fornecido e, se sim, usa o userRepository e o ownerRepository para carregar informações sobre o proprietário. Além disso ela usa essas informações para gerar horários disponíveis usando a função "getArrayTimes". Se não houver informações sobre o proprietário ou se os parâmetros necessários não forem fornecidos, a função retorna nulo.

Esse use case é importante em um sistema de agendamentos online pois ele permite ao usuário visualizar as horas disponíveis para marcar um agendamento. Ele utiliza informações como data, id do serviço, id do profissional e id do dono do estabelecimento para buscar as horas disponíveis no banco de dados. Ele também utiliza informações como duração do serviço e horários de atendimento do estabelecimento para calcular as horas disponíveis. Sem esse use case, o usuário teria dificuldades para encontrar horários disponíveis para agendamento e o sistema teria dificuldades para gerenciar esses agendamentos

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)