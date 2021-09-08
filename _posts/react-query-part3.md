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

## Prefetching
Se você for uma pessoa sortuda, saberá quais dados os usuários precisarão antes mesmo de disparar explicitamente a chamada a esses dados. Quando isso acontece a lib React Query tem a função ``prefetchQuery`` ao nosso dispor. Veja só:

```javascript
 const prefetchTodos = async () => {
   const queryClient = useQueryClient()
   // Os resultados dessa query serão guardados no cache
   await queryClient.prefetchQuery('todos', fetchTodos)
 }
```
1. Se os dados dessa query já estão em cache e não foram **invalidados**, os dados não serão buscados novamente.
2. Se a prop ``staleTime`` é passada por ex. ``prefetchQuery('todos',fn,{staleTime:5000})`` e os dados são mais antigos que esse tempo indicado, então a query será executada.
3. Se nenhuma instância de ``queryClient`` aparecer pra query pré-carregada, então ela será deletada e o cache será limpado num tempo especificado por ``cacheTime``.

## Fazendo na mão
Caso você já tenha os dados da sua query disponíveis, não é necessário fazer esse prefetch. Você pode usar a função ``setQueryData`` de ``queryClient`` diretamente pra adicionar ou atualizar o cache pela key da query.

```javascript
 const queryClient = useQueryClient()
 queryClient.setQueryData('todos', todos)
```

## Invalidando querys
Esperar queries se tornarem obsoletas (stale state) antes de serem buscadas novamente nem sempre dá certo, especialmente quando você sabe que esses dados estão desatualizados devido a algo que o usuário tenha modificado. Pra esse propósito, o ``QueryClient`` tem a função ``invalidateQueries`` que deixa você marcar quais queries podem dar esse problema para que o refetch delas seja feito.
```javascript
 const queryClient = useQueryClient()
 // Invalidate every query in the cache
 queryClient.invalidateQueries()
 // Invalidate every query with a key that starts with `todos`
 queryClient.invalidateQueries('todos')
```

Quando uma query é invalidada com o ``invalidateQueries``, duas coisas acontecem:
1. Ela é marcada como ``stale`` no state. Esse state sobrescreve qualquer configuração de ``staleTime`` a ser usadas na hook ``useQuery`` e suas semelhantes.
2. Se a query estiver sendo renderizada via ``useQuery`` ou semelhantes, ela também fará o refetch delas em segundo plano.

## Query Matching com ``invalidateQueries``

Quando usamos APIs como ``invalidateQueries`` e ``removeQueries`` (ou outras que suportarem matching parcial de query), você pode marcar múltiplas queries pelo seu prefixo, ou marcar uma especificamente uma determinada query. Vamos supor que você tenha 10 queries que iniciam em ``getAllBy``. Se filtrarmos por esse prefixo invalidaremos todas as 10. Veja abaixo o exemplo:

```javascript
import { useQuery, useQueryClient } from 'react-query'
const queryClient = useQueryClient()
queryClient.invalidateQueries('getAllBy');
//todas as queries abaixo serão invalidadas
const todoListQuery = useQuery('getAllById', fetchTodoList)
const todoListQuery = useQuery(['getAllByPage', { page: 1 }], fetchTodoList)
const todoListQuery = useQuery(['getAllByName', { name: 'DevDoidão' }], fetchTodoList)
```
E você ainda pode invalidar queries usando variáveis específicas de acordo com o que você passa na key da query. Veja:

```javascript
 queryClient.invalidateQueries(['todos', { type: 'done' }])
 // Vai ser invalidada
 const todoListQuery = useQuery(['todos', { type: 'done' }], fetchTodoList)
 // Não vai ser invalidada
 const todoListQuery = useQuery('todos', fetchTodoList)
```
A função ``invalidateQueries`` é muito flexível, se você quiser restringir a uma única e exclusiva invalidação basta passar a prop ``exact:true`` no método. Veja:

```javascript
queryClient.invalidateQueries('todos', { exact: true })
 // Vai ser invalidada
 const todoListQuery = useQuery(['todos'], fetchTodoList)
 // Não vai ser invalidada
 const todoListQuery = useQuery(['todos', { type: 'done' }], fetchTodoList)
```
Se quiser inventar alguma validação antes de ver quais queries você deseja invalidar, basta usar a prop ``predicate`` e definir sua lógica via arrow function. Veja:

```javascript
 queryClient.invalidateQueries({
   predicate: query =>
     query.queryKey[0] === 'todos' && query.queryKey[1]?.version >= 10,
 })
 // Vai ser invalidada
 const todoListQuery = useQuery(['todos', { version: 20 }], fetchTodoList)
 // Vai ser invalidada
 const todoListQuery = useQuery(['todos', { version: 10 }], fetchTodoList)
 // Não vai ser invalidada
 const todoListQuery = useQuery(['todos', { version: 5 }], fetchTodoList)
```

Por hoje é só, me siga para mais dicas!!

Fonte:
[Documentação oficial do React Query](https://react-query.tanstack.com/guides/disabling-queries)