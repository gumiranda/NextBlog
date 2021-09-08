---
title: 'Cultura do cancelamento de Queries'
excerpt: 'Nesse post você verá como a cultura do cancelamento se encaixa na lib React Query.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2021-09-07T11:37:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

## Cancelamento de query
A cultura do cancelamento está em alta no Brasil atualmente. Vamos ver como isso funciona com queries nessa biblioteca.

Por padrão, queries quando são desmontadas antes das suas promises serem resolvidas (desmontar é quando eu saio de uma tela), são simplesmente ignoradas ao invés de canceladas. Mas por que isso?
1. Para a maioria das aplicações, ignorar já basta.
2. Cancelamento de APIs não está disponível em toda query function implementada.
3. Se cancelament de API estiver disponível, então elas tipicamente variam entre libs que tratam requests HTTP.

Mas não se preocupe! Se suas queries são pesadíssimas e consomem alta largura de banda a lib React Query expõe uma forma genérica de cancelar essas requests usando um token de cancelamento. Pra usar esse recurso, anexe uma função ``cancel`` na promise retornada pela query que implemente o comportamento de cancelamento. Quando a query começa a ficar obsoleta ou inativa, essa função ``promise.cancel`` é chamada. Veja o exemplo usando axios.

```javascript
 import axios from 'axios'
 const query = useQuery('todos', () => {
   // Create a new CancelToken source for this request
   const CancelToken = axios.CancelToken
   const source = CancelToken.source()
   const promise = axios.get('/todos', {
     // Pass the source token to your request
     cancelToken: source.token,
   })
   // Cancel the request if React Query calls the `promise.cancel` method
   promise.cancel = () => {
     source.cancel('Query was cancelled by React Query')
   }
   return promise
 }) 
```
Se você quiser que o usuário possa cancelar manualmente a request (colocando um botão) :
```javascript
 import axios from 'axios'
 const query = useQuery('todos', () => {
   // Create a new CancelToken source for this request
   const CancelToken = axios.CancelToken
   const source = CancelToken.source()
   const promise = axios.get('/todos', {
     // Pass the source token to your request
     cancelToken: source.token,
   })
   // Cancel the request if React Query calls the `promise.cancel` method
   promise.cancel = () => {
     source.cancel('Query was cancelled by React Query')
   }
   return promise
 }) 
 return (
   <button onClick={(e) => {
     e.preventDefault();
     queryClient.cancelQueries('todos');
    }}>Cancelar Query</button>
 )
```

## Restauração de Scroll 
Quando a gente rola numa tela com vários registros, nós geralmente nem percebemos as queries paginadas que acontecem por baixo dos panos e nossa posição na tela é sempre atualizada. Essa mágina acontece por que precisa acontecer. E no React Query ele guarda as requests no cache e trata isso pra você.

Por hoje é só pessoal, até a próxima!

Fonte:
[Documentação oficial do React Query](https://react-query.tanstack.com/guides/mutations)