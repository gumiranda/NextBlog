---
title: 'Utils MongoDB no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-06-24T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Nesta aula, vamos criar algumas funções utilitárias para ajudar na manipulação de consultas MongoDB. Essas funções serão úteis para transformar objetos de consulta em um formato que possa ser facilmente utilizado pelo MongoDB. Além disso, também vamos criar funções para trabalhar com projeções, ordenações, paginações e agregações. O objetivo é simplificar e padronizar a maneira como essas operações são realizadas no código da aplicação, de forma a torná-las mais claras e fáceis de serem lidas e mantidas.

```typescript
export const numberFields = [
  "price",
  "finalPrice",
  "comission",
  "duration",
  "promotionalPrice",
  "productsQuantityNeeded",
  "appointmentsTotal",
  "status",
  "minimumTimeForReSchedule",
];

export const numberFieldsWithOperatorsGt = numberFields.map(
  (field) => field + "operatorgt"
);
export const numberFieldsWithOperatorsGte = numberFields.map(
  (field) => field + "operatorgte"
);
export const numberFieldsWithOperatorsLt = numberFields.map(
  (field) => field + "operatorlt"
);
export const numberFieldsWithOperatorsLte = numberFields.map(
  (field) => field + "operatorlte"
);
export const numberFieldsWithOperatorsne = numberFields.map(
  (field) => field + "operatorne"
);
export const numberFieldsWithOperations = [
  ...numberFieldsWithOperatorsGt,
  ...numberFieldsWithOperatorsGte,
  ...numberFieldsWithOperatorsLte,
  ...numberFieldsWithOperatorsLt,
  ...numberFieldsWithOperatorsne,
];
export const booleanFields = [
  "canPayWithFidelityPoints",
  "hasFidelityGenerator",
  "havePromotionalPrice",
  "haveDelivery",
  "haveRecurrence",
  "haveFidelity",
  "haveRide",
  "cash",
  "creditcard",
  "debitcard",
  "transferbank",
  "cheque",
  "pix",
  "face",
  "active",
  "read",
  "cancelled",
  "push",
];
``` 
Essas constantes são listas de campos numéricos e booleanos para usar em operações de banco de dados. Elas podem ser usadas para definir quais campos devem ser tratados como números ou booleanos, e também contém outras constantes que adicionam operadores (como "gt", "gte", "lt", "lte" e "ne") aos campos numéricos para usar em consultas. Essas constantes podem ser usadas para simplificar o código e torná-lo mais legível, permitindo que os desenvolvedores se concentrem na lógica em vez de se preocuparem com a escrita de consultas complexas.


```typescript
import { ObjectId } from "mongodb";

export const mapAnyToMongoObject = (anyObject: any): any => {
  if (
    !anyObject ||
    typeof anyObject !== "object" ||
    !Object.keys(anyObject) ||
    Object.keys(anyObject)?.length === 0
  ) {
    return null;
  }
  const mongoObject: any = {};
  Object.keys(anyObject).forEach((key: string) => {
    if (
      (key?.includes?.("Id") || key?.includes?.("_id")) &&
      typeof anyObject[key] === "string"
    ) {
      mongoObject[key] = new ObjectId(anyObject[key]);
    } else if (key?.includes?.("Ids") || key?.includes?.("_ids")) {
      mongoObject[key] = anyObject[key]?.map((id: string) => new ObjectId(id));
    } else {
      mongoObject[key] = anyObject[key];
    }
  });
  return mongoObject;
};
``` 
Este código exporta uma função chamada mapAnyToMongoObject, que é usada para converter objetos javascript em objetos compatíveis com o MongoDB. A função recebe um parâmetro chamado "anyObject", que é o objeto a ser convertido.

Primeiro, verifica se o objeto passado é válido e tem pelo menos uma propriedade. Se não for, a função retorna nulo. Em seguida, cria um objeto vazio chamado "mongoObject".

Em seguida, a função itera sobre todas as propriedades do objeto passado usando o método forEach. Para cada propriedade, verifica se o nome da propriedade inclui "Id" ou "_id" e se o valor da propriedade é uma string. Se for verdadeiro, cria um novo objeto ObjectId usando o valor da propriedade e adiciona ao "mongoObject". Se o nome da propriedade inclui "Ids" ou "_ids", então a função itera sobre o array e cria um novo objeto ObjectId para cada valor e atribui o array a "mongoObject". Se nenhuma das condições acima for atendida, a função simplesmente adiciona a chave e valor que vieram como entrada no objeto de saída.

```typescript
import {
  numberFields,
  numberFieldsWithOperations,
} from "@/application/helpers/utils/numberFields";
import { ObjectId } from "mongodb";
import { subHours } from "date-fns";

export const mapQueryParamsToQueryMongo = (queryParams: any): any => {
  if (
    !queryParams ||
    typeof queryParams !== "object" ||
    !Object.keys(queryParams) ||
    Object.keys(queryParams)?.length === 0
  ) {
    return null;
  }
  let newQuery: any = {};
  const keys = Object.keys(queryParams);
  for (const key of keys) {
    if (key?.includes?.("Ids")) {
      const auxArraySplitted = queryParams[key].split?.(",");
      const arrayIdsMapped = auxArraySplitted?.map?.(
        (elementId: string) => new ObjectId(elementId)
      );
      newQuery[key] = { $elemMatch: { $in: arrayIdsMapped } };
    } else if (key?.includes?.("Id")) {
      newQuery[key] = new ObjectId(queryParams[key]);
    } else if (!isNaN(Number(queryParams[key])) && numberFields?.includes?.(key)) {
      newQuery[key] = { $eq: Number(queryParams[key]) };
    } else if (
      !isNaN(Number(queryParams[key])) &&
      numberFieldsWithOperations?.includes?.(key)
    ) {
      const aux = key?.split?.("operator");
      newQuery[aux?.[0]] = { ["$" + aux?.[1]]: Number(queryParams[key]) };
    } else if (key?.includes?.("textregex")) {
      newQuery[key?.replace?.("textregex", "")] = {
        $regex: queryParams[key],
        $options: "i",
      };
    } else if (key?.includes?.("text")) {
      newQuery.$text = {
        $search: queryParams[key],
        $caseSensitive: false,
        $diacriticSensitive: false,
      };
    } else if (key?.includes?.("isPast")) {
      newQuery[key?.replace?.("isPast", "")] = {
        $lte: subHours(new Date(), 4)?.toISOString(),
      };
    } else if (key?.includes?.("isFuture")) {
      newQuery[key?.replace?.("isFuture", "")] = {
        $gte: subHours(new Date(), 4)?.toISOString(),
      };
    } else if (keys?.includes?.("endDate") && key?.includes?.("initDate")) {
      newQuery["initDate"] = {
        $gte: queryParams["endDate"],
        $lte: queryParams["initDate"],
      };
    } else if (!key?.includes?.("endDate")) {
      newQuery[key] = queryParams[key];
    }
  }
  return newQuery;
};
``` 
Esse código exporta uma função chamada "mapQueryParamsToQueryMongo", que tem como objetivo mapear os parâmetros de consulta de um objeto qualquer para um objeto que possa ser utilizado como consulta no MongoDB. A função recebe um parâmetro "queryParams" que é o objeto a ser mapeado.

O código verifica se "queryParams" é válido, ou seja, se é um objeto e se possui alguma propriedade. Se não for válido, a função retorna "null". Caso contrário, é criado um novo objeto "newQuery" que será utilizado para armazenar as propriedades mapeadas.

Em seguida, as propriedades de "queryParams" são iteradas e, de acordo com seus nomes e valores, são adicionadas a "newQuery" com os devidos mapeamentos. Por exemplo, se uma propriedade tiver o nome "Ids", o valor será convertido para um array de ObjectIds do MongoDB. Se uma propriedade tiver o nome "Id", o valor será convertido para um ObjectId do MongoDB. Se uma propriedade tiver o nome "textregex", o valor será mapeado para uma expressão regular no MongoDB. E assim por diante. Por fim, a função retorna "newQuery" como resultado.

```typescript
export const mountGeoNearQuery = (geoNearQueryParams: any): any => {
  if (
    !geoNearQueryParams ||
    typeof geoNearQueryParams !== "object" ||
    !Object.keys(geoNearQueryParams) ||
    Object.keys(geoNearQueryParams)?.length === 0 ||
    !geoNearQueryParams?.coordinates
  ) {
    return null;
  }
  return {
    near: { type: "Point", coordinates: geoNearQueryParams?.coordinates },
    query: geoNearQueryParams?.query,
    distanceField: "distance",
    maxDistance: 20000000,
    spherical: true,
  };
};
``` 
A função mountGeoNearQuery é utilizada para construir uma consulta de busca de proximidade geográfica para o MongoDB. Ela recebe como parâmetro um objeto chamado geoNearQueryParams que contém as informações necessárias para a consulta.

O primeiro passo é verificar se o objeto geoNearQueryParams é válido, ou seja, se ele existe, se é do tipo objeto e se ele possui alguma chave. Se alguma dessas condições não for atendida, a função retornará null.

O campo near é usado para especificar a localização geográfica que desejamos buscar. Ele possui o tipo "Point" e as coordenadas especificadas no objeto geoNearQueryParams. O objeto query é usado para especificar qualquer outro filtro para a consulta.

O objeto distanceField é usado para especificar o nome do campo que será usado para armazenar a distância entre a localização especificada e os documentos encontrados. 
 

[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)