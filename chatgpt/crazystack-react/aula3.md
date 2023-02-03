---
title: 'Introdução ao Chakra UI no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
## A Introdução ao Chakra UI

O Chakra UI é um conjunto de componentes React que fornecem estilos baseados em padrões de design, acessibilidade e suporte a idiomas. É uma biblioteca de componentes altamente personalizável e fácil de usar que ajuda a agilizar o desenvolvimento de interfaces do usuário com design atraente e acessível.

## Instalação

Para instalar o Chakra UI, você precisa primeiro ter o Node.js e o npm instalados em sua máquina. Depois disso, você pode instalar o Chakra UI com o seguinte comando no terminal:
 
`yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion` 

## Configuração Básica

Após a instalação, você precisa importar os componentes que deseja utilizar em seu projeto. Isso pode ser feito no arquivo principal do seu projeto, por exemplo, index.js ou App.js. Aqui está um exemplo de importação básica:

```javascript
import React from 'react'
import { Button } from '@chakra-ui/core'

function App() {
  return (
    <Button variantColor="teal">Clique Aqui</Button>
  )
}

export default App
``` 

## Arquivos \_app.tsx e \_document.tsx com o Chakra no Next.js

No Next.js, o arquivo _app.tsx é usado para fornecer uma estrutura global para sua aplicação. Ele é responsável por fornecer componentes compartilhados, como cabeçalho e rodapé, em todas as páginas da sua aplicação.

Aqui está um exemplo de como você pode usar o Chakra UI no _app.tsx:

```TYPESCRIPT
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

export const theme = extendTheme({ colors });
function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
``` 
O arquivo _app.tsx em uma aplicação Next.js é o ponto de entrada para a personalização global da aparência e comportamento da aplicação. Este arquivo permite que você forneça componentes e estilos que serão aplicados a todas as páginas da aplicação.

No exemplo apresentado, o Chakra UI é importado com seus componentes principais, ChakraProvider e extendTheme. O ChakraProvider é o componente responsável por fornecer o tema e estilos do Chakra para todos os componentes filhos na árvore de componentes. O extendTheme é uma função que permite personalizar o tema padrão do Chakra com suas próprias cores, tamanhos, fontes, entre outros aspectos.

Em seguida, é criada uma constante chamada "colors" que contém as cores personalizadas para a aplicação. Essas cores serão utilizadas no tema da aplicação. O tema é criado a partir da função extendTheme, passando a constante "colors" como parâmetro.

Por fim, a função "App" é definida como o componente principal da aplicação. Ela recebe dois parâmetros, "Component" e "pageProps", que são propriedades padrão do componente App em Next.js. O componente retorna o ChakraProvider, que envolve todos os componentes filhos e fornece o tema personalizado. O componente Component é renderizado dentro do ChakraProvider, juntamente com suas propriedades pageProps.

Em resumo, o arquivo _app.tsx permite a personalização global da aplicação, fornecendo o tema e estilos do Chakra UI para todas as páginas da aplicação.

## E o _document.tsx?
O arquivo _document.tsx é usado para controlar o HTML que será renderizado no lado do servidor. É neste arquivo que você pode adicionar meta tags, scripts, estilos e outros elementos que serão compartilhados por todas as páginas da sua aplicação.

Aqui está um exemplo de como você pode usar o Chakra UI no _document.tsx:

```tsx
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "pages/_app";
export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="manifest" href="manifest.json" />
          <meta name="description" content="CrazyStack Painel" />
          <meta name="theme-color" content="#322659" />
          <link rel="apple-touch-icon" href="images/appleicon.png" />
          <meta name="application-name" content="CrazyStack" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="CrazyStack" />
          <meta name="description" content="Best CrazyStack in the world" />
          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/touch-icon-ipad-retina.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```
O arquivo _document.tsx é o documento HTML que é renderizado em cada página da aplicação Next.js. Ele é usado para definir o HTML padrão que será renderizado em todas as páginas da aplicação. Neste exemplo, estamos estendendo a classe Document do Next.js e definindo o que será renderizado no HTML padrão da aplicação.

O componente Head é usado para definir as configurações do cabeçalho HTML, como links para folhas de estilo, links para ícones e meta informações. O componente Html define a estrutura básica do HTML, incluindo a linguagem da página.

O componente ColorModeScript é fornecido pelo Chakra UI e é responsável por gerenciar o modo de cor atual na aplicação. O componente Main é usado para renderizar o conteúdo principal da página e o componente NextScript é usado para renderizar o JavaScript da aplicação.

O arquivo _document.tsx é importante porque permite que você configure o HTML padrão para todas as páginas da aplicação e garanta que o Chakra UI seja corretamente inicializado em todas as páginas.
  