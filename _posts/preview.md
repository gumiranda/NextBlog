---
title: 'React Query no Next.js'
excerpt: 'Nesse post você vai ver como funciona SSR usando a lib React Query para gerenciamento de estado tanto no lado do cliente quando no lado do servidor.'
coverImage: '/assets/blog/preview/cover.jpg'
date: '2020-09-16T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: '/assets/blog/authors/joe.jpeg'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---

  

Fala Dev Doido!! Hoje falarei sobre como integrar a lib React Query com SSR no Next.js.

  

Atualmente a lib React Query suporta 2 meios de pré-carregamento de dados no servidor a serem passados ao objeto principal instanciado chamado queryClient.

  

- Pré-carregar os dados você mesmo e passá-los como `initialData`

  

Essa abordagem é de rápida implementação e ideal para casos de uso simples.

  

- Pré-carregar os dados diretamente no servidor, invalidar o cache e revalidá-lo no lado do cliente.

  

Essa abordagem requer um nível de configuração maior. ~~Mas isso não é obstáculo nenhum pra devs doidos como nós não é mesmo?~~

  

## Tá mas... E o Next.js ?

  

Calma garotinho, vou falar pra você onde esses conceitos se encaixam. A implementação desses mecanismos varia de plataforma a plataforma, mas no Next.js é sensacional, porque ele suporta duas formas de pré-renderizar os dados:

  

- Geração estática (SSG)

  

- Renderização no lado do servidor (SSR)

  

O React Query suporta essas duas formas independentemente da plataforma que você esteja usando.

  

**Usando o `initialData`**

  

No Next.js você pode passar os dados que você quer pré-carregar no `useQuery` do React Query tanto na função `getStaticProps` (responsável pelo pré-carregamento usando SSG), quanto na função `getServerSideProps` (responsável pelo pré-carregamento usando SSR). A integração nas duas funções usando React Query é a mesma, veja abaixo:

  

```

export async function getStaticProps() {

const posts = await getPosts();

return { props: { posts } }

}

function Posts(props) {

const { data } = useQuery('posts', getPosts,{ initialData: props.posts });

}

```

O setup disso é realmente simples e pode ser uma solução rápida para a maioria dos casos, mas existem certos **tradeoffs a serem levados em conta** quando comparados a uma abordagem mais aprofundada:

 - Se você chamar o `useQuery` num componente mais profundo em um nível mais abaixo da sua árvore de componentes você precisa passar o `initialData` pro componente do nível debaixo. Imagina o trampo pra ficar repassando isso! Esse é o glorioso *props hell* que queremos evitar nos nossos códigos.
 - Se você ficar chamando o `useQuery` com a mesma consulta em múltiplos lugares do seu código, você precisa passar esse `initialData` em todos eles.
 - Não existe uma maneira de saber em que hora essa consulta é carregada no servidor, então pra saber que hora ela precisa ser recarregada (pela propriedade `dataUpdatedAt`) dependemos do carregamento completo da página. 
 ## E o que faremos agora Dev Doido?
O React Query suporta o pré-carregamento de múltiplas querys no servidor no Next.js, então ele é capaz de invalidar essas consultas para o objeto `queryClient`. Isso significa que o servidor pode pré-renderizar o código HTML + CSS que está imediatamente disponível no carregamento da página e, assim que o JS estiver disponível, o React Query pode atualizar essas consultas com a funcionalidade completa da biblioteca. Isso quer dizer que ele é capaz de disparar novamente essas querys no lado do cliente se elas se tornarem obsoletas (invalidadas) desde o momento em que foram renderizadas no servidor.

Para essas querys suportarem esse cache inteligente no servidor devemos:

 - Criar uma nova instância da classe `QueryClient` e uma instância do componente usando o useRef ou mesmo um state no React. Isso garante que os dados não sejam compartilhados entre diferentes usuários e solicitações, enquanto ainda cria o QueryClient apenas uma vez por ciclo de vida do componente.
 - Envolva seu componente dentro de um `<QueryClientProvider>` e passe nele a instância de `QueryClient` que você criou no passo anterior.
 - Envolva seu componente dentro de um `<Hydrate>` e passe o campo `dehydratedState`  de `pageProps` dentro dele.
```
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
}

```
Agora você é capaz de carregar os dados na suas páginas usando tanto o `getStaticProps` (para SSG) quanto o `getServerSideProps` (para SSR). Da perspectiva do React Query, essa integração no `getStaticProps` é feita da seguinte forma:

 - Crie uma instância de `QueryClient` **pra cada page request. Isso garante que os dados não serão compartilhados entre usuários e requests.**
 - Carregue os dados usando o método do lado do cliente chamado `prefetchQuery` e espere ele completar.
 - Use o `dehydrate` pra invalidar o cache da consulta e passar ele pra página através da prop `dehydratedState`. Essa é a mesma prop que o cache vai estar localizado em `_app.js` 
```
// pages/posts.jsx
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('posts', getPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

function Posts() {
  // This useQuery could just as well happen in some deeper child to
  // the "Posts"-page, data will be available immediately either way
  const { data } = useQuery('posts', getPosts);

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix
  const { data: otherData } = useQuery('posts-2', getPosts);

  // ...
}
```
