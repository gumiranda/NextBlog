---
title: 'Filtros no React Query'
excerpt: 'Nesse post você verá os filtros presentes na lib React Query.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2021-09-07T11:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

 ## Filtros
 Alguns métodos no React Query aceitam objetos do tipo ``QueryFilters`` ou ``MutationFilters`` para este fim.

 ## ``Query Filters``
 Um queryFilter é um objeto com certas condições, veja alguns exemplos abaixo:
```javascript
// Cancela todas as queries
 await queryClient.cancelQueries()
 // Remove todas as queries inativas que comecem com posts na key
 queryClient.removeQueries('posts', { inactive: true })
 // Recarrega todas as queries ativas
 await queryClient.refetchQueries({ active: true })
 // Recarrega todas as queries ativas que comecem com `posts` na key
 await queryClient.refetchQueries('posts', { active: true })
```
Um queryFilter possui os seguintes atributos:
1. ``exact?: boolean``
- Se você não quer buscar queries pelo prefixo da chave, pode passar a propriedade ``exact:true`` para retornar somente a query com a chave exatamente igual a que você quer.
2. ``active?:boolean``
- Quando true irá filtrar as queries ativas
- Quando false adivinha?
3. ``inactive?:boolean``
- É o inverso da active
4. ``stale?:boolean``
- Consultas obsoletas
5. ``fetching?:boolean``
- Consultas que ainda estão executando
6. ``predicate?: (query: Query) => boolean``
- Essa função é chamada pra cada query presente no cache retornando true para as queries encontradas.
7. ``queryKey?:QueryKey``
- Chave identificadora da query.

 ## ``Mutation Filters``
São filtros presentes nas mutations. Dentre eles temos:
```javascript
// Get the number of all fetching mutations
 await queryClient.isMutating()
 
 // Filter mutations by mutationKey
 await queryClient.isMutating({ mutationKey: "post" })
 
 // Filter mutations using a predicate function
 await queryClient.isMutating({ predicate: (mutation) => mutation.options.variables?.id === 1 })
```

Uma mutationFilter possui os seguintes atributos:
1. ``exact?: boolean``
- Se você não quer buscar mutations pelo prefixo da chave, pode passar a propriedade ``exact:true`` para retornar somente a mutation com a chave exatamente igual a que você quer.
2. ``active?:boolean``
- Quando true irá filtrar as mutations ativas
- Quando false adivinha?
3. ``inactive?:boolean``
- É o inverso da active
4. ``stale?:boolean``
- Consultas obsoletas
5. ``fetching?:boolean``
- Consultas que ainda estão executando
6. ``predicate?: (mutation: Mutation) => boolean``
- Essa função é chamada pra cada mutation presente no cache retornando true para as mutations encontradas.
7. ``mutationKey?:MutationKey``
- Chave identificadora da mutation.

Por hoje é só pessoal, até a próxima!

Fonte:
[Documentação oficial do React Query](https://react-query.tanstack.com/guides/filters)