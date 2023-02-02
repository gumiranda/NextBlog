---
title: 'Listagem de horários disponíveis do AppointmentRepository no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-27T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.
A query a seguir é importante em um sistema de agendamentos online, pois ela permite que sejam listados os horários disponíveis para agendamento para um profissional específico, de acordo com um período de tempo determinado.

A query utiliza uma combinação de técnicas, como filtragem, classificação, junções e agrupamento, para selecionar e organizar informações de diferentes coleções de dados, como os dados dos agendamentos, dos profissionais e dos proprietários. A query também filtra os agendamentos cancelados e inativos, de modo que apenas os agendamentos ativos e válidos sejam listados.

A saída da query é uma lista de agendamentos disponíveis, agrupados pelo proprietário do profissional, incluindo informações sobre os horários de início e término de cada agendamento e as configurações de horários de funcionamento do proprietário. Essas informações são cruciais para o usuário, pois ele pode verificar rapidamente se há horários disponíveis para agendamento e escolher o melhor horário com base nas configurações de horários de funcionamento do proprietário.

Em resumo, essa query é fundamental para garantir a eficiência e a usabilidade do sistema de agendamentos online, pois permite que os usuários vejam rapidamente as opções disponíveis de horários e façam agendamentos de forma fácil e eficiente.

```typescript
  async loadAvailableTimes(
    query: QueryAvailableTimesRepository
  ): Promise<AvailableTimesModelRepository | null> {
    if (!query?.professionalId || !query?.initDay || !query?.endDay) {
      return null;
    }
    const queryBuilded = new QueryBuilder()
      .match({
        professionalId: new ObjectId(query.professionalId),
        initDate: { $lte: query?.endDay, $gte: query?.initDay },
        endDate: { $lte: query?.endDay, $gte: query?.initDay },
        cancelled: false,
        active: true,
      })
      .sort({ initDate: 1 })
      .lookup({
        from: "user",
        localField: "professionalId",
        foreignField: "_id",
        as: "professionalDetails",
      })
      .project({ initDate: 1, endDate: 1, professionalDetails: { ownerId: 1 } })
      .unwind({ path: "$professionalDetails" })
      .lookup({
        from: "owner",
        localField: "professionalDetails.ownerId",
        foreignField: "_id",
        as: "owner",
      })
      .project({
        initDate: 1,
        endDate: 1,
        owner: {
          days1: 1,
          hourStart1: 1,
          hourEnd1: 1,
          hourLunchEnd1: 1,
          hourLunchStart1: 1,
          days2: 1,
          hourStart2: 1,
          hourEnd2: 1,
          hourLunchEnd2: 1,
          hourLunchStart2: 1,
          days3: 1,
          hourStart3: 1,
          hourEnd3: 1,
          hourLunchEnd3: 1,
          hourLunchStart3: 1,
        },
      })
      .unwind({ path: "$owner" })
      .group({ _id: "$owner", data: { $push: "$$ROOT" } })
      .project({ _id: 1, data: { initDate: 1, endDate: 1 } })
      .build();
    const appointments = await this.repository.aggregate(queryBuilded);
    if (appointments?.length > 0 && appointments?.[0]?._id && appointments?.[0]?.data) {
      return { _id: appointments?.[0]?._id, data: appointments?.[0]?.data };
    }
    return null;
  }
``` 
Este é o método loadAvailableTimes, que retorna os horários disponíveis de um profissional baseado em uma consulta dada. Verifica primeiro se os IDs dos profissionais e os dias de início e término estão presentes na consulta. Se não estiverem, retorna null. Em seguida, cria uma consulta ao MongoDB usando a classe QueryBuilder para recuperar uma lista agrupada de horários agendados pelo profissional no período especificado. Também usa o método lookup para recuperar informações adicionais sobre o profissional e o proprietário da clínica. Finalmente, agrupa e projeta os resultados e retorna o resultado como um objeto AvailableTimesModelRepository, que contém um array de horários agendados e um contador total.


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)