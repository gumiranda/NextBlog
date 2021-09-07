---
title: 'React Query no Next.js'
excerpt: 'Nesse post você vai ver como funciona SSR usando a lib React Query para gerenciamento de estado tanto no lado do cliente quando no lado do servidor.'
coverImage: '/assets/blog/preview/cover.jpg'
date: '2021-09-02T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---



Fala Dev Doido!! Hoje falarei sobre como integrar a lib React Query com SSR no Next.js usando de exemplo a API pública mais xarope do planeta, que é a API do Pokemón!!

Atualmente a lib React Query suporta 2 meios de pré-carregamento de dados no servidor a serem passados ao objeto principal instanciado chamado queryClient.

<ul>
&nbsp;
<li>
 Pré-carregar os dados você mesmo e passá-los como <b>initialData</b>.
Essa abordagem é de rápida implementação e ideal para casos de uso simples.
 </li>
<li> Pré-carregar os dados diretamente no servidor, invalidar o cache e revalidá-lo no lado do cliente.</li>
</ul>
Essa abordagem requer um nível de configuração maior. Mas isso não é obstáculo nenhum pra devs doidos como nós não é mesmo?

  

## Tá mas... E o Next.js ?

  

Calma garotinho, vou falar pra você onde esses conceitos se encaixam. A implementação desses mecanismos varia de plataforma a plataforma, mas no Next.js é sensacional, porque ele suporta duas formas de pré-renderizar os dados:

  
<ul>
<li>
Geração estática (SSG)
</li>
  

<li>
Renderização no lado do servidor (SSR)
</li>
</ul>
  

O React Query suporta essas duas formas independentemente da plataforma que você esteja usando.

  

**Usando o `initialData`**

  

No Next.js você pode passar os dados que você quer pré-carregar no `useQuery` do React Query tanto na função `getStaticProps` (responsável pelo pré-carregamento usando SSG), quanto na função `getServerSideProps` (responsável pelo pré-carregamento usando SSR). A integração nas duas funções usando React Query é a mesma, veja abaixo:

 ```javascript
 export async function getStaticProps() {
const pokemons = await getPokemons();
return { props: { pokemons } }
}

function Pokemons(props) {
const { data } = useQuery('pokemons', getPokemons,{ initialData: props.pokemons });
}
```



O setup disso é realmente simples e pode ser uma solução rápida para a maioria dos casos, mas existem certos **tradeoffs a serem levados em conta** quando comparados a uma abordagem mais aprofundada:
<ul>
<li>
Se você chamar o <b>useQuery</b> num componente mais profundo em um nível mais abaixo da sua árvore de componentes você precisa passar o <b>initialData</b> pro componente do nível debaixo. Imagina o trampo pra ficar repassando isso! Esse é o glorioso <i>props hell</i> que queremos evitar nos nossos códigos.</li>
<li>
Se você ficar chamando o <b>useQuery</b> com a mesma consulta em múltiplos lugares do seu código, você precisa passar esse <b>initialData</b> em todos eles.
</li>
 <li> Não existe uma maneira de saber em que hora essa consulta é carregada no servidor, então pra saber que hora ela precisa ser recarregada (pela propriedade <i>dataUpdatedAt</i>) dependemos do carregamento completo da página.</li></ul> 


 ## E o que faremos agora Dev Doido?

 <img src="https://c.tenor.com/9ud1r4sc-QQAAAAM/confused-john-travolta.gif" width="260.5" height="252.21136363636364" alt="Confused John Travolta GIF - Confused John Travolta What GIFs" style="background-color: rgb(170, 164, 164);">

O React Query suporta o pré-carregamento de múltiplas querys no servidor no Next.js, então ele é capaz de invalidar essas consultas para o objeto `queryClient`. Isso significa que o servidor pode pré-renderizar o código HTML + CSS que está imediatamente disponível no carregamento da página e, assim que o JS estiver disponível, o React Query pode atualizar essas consultas com a funcionalidade completa da biblioteca. Isso quer dizer que ele é capaz de disparar novamente essas querys no lado do cliente se elas se tornarem obsoletas (invalidadas) desde o momento em que foram renderizadas no servidor.

Para essas querys suportarem esse cache inteligente no servidor devemos:
<ul>
<li>
 Criar uma nova instância da classe <b>QueryClient</b> e uma instância do componente usando o useRef ou mesmo um state no React. Isso garante que os dados não sejam compartilhados entre diferentes usuários e solicitações, enquanto ainda cria o QueryClient apenas uma vez por ciclo de vida do componente.</li>
 <li> Envolva seu componente dentro de um <b>< QueryClientProvider /></b> e passe nele a instância de <b>QueryClient</b> que você criou no passo anterior.</li>
 <li> Envolva seu componente dentro de um <b>< Hydrate /></b> e passe o campo <b>dehydratedState</b>  de <b>pageProps</b> dentro dele.
</li></ul>

 ```javascript
  // _app.jsx
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}`}
```
Agora você é capaz de carregar os dados na suas páginas usando tanto o `getStaticProps` (para SSG) quanto o `getServerSideProps` (para SSR). Da perspectiva do React Query, essa integração no `getStaticProps` é feita da seguinte forma:
<ul>
<li>
 Crie uma instância de QueryClient <b>pra cada page request</b>. Isso garante que os dados não serão compartilhados entre usuários e requests.
 </li>
 <li>
 Carregue os dados usando o método do lado do cliente chamado <b>prefetchQuery</b> e espere ele completar.
 </li>
 <li> Use o <b>dehydrate</b> pra invalidar o cache da consulta e passar ele pra página através da prop <b>dehydratedState</b>. Essa é a mesma prop que o cache vai estar localizado em <i>_app.js</i>
</li>
</ul>

 ```javascript
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import axios from 'axios';
export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('pokemons', getPokemons);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default function Pokemons() {
  const { data, status } = useQuery('pokemons', getPokemons);
  const { data: otherData, status: otherStatus } = useQuery('pokemons-2', getPokemons);
  return (
    <>
      <div>
        {status === 'loading' && <div>Loading...</div>}
        {status === 'error' && <div>Error fetching pokemons</div>}
        {status === 'success' && <div>Main Data: {JSON.stringify(data)}</div>}
      </div>
      <div>
        {otherStatus === 'loading' && <div>Loading...</div>}
        {otherStatus === 'error' && <div>Error fetching pokemons</div>}
        {otherStatus === 'success' && <div>Other data:{JSON.stringify(otherData)}</div>}
      </div>
    </>
  );
}
const getPokemons = async () => {
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=50');
  return data;
};
```

Conforme demonstrado, não há problema em pré-carregar algumas queries e permitir que outras consultem essas mesmas queries no `queryClient` novamente. Isso significa que você pode controlar qual conteudo o servidor irá renderizar ou não, adicionando ou removendo o `prefetchQuery` na query.

Fonte: <a href="https://react-query.tanstack.com/guides/ssr#_top">Documentação oficial do React Query</a>













