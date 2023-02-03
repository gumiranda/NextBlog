---
title: 'React Query no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
1.  Introdução a lib @tanstack/react-query

Nessa aula, vamos aprender sobre a lib @tanstack/react-query, que é uma ferramenta poderosa para o gerenciamento de estados em aplicações React. Vamos começar explicando o que é uma biblioteca de gerenciamento de estados e porque é importante ter essa ferramenta em nossa stack de desenvolvimento.

Vamos conhecer os principais conceitos da lib @tanstack/react-query, como fetching, caching, polling, etc. Além disso, vamos aprender como essa biblioteca ajuda a evitar problemas comuns quando lidamos com requisições assíncronas, como por exemplo, a exibição de mensagens de erro para o usuário.

Ao final desse tópico, você deverá ter uma noção clara do que é a lib @tanstack/react-query e como ela pode ser útil em seu projeto React.

2.  Instalação das libs

* Comece pela instalação das libs @tanstack/react-query e @tanstack/react-query-devtools. Para isso, basta executar o seguinte comando no terminal:
 
`npm install @tanstack/react-query @tanstack/react-query-devtools` 

3.  Configuração do React Query nos Providers da aplicação:
  
```tsx
import React, { ReactElement, useState } from "react";
import { ChakraProvider } from "./chakraProvider";
import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export type AllProviderProps = {
  children: ReactElement;
  pageProps: any;
};
export type ProviderProps = {
  children: ReactElement;
};
export const AllProviders = ({ children, pageProps }: AllProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>{children}</ChakraProvider>
        {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
      </Hydrate>
    </QueryClientProvider>
  );
}; 
``` 
Esse código é uma implementação de componente que engloba vários providers para serem usados em uma aplicação React. O componente AllProviders é um componente de contexto que fornece vários providers para a aplicação, incluindo o provider do cliente de consulta do React-Query, o provider de Chakra UI e o componente ReactQueryDevTools.

Ao usar o componente AllProviders, os filhos dentro dele têm acesso a todos os providers fornecidos. O componente usa o hook useState para criar uma nova instância de QueryClient e passá-la para o componente QueryClientProvider. Isso permite que a aplicação use o cliente de consulta do React-Query em toda a aplicação.

O componente Hydrate é usado para desidratar o estado da página a partir de dados pré-renderizados no lado do servidor. O componente ChakraProvider fornece estilos e componentes Chakra UI para a aplicação. E, por fim, o componente ReactQueryDevTools é renderizado somente em modo de desenvolvimento, permitindo que os desenvolvedores visualize as consultas em andamento e possam depurar problemas.

## E usar React Query é melhor que o uso de Redux para gerenciamento de estado?
React Query é uma biblioteca mais leve e menos complexa para gerenciamento de estado do que o Redux. Ela se concentra apenas na gestão de estado de consultas de API e deixa outras preocupações, como gerenciamento de dados em nível de aplicativo, para o próprio React. Isso significa que você pode aproveitar todos os recursos de gerenciamento de estado do React, como useState e useContext, sem ter que lidar com a complexidade adicional do Redux.

Além disso, React Query oferece funcionalidades únicas, como cache automático de consultas, suporte a múltiplos fontes de dados, resolução de dependências entre consultas e recursos avançados de debug. Tudo isso é fornecido de forma integrada com o React e sem a necessidade de configurações adicionais, tornando a vida dos desenvolvedores muito mais fácil.

Em resumo, a escolha de React Query ao invés de Redux no curso foi uma decisão baseada na necessidade de gerenciamento de estado simples e enxuto para consultas de API, sem comprometer a escalabilidade do aplicativo.