---
title: 'Requests em segundo plano no React Query'
excerpt: 'Nesse post você vai um dos principais conceitos presentes na lib React Query.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2021-09-07T06:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

Fala Dev Doido, estou aqui novamente para mais detalhar uma série de conceitos chaves da Lib React Query. Um desses conceitos é sobre requests em segundo plano.

O state `status === 'loading'` já seria o suficiente para indicar que uma query está carregando, mas as vezes o buraco é mais embaixo. Existem situações em que você deseja mostrar um indicador adicional pra mostrar que a query está executando em segundo plano. Pra fazer isso, queries também fornecem a você através do boolean ``isFetching`` que pode usar pra mostrar que a query está executando, independentemente do valor que ``status`` tenha:

```javascript
function Pokemons() {
   const { status, data: pokemons, error, isFetching } = useQuery(
     'pokemons',
     fetchPokemons
   )
 
   return status === 'loading' ? (
     <span>Loading...</span>
   ) : status === 'error' ? (
     <span>Error: {error.message}</span>
   ) : (
     <>
       {isFetching ? <div>Refreshing...</div> : null}
 
       <div>
         {pokemons.map(pokemon => (
           <Pokemon pokemon={pokemon} />
         ))}
       </div>
     </>
   )
}
```
## State global equivalente para indicar loading

A lib nos disponibiliza também a possibilidade de pegar a propriedade ``isFetching`` de qualquer lugar. Basta importar a hook ``useIsFetching`` e criar uma variável que receba seu valor. Observe o exemplo abaixo:

```javascript
import { useIsFetching } from 'react-query'
 
 function GlobalLoadingIndicator() {
   const isFetching = useIsFetching()
 
   return isFetching ? (
     <div>Queries are fetching in the background...</div>
   ) : null
 }
```
Se o usuário deixa sua aplicação e volta, o React Query automaticamente faz o recarregamento dos dados pra você em segundo plano.
## Mas e se eu não quiser que ele faça isso?

Se você quiser mudar esse comportamente, basta usar a opção ``refetchOnWindowsFocus`` setando seu valor como ``false`` na hora de criar o objeto ``QueryClient``.


```javascript
 //
 const queryClient = new QueryClient({
   defaultOptions: {
     queries: {
       refetchOnWindowFocus: false,
     },
   },
 })
 
 function App() {
   return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
 }
```

Caso você queira fazer isso em uma query específica somente, basta passar a propriedade no objeto config da hook ``useQuery``.
```javascript
 useQuery('todos', fetchTodos, { refetchOnWindowFocus: false })
```

## E no React Native?
O React Native por padrão provê a informação de qual componente está em evidência (focus state) através do módulo nativo ``AppState``. Você pode usar o evento de change desse ``AppState`` pra disparar um update enquanto esse app state muda pra ``active``:

```javascript
import { AppState } from 'react-native'
 import { focusManager } from 'react-query'
 
 focusManager.setEventListener(handleFocus => {
   AppState.addEventListener('change', handleFocus)
 
   return () => {
    AppState.removeEventListener('change', handleFocus)
   }
 })
```
## Manipulando o state focus

Basta seguir o exemplo meu caro seguidor:

```javascript
 import { focusManager } from 'react-query'
 
 // Override the default focus state
 focusManager.setFocused(true)
 
 // Fallback to the default focus check
 focusManager.setFocused(undefined)
```

Por hoje é só garotinho, se inscreva no canal do Dev Doido e é nois!!