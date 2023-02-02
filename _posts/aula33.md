---
title: 'Manipulando Datas com DateFns no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-16T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
A aula "Manipulando Datas com DateFns" é destinada a ensinar como utilizar a biblioteca "date-fns" para manipulação de datas no seu projeto. Date-fns é uma biblioteca moderna, fácil de usar e eficiente para manipulação de datas no JavaScript. Essa biblioteca fornece uma série de funções que permitem fazer operações comuns com datas, como adicionar dias, semanas, meses, anos, etc. Além disso, ela também permite formatar datas para exibição em diferentes padrões, como o padrão ISO, o padrão americano, o padrão brasileiro, entre outros. Ao final desta aula, você será capaz de usar a biblioteca Date-fns com confiança para manipular datas no seu projeto.

## Arquivo dateFns.ts para manipular datas

```typescript
import { utcToZonedTime as utcToZonedTimeDateFns } from "date-fns-tz";
import {
  addDays as addDaysDateFns,
  isToday as isTodayDateFns,
  subMinutes as subMinutesDateFns,
  getDay as getDayDateFns,
  addMinutes as addMinutesDateFns,
  isPast as isPastDateFns,
  addHours as addHoursDateFns,
  eachHourOfInterval as eachHourOfIntervalDateFns,
  intervalToDuration as intervalToDurationDateFns,
  areIntervalsOverlapping as areIntervalsOverlappingDateFns,
  setMinutes as setMinutesDateFns,
  setHours as setHoursDateFns,
  endOfDay as endOfDayDateFns,
  startOfDay as startOfDayDateFns,
  add as addDateFns,
  formatISO as formatISODateFns,
  isAfter as isAfterDateFns,
  parseISO as parseISODateFns,
  toDate as toDateDateFns,
  differenceInMinutes as differenceInMinutesDateFns,
  setMilliseconds as setMiliDateFns,
  setSeconds as setSecondsDateFns,
  isBefore as isBeforeDateFns,
  differenceInDays as differenceInDaysDateFns,
  subDays as subDaysDateFns,
} from "date-fns";

type Options = {
  step?: number;
};

type Duration = {
  year?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};
export const addDays = (date: number | Date, amount: number): string => {
  return addDaysDateFns(date, amount)?.toISOString?.();
};
export const addMinutes = (date: number | Date, amount: number): string => {
  return addMinutesDateFns(date, amount)?.toISOString?.();
};
export const addHours = (date: number | Date, amount: number): string => {
  return addHoursDateFns(date, amount)?.toISOString?.();
};
export const isPast = (date: number | Date): boolean => {
  return isPastDateFns(date);
};

export const startOfDay = (date: number | Date): Date => startOfDayDateFns(date);
export const endOfDay = (date: number | Date): Date => endOfDayDateFns(date);

export const isBeforeToday = (date: number | Date): boolean => {
  return isBeforeDateFns(date, startOfDayDateFns(new Date()));
};

export const formatISO = (date: number | Date): string => formatISODateFns(date);
export const parseISO = (date: string): Date => parseISODateFns(date);

export const intervalDuration = (start: number | Date, end: number | Date): Duration => {
  return intervalToDurationDateFns({ start, end });
};
export const addDuration = (duration: Duration, date: number | Date): Date => {
  return addDateFns(date, duration);
};
```
Essas funções são todas funções de data e hora que são importadas da biblioteca "date-fns" e exportadas para serem usadas em outros lugares do código. Algumas dessas funções incluem adicionar dias, horas ou minutos a uma data específica, verificar se uma data é no passado, obter o início ou o fim de um dia específico, formatar ou analisar uma data no formato ISO, calcular a duração de um intervalo de tempo entre duas datas e adicionar uma duração específica a uma data existente. Essas funções são úteis para manipular e manipular datas em um sistema de agendamento online, como calcular horários disponíveis, verificar a validade de uma data de agendamento e formatar corretamente as datas para exibição e armazenamento.


```typescript
export const intervalsOverlapping = (
  started1: any,
  ended1: any,
  started2: any,
  ended2: any
): boolean => {
  const start1Aux: Date = started1?.getMonth ? started1 : parseISODateFns(started1);
  const start2Aux: Date = started2?.getMonth ? started2 : parseISODateFns(started2);
  const end1Aux: Date = ended1?.getMonth ? ended1 : parseISODateFns(ended1);
  const end2Aux: Date = ended2?.getMonth ? ended2 : parseISODateFns(ended2);
  if (
    start2Aux.getTime() > start1Aux.getTime() ||
    start1Aux.getTime() > end1Aux.getTime() ||
    start2Aux.getTime() > end2Aux.getTime() ||
    end1Aux.getTime() > end2Aux.getTime() ||
    end1Aux.getTime() < start2Aux.getTime()
  ) {
    return false;
  }
  return areIntervalsOverlappingDateFns(
    { start: start1Aux, end: end1Aux },
    { start: start2Aux, end: end2Aux }
  );
}; 
```
A função "intervalsOverlapping" é usada para verificar se dois intervalos de tempo estão se sobrepondo. Ela recebe quatro parâmetros, os dois primeiros são as datas de início e fim do primeiro intervalo, e os dois últimos são as datas de início e fim do segundo intervalo. Ela verifica se esses intervalos estão se sobrepondo comparando as datas de início e fim de ambos os intervalos e retorna "true" se eles estiverem se sobrepondo e "false" se não estiverem.



```typescript
export const eachHourInterval = (
  start: number | Date,
  end: number | Date,
  options: Options
): Date[] => {
  return eachHourOfIntervalDateFns({ start, end }, options);
};
export const eachMinuteOfInterval = (dirtyInterval: any, options: Options): Date[] => {
  const interval = dirtyInterval;
  const startDate = toDateDateFns(interval.start);
  const endDate = toDateDateFns(interval.end);
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  if (startTime > endTime) {
    throw new Error("Start date is after end date");
  }
  const dates: Date[] = [];
  const step = Number(options?.step);
  if (step < 1 || isNaN(step)) {
    throw new Error("Step must be a number greater than 0");
  }
  let currentDate = startDate;
  let dateWithMinutes = currentDate;
  dates.push(toDateDateFns(currentDate));
  while (currentDate.getTime() <= endTime) {
    let floorStep = 60;
    let currentStep = 1;
    if (step > 60 && step <= 120) {
      floorStep = 120;
    } else if (step > 120 && step <= 240) {
      floorStep = 240;
    } else if (step > 240 && step <= 360) {
      floorStep = 360;
    } else if (step > 360 && step <= 480) {
      floorStep = 480;
    }
    const stepDivided = Math.floor(floorStep / step);
    while (currentStep <= stepDivided) {
      dateWithMinutes = addMinutesDateFns(dateWithMinutes, step);
      dateWithMinutes.getTime() <= endTime && dates.push(toDateDateFns(dateWithMinutes));
      currentStep += 1;
    }
    currentDate = addMinutesDateFns(currentDate, step);
  }
  return dates;
};
 
```
Essa função é chamada eachMinuteOfInterval e ela tem dois parâmetros de entrada: dirtyInterval e options. O primeiro parâmetro é um objeto que contém as propriedades start e end, representando, respectivamente, o início e o fim de um período de tempo. O segundo parâmetro, options, contém uma propriedade chamada step, que representa o passo de incremento de minutos entre as datas retornadas. A função retorna um array de objetos do tipo Date representando cada minuto do período especificado no parâmetro dirtyInterval.

A função começa verificando se a data de início é maior que a data final, e se for, lança uma exceção com a mensagem "Start date is after end date". Em seguida, é criado um array vazio chamado dates e é verificado se o valor de step é menor que 1 ou se é um valor inválido (NaN), e se for, lança uma exceção com a mensagem "Step must be a number greater than 0".

Depois disso, é criada uma variável currentDate inicializada com a data de início e outra variável chamada dateWithMinutes também inicializada com a data de início. O array dates é então preenchido com a data de início.

Em seguida, é iniciado um laço while que continua enquanto a data atual (currentDate) for menor ou igual à data final. Dentro desse laço, é criada uma variável floorStep inicializada com 60 (minutos) e uma variável currentStep inicializada com 1. É então verificado se o valor de step é maior que 60 e menor ou igual a 120, e se for, floorStep é definido como 120. Esse processo é repetido para outros valores possíveis de step.

Dentro do loop, a função adiciona "step" minutos à data "dateWithMinutes" e, se essa data for menor ou igual à data final do intervalo, adiciona-a à lista "dates". A função também adiciona "step" minutos à data "currentDate" para avançar no loop.

Finalmente, a função retorna a lista de datas geradas.

```typescript
 export const setMinutes = (date: number | Date, minutes: number): Date => {
  return setMinutesDateFns(date, minutes);
};
export const setHours = (date: number | Date, hours: number): Date => {
  return setHoursDateFns(date, hours);
};
export const setSeconds = (date: number | Date, hours: number): Date => {
  return setSecondsDateFns(date, hours);
};
export const setMili = (date: number | Date, hours: number): Date => {
  return setMiliDateFns(date, hours);
};
export const differenceInMinutes = (date: number | Date, date2: number | Date): number => {
  return differenceInMinutesDateFns(date, date2);
};
export const differenceInDays = (date: number | Date, date2: number | Date): number => {
  return differenceInDaysDateFns(date, date2);
};

export const dayOfWeek = (date: number | Date): string => {
  const result = getDayDateFns(date);
  switch (result) {
    case 0:
      return "sunday";
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
    case 6:
      return "saturday";
  }
};

export const subMinutes = (date: number | Date, minutes: number): Date => {
  return subMinutesDateFns(date, minutes);
};
export const subDays = (date: number | Date, days: number): Date => {
  return subDaysDateFns(date, days);
};

export const isAfter = (date: number | Date, date2: number | Date): boolean => {
  return isAfterDateFns(date, date2);
};
export const isToday = (date: number | Date): boolean => {
  return isTodayDateFns(date);
};

export const cloneDate = (date: number | Date): Date => {
  return toDateDateFns(date);
};

export const isBefore = (date: number | Date, date2: number | Date): boolean => {
  return isBeforeDateFns(date, date2);
};

export const trataTimezone = (date: number | Date): Date => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return utcToZonedTimeDateFns(date, timezone);
};
``` 
Essa é uma série de funções relacionadas ao tratamento de datas e horas. Elas são basicamente "wrappers" para as funções do pacote date-fns, que fornecem uma série de funções para manipulação de datas.

Algumas das funções incluem:
1. setMinutes, que define os minutos de uma data dada
2. setHours, que define as horas de uma data dada
3. setSeconds, que define os segundos de uma data dada
4. differenceInMinutes, que retorna a diferença em minutos entre duas datas
5. differenceInDays, que retorna a diferença em dias entre duas datas
6. dayOfWeek, que retorna o dia da semana de uma data dada
7. subMinutes, que subtrai minutos de uma data dada
8. subDays, que subtrai dias de uma data dada
9. isAfter, que verifica se uma data é posterior a outra



[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)