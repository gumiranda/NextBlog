---
title: 'Manipulando Datas com DateFns no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-17T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

A aula "Manipulando Datas com DateFns" é destinada a ensinar como utilizar a biblioteca "date-fns" para manipulação de datas no seu projeto. Date-fns é uma biblioteca moderna, fácil de usar e eficiente para manipulação de datas no JavaScript. Essa biblioteca fornece uma série de funções que permitem fazer operações comuns com datas, como adicionar dias, semanas, meses, anos, etc. Além disso, ela também permite formatar datas para exibição em diferentes padrões, como o padrão ISO, o padrão americano, o padrão brasileiro, entre outros. Ao final desta aula, você será capaz de usar a biblioteca Date-fns com confiança para manipular datas no seu projeto.

Arquivo date.ts

## Tipos
```typescript
import { OwnerAppointmentInfo } from "@/slices/appointment/entities";
import {
  cloneDate,
  setHours,
  setMinutes,
  setMili,
  setSeconds,
  parseISO,
  differenceInMinutes,
  intervalsOverlapping,
  eachMinuteOfInterval,
} from "@/application/helpers/dateFns";

export type QueryDate = {
  dayOfWeekFound: string;
  endDay: string;
  initDay: string;
  dateQuery: string;
};

export type BusinessHoursInput = {
  infoOwner: OwnerAppointmentInfo;
  dayOfWeekFound: string;
  dateQuery: Date;
};

export type BusinessHoursOutput = {
  hourStart: Date;
  hourEnd: Date;
  hourLunchStart: Date | null;
  hourLunchEnd: Date | null;
  haveLunchTime: boolean;
};
export type GetHoursObjectInput = OwnerAppointmentInfo & {
  dayOfWeek1: string;
  dayOfWeek2: string;
  dayOfWeek3: string;
};
export type GetHoursObjectOutput = {
  hourStart: string[];
  hourEnd: string[];
  hourLunchStart: string[];
  hourLunchEnd: string[];
};
export type GetDateWithCustomHourAndMinutesInput = {
  hours: number;
  minutes: number;
  date: Date;
};
export type GetArrayTimesInput = {
  infoOwner: OwnerAppointmentInfo;
  dayOfWeekFound: string;
  dateQuery: Date;
  appointments: Array<any>;
  duration: number;
};
export type AvailableTimesModel = {
  timeAvailable: Array<any>;
  timeAvailableProfessional: Array<any>;
};
export type FirstStepInput = {
  hourStart: Date;
  hourEnd: Date;
  hourLunchStart: Date | null;
  hourLunchEnd: Date | null;
  haveLunchTime: boolean;
  initDate: Date;
  endDate: Date;
  haveOnlyOneAppointment: boolean;
  dateQuery: Date;
  timeAvailableProfessional: Array<any>;
};
export type SecondStepInput = {
  hourStart: Date;
  hourEnd: Date;
  hourLunchStart: Date | null;
  hourLunchEnd: Date | null;
  haveLunchTime: boolean;
  dateQuery: Date;
  timeAvailableProfessional: Array<any>;
  appointments: Array<any>;
};
export type AddTimeInArrayInput = {
  initDate: Date | string;
  endDate: Date | string;
  array: Array<any>;
  dateQuery: Date;
};
export type Schedule = {
  initDate: any;
  endDate: any;
};
export type CalculateTimeAvailableInput = {
  timeAvailableProfessional: Array<any>;
  duration: number;
  timeAvailable: Array<any>;
};
```
1. OwnerAppointmentInfo: contém informações do proprietário de um agendamento, como horário de funcionamento e horário de almoço.
2. QueryDate: contém informações sobre a data de uma consulta, como o dia da semana, o dia inicial e o dia final.
3. BusinessHoursInput: contém informações de entrada para calcular o horário de funcionamento de um estabelecimento, como informações do proprietário e a data da consulta.
4. BusinessHoursOutput: contém informações de saída sobre o horário de funcionamento de um estabelecimento, incluindo horário de início, horário de término, horário de início e término do almoço, e se há horário de almoço.
5. GetHoursObjectInput: contém informações do proprietário de um agendamento e os dias da semana para os quais se deseja obter informações sobre o horário de funcionamento.
6. GetHoursObjectOutput: contém informações sobre o horário de funcionamento de um estabelecimento, incluindo horário de início, horário de término, horário de início e término do almoço.
7. GetDateWithCustomHourAndMinutesInput: contém informações de entrada para criar uma nova data com horas e minutos específicos, como horas, minutos e uma data existente.
8. GetArrayTimesInput: contém informações de entrada para calcular os horários disponíveis para agendamento, incluindo informações do proprietário, dia da semana, data da consulta, agendamentos existentes e duração do agendamento.
9. AvailableTimesModel: contém informações sobre os horários disponíveis para agendamento, incluindo horários disponíveis para o público e horários disponíveis para profissionais.
10 .FirstStepInput: contém informações de entrada para o primeiro passo do cálculo dos horários disponíveis para agendamento, incluindo informações sobre o horário de funcionamento, data inicial e final, se há apenas um agendamento e data da consulta.
11. SecondStepInput: contém informações de entrada para o segundo passo do cálculo dos horários disponíveis para agendamento

A entidade AddTimeInArrayInput é utilizada para adicionar horários disponíveis em um array. Ela possui quatro propriedades:

1. initDate: Data inicial, pode ser do tipo Date ou string.
2. endDate: Data final, pode ser do tipo Date ou string.
3. array: Array no qual os horários disponíveis serão adicionados.
4. dateQuery: Data para a qual os horários disponíveis serão adicionados.


A entidade Schedule é utilizada para representar um horário de início e fim. Ela possui duas propriedades:

1. initDate: Data inicial.
2. endDate: Data final.

A entidade CalculateTimeAvailableInput é utilizada para calcular os horários disponíveis. Ela possui três propriedades:

1. timeAvailableProfessional: Array com os horários disponíveis do profissional.
2. duration: Duração do agendamento em minutos.
3. timeAvailable: Array com os horários disponíveis para agendamento.


## Função para obter horários de funcionamento de um estabelecimento

```typescript
export const getHoursObject = (
  getHoursInput: GetHoursObjectInput
): GetHoursObjectOutput => {
  const {
    hourEnd1,
    hourLunchEnd1,
    hourLunchStart1,
    hourStart1,
    hourEnd2,
    hourEnd3,
    hourLunchEnd2,
    hourLunchEnd3,
    hourLunchStart2,
    hourLunchStart3,
    hourStart2,
    hourStart3,
    days1,
    days2,
    days3,
    dayOfWeek1,
    dayOfWeek2,
    dayOfWeek3,
  } = getHoursInput || {};
  if (days1 && days1[dayOfWeek1] === true) {
    return {
      hourStart: hourStart1?.split?.(":"),
      hourEnd: hourEnd1?.split?.(":"),
      hourLunchStart: hourLunchStart1?.split?.(":"),
      hourLunchEnd: hourLunchEnd1?.split?.(":"),
    };
  } else if (days2 && days2[dayOfWeek2] === true) {
    return {
      hourStart: hourStart2?.split?.(":"),
      hourEnd: hourEnd2?.split?.(":"),
      hourLunchStart: hourLunchStart2?.split?.(":"),
      hourLunchEnd: hourLunchEnd2?.split?.(":"),
    };
  } else if (days3 && days3[dayOfWeek3] === true) {
    return {
      hourStart: hourStart3?.split?.(":"),
      hourEnd: hourEnd3?.split?.(":"),
      hourLunchStart: hourLunchStart3?.split?.(":"),
      hourLunchEnd: hourLunchEnd3?.split?.(":"),
    };
  }
  return { hourStart: [], hourEnd: [], hourLunchStart: [], hourLunchEnd: [] };
};
```
Essa função "getHoursObject" está recebendo um objeto chamado "getHoursInput" como parâmetro, que é do tipo "GetHoursObjectInput". Ela está retornando um objeto chamado "GetHoursObjectOutput", que possui as propriedades "hourStart", "hourEnd", "hourLunchStart" e "hourLunchEnd" como arrays de strings.
A função está verificando se os dias específicos (dayOfWeek1, dayOfWeek2, dayOfWeek3) estão marcados como verdadeiros no objeto "getHoursInput" e, se sim, retorna as horas de início, fim, almoço de início e fim para esse dia específico. Caso contrário, retorna objetos vazios.
Ela está usando "?." (optional chaining) para verificar se os valores existem e usando "split" para dividir a string da hora em um array com dois elementos, horas e minutos.
 
Exemplo de entrada
```typescript
const input = {
    hourEnd1: "18:00",
    hourLunchEnd1: "12:00",
    hourLunchStart1: "13:00",
    hourStart1: "08:00",
    hourEnd2: "19:00",
    hourEnd3: "20:00",
    hourLunchEnd2: "13:00",
    hourLunchEnd3: "14:00",
    hourLunchStart2: "12:00",
    hourLunchStart3: "13:00",
    hourStart2: "09:00",
    hourStart3: "10:00",
    days1: { monday1: true, tuesday1: false, wednesday1: false, thursday1: false, friday1: false, saturday1: false, sunday1: false },
    days2: { monday2: false, tuesday2: true, wednesda2: false, thursday2: false, friday2: false, saturday2: false, sunday2: false },
    days3: { monday3: false, tuesday3: false, wednesday3: true, thursday3: false, friday3: false, saturday3: false, sunday3: false },
    dayOfWeek1: "monday",
    dayOfWeek2: "tuesday",
    dayOfWeek3: "wednesday"
}
```
Exemplo de saída
```typescript
const output = getHoursObject(input)
console.log(output)
//Output: { hourStart: [ "08", "00" ], hourEnd: [ "18", "00" ], hourLunchStart: [ "13", "00], hourLunchEnd: [ "12", "00" ] }
```

## Funções auxiliares
1. getDateWithCustomHourAndMinutes:

```typescript
export const getDateWithCustomHourAndMinutes = (
  getDateWithCustomHourAndMinutesInput: GetDateWithCustomHourAndMinutesInput
): Date => {
  const { hours, minutes, date } = getDateWithCustomHourAndMinutesInput;
  let dateAux = cloneDate(date);
  dateAux = setHours(dateAux, hours);
  dateAux = setMinutes(dateAux, minutes);
  dateAux = setMili(dateAux, 0);
  dateAux = setSeconds(dateAux, 0);
  return cloneDate(dateAux);
};
```
Exemplo de entrada:
```typescript
getDateWithCustomHourAndMinutes({
  hours: 15,
  minutes: 30,
  date: new Date()
});
//saída   "2022-01-01T15:30:00.000Z"
```
Essa função recebe como entrada um objeto com três propriedades: "hours", "minutes" e "date". A propriedade "hours" representa as horas, a propriedade "minutes" representa os minutos e a propriedade "date" representa a data.
A função cria uma cópia da data passada como entrada, e usa as funções setHours, setMinutes, setMili e setSeconds do date-fns para definir as horas, minutos, milisegundos e segundos da cópia da data com os valores passados como entrada. Por fim, a função retorna a cópia da data com as horas e minutos definidos.

2. mapBusinessHours:

```typescript
export const mapBusinessHours = (
  businessHoursInput: BusinessHoursInput
): BusinessHoursOutput | null => {
  const { infoOwner, dayOfWeekFound, dateQuery } = businessHoursInput;
  const dayOfWeek1 = dayOfWeekFound + "1";
  const dayOfWeek2 = dayOfWeekFound + "2";
  const dayOfWeek3 = dayOfWeekFound + "3";
  const {
    hourStart: hourStartMapped,
    hourEnd: hourEndMapped,
    hourLunchStart: hourLunchStartMapped,
    hourLunchEnd: hourLunchEndMapped,
  } = getHoursObject({
    ...infoOwner,
    dayOfWeek1,
    dayOfWeek2,
    dayOfWeek3,
  });
  if (hourStartMapped?.length < 2 || hourEndMapped?.length < 2) {
    return null;
  }
  const hoursStart = Number(hourStartMapped[0]);
  const minutesStart = Number(hourStartMapped[1]);
  const hourStart = getDateWithCustomHourAndMinutes({
    hours: hoursStart,
    minutes: minutesStart,
    date: dateQuery,
  });
  const hoursEnd = Number(hourEndMapped[0]);
  const minutesEnd = Number(hourEndMapped[1]);
  const hourEnd = getDateWithCustomHourAndMinutes({
    hours: hoursEnd,
    minutes: minutesEnd,
    date: dateQuery,
  });
  const haveLunchTime =
    hourLunchStartMapped?.length === 2 && hourLunchEndMapped?.length === 2;
  if (haveLunchTime) {
    const hoursLunchStart = Number(hourLunchStartMapped[0]);
    const minutesLunchStart = Number(hourLunchStartMapped[1]);
    const hourLunchStart = getDateWithCustomHourAndMinutes({
      hours: hoursLunchStart,
      minutes: minutesLunchStart,
      date: dateQuery,
    });
    const hoursLunchEnd = Number(hourLunchEndMapped[0]);
    const minutesLunchEnd = Number(hourLunchEndMapped[1]);
    const hourLunchEnd = getDateWithCustomHourAndMinutes({
      hours: hoursLunchEnd,
      minutes: minutesLunchEnd,
      date: dateQuery,
    });
    return { hourStart, hourEnd, hourLunchStart, hourLunchEnd, haveLunchTime: true };
  }
  return {
    hourStart,
    hourEnd,
    hourLunchStart: null,
    hourLunchEnd: null,
    haveLunchTime: false,
  };
};
```
Essa função mapBusinessHours recebe como entrada um objeto chamado businessHoursInput, que possui as seguintes propriedades: infoOwner, dayOfWeekFound e dateQuery. O objetivo dessa função é mapear as horas de funcionamento de um negócio (como horário de abertura, horário de almoço e horário de fechamento) com base nas informações contidas em infoOwner, tendo como base o dia da semana encontrado em dayOfWeekFound e a data de consulta em dateQuery.

A função utiliza as funções getHoursObject, getDateWithCustomHourAndMinutes e cloneDate para obter as horas de funcionamento do negócio. A função retorna um objeto chamado BusinessHoursOutput que possui propriedades como hourStart, hourEnd, hourLunchStart e hourLunchEnd, contendo as horas de abertura, fechamento, almoço e fim do almoço. Caso não haja horários de funcionamento para o dia específico, a função retorna null.

3. getArrayTimes:

```typescript
export const getArrayTimes = (
  getArrayTimesInput: GetArrayTimesInput
): AvailableTimesModel => {
  const { infoOwner, dayOfWeekFound, dateQuery, appointments, duration } =
    getArrayTimesInput || {};
  const timeAvailable: any = [];
  const timeAvailableProfessional: any = [];
  const businessHours: BusinessHoursOutput | null = mapBusinessHours({
    infoOwner,
    dayOfWeekFound,
    dateQuery,
  });
  if (!businessHours) {
    return { timeAvailable, timeAvailableProfessional };
  }
  const { hourStart, hourEnd, hourLunchStart, hourLunchEnd, haveLunchTime } =
    businessHours;
  if (appointments?.length > 0) {
    const haveOnlyOneAppointment = appointments.length === 1;
    const [firstAppointment] = appointments;
    const { initDate, endDate } = firstAppointment;
    firstStep({
      hourStart,
      hourEnd,
      hourLunchStart,
      hourLunchEnd,
      haveLunchTime,
      initDate,
      endDate,
      haveOnlyOneAppointment,
      dateQuery,
      timeAvailableProfessional,
    });
    if (!haveOnlyOneAppointment) {
      secondStep({
        hourStart,
        hourEnd,
        hourLunchStart,
        hourLunchEnd,
        haveLunchTime,
        dateQuery,
        timeAvailableProfessional,
        appointments,
      });
    }
  } else {
    if (haveLunchTime) {
      addTimeInArray({
        initDate: hourStart,
        endDate: hourLunchStart as any,
        dateQuery,
        array: timeAvailableProfessional,
      });
      addTimeInArray({
        initDate: hourLunchEnd as any,
        endDate: hourEnd,
        dateQuery,
        array: timeAvailableProfessional,
      });
    } else {
      addTimeInArray({
        initDate: hourStart,
        endDate: hourEnd,
        dateQuery,
        array: timeAvailableProfessional,
      });
    }
  }
  calculateTimeAvailable({
    timeAvailableProfessional,
    duration,
    timeAvailable,
  });
  return { timeAvailable, timeAvailableProfessional };
};
```
A função getArrayTimes tem como entrada um objeto getArrayTimesInput que contém as seguintes propriedades:

1. infoOwner: Informações do proprietário do estabelecimento, como horário de funcionamento.
2. dayOfWeekFound: O dia da semana que se deseja verificar os horários disponíveis.
3. dateQuery: A data que se deseja verificar os horários disponíveis.
4. appointments: Um array de agendamentos já realizados.
5. duration: A duração de cada agendamento em minutos.

A função mapeia os horários de atendimento do profissional, levando em consideração as marcações já existentes e a duração de cada marcação. Ela retorna um objeto com as seguintes propriedades:

1. timeAvailable: Um array com os horários disponíveis para agendamento, com base na duração de cada agendamento.
2. timeAvailableProfessional: Um array com os horários disponíveis para agendamento, sem considerar a duração de cada agendamento.

Exemplo de entrada
```typescript
getArrayTimes({
  infoOwner: {
    monday1: "09:00-12:00",
    monday2: "14:00-18:00",
  },
  dayOfWeekFound: "monday",
  dateQuery: new Date("2022-01-01"),
  appointments: [
    {
      initDate: new Date("2022-01-01T10:00:00"),
      endDate: new Date("2022-01-01T11:00:00"),
    },
    {
      initDate: new Date("2022-01-01T15:00:00"),
      endDate: new Date("2022-01-01T16:00:00"),
    },
  ],
  duration: 30,
}) 
```

## firstStep e secondStep

```typescript
export const firstStep = (firstStepInput: FirstStepInput): void => {
  const {
    hourStart,
    hourEnd,
    hourLunchStart,
    hourLunchEnd,
    haveLunchTime,
    initDate,
    endDate,
    haveOnlyOneAppointment,
    dateQuery,
    timeAvailableProfessional,
  } = firstStepInput || {};
  if (haveLunchTime === true) {
    const insideFirstHalf = intervalsOverlapping(
      initDate,
      endDate,
      hourStart,
      hourLunchStart
    );
    const insideSecondHalf = intervalsOverlapping(
      initDate,
      endDate,
      hourLunchEnd,
      hourEnd
    );
    if (insideFirstHalf) {
      addTimeInArray({
        initDate: hourStart,
        endDate: parseISO(initDate as any),
        dateQuery,
        array: timeAvailableProfessional,
      });
      if (haveOnlyOneAppointment) {
        addTimeInArray({
          initDate: parseISO(endDate as any),
          endDate: hourLunchStart as any,
          dateQuery,
          array: timeAvailableProfessional,
        });
        addTimeInArray({
          initDate: hourLunchEnd as any,
          endDate: hourEnd,
          dateQuery,
          array: timeAvailableProfessional,
        });
      }
    } else if (insideSecondHalf) {
      addTimeInArray({
        initDate: hourStart,
        endDate: hourLunchStart as any,
        dateQuery,
        array: timeAvailableProfessional,
      });
      addTimeInArray({
        initDate: hourLunchEnd as any,
        endDate: parseISO(initDate as any),
        dateQuery,
        array: timeAvailableProfessional,
      });
      if (haveOnlyOneAppointment) {
        addTimeInArray({
          initDate: parseISO(endDate as any),
          endDate: hourEnd,
          dateQuery,
          array: timeAvailableProfessional,
        });
      }
    }
  } else {
    addTimeInArray({
      initDate: hourStart,
      endDate: parseISO(initDate as any),
      dateQuery,
      array: timeAvailableProfessional,
    });
    if (haveOnlyOneAppointment) {
      addTimeInArray({
        initDate: parseISO(endDate as any),
        endDate: hourEnd,
        dateQuery,
        array: timeAvailableProfessional,
      });
    }
  }
};
```
A função firstStep é utilizada para calcular os horários disponíveis para agendamento de uma sessão. Ela recebe como entrada diversas informações sobre os horários de funcionamento do profissional, o horário de início e fim da sessão agendada, e um boolean indicando se o profissional tem horário de almoço.

A função verifica se o horário da sessão agendada está dentro do horário de funcionamento do profissional, e se estiver, ela remove esse horário dos horários disponíveis para agendamento. Se o profissional tem horário de almoço, a função verifica se a sessão agendada está dentro desse horário, e remove esses horários também. Ao final, a função adiciona os horários disponíveis para agendamento em um array.
```typescript
export const secondStep = (secondStepInput: SecondStepInput): void => {
  const {
    hourStart,
    hourEnd,
    hourLunchStart,
    hourLunchEnd,
    haveLunchTime,
    dateQuery,
    timeAvailableProfessional,
    appointments,
  } = secondStepInput || {};
  appointments?.forEach((schedule: Schedule, index: number) => {
    const { initDate: initDateAux, endDate: endDateAux } = schedule;
    const initDateNext = appointments[index + 1]?.initDate;
    const endDateNext = appointments[index + 1]?.endDate;
    const hasNext = initDateNext && endDateNext;

    if (!haveLunchTime) {
      if (!hasNext) {
        addTimeInArray({
          initDate: parseISO(endDateAux as any),
          endDate: hourEnd,
          dateQuery,
          array: timeAvailableProfessional,
        });
      } else {
        addTimeInArray({
          initDate: parseISO(endDateAux as any),
          endDate: parseISO(initDateNext as any),
          dateQuery,
          array: timeAvailableProfessional,
        });
      }
    } else {
      const insideFirstHalfAux = intervalsOverlapping(
        initDateAux,
        endDateAux,
        hourStart,
        hourLunchStart
      );
      const insideSecondHalfAux = intervalsOverlapping(
        initDateAux,
        endDateAux,
        hourLunchEnd,
        hourEnd
      );
      const nextInsideFirstHalf =
        hasNext &&
        intervalsOverlapping(initDateNext, endDateNext, hourStart, hourLunchStart);

      const nextInsideSecondHalf =
        hasNext && intervalsOverlapping(initDateNext, endDateNext, hourLunchEnd, hourEnd);

      if (insideFirstHalfAux) {
        if (!hasNext) {
          addTimeInArray({
            initDate: parseISO(endDateAux as any),
            endDate: hourLunchStart as any,
            dateQuery,
            array: timeAvailableProfessional,
          });
          addTimeInArray({
            initDate: hourLunchEnd as any,
            endDate: hourEnd,
            dateQuery,
            array: timeAvailableProfessional,
          });
        } else {
          if (nextInsideFirstHalf) {
            addTimeInArray({
              initDate: parseISO(endDateAux as any),
              endDate: parseISO(initDateNext as any),
              dateQuery,
              array: timeAvailableProfessional,
            });
          } else if (nextInsideSecondHalf) {
            addTimeInArray({
              initDate: parseISO(endDateAux as any),
              endDate: hourLunchStart as any,
              dateQuery,
              array: timeAvailableProfessional,
            });
            addTimeInArray({
              initDate: hourLunchEnd as any,
              endDate: parseISO(initDateNext as any),
              dateQuery,
              array: timeAvailableProfessional,
            });
          }
        }
      } else if (insideSecondHalfAux) {
        if (!hasNext) {
          addTimeInArray({
            initDate: parseISO(endDateAux as any),
            endDate: hourEnd,
            dateQuery,
            array: timeAvailableProfessional,
          });
        } else if (nextInsideSecondHalf) {
          addTimeInArray({
            initDate: parseISO(endDateAux as any),
            endDate: parseISO(initDateNext as any),
            dateQuery,
            array: timeAvailableProfessional,
          });
        }
      }
    }
  });
};
```
A função "secondStep" é usada para encontrar os intervalos de tempo disponíveis, após as consultas já agendadas. Ela recebe como entrada "secondStepInput" que contém informações como horário de início e fim do dia funcionamento, horário de início e fim do intervalo de almoço, se há intervalo de almoço, as consultas agendadas, data da consulta e um array para armazenar os intervalos de tempo disponíveis.
A função percorre cada consulta agendada e verifica se há outra consulta agendada depois dela. Se houver, ela adiciona a diferença de tempo entre o final da consulta atual e o início da próxima no array de intervalos disponíveis. Se não houver outra consulta agendada, ela adiciona o tempo entre o final da última consulta e o final do dia funcionamento no array. Se houver um intervalo de almoço, a função também verifica se as consultas estão dentro do primeiro ou segundo período do dia e adiciona os intervalos disponíveis de acordo.
As funções firstStep e secondStep são importantes para o sistema de agendamentos online pois elas determinam quais horários estão disponíveis para agendamentos. A função firstStep é responsável por determinar os horários disponíveis no início do dia, levando em conta o horário de almoço (se houver) e possíveis agendamentos já existentes. A função secondStep é responsável por determinar os horários disponíveis entre cada agendamento, levando em conta o horário de almoço (se houver) e possíveis agendamentos subsequentes.

Juntas, essas funções permitem que o sistema de agendamentos online apresente aos usuários apenas os horários disponíveis para agendamentos, o que é fundamental para garantir que os agendamentos sejam eficientes e evitem conflitos de horário

## addTimeInArray
```typescript
export const addTimeInArray = (addTimeInArrayInput: AddTimeInArrayInput): void => {
  const { initDate, endDate, dateQuery, array } = addTimeInArrayInput || {};
  if (
    (initDate &&
      endDate &&
      initDate instanceof Date &&
      endDate instanceof Date &&
      differenceInMinutes(initDate, endDate) < 0 &&
      differenceInMinutes(initDate, dateQuery) > 0) ||
    (initDate &&
      endDate &&
      differenceInMinutes(parseISO(initDate as string), parseISO(endDate as string)) < 0 &&
      differenceInMinutes(parseISO(initDate as string), dateQuery) > 0)
  ) {
    array.push({ initDate, endDate });
  }
};
``` 
A função addTimeInArray tem como objetivo adicionar um horário de início e fim em um array de horários disponíveis. Ela recebe como entrada um objeto com as propriedades initDate (data de início), endDate (data de fim), dateQuery (data de consulta) e array (array de horários).

Ela então verifica se a diferença entre as datas de início e fim é menor que zero (ou seja, se a data de fim é posterior à data de início) e se a diferença entre a data de início e a data de consulta é maior que zero (ou seja, se a data de início é anterior à data de consulta). Se essas condições forem satisfeitas, o horário é adicionado ao array de horários disponíveis. 

Ela recebe como entrada um objeto addTimeInArrayInput que deve conter as seguintes propriedades:


1. initDate: data e hora inicial do período de tempo disponível
2. endDate: data e hora final do período de tempo disponível
3. dateQuery: data para a qual se deseja adicionar os períodos de tempo disponíveis
4. array: array em que os períodos de tempo disponíveis serão adicionados

A função verifica se a data e hora inicial e final são válidas e se a data inicial é anterior a data final. Se essas condições forem atendidas, ela adiciona um objeto com as propriedades initDate e endDate no array fornecido como entrada.

## calculateTimeAvailable
A função calculateTimeAvailable e addTimeInArray são importantes para o sistema de agendamentos online, pois elas permitem calcular e armazenar os horários disponíveis para agendamento, tornando possível para os usuários escolher e agendar um horário que seja adequado para eles.

A função espera como entrada um objeto com as seguintes propriedades: timeAvailable, duration e timeAvailableProfessional. Ela então itera sobre o array timeAvailableProfessional e verifica se a diferença entre o horário de fim e o horário de início é maior ou igual ao duration desejado. Se sim, ela divide o intervalo em intervalos com duração igual a duration e adiciona cada um desses intervalos ao array timeAvailable com o valor available definido como true.

```typescript
export const calculateTimeAvailable = (
  calculateTimeAvailableInput: CalculateTimeAvailableInput
): void => {
  const { timeAvailable, duration, timeAvailableProfessional } =
    calculateTimeAvailableInput;
  timeAvailableProfessional.forEach((scheduleTime: Schedule) => {
    const { initDate, endDate } = scheduleTime;
    if (differenceInMinutes(endDate, initDate) >= duration) {
      const arrayBroken = eachMinuteOfInterval(
        { start: initDate, end: endDate },
        { step: duration }
      );
      arrayBroken.pop();
      for (const time of arrayBroken) {
        timeAvailable.push({ time, available: true });
      }
    }
  });
};
``` 
A função percorre cada horário disponível do profissional e verifica se a diferença entre a data de fim e a data de início é maior ou igual à duração. Se essa condição for satisfeita, a função divide o intervalo entre a data de início e a data de fim em intervalos de duração igual à duração especificada e adiciona esses intervalos ao array de horários disponíveis.

A propriedade timeAvailable é um array vazio que será preenchido com os horários disponíveis para agendamento. A propriedade duration é o tempo da duração de cada agendamento em minutos. A propriedade timeAvailableProfessional é um array de objetos Schedule que contém informações sobre os horários disponíveis do profissional.

A função percorre cada objeto scheduleTime do array timeAvailableProfessional e, para cada um, calcula a diferença em minutos entre o horário final e inicial (endDate e initDate). Se essa diferença for maior ou igual à duração do agendamento (duration), o intervalo de tempo é dividido em intervalos de duração igual a duration minutos e cada um desses intervalos é adicionado ao array timeAvailable com a propriedade available definida como verdadeira.




[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)