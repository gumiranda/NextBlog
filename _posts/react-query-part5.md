---
title: 'Mutações no React Query'
excerpt: 'Nesse post você vai aprender mutações na lib React Query.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2021-09-07T10:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

Falaa Dev Doido! Estamos aqui novamente agora em definitivo para mais um post sobre React Query. Nos últimos posts navegamos profundo sobre queries, e chegou a hora de estudarmos como funcionam as mutações na lib.

## Introdução

Diferente das queries, mutações são tipicamente utilizada para criar/atualizar/deletar dados no servidor. Para este fim a lib disponibiliza a hook ``useMutation``. Segue o exemplo:

```javascript
function App() {
   const mutation = useMutation(newPokemon => axios.post('/pokemons', newPokemon))
 
   return (
     <div>
       {mutation.isLoading ? (
         'Adding pokemon...'
       ) : (
         <>
           {mutation.isError ? (
             <div>An error occurred: {mutation.error.message}</div>
           ) : null}
 
           {mutation.isSuccess ? <div>Pokemon added!</div> : null}
 
           <button
             onClick={() => {
               mutation.mutate({ id: new Date(), title: 'Do thunder rain' })
             }}
           >
             Create Pokemon
           </button>
         </>
       )}
     </div>
   )
 }
```
Uma mutação pode ter os seguintes estados possíveis:
1. ``isIdle`` ou ``status==='idle'``
- A mutação está esperando pra ser executada num state de reset ou pré-renderização do componente na tela.
2. ``isLoading`` ou ``status ==='loading'``
- A mutação está executando.
3. ``isError`` ou ``status === 'error'``
- A mutação encontrou um erro.
4. ``isSuccess`` ou ``status==='success'``
- A mutação retornou com sucesso e o dado modificado já está disponível.

Através desses estados primários, mais informação fica disponível dependendo do estado da mutação:

1. ``error``
- Se a mutação tiver retornado erro o objeto ``error`` estará disponível contendo a informação.
2. ``data``
- Se a mutação tiver dado certo, o objeto ``data`` estará disponível contendo os dados.

No exemplo acima, se você observar é possível passar variáveis para as suas mutações chamando a função ``mutate`` com uma única variável ou objeto.

Até então não estamos vendo nada de extraordinário, exceto o fato de que quando usamos a opção ``onSuccess``, o método de ``QueryClient`` ``invalidateQueries`` e ``setQueryData`` ficam disponíveis para uso, tornando a ferramenta poderosa.


```javascript

 const CreatePokemon = () => {
   const mutation = useMutation(formData => {
     return fetch('/api', formData)
   })
   const onSubmit = event => {
     event.preventDefault()
     mutation.mutate(new FormData(event.target))
   }
 
   return <form onSubmit={onSubmit}>...</form>
 }
```

## Resetando o state de mutation
Algumas vezes você precisa limpar os valores de ``error`` ou ``data`` de uma request mutation. Pra fazer isso basta usar a função ``reset`` como mostrado abaixo:

```javascript
 const CreatePokemon = () => {
   const [title, setTitle] = useState('')
   const mutation = useMutation(createPokemon)
 
   const onCreatePokemon = e => {
     e.preventDefault()
     mutation.mutate({ title })
   }
 
   return (
     <form onSubmit={onCreatePokemon}>
       {mutation.error && (
         <h5 onClick={() => mutation.reset()}>{mutation.error}</h5>
       )}
       <input
         type="text"
         value={title}
         onChange={e => setTitle(e.target.value)}
       />
       <br />
       <button type="submit">Create Pokemon</button>
     </form>
   )
 }
```

## Efeitos colaterais
Se até remédio tem efeito colateral, porque mutation não vai ter, não é mesmo?
Pra isso existem funções disponibilizadas para serem implementadas dentro da hook ``useMutate`` e que devemos usá-las quando for necessário.


```javascript
 useMutation(addTodo, {
   onMutate: variables => {
     // A mutation is about to happen!
     // Optionally return a context containing data to use when for example rolling back
     return { id: 1 }
   },
   onError: (error, variables, context) => {
     // An error happened!
     console.log(`rolling back optimistic update with id ${context.id}`)
   },
   onSuccess: (data, variables, context) => {
     // Boom baby!
   },
   onSettled: (data, error, variables, context) => {
     // Error or success... doesn't matter!
   },
 })
```
**OBS**:
``onSuccess`` e ``onError`` executam antes de ``onSettled``.

Além de passar essas callbacks dentro de ``useMutation``, é possível defini-lás em ``mutate`` também, olha só:

```javascript
 useMutation(addTodo, {
   onSuccess: (data, variables, context) => {
     // I will fire first
   },
   onError: (error, variables, context) => {
     // I will fire first
   },
   onSettled: (data, error, variables, context) => {
     // I will fire first
   },
 })
 
 mutate(todo, {
   onSuccess: (data, variables, context) => {
     // I will fire second!
   },
   onError: (error, variables, context) => {
     // I will fire second!
   },
   onSettled: (data, error, variables, context) => {
     // I will fire second!
   },
 })
```

## Promises
Quando a parada é assíncrona, basta utilizar o método ``mutateAsync`` ao invés de ``mutate``.

```javascript
 const mutation = useMutation(addTodo)
 try {
   const todo = await mutation.mutateAsync(todo)
   console.log(todo)
 } catch (error) {
   console.error(error)
 } finally {
   console.log('done')
 }
```
## Retries
Por padrão não temos retentativas no ``useMutation``, então devemos passar o parâmetro ``retry`` caso desejamos este comportamento:



```javascript
 const mutation = useMutation(addTodo, {
   retry: 3,
 })
```
## Mutations com persistência de dados
Para persistir os resultados das mutations em algum storage, basta usarmos algumas funções como no exemplo abaixo:

```javascript
 const queryClient = new QueryClient()
 
 // Define the "addTodo" mutation
 queryClient.setMutationDefaults('addTodo', {
   mutationFn: addTodo,
   onMutate: async (variables) => {
     // Cancel current queries for the todos list
     await queryClient.cancelQueries('todos')
 
     // Create optimistic todo
     const optimisticTodo = { id: uuid(), title: variables.title }
 
     // Add optimistic todo to todos list
     queryClient.setQueryData('todos', old => [...old, optimisticTodo])
 
     // Return context with the optimistic todo
     return { optimisticTodo }
   },
   onSuccess: (result, variables, context) => {
     // Replace optimistic todo in the todos list with the result
     queryClient.setQueryData('todos', old => old.map(todo => todo.id === context.optimisticTodo.id ? result : todo))
   },
   onError: (error, variables, context) => {
     // Remove optimistic todo from the todos list
     queryClient.setQueryData('todos', old => old.filter(todo => todo.id !== context.optimisticTodo.id))
   },
   retry: 3,
 })
 
 // Start mutation in some component:
 const mutation = useMutation('addTodo')
 mutation.mutate({ title: 'title' })
 
 // If the mutation has been paused because the device is for example offline,
 // Then the paused mutation can be dehydrated when the application quits:
 const state = dehydrate(queryClient)
 
 // The mutation can then be hydrated again when the application is started:
 hydrate(queryClient, state)
 
 // Resume the paused mutations:
 queryClient.resumePausedMutations()
```

Por hoje é só pessoal, até a próxima!

Fonte:
[Documentação oficial do React Query](https://react-query.tanstack.com/guides/mutations)