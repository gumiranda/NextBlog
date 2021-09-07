---
title: 'React Query Básico'
excerpt: 'Nesse post você vai ver conceitos básicos da lib React Query.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2021-09-07T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---



Fala Dev Doido!! Não aguento mais utilizar Redux Saga pra gerenciamento de estado, resolvi variar! E hoje vou ensinar pra vocês meu novo xodó no mundo das requests que é o React Query.


##  O básico sobre Queries

Uma query é uma dependência declarativa de uma fonte assíncrona de dados vinculada a uma **chave única**. Ela pode ser usada com qualquer método baseado em Promise (como os métodos HTTP GET e POST) para retornar os dados de um servidor. Se esse método for capaz de modificar esses dados, a biblioteca recomenda o uso de mutations para este fim.

Para fazer um subscribe de uma query nos seus componentes ou hooks, chame a hook ``useQuery`` com no mínimo:
   
1. Uma **chave única que identifique essa query**
2. Uma função ou arrow function que:
3. Retorne os dados em caso de sucesso, ou
4. Dispare uma exceção em caso de erro
         
```javascript
import { useQuery } from "react-query";
import axios from "axios";

export default function PageOfPokemons() {
  const result = useQuery("getAllPokemons", getPokemons);
  const { data = null } = result || {};
  return <div>{data && {JSON.stringify(data)}}</div>;
}
const getPokemons = async () => {
  try {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=50");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
```

O objeto ``result`` possui alguns states importantes que você vai precisar pra ser produtivo na sua jornada. Uma query sempre está em um único state, e são eles:
   
1. ``isLoading`` ou ``status === 'loading'`` -  Que é quando a query não possui a propriedade data carregada e ainda está carregando.

2. ``isError`` ou ``status === 'error'`` - Que é quando a API retorna erro na consulta.

3. ``isSuccess`` ou ``status === 'success'`` - Que é quando a query retorna os dados da API com sucesso.

4. ``isIdle`` ou ``status === 'idle'`` - Que é quando a query foi desabilitada por algum motivo. Um deles por exemplo pode ser devido a um state vinculado a query que travou o disparo da query pro servidor. Mas veremos mais adiante com mais detalhes.
   
Através desses states principais, mais informação é disponibilizada de acordo com o state atual da query:
   
1. ``error`` - Se a query está no estado ``isError``, o erro obtido é disponibilizado através da propriedade ``error``.
2. ``data`` - Se a query está no estado ``success``, os dados retornados são disponibilizados através da propriedade ``data``.
3. ``isFetching`` - Em qualquer outro state, se a query ainda está carregando (incluindo refetching em segundo plano) a propriedade ``isFetching`` terá valor ``true``.
   
Para a **maioria** das queries, checar o valor do state ``isLoading`` já é suficiente, assim como o state ``isError`` para verificar se houve erro, e finalmente assumir que a propriedade ``data`` está disponível para repassarmos seu valor ao componente responsável por renderizar esses dados:

```javascript
import { useQuery } from "react-query";
import axios from "axios";

export default function PageOfPokemons() {
  const result = useQuery("getAllPokemons", getPokemons);
  const { isLoading, isError, data, error } = result || {};
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  // Nesse ponto já assumimos que `isSuccess === true`
  return <div>{data && {JSON.stringify(data)}}</div>;
}
const getPokemons = async () => {
  try {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=50");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
```

Se booleanos não é a sua praia, a biblioteca deixa você usar o state status também, olha só:

```javascript
import { useQuery } from "react-query";
import axios from "axios";

export default function PageOfPokemons() {
  const result = useQuery("getAllPokemons", getPokemons);
  const { status, data, error } = result || {};
  if (status === "loading") {
    return <span>Loading...</span>;
  }
  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }
  // Nesse ponto já assumimos que `isSuccess === true`
  return <div>{data && {JSON.stringify(data)}}</div>;
}
const getPokemons = async () => {
  try {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=50");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
```

##  Chaves das queries

Esse é o coração do negócio, o React Query gerencia o cache pra você baseado nessas chaves. Elas podem tanto ser uma simples string, como também você pode querer inventar moda e criar um array de várias strings e objetos aninhados. Enquanto essa key for serializável e única, você pode colocar o que quiser lá dentro.

## Chaves de string única

O jeito mais fácil de definir essa key é com uma simples string. Quando essa string é passada la dentro, ela é convertida internamente na lib para um array, como se ele fosse um array de strings com um elemento só.

## Chave de Array de strings

Quando uma query necessita de mais informações do que uma única string pra descrever os dados, você pode usar um array com uma string ou um número qualquer de objetos serializáveis para descrevê-la. Isso é útil para:


1. Recursos aninhados ou hierárquicos
- É comum passar algum ID, índice ou qualquer outro meio primitivo de identificar esse item.
2. Queries com parâmetros adicionais
- É comum passar um objeto com outros atributos extras.


```javascript
// Retornar um único pokemón
 useQuery(['getPokemon', 5], ...)
 // queryKey === ['getPokemon', 5]
 
 // Retornar um único pokemón mas que tenha um modo "preview" vindo da API
 useQuery(['getPokemon', 5, { preview: true }], ...)
 // queryKey === ['getPokemon', 5, { preview: true }]
 
 // Uma lista de pokemóns que estão com o status "foraDaPokebola"
 useQuery(['getPokemons', { type: 'foraDaPokebola' }], ...)
 // queryKey === ['getPokemons', { type: 'foraDaPokebola' }]
```

## Se sua query function depende de uma variável específica, inclua ela em sua query key!

Desde que query keys são exclusivamente para descrever os dados que estão vindo, elas podem também incluir quaisquer variáveis que você utilize em sua query function que podem **mudar**. Por exemplo:

```javascript
function getPokemonById({pokemonId}){
    const result = useQuery(['getPokemonById',pokemonId],()=> fetchPokemonById(pokemonId));
}
```

## Query functions
Uma query function pode ser literalmente qualquer função que **retorne uma promise**.
A promise que for retornada deve necessariamente **retornar com sucesso os dados** ou **disparar uma exceção de erro**.

A seguir a biblioteca disponibiliza uma série de query functions válidas como exemplo:

```javascript
useQuery(['pokemon'], fetchAllPokemons)
 useQuery(['pokemon', pokemonId], () => fetchPokemonById(pokemonId))
 useQuery(['pokemon', pokemonId], async () => {
   const data = await fetchPokemonById(PokemonId)
   return data
 })
 useQuery(['pokemon', pokemonId], ({ queryKey }) => fetchPokemonById(queryKey[1]))
```

## Lidando com erros
Try e catch foi criado pra usar garotinho! Um jeito simples e elegante de lidar com exceções é utilizar esses blocos em suas query functions. Veja:


```javascript
  const { error } = useQuery(["pokemons", pokemonId], async ({queryKey}) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${queryKey?.pokemonId}`,
      );
      if (response?.data?.somethingGoesWrong) {
        throw new Error("Oh no!");
      }
    } catch (e) {
      throw new Error(e);
    }
    return data;
  });
```
## Opa, acabei de dar um spoiler

Query functions também podem ter variáveis a serem passadas como parâmetro! Veja só um exemplo.

```javascript
  function Pokemons({ status, page }) {
    const result = useQuery(['pokemons', { status, page }], fetchPokemonList);
  }
  
  function fetchPokemonList({ queryKey }) {
    const [_key, { status, page }] = queryKey;
    return new Promise();
  }
```
## Passando objeto ao invés de parâmetros
Qualquer assinatura do tipo ``[queryKey,queryFn,config]`` é suportada pela API do React Query, e você pode usar um objeto para expressar essa configuração.


```javascript
 import { useQuery } from 'react-query'
 
 useQuery({
   queryKey: ['pokemon', 7],
   queryFn: fetchPokemon,
   ...config,
 })
```

## Queries paralelas
Quando você precisa executar várias queries em paralelo para maximizar a concorrência você tem várias opções a seguir. Veremos uma a uma:

## Queries paralelas manuais
Quando você sabe de antemão quantas queries vai executar em paralelo esse método é o ideal. Basta escrever uma query embaixo da outra do jeito que aprendemos acima neste post. Tanto usando as hooks **useQuery** quanto usando **useInfiniteQuery**.

```javascript
 function App () {
   const usersQuery = useQuery('users', fetchUsers)
   const teamsQuery = useQuery('teams', fetchTeams)
   const projectsQuery = useQuery('projects', fetchProjects)
   ...
 }
```

## Queries paralelas dinâmicas
Quando o número de queries em paralelo é desconhecido o bicho pega. E é aí que entra o nosso amigo ``useQueries``. Ele aceita um **array de objetos do tipo query** e retorna um **array contendo o resultado de cada query**.


```javascript
function App({ users }) {
   const userQueries = useQueries(
     users.map(user => {
       return {
         queryKey: ['user', user.id],
         queryFn: () => fetchUserById(user.id),
       }
     })
   )
 }
```

## Queries dependentes
E quando você precisa esperar uma query pra disparar outra? O que fazemos?
Dentro da assinatura aceita pela hook ``useQuery`` temos o terceiro cavaleiro do apocalipse chamado ``config``. Esse objeto tem uma propriedade chamada ``enabled`` que serve para lidar com essa situação. Veja o exemplo:

```javascript
 // Retorna o usuario
 const { data: user } = useQuery(['user', email], getUserByEmail)
 
 const userId = user?.id
 
 // Então retorna os projetos do usuário
 const { isIdle, data: projects } = useQuery(
   ['projects', userId],
   getProjectsByUser,
   {
     // Essa query não vai ser disparada enquanto esse userId não for retornado da outra //////query
     enabled: !!userId,
   }
 )
 
 // isIdle será `true` enquanto `enabled` for true e a query estiver esperando pra executar.
 // Então vai pro estágio de `isLoading` true e se tudo der certo vai pro
 // estágio`isSuccess`  :)
```

Bom por hoje é isso garotinhos, se inscreva no canal do Dev Doido no Youtube e me siga para mais dicas valeu!
