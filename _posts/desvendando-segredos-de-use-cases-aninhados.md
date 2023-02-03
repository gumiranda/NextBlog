---
title: 'Desvendando os segredos de use cases aninhados'
excerpt: 'Este artigo fornece uma visão geral de como aplicar use cases aninhados no desenvolvimento de software seguindo a arquitetura limpa. Ele discute os benefícios da utilização desta abordagem, como a organização e facilidade de manutenção do código, e oferece exemplos práticos de como implementar use cases aninhados no seu projeto.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2023-01-17T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

## Introdução
Na arquitetura de software, os use cases são responsáveis por representar as ações que um usuário pode realizar em um sistema. Eles são geralmente implementados como classes ou módulos, e são responsáveis por gerenciar as regras de negócios e interagir com outras camadas do sistema, como a camada de persistência de dados e a camada de apresentação.

Os use cases aninhados são uma abordagem para organizar esses use cases, onde eles são agrupados em conjuntos hierárquicos, cada um com sua própria lógica de negócios e interação com o sistema.

Isso permite uma melhor organização e facilidade de manutenção do código, além de ajudar a manter as regras de negócios separadas e coesas.

A arquitetura limpa é um modelo de arquitetura de software que tem como objetivo proporcionar uma estrutura clara e modular para o desenvolvimento de aplicativos. Ela se baseia em princípios como a separação de responsabilidades, a independência de camadas e a coesão de código.

A utilização de use cases aninhados se encaixa perfeitamente nesta abordagem, pois ajuda a manter as regras de negócios separadas e coesas, além de proporcionar uma melhor organização e facilidade de manutenção do código. Neste artigo, vamos explorar como implementamos dois use cases de listagem e validação de horários de uma API de agendamento.

## E qual é a melhor maneira de implementar esses use cases aninhados?

A melhor maneira de implementar use cases aninhados seguindo a arquitetura limpa é isolando cada use case em sua própria camada de aplicação e garantindo que eles não tenham dependências cíclicas entre si.

Isso pode ser alcançado através do uso de injeção de dependência para fornecer os recursos necessários a cada use case.
Além disso, é importante garantir que cada use case tenha sua própria responsabilidade e não se sobreponha a outros use cases.

## E como eu apliquei isso a uma API de agendamentos online?
No meu caso eu tinha 2 use cases que queria aninhar: *loadAvailableTimes* (responsável em trazer uma lista de horários disponíveis) e *validateAvailableTimes* (responsável em validar a inserção de determinado agendamento verificando a disponibilidade do prestador de serviço).

Primeiramente, criamos uma camada de aplicação para cada use case. A camada de listagem de horários contém as regras de negócio para buscar e exibir horários disponíveis para agendamento. A camada de validação de horários contém as regras de negócio para verificar se um horário específico está disponível para agendamento.

Em seguida, utilizamos injeção de dependência para fornecer recursos às camadas de aplicação. A camada de listagem de horários depende de um repositório de agendamentos para buscar informações sobre horários disponíveis. A camada de validação de horários depende do mesmo repositório para verificar a disponibilidade de um horário específico.

Por fim, garantimos que cada camada de aplicação tenha sua própria responsabilidade e não se sobreponha a outras camadas. A camada de listagem de horários é responsável por buscar e exibir horários disponíveis, enquanto a camada de validação de horários é responsável por verificar a disponibilidade de um horário específico.

O código mostrado abaixo apresenta uma implementação de ambos use cases mencionados.

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

A primeira linha importa uma função chamada *intervalsOverlapping* da pasta *dateFns* na pasta de aplicação. Essa função é utilizada para verificar se dois intervalos de tempo se sobrepõem.

As próximas duas linhas importam tipos *QueryVerifyAvailableTimes* e *LoadAvailableTimes* de arquivos específicos da pasta *appointment* do projeto. *QueryVerifyAvailableTimes* é utilizado para representar a consulta passada para o use case, enquanto *LoadAvailableTimes* é o use case que será utilizado para buscar informações sobre horários disponíveis.

O próximo trecho é uma exportação de uma função *validateAvailableTimes*, que é a implementação do use case propriamente dita. Essa função recebe como parâmetro uma instância de *LoadAvailableTimes*, que é utilizada para buscar informações sobre horários disponíveis. Ela também recebe como parâmetro uma consulta do tipo *QueryVerifyAvailableTimes*.

Dentro da função, há uma verificação se as datas passadas na consulta são válidas, caso contrário, a função retorna *false*. Em seguida, é feita uma chamada para o use case *loadAvailableTimes* passando a consulta como parâmetro.

Depois, é feita uma verificação se há algum horário disponível para o período passado na consulta. Se não houver, a função retorna *false*. Caso contrário, é utilizada a função *intervalsOverlapping* para verificar se o horário passado na consulta está disponível. Se estiver, a função retorna *true*, caso contrário, *false*.

Em resumo, este código apresenta uma implementação de um use case aninhado (ValidateAvailableTimes) que depende de outro use case (LoadAvailableTimes) para buscar informações sobre horários disponíveis e verifica se um horário específico está disponível para agendamento.

Depois eu crio um factory desse código pra facilitar seu uso em qualquer controller que vá usar esse código!

```typescript
import {
  makeLoadAvailableTimesFactory,
  validateAvailableTimes,
  ValidateAvailableTimes,
} from "@/slices/appointment/useCases";
export const makeValidateAvailableTimesFactory = (): ValidateAvailableTimes => {
  return validateAvailableTimes(makeLoadAvailableTimesFactory());
};
```
Esse código apresenta a implementação de uma factory function para o use case *validateAvailableTimes*, chamada *makeValidateAvailableTimesFactory*. A factory function é uma técnica utilizada para criar instâncias de objetos ou funções de forma organizada e padronizada.

A factory function importa os tipos *validateAvailableTimes* e *ValidateAvailableTimes* e *makeLoadAvailableTimesFactory* do arquivo *useCases* dentro da pasta *appointment*.

A factory function *makeValidateAvailableTimesFactory* não recebe nenhum parâmetro, e retorna uma instância de *ValidateAvailableTimes*, que é a tipagem da função *validateAvailableTimes*

A factory function retorna uma chamada para *validateAvailableTimes* passando como parâmetro a chamada para *makeLoadAvailableTimesFactory*, que é uma outra factory function responsável por criar uma instância de *LoadAvailableTimes* e passa para o use case *validateAvailableTimes* como parâmetro.

Em resumo, essa factory function é responsável por criar uma instância de *validateAvailableTimes* de forma organizada e padronizada, e garantir a criação de uma instância de *LoadAvailableTimes* que é necessário para o funcionamento do use case *validateAvailableTimes* e garantir a independência entre as camadas.

Em resumo, essa implementação mostra como é possível aplicar use cases aninhados seguindo a arquitetura limpa para garantir organização e facilidade de manutenção do código. Ao utilizar use cases aninhados, é possível manter as regras de negócios separadas e coesas, além de proporcionar uma melhor organização e facilidade de manutenção do código.

Além disso, a utilização de injeção de dependência permite que as camadas de aplicação sejam facilmente testadas e reutilizadas em outras partes do sistema, e a utilização de factory function garante a criação de instância de forma organizada e padronizada.

Este exemplo foi apenas uma pequena amostra do que é possível fazer ao seguir a arquitetura limpa e utilizar use cases aninhados no desenvolvimento de software. Se você deseja saber mais sobre essa abordagem, recomendo o curso do devdoido chamado [CrazyStack](https://crazystack.com.br) que aborda essas e muitas outras técnicas para o desenvolvimento de aplicações Node.js com arquitetura limpa e boas práticas de programação.

Garanta já seu desconto no CrazyStack Node.js!

USE O CUPOM JANEIRODOIDO e ganhe 55% de DESCONTO!!

Viaje nessa loucura!! 


[CLIQUE AQUI](https://crazystack.com.br)


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)
