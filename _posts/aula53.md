---
title: 'Listagem da média de avaliações no RatingResultRepository do CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-28T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
  async loadAverageRatingResult(query: Query): Promise<RatingResultAverage | null> {
    if (!query?.fields) {
      return null;
    }
    const queryRatingAverage = new QueryBuilder()
      .match(mapAnyToMongoObject(query?.fields))
      .group({ _id: 0, data: { $push: "$$ROOT" }, total: { $sum: 1 } })
      .unwind({ path: "$data" })
      .lookup({
        from: "rating",
        foreignField: "_id",
        localField: "data.ratingId",
        as: "rating",
      })
      .unwind({ path: "$rating" })
      .group({
        _id: {
          ratingId: "$rating._id",
          ratingType: "$rating.ratingType",
          createdAt: "$rating.createdAt",
          total: "$total",
          rating: "$data.rating",
          ratingForId: "$data.ratingForId",
          ratings: "$rating.ratings",
        },
        comments: {
          $push: {
            rating: "$data.rating",
            comment: "$data.comment",
            createdBy: "$data.createdBy",
          },
        },
        count: {
          $sum: 1,
        },
      })
      .project({
        _id: 0,
        ratingId: "$_id.ratingId",
        comments: "$comments",
        ratingForId: "$_id.ratingForId",
        ratingType: "$_id.ratingType",
        createdAt: "$_id.createdAt",
        ratings: {
          $map: {
            input: "$_id.ratings",
            as: "item",
            in: {
              $mergeObjects: [
                "$$item",
                {
                  count: {
                    $cond: {
                      if: { $eq: ["$$item.rating", "$_id.rating"] },
                      then: "$count",
                      else: 0,
                    },
                  },
                  starsAvg: {
                    $cond: {
                      if: {
                        $eq: ["$$item.rating", "$_id.rating"],
                      },
                      then: {
                        $divide: [{ $multiply: ["$count", "$$item.stars"] }, "$_id.total"],
                      },
                      else: 0,
                    },
                  },
                  percent: {
                    $cond: {
                      if: { $eq: ["$$item.rating", "$_id.rating"] },
                      then: { $multiply: [{ $divide: ["$count", "$_id.total"] }, 100] },
                      else: 0,
                    },
                  },
                },
              ],
            },
          },
        },
      })
      .group({
        _id: {
          ratingId: "$ratingId",
          comments: "$comments",
          ratingType: "$ratingType",
          createdAt: "$createdAt",
        },
        ratings: {
          $push: "$ratings",
        },
      })
      .project({
        _id: 0,
        ratingId: "$_id.ratingId",
        ratingType: "$_id.ratingType",
        createdAt: "$_id.createdAt",
        comments: "$_id.comments",
        ratings: {
          $reduce: {
            input: "$ratings",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
      })
      .unwind({ path: "$ratings" })
      .group({
        _id: {
          ratingId: "$ratingId",
          comments: "$comments",
          ratingType: "$ratingType",
          createdAt: "$createdAt",
          rating: "$ratings.rating",
          stars: "$ratings.stars",
        },
        count: {
          $sum: "$ratings.count",
        },
        percent: {
          $sum: "$ratings.percent",
        },
        starsAvg: {
          $sum: "$ratings.starsAvg",
        },
      })
      .match({ count: { $gt: 0 } })
      .project({
        _id: 0,
        ratingId: "$_id.ratingId",
        ratingType: "$_id.ratingType",
        createdAt: "$_id.createdAt",
        comments: "$_id.comments",
        rating: {
          rating: "$_id.rating",
          stars: "$_id.stars",
          comments: "$_id.comments",
          count: "$count",
          percent: "$percent",
          starsAvg: { $sum: "$starsAvg" },
        },
      })
      .sort({ "rating.count": -1 })
      .group({
        _id: { ratingId: "$ratingId", ratingType: "$ratingType", createdAt: "$createdAt" },
        ratings: { $push: "$rating" },
      })
      .project({
        _id: 0,
        ratingId: "$_id.ratingId",
        ratingType: "$_id.ratingType",
        createdAt: "$_id.createdAt",
        ratings: "$ratings",
        starsAvg: {
          $reduce: {
            input: "$ratings.starsAvg",
            initialValue: 0,
            in: { $sum: ["$$value", "$$this"] },
          },
        },
      })
      .build();
    const ratingResult = await this.repository.aggregate(queryRatingAverage);
    return ratingResult?.[0];
  }
``` 
Este é um trecho de código que constrói uma consulta MongoDB para calcular a avaliação média de algum agendamento. A consulta está sendo construída usando a biblioteca MongoDB Node.js "QueryBuilder" e usa vários passos para calcular o resultado final:

1. O primeiro passo é verificar se o objeto de consulta tem campos definidos. Se não tiver, a função retorna nulo.

2. O segundo passo é criar uma nova instância da QueryBuilder.

3. Em seguida, usa o método .match para filtrar os documentos baseados nos campos especificados na consulta original.

4. Usa o método .group para agrupar os documentos encontrados pelos campos especificados.

5. Em seguida, usa o método .unwind para desdobrar o array de documentos agrupados em documentos individuais.

6. Usa o método .lookup para fazer uma junção com a coleção "rating".

7. Usa novamente o método .unwind para desdobrar o array de documentos resultantes da junção.

8. Usa o método .group novamente para agrupar os documentos resultantes pelos campos especificados.

9. Em seguida, usa o método .project para projetar o resultado agrupado em um formato específico.

10. Usa novamente o método .group para agrupar os documentos resultantes pelos campos especificados.

11. Usa o método .project novamente para projetar o resultado agrupado em um formato específico.

12. Usa o método .unwind para desdobrar o array de documentos resultantes.

13. Usa o método .group novamente para agrupar os documentos resultantes pelos campos especificados.
Usa o método .match para filtrar os documentos resultantes baseados no critério "count > 0".

14. Usa o método .project novamente para projetar o resultado agrupado em um formato específico.

15. Finalmente, usa o método .sort para classificar o resultado pelo campo "count" em ordem decrescente e o método .group para agrupar os documentos resultantes pelos campos especificados.

Esta query é importante para a API de agendamentos online porque permite avaliar profissionais e serviços com base em critérios previamente estabelecidos na collection "rating". Essa avaliação é fundamental para garantir a qualidade dos profissionais e serviços oferecidos na plataforma. Ela permite aos usuários avaliar e compartilhar suas opiniões sobre a qualidade dos profissionais e serviços, o que pode ajudar a melhorar a reputação da plataforma e aumentar a confiança dos usuários na qualidade dos profissionais e serviços disponíveis. Além disso, as avaliações também podem ser usadas para ajudar a identificar pontos de melhoria e garantir que os profissionais e serviços estejam atendendo às expectativas dos usuários.

A query em questão é importante em uma API de agendamentos online para avaliação de profissionais e serviços porque permite buscar e exibir as avaliações dos profissionais e serviços baseadas em critérios cadastrados na coleção "rating".

Um exemplo de avaliação de um critério cadastrado na coleção "rating" com o nome "atendimento" e seu resultado na coleção "ratingresult" pode ser o seguinte:

*   Na coleção "rating", um registro com o critério "atendimento" é cadastrado com uma descrição detalhada e um peso específico.
    
*   Quando um usuário avalia um profissional ou serviço, ele escolhe o critério "atendimento" e atribui uma nota de 1 a 5.
    
*   Esse resultado é então registrado na coleção "ratingresult", junto com informações sobre o usuário que fez a avaliação, o profissional ou serviço avaliado, a data da avaliação e o critério avaliado.
    
*   A query em questão pode ser usada para buscar e exibir a média de avaliações de "atendimento" para um profissional ou serviço específico, levando em conta todos os resultados registrados na coleção "ratingresult".
    

Dessa forma, a query fornece uma maneira de exibir de maneira clara e objetiva a avaliação dos profissionais e serviços pelos usuários, baseada em critérios previamente definidos e registrados.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)