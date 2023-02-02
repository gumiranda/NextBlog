---
title: 'Criando useCase LoadAverageRatingResult no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-13T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, você aprenderá a criar o caso de uso "LoadAverageRatingResult", que será responsável por calcular a avaliação média de um determinado serviço. Isso será feito a partir de avaliações registradas por usuários na plataforma. O resultado será representado por uma estrutura de dados que inclui a avaliação média e o número de avaliações registradas. Esse caso de uso será usado para exibir informações sobre a avaliação de um serviço para os usuários e ajudar na tomada de decisão de agendamento.

```typescript
import { Query } from "@/application/types";
import { RatingResultAverage } from "@/slices/ratingResult/entities";

export interface LoadAverageRatingResultRepository {
  loadAverageRatingResult(query: Query): Promise<RatingResultAverage | null>;
}
``` 

A interface LoadAverageRatingResultRepository é utilizada para carregar a avaliação média de um resultado de avaliação. Ela possui um método chamado loadAverageRatingResult, que recebe uma query (consulta) como parâmetro e retorna uma promise (promessa) que, quando resolvida, retorna um objeto do tipo RatingResultAverage ou null caso não encontre nenhum resultado. Essa interface é utilizada para garantir que a implementação de uma classe que a implemente tenha essa funcionalidade disponível.

```typescript
import { LoadAverageRatingResultRepository } from "@/slices/ratingResult/repositories";
import { RatingResultAverage } from "@/slices/ratingResult/entities";
import { Query } from "@/application/types";

export type LoadAverageRatingResult = (
  query: Query
) => Promise<RatingResultAverage | null>;

export type LoadAverageRatingResultSignature = (
  loadAverageRatingResult: LoadAverageRatingResultRepository
) => LoadAverageRatingResult;

export const loadAverageRatingResult: LoadAverageRatingResultSignature =
  (loadAverageRatingResultRepository: LoadAverageRatingResultRepository) =>
  async (query: Query) => {
    return loadAverageRatingResultRepository.loadAverageRatingResult(query);
  };
``` 
Esta é uma função que carrega a média das avaliações resultantes de uma determinada consulta. Ela recebe um objeto "query" que contém os parâmetros da consulta, como, por exemplo, o ID do avaliado. A função então chama um repositório específico, "loadAverageRatingResultRepository", que é responsável por buscar essa informação no banco de dados e retornar uma entidade "RatingResultAverage", que contém a média das avaliações. Se a consulta não retornar resultado, a função retornará "null".

Este use case "loadAverageRatingResult" é importante na aplicação pois ele é responsável por carregar a avaliação média de um determinado tipo de avaliação. Ele pode ser utilizado para exibir a avaliação média para um usuário final, como por exemplo, a avaliação média de atendimento ou pontualidade.
Ele pode ser utilizado para mostrar uma visão geral dos resultados de avaliação para os administradores da aplicação, como por exemplo, a avaliação média de todos os profissionais ou serviços.
Além disso, essas informações podem ser utilizadas para ajudar a tomar decisões sobre como melhorar a qualidade do serviço ou identificar problemas específicos.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)