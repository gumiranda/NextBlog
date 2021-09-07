---
title: 'React Query Básico'
excerpt: 'Nesse post você vai ver conceitos básicos da lib React Query.'
coverImage: '/assets/blog/preview/cover.jpg'
date: '2021-09-07T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---



Fala Dev Doido!! Não aguento mais utilizar Redux Saga pra gerenciamento de estado, resolvi variar! E hoje vou ensinar pra vocês meu novo xodó no mundo das requests que é o React Query.

   <h1>O básico sobre Queries</h1>
   <p>Uma query é uma dependência declarativa de uma fonte assíncrona de dados vinculada a uma <strong>chave única</strong>. Ela pode ser usada com qualquer método baseado em Promise (como os métodos HTTP GET e POST) para retornar os dados de um servidor. Se esse método for capaz de modificar esses dados, a biblioteca recomenda o uso de mutations para este fim.
   <p>Para fazer um subscribe de uma query nos seus componentes ou hooks, chame a hook <code>useQuery</code> com no mínimo:</p>
   <ul>
      <li>Uma <strong>chave única que identifique essa query</strong></li>
      <li>
         Uma função ou arrow function que:
         <ul>
            <li>Retorne os dados em caso de sucesso, ou</li>
            <li>Dispare uma exceção em caso de erro</li>
         </ul>
      </li>
   </ul>

```javascript
import { useQuery } from "react-query";
import axios from "axios";

export default function PageOfPokemons() {
  const result = useQuery("getAllPokemons", getPokemons);
  const { data = null } = result || {};
  return <div>{data && <p>{JSON.stringify(data)}</p>}</div>;
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

   <p>O objeto <code>result</code> possui alguns states importantes que você vai precisar pra ser produtivo na sua jornada. Uma query sempre está em um único state, e são eles:</p>
   <ul>
      <li><code>isLoading</code> ou <code>status === 'loading'</code> -  Que é quando a query não possui a propriedade data carregada e ainda está carregando.</li>
      <li><code>isError</code> ou <code>status === 'error'</code> - Que é quando a API retorna erro na consulta.</li>
      <li><code>isSuccess</code> ou <code>status === 'success'</code> - Que é quando a query retorna os dados da API com sucesso.</li>
      <li><code>isIdle</code> ou <code>status === 'idle'</code> - Que é quando a query foi desabilitada por algum motivo. Um deles por exemplo pode ser devido a um state vinculado a query que travou o disparo da query pro servidor. Mas veremos mais adiante com mais detalhes.</li>
   </ul>
   <p>Através desses states principais, mais informação é disponibilizada de acordo com o state atual da query:</p>
   <ul>
      <li><code>error</code> - Se a query está no estado <code>isError</code>, o erro obtido é disponibilizado através da propriedade <code>error</code>.</li>
      <li><code>data</code> - Se a query está no estado <code>success</code>, os dados retornados são disponibilizados através da propriedade <code>data</code>.</li>
      <li><code>isFetching</code> - Em qualquer outro state, se a query ainda está carregando (incluindo refetching em segundo plano) a propriedade <code>isFetching</code> terá valor <code>true</code>.</li>
   </ul>
   <p>Para a <strong>maioria</strong> das queries, checar o valor do state <code>isLoading</code> já é suficiente, assim como o state <code>isError</code> para verificar se houve erro, e finalmente assumir que a propriedade <code>data</code> está disponível para repassarmos seu valor ao componente responsável por renderizar esses dados:</p>

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
  return <div>{data && <p>{JSON.stringify(data)}</p>}</div>;
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
  return <div>{data && <p>{JSON.stringify(data)}</p>}</div>;
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

<h1>Chaves das queries</h1>

Esse é o coração do negócio, o React Query gerencia o cache pra você baseado nessas chaves. Elas podem tanto ser uma simples string, como também você pode querer inventar moda e criar um array de várias strings e objetos aninhados. Enquanto essa key for serializável e única, você pode colocar o que quiser lá dentro.

<h2>Chaves de string única</h2>

O jeito mais fácil de definir essa key é com uma simples string. Quando essa string é passada la dentro, ela é convertida internamente na lib para um array, como se ele fosse um array de strings com um elemento só.

<h2>Chave de Array de strings</h2>

Quando uma query necessita de mais informações do que uma única string pra descrever os dados, você pode usar um array com uma string ou um número qualquer de objetos serializáveis para descrevê-la. Isso é útil para:

<ul>
<li>Recursos aninhados ou hierárquicos<br><ul><li>É comum passar algum ID, índice ou qualquer outro meio primitivo de identificar esse item.</li></ul></li>
<li>Queries com parâmetros adicionais<br><ul><li>É comum passar um objeto com outros atributos extras.</li></ul></li>
</ul>

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

<h2>Se sua query function depende de uma variável específica, inclua ela em sua query key!</h2>

Desde que query keys são exclusivamente para descrever os dados que estão vindo, elas podem também incluir quaisquer variáveis que você utilize em sua query function que podem <b>mudar</b>. Por exemplo:

```javascript
function getPokemonById({pokemonId}){
    const result = useQuery(['getPokemonById',pokemonId],()=> fetchPokemonById(pokemonId));
}
```

<h1>Query functions</h1>
Uma query function pode ser literalmente qualquer função que <b>retorne uma promise</b>.
A promise que for retornada deve necessariamente <b>retornar com sucesso os dados</b> ou <b>disparar uma exceção de erro</b>.

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

<h2>Lidando com erros</h2>
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
<h2>Opa, acabei de dar um spoiler</h2>

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
<h2>Passando objeto ao invés de parâmetros</h2>
Qualquer assinatura do tipo <code>[queryKey,queryFn,config]</code> é suportada pela API do React Query, e você pode usar um objeto para expressar essa configuração.


```javascript
 import { useQuery } from 'react-query'
 
 useQuery({
   queryKey: ['pokemon', 7],
   queryFn: fetchPokemon,
   ...config,
 })
```

<h1>Queries paralelas</h1>
Quando você precisa executar várias queries em paralelo para maximizar a concorrência você tem várias opções a seguir. Veremos uma a uma:

<h2>Queries paralelas manuais</h2>
Quando você sabe de antemão quantas queries vai executar em paralelo esse método é o ideal. Basta escrever uma query embaixo da outra do jeito que aprendemos acima neste post. Tanto usando as hooks <b>useQuery</b> quanto usando <b>useInfiniteQuery</b>.

```javascript
 function App () {
   const usersQuery = useQuery('users', fetchUsers)
   const teamsQuery = useQuery('teams', fetchTeams)
   const projectsQuery = useQuery('projects', fetchProjects)
   ...
 }
```

<h2>Queries paralelas dinâmicas</h2>
Quando o número de queries em paralelo é desconhecido o bicho pega. E é aí que entra o nosso amigo <code>useQueries</code>. Ele aceita um <b>array de objetos do tipo query</b> e retorna um <b>array contendo o resultado de cada query</b>.


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

<h1>Queries dependentes</h1>
E quando você precisa esperar uma query pra disparar outra? O que fazemos?
Dentro da assinatura aceita pela hook <code>useQuery</code> temos o terceiro cavaleiro do apocalipse chamado <code>config</code>. Esse objeto tem uma propriedade chamada <code>enabled</code> que serve para lidar com essa situação. Veja o exemplo:

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



```javascript
```



```javascript
```










```javascript
```