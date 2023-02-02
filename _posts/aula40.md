---
title: 'Chain of responsibility no usecase UpdateRequestById no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-22T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Este artigo servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar.

```typescript
import { RequestData } from "@/slices/request/entities";
import { IUpdateRequestById } from "./contracts";
import { AddOrderRepository } from "@/slices/order/repositories";
import {
  AddAppointmentRepository,
  LoadAppointmentRepository,
  UpdateAppointmentRepository,
} from "@/slices/appointment/repositories";
import { AddFidelityRepository } from "@/slices/fidelity/repositories";
import { AddRecurrenceRepository } from "@/slices/recurrence/repositories";
import { AddRideRepository } from "@/slices/ride/repositories";
import { UpdateServiceRepository } from "@/slices/service/repositories";
import { UpdateUserRepository } from "@/slices/user/repositories";
import {
  UpdateRequestRepository,
  LoadRequestRepository,
} from "@/slices/request/repositories";
import { UpdateClientRepository } from "@/slices/client/repositories";
import { statusIsValid } from "@/slices/request/validators/status/status";
import {
  AppointmentHandler,
  FidelityHandler,
  OrderHandler,
  RecurrenceHandler,
  RideHandler,
} from "./handlers";

export class UpdateRequestById implements IUpdateRequestById {
  constructor(
    private readonly requestRepository: UpdateRequestRepository & LoadRequestRepository,
    private readonly orderRepository: AddOrderRepository,
    private readonly appointmentRepository: AddAppointmentRepository &
      LoadAppointmentRepository &
      UpdateAppointmentRepository,
    private readonly serviceRepository: UpdateServiceRepository,
    private readonly userRepository: UpdateUserRepository,
    private readonly rideRepository: AddRideRepository,
    private readonly recurrenceRepository: AddRecurrenceRepository,
    private readonly fidelityRepository: AddFidelityRepository,
    private readonly clientRepository: UpdateClientRepository
  ) {}

  async updateRequestById(id: string, data: RequestData): Promise<any> {
    if (data && id) {
      const request = await this.requestRepository.loadRequest({
        fields: { _id: id },
        options: {},
      });
      if (request && statusIsValid({ currentRequest: request, newStatus: data?.status })) {
        const requestUpdated = await this.requestRepository.updateRequest(
          {
            fields: { _id: id },
            options: {},
          },
          data
        );
        if (requestUpdated) {
          const appointmentHandler = new AppointmentHandler(this.appointmentRepository);
          const orderHandler = new OrderHandler(
            this.orderRepository,
            this.serviceRepository,
            this.userRepository,
            this.clientRepository
          );
          const rideHandler = new RideHandler(this.rideRepository);
          const recurrenceHandler = new RecurrenceHandler(this.recurrenceRepository);
          const fidelityHandler = new FidelityHandler(this.fidelityRepository);
          appointmentHandler
            .setNext(orderHandler)
            .setNext(rideHandler)
            .setNext(recurrenceHandler)
            .setNext(fidelityHandler);
          await appointmentHandler.handle(requestUpdated);
          return requestUpdated;
        }
      }
    }
    throw new Error("Erro ao atualizar a solicitação");
  }
}
``` 
Essa é uma classe "UpdateRequestById" que implementa uma interface "IUpdateRequestById". A classe tem vários construtores de repositórios como parâmetros, que são usados para atualizar diferentes entidades relacionadas a uma solicitação (como agendamentos, ordens, etc.).

A função principal "updateRequestById" recebe um ID e dados de solicitação como parâmetros, carrega a solicitação existente usando o repositório "requestRepository", verifica se o novo status é válido usando uma função "statusIsValid", e então atualiza a solicitação usando o repositório "requestRepository". Em seguida, cria instâncias de "handlers" específicos para lidar com cada entidade relacionada (como "AppointmentHandler" e "OrderHandler") e chama a função "handle" de cada um deles passando a solicitação atualizada como parâmetro.

Se tudo der certo, a função retorna a solicitação atualizada, caso contrário, gera um erro "Erro ao atualizar a solicitação".

Além disso, a classe "UpdateRequestById" implementa o padrão de projeto "Chain of Responsibility", onde existe uma cadeia de objetos que tentam processar uma solicitação. Cada objeto na cadeia tem a chance de tratar a solicitação, e então, passa a solicitação para o próximo objeto na cadeia.

Nessa classe, ao chamar o método updateRequestById(id, data), é verificado se o ID e os dados da solicitação existem. Em seguida, é carregada a solicitação a ser atualizada e é verificado se o status é válido. Se tudo estiver ok, a solicitação é atualizada e é criado um objeto "AppointmentHandler" e é criado os outros handlers(OrderHandler, RideHandler, RecurrenceHandler e FidelityHandler) que serão responsáveis por tratar a solicitação atualizada. Cada handler tem acesso a um repositório diferente, e cada um é responsável por tratar a solicitação de forma específica.
```typescript
export interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: any): Promise<any>;
}
``` 
A classe "UpdateRequestById" usa o padrão de projeto "chain of responsibility" para atualizar uma solicitação. O padrão "chain of responsibility" é um padrão de projeto de comportamento que permite que vários objetos trabalhem juntos para lidar com uma solicitação.

Na classe "UpdateRequestById", vários objetos são criados para lidar com diferentes tipos de solicitações, como "AppointmentHandler", "OrderHandler", "RideHandler", "RecurrenceHandler" e "FidelityHandler". Esses objetos implementam a interface "Handler" e contêm uma referência para o próximo objeto na cadeia.

Quando o método "updateRequestById" é chamado, ele verifica se a solicitação é válida e, em seguida, atualiza a solicitação. Em seguida, ele cria uma instância de "AppointmentHandler" e configura a cadeia de objetos, estabelecendo qual objeto deve ser chamado em seguida. Ele então passa a solicitação atualizada para o primeiro objeto da cadeia, que é o "AppointmentHandler", e esse objeto passa a solicitação para o próximo objeto na cadeia, e assim por diante, até que todos os objetos tenham processado a solicitação.

Isso permite que a classe "UpdateRequestById" mantenha o controle sobre o fluxo de trabalho de atualização da solicitação e que cada objeto individualmente responsável por lidar com uma parte específica da solicitação. Isso também permite que novos objetos possam ser adicionados à cadeia sem afetar as classes existentes.
```typescript
import { Handler } from "./handler";

export abstract class AbstractHandler implements Handler {
  private nextHandler!: Handler;
  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
  public async handle(request: any): Promise<any> {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}
``` 
A classe "AbstractHandler" implementa o padrão de projeto "Chain of Responsibility", que permite que vários objetos tenham a chance de manipular uma solicitação ou comando sem saber quem é o objeto específico que irá lidar com ela. Cada objeto na cadeia tem a chance de manipular a solicitação e, então, passa a solicitação para o próximo objeto na cadeia. Isso é feito através do método "handle" que é chamado e que verifica se existe um próximo objeto na cadeia, se existir, ele passa a solicitação para ele, caso contrário, o processamento é encerrado. E o método setNext é usado para setar o próximo objeto na cadeia.





```typescript
import {
  AddAppointmentRepository,
  LoadAppointmentRepository,
  UpdateAppointmentRepository,
} from "@/slices/appointment/repositories";
import { AbstractHandler } from "../contracts";

export class AppointmentHandler extends AbstractHandler {
  constructor(
    private readonly appointmentRepository: AddAppointmentRepository &
      LoadAppointmentRepository &
      UpdateAppointmentRepository
  ) {
    super();
  }
  override async handle(request: any): Promise<any> {
    if (request?.status === 1 || request?.status === 7) {
      const appointmentCreated = await this.appointmentRepository.addAppointment({
        requestId: request?._id,
        name: "agendamentoCriado",
        message: "mensagem",
        serviceId: request?.serviceId,
        ownerId: request?.ownerId,
        professionalId: request?.professionalId,
        clientId: request?.clientId,
        createdById: request?.createdById,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 1,
        active: true,
        read: false,
        push: false,
        email: false,
        initDate: request?.initDate,
        endDate: request?.endDate,
        cancelled: false,
      });
      if (!appointmentCreated) {
        throw new Error("Não foi possível criar o agendamento");
      }
    } else if (
      request?.status === 5 ||
      request?.status === 6 ||
      request?.status === 2 ||
      request?.status === 3
    ) {
      const appointmentFound = await this.appointmentRepository.loadAppointment({
        fields: { _id: request?._id },
        options: {},
      });
      if (!!appointmentFound?._id) {
        const appointmentUpdated = await this.appointmentRepository.updateAppointment(
          {
            fields: { _id: appointmentFound?._id },
          },
          {
            ...appointmentFound,
            cancelledAt: new Date(),
            updatedAt: new Date(),
            cancelled: true,
            active: false,
            cancelledBy: request?.createdById,
          }
        );
        if (!appointmentUpdated) {
          throw new Error("Não foi possível cancelar o agendamento");
        }
      }
    }
    return super.handle(request);
  }
}
``` 
A classe AppointmentHandler é responsável por lidar com as situações relacionadas a agendamentos, ela verifica se o status da solicitação é 1 ou 7 e cria um agendamento, caso contrário, verifica se o status é 5, 6, 2 ou 3 e cancela o agendamento existente.



```typescript
import { AbstractHandler } from "../contracts";
import { AddFidelityRepository } from "@/slices/fidelity/repositories";

export class FidelityHandler extends AbstractHandler {
  constructor(private readonly addFidelityRepository: AddFidelityRepository) {
    super();
  }
  override async handle(request: any): Promise<any> {
    if (
      request?.haveFidelity === true &&
      (request?.status === 10 || request?.status === 11)
    ) {
      const fidelityAdded = await this.addFidelityRepository.addFidelity({
        active: true,
        ownerId: request?.ownerId,
        createdById: request?.createdById,
        name: request?.name,
        requestId: request?.requestId,
        points: request?.fidelity?.points,
        clientId: request?.clientId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if (!fidelityAdded) {
        throw new Error("Erro ao adicionar os pontos de fidelidade pro cliente");
      }
    }
    return super.handle(request);
  }
}
``` 
 A classe "AppointmentHandler" e "FidelityHandler" são subclasses da classe "AbstractHandler", e cada uma dessas classes tem sua própria lógica de tratamento de solicitação, mas ambas compartilham a capacidade de passar a solicitação para o próximo objeto na cadeia se necessário. O método "setNext" é usado para estabelecer qual é o próximo objeto na cadeia e o método "handle" é usado para tratar a solicitação. Nesse caso é adicionado um registro referente a fidelidade.


```typescript
import { UpdateClientRepository } from "@/slices/client/repositories";
import { AddOrderRepository } from "@/slices/order/repositories";
import { UpdateServiceRepository } from "@/slices/service/repositories";
import { UpdateUserRepository } from "@/slices/user/repositories";
import { AbstractHandler } from "../contracts";

export class OrderHandler extends AbstractHandler {
  constructor(
    private readonly orderRepository: AddOrderRepository,
    private readonly serviceRepository: UpdateServiceRepository,
    private readonly userRepository: UpdateUserRepository,
    private readonly clientRepository: UpdateClientRepository
  ) {
    super();
  }
  override async handle(request: any): Promise<any> {
    if (request?.status === 10) {
      const orderAdded = await this.orderRepository.addOrder({
        name: "pedidoEfetivado",
        createdById: request?.createdById,
        createdAt: new Date(),
        updatedAt: new Date(),
        percentageAdopted: request?.order?.percentageAdopted,
        paymentForm: request?.order?.paymentForm,
        orderPaidByClient: request?.order?.orderPaidByClient,
        comissionPaidByOwner: request?.order?.comissionPaidByOwner,
        comissionValue: request?.order?.comissionValue,
        totalValue: request?.order?.totalValue,
        professionalId: request?.order?.professionalId,
        ownerId: request?.order?.ownerId,
        clientId: request?.order?.clientId,
        extraCost: request?.order?.extraCost,
        normalCost: request?.order?.normalCost,
        haveFidelity: request?.order?.haveFidelity,
        haveDelivery: request?.order?.haveDelivery,
        pointsUsed: request?.order?.pointsUsed,
        appointmentDate: request?.order?.appointmentDate,
        active: true,
      });
      if (!orderAdded) {
        throw new Error("Não foi possível criar o pedido");
      }
      const incrementAppointmentsService =
        await this.serviceRepository.incrementAppointmentsTotal(request?.serviceId);
      if (!incrementAppointmentsService) {
        throw new Error("Erro ao incrementar o total de agendamentos da tabela service");
      }
      const incrementAppointmentsProfessional =
        await this.userRepository.incrementAppointmentsTotal(request?.professionalId);
      if (!incrementAppointmentsProfessional) {
        throw new Error(
          "Erro ao incrementar o total de agendamentos da tabela user para professional"
        );
      }
      const incrementAppointmentsOwner =
        await this.userRepository.incrementAppointmentsTotal(request?.ownerId);
      if (!incrementAppointmentsOwner) {
        throw new Error(
          "Erro ao incrementar o total de agendamentos da tabela user para owner"
        );
      }
      const incrementAppointmentsClientUserId =
        await this.userRepository.incrementAppointmentsTotal(request?.clientUserId);
      if (!incrementAppointmentsClientUserId) {
        throw new Error(
          "Erro ao incrementar o total de agendamentos da tabela user para client"
        );
      }
      const incrementAppointmentsClientId =
        await this.clientRepository.incrementAppointmentsTotal(request?.clientId);
      if (!incrementAppointmentsClientId) {
        throw new Error(
          "Erro ao incrementar o total de agendamentos da tabela client para client"
        );
      }
    }
    return super.handle(request);
  }
}
``` 
A classe OrderHandler é responsável por lidar com o processamento de pedidos. Ela herda de uma classe abstrata chamada AbstractHandler, que fornece alguns comportamentos comuns para outras classes de manipuladores.

A classe OrderHandler tem um construtor que recebe quatro repositórios como parâmetros: o repositório de adição de pedidos, o repositório de atualização de serviços, o repositório de atualização de usuários e o repositório de atualização de clientes. Esses repositórios são usados ​​dentro do método handle() para realizar operações de banco de dados específicas.

O método handle() verifica se o status da solicitação é igual a 10. Se for, ele adiciona um novo pedido ao banco de dados usando o repositório de adição de pedidos. Ele também incrementa o número total de agendamentos de serviços, profissionais, proprietários e clientes usando os respectivos repositórios. Se alguma dessas operações falhar, ele lança uma exceção com uma mensagem de erro específica.

Finalmente, o método handle() chama o método handle() da classe pai (AbstractHandler) para continuar o processamento da solicitação.

```typescript
import { AddRecurrenceRepository } from "@/slices/recurrence/repositories";
import { AbstractHandler } from "../contracts";

export class RecurrenceHandler extends AbstractHandler {
  constructor(private readonly recurrenceRepository: AddRecurrenceRepository) {
    super();
  }
  override async handle(request: any): Promise<any> {
    if (
      request?.haveRecurrence === true &&
      (request?.status === 0 || request?.status === 6)
    ) {
      const recurrenceCreated = await this.recurrenceRepository.addRecurrence({
        requestId: request?._id,
        name: "recorrenciaCriada",
        serviceId: request?.serviceId,
        ownerId: request?.ownerId,
        professionalId: request?.professionalId,
        clientId: request?.clientId,
        createdById: request?.createdById,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
        initDate: request?.initDate,
        endDate: request?.endDate,
        type: request?.recurrence?.type,
        accept: false,
        appointmentsWasInserted: false,
        frequency: request?.recurrence?.frequency,
      });
      if (!recurrenceCreated) {
        throw new Error("Não foi possível criar a recorrência");
      }
    }
    return super.handle(request);
  }
}
``` 
Este é um exemplo de uma classe "RecurrenceHandler" que estende a classe "AbstractHandler". Ela tem uma dependência de uma instância da classe "AddRecurrenceRepository", que é usada para adicionar novas recorrências ao banco de dados.

A classe tem um método "handle" que sobrescreve o método da classe pai "AbstractHandler". Este método verifica se o objeto "request" tem o atributo "haveRecurrence" como verdadeiro e se o atributo "status" tem o valor 0 ou 6. Se essas condições forem atendidas, ele usa o repositório para adicionar uma nova recorrência ao banco de dados com os dados fornecidos no objeto "request". Se a adição falhar, ele lança uma exceção "Não foi possível criar a recorrência". Por fim, ele chama o método "handle" da classe pai.

```typescript
import { AddRideRepository } from "@/slices/ride/repositories";
import { AbstractHandler } from "../contracts";

export class RideHandler extends AbstractHandler {
  constructor(private readonly rideRepository: AddRideRepository) {
    super();
  }
  override async handle(request: any): Promise<any> {
    if (
      request?.haveDelivery === true &&
      (request?.status === 1 || request?.status === 7)
    ) {
      const rideCreated = await this.rideRepository.addRide({
        requestId: request?._id,
        name: "recorrenciaCriada",
        createdById: request?.createdById,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
        initDate: request?.initDate,
        endDate: request?.endDate,
        driverUserType: request?.ride?.driverUserType,
        origin: request?.ride?.origin,
        destiny: request?.ride?.destiny,
        status: request?.ride?.status,
        distance: request?.ride?.distance,
        distanceTime: request?.ride?.distanceTime,
        maxCostEstimated: request?.ride?.maxCostEstimated,
        minCostEstimated: request?.ride?.minCostEstimated,
        finalCost: request?.ride?.finalCost,
        costDefinedByOwner: request?.ride?.costDefinedByOwner,
        endDateEstimated: request?.ride?.endDateEstimated,
      });
      if (!rideCreated) {
        throw new Error("Não foi possível criar a corrida");
      }
    }
    return super.handle(request);
  }
}
``` 
Este é o código para a classe "RideHandler", que estende a classe "AbstractHandler". Ela tem um construtor que recebe uma instância da classe "AddRideRepository" e passa essa instância para o atributo privado "rideRepository". A classe tem uma função "handle" que é sobrescrita, que verifica se existe a propriedade "haveDelivery" com o valor "true" e se o status é igual a 1 ou 7. Se essas condições forem atendidas, a função "addRide" é chamada no repositório para criar uma nova corrida com os dados fornecidos. Se a corrida não for criada, uma exceção é lançada. A função "handle" da classe "AbstractHandler" também é chamada no final.

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)