---
title: 'Gerenciando status no CrazyStack Node.js'
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
export const NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_FUTURE = [1, 2, 3, 5, 6, 7, 8];
export const NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_PAST = [9, 10, 11];

export const ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_RATE = 5000;
export const ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_CANCEL = -60;
export const ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_RESCHEDULE = -50;

export const CANCELLED_STATUS_ARRAY = [2, 3];
export const RESCHEDULE_STATUS_ARRAY = [5, 6];
export const RATED_STATUS_ARRAY = [11, 9];
import { differenceInMinutes } from "@/application/helpers/dateFns";
import { RequestData } from "@/slices/request/entities";
import {
  NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_FUTURE,
  NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_PAST,
  ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_RATE,
  ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_CANCEL,
  ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_RESCHEDULE,
  CANCELLED_STATUS_ARRAY,
  RESCHEDULE_STATUS_ARRAY,
  RATED_STATUS_ARRAY,
} from "@/application/constants";

export type StatusIsValidInput = {
  currentRequest: RequestData;
  newStatus: number;
};

export const statusIsValid = (statusIsValidInput: StatusIsValidInput): boolean => {
  const { currentRequest, newStatus = 99 } = statusIsValidInput || {};
  if (!currentRequest || newStatus < 0 || newStatus > 11) {
    return false;
  }
  const { status, initDate: initDateAux } = currentRequest;
  if (status === 0 && newStatus === 4) {
    return true;
  }
  const initDate = new Date(initDateAux);
  const differenceInMinutesBetweenAppointmentDateAndNow: number = differenceInMinutes(
    new Date(),
    initDate
  );
  const appointmentWasHappened = differenceInMinutesBetweenAppointmentDateAndNow > 0;
  const cannotChangeStatusBecauseOfAppointmentDate =
    (NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_FUTURE.includes(newStatus) &&
      appointmentWasHappened) ||
    (NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_PAST.includes(newStatus) &&
      !appointmentWasHappened);
  if (cannotChangeStatusBecauseOfAppointmentDate) {
    return false;
  }
  const validStatusArray = getValidStatusForNewStatus(newStatus);
  if (
    CANCELLED_STATUS_ARRAY.includes(newStatus) &&
    validStatusArray.includes(status) &&
    differenceInMinutesBetweenAppointmentDateAndNow >
      ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_CANCEL
  ) {
    return false;
  } else if (
    RESCHEDULE_STATUS_ARRAY.includes(newStatus) &&
    validStatusArray.includes(status) &&
    differenceInMinutesBetweenAppointmentDateAndNow >
      ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_RESCHEDULE
  ) {
    return false;
  } else if (
    RATED_STATUS_ARRAY.includes(newStatus) &&
    validStatusArray.includes(status) &&
    differenceInMinutesBetweenAppointmentDateAndNow >
      ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_RATE
  ) {
    return false;
  } else if (validStatusArray.includes(status)) {
    return true;
  }
  return false;
};

export const getValidStatusForNewStatus = (newStatus: number): number[] => {
  switch (newStatus) {
    case 1:
    case 2:
    case 3:
      return [0];
    case 5:
    case 6:
      return [0, 1, 2, 3, 4, 7];
    case 7:
    case 8:
      return [5, 6];
    case 9:
      return [1, 7];
    case 10:
      return [1, 7, 9];
    case 11:
      return [10];
    default:
      return [];
  }
};
``` 
Esse código define uma função chamada "statusIsValid" que é utilizada para validar se é possível mudar o status de um agendamento. Ele usa várias constantes e funções auxiliares, como "differenceInMinutes" e "getValidStatusForNewStatus", para determinar se é possível mudar o status de um agendamento baseado na data e hora do agendamento, no status atual do agendamento e no novo status desejado. Também exporta algumas constantes relacionadas ao processo de agendamento, como "NEW_STATUS_ARRAY_THAT_NEEDS_APPOINTMENT_IN_FUTURE" e "ACCEPTABLE_DIFFERENCE_IN_MINUTES_TO_RATE". Isso é importante para garantir que os agendamentos sejam gerenciados de forma consistente e precisa, garantindo que os usuários não possam mudar o status de um agendamento de forma imprópria ou em momentos inapropriados.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)