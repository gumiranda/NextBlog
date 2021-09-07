---
title: 'Mais sobre React Query'
excerpt: 'Nesse post você vai ver de maneira aprofundada alguns conceitos presentes na lib React Query.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2021-09-07T07:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

## Desativando/Pausando Queries
Sempre que você quiser desativar uma query automaticamente enquanto ela estiver rodando, você pode usar a opção ``enabled=false`` no objeto config dentro da hook ``useQuery``.

Quando ``enabled`` é false:

1. Se a query guardou os dados no cache:
- A query é inicializada no ``status==='success'``ou ``isSuccess``.
2. Se a query não tem cache nenhum dos dados:
- A query inicia em ``status==='idle'`` ou ``isIdle``.
3. A query não é automaticamente disparada quando o componente é renderizado.
4. A query não faz refetch em segundo plano quando novas instâncias aparecem.
5. A query vai ignorar a propriedade ``invalidateQueries`` e a chamada a ``refetchQueries`` é feita resultando em uma nova execução da query.
6. ``refetch`` pode ser usado pra disparar a execução da query manualmente.


```javascript
 function Pokemons() {
   const {
     isIdle,
     isLoading,
     isError,
     data,
     error,
     refetch,
     isFetching,
   } = useQuery('pokemons', fetchPokemonList, {
     enabled: false,
   })
 
   return (
     <>
       <button onClick={() => refetch()}>Fetch Pokemons</button>
 
       {isIdle ? (
         'Not ready...'
       ) : isLoading ? (
         <span>Loading...</span>
       ) : isError ? (
         <span>Error: {error.message}</span>
       ) : (
         <>
           <ul>
             {data.map(pokemon => (
               <li key={pokemon.id}>{pokemon.title}</li>
             ))}
           </ul>
           <div>{isFetching ? 'Fetching...' : null}</div>
         </>
       )}
     </>
   )
 }
```

## Query Retries
Quando uma query function falha, o React Query tem como comportamento padrão tentar de novo executar essa query 3 vezes por padrão. Mas você pode personalizar esse comportamento:

1. Definindo o valor de ``retry`` pra ``false``, desativando assim esse default de tentativas após o erro.
2. Definindo algum valor numérico para ``retry`` para que seja feita x tentativas após a falha.
3. Definido o valor de ``retry`` como ``true`` pra tentar infinitamente.
4. Inventar moda criando uma arrow function dentro de ``retry`` seguindo o seguinte exemplo como base:


```javascript
import { useQuery } from 'react-query'
 
 const result = useQuery(['todos', 1], fetchTodoListPage, {
    retry:(failureCount, error) =>{console.log('olha as coisa q eu faço')},  
 })
```

## Delay
Pode definir até um delay global antes de tentar novamente, olha:

```javascript
 import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
 
 const queryClient = new QueryClient({
   defaultOptions: {
     queries: {
       retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
     },
   },
 })
 
 function App() {
   return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
 }
```
Ou por query também:

```javascript
const result = useQuery('todos', fetchTodoList, {
   retryDelay: 1000, 
 })
```
Por hoje é só, me siga para mais dicas!!

Fonte:
[Documentação oficial do React Query](https://react-query.tanstack.com/guides)