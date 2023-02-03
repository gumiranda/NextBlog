---
title: 'Configuração de PWA no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

Configuração do Projeto como PWA usando next-pwa

1.  Instalar o pacote next-pwa

* Abra o terminal no diretório do projeto e execute o comando `npm install next-pwa` ou `yarn add next-pwa`

2.  Adicionar o plugin next-pwa ao arquivo next.config.js

* Abra o arquivo next.config.js e adicione o seguinte código:
 
```typescript
const withPWA = require("next-pwa");
module.exports = withPWA({
  pwa: {
    dest: "public"
  }
});
``` 

3.  Criar o arquivo manifest.json

* No diretório raiz do projeto, crie um arquivo chamado `manifest.json` e adicione o seguinte conteúdo:


```json
{
  "short_name": "Nome curto da sua aplicação",
  "name": "Nome completo da sua aplicação",
  "icons": [
    {
      "src": "/icon.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
``` 

4.  Adicionar o link para o arquivo manifest.json na head da página

* Abra o arquivo `pages/_app.js` e adicione o seguinte código na head da página:

`<link rel="manifest" href="/manifest.json" />` 

5.  Adicionar o Service Worker

* No diretório raiz do projeto, crie um arquivo chamado `sw.js` e adicione o seguinte conteúdo:

```typescript
const cacheName = "minha-pwa-v1";
const filesToCache = [
  "/",
  "/static/css/styles.css",
  "/static/js/main.js",
  "/manifest.json",
  "/icon.png"
];

self.addEventListener("install", function(e) {
  console.log("[ServiceWorker] Install");
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});
``` 
6. Configurar o Service Worker para ficar ativo mesmo com a rede offline

1. Abra o arquivo pages/_app.js e adicione o seguinte código:
```typescript
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(registration => {
        console.log("Service worker registered:", registration);
      })
      .catch(error => {
        console.log("Service worker registration failed:", error);
      });
  });
}
```
Este código verifica se o navegador suporta `serviceWorker`, e se sim, registra o arquivo `sw.js` como um `service worker`. O evento `load` é usado para esperar que todo o conteúdo da página seja carregado antes de registrar o `service worker`. O método `register` retorna uma Promise que resolve com o objeto de registro do `service worker` quando o registro é bem-sucedido, ou rejeita com um erro quando o registro falha. Em ambos os casos, uma mensagem é exibida no console para ajudar na depuração.
 
Após configurar o `service worker` para ficar ativo mesmo com a rede offline, o próximo passo seria configurar o `manifest.json` para fornecer informações sobre o aplicativo, como o nome, a descrição, a cor de fundo, as dimensões da ícone e a URL da página inicial.

A seguir, você pode mostrar como o `manifest.json` é referenciado na página HTML para que o navegador possa identificar o aplicativo como sendo uma Progressive Web App (PWA).

Em seguida, você pode mostrar como otimizar o `manifest.json` para o SEO, incluindo o uso de `name` e `description` para fornecer informações claras sobre o aplicativo e as dimensões corretas das imagens para garantir que as imagens sejam exibidas corretamente nas pesquisas.

Você também pode mostrar como usar o `Lighthouse` para testar e avaliar a qualidade da sua PWA, e como corrigir problemas de performance, compatibilidade e segurança para garantir que seu aplicativo seja compatível com as diretrizes PWA.



Depois de configurar o Service Worker, o próximo passo seria otimizar o arquivo `manifest.json` para o SEO. Isso inclui fornecer informações claras sobre o aplicativo através do uso dos atributos `name` e `description`. Além disso, é importante garantir que as dimensões das imagens sejam corretas para garantir que as imagens sejam exibidas corretamente nas pesquisas.

Aqui está um exemplo de um arquivo `manifest.json` otimizado para o SEO:

```json
{
  "short_name": "Next PWA",
  "name": "Next.js Progressive Web Application",
  "start_url": "/",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "display": "standalone",
  "description": "Este é um exemplo de aplicativo PWA construído com Next.js",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
``` 

Como você pode ver, o arquivo `manifest.json` inclui informações claras sobre o aplicativo, como o nome e a descrição, além de dimensões específicas para as imagens para garantir que as imagens sejam exibidas corretamente nas pesquisas.
```html
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
  <meta name="format-detection" content="telephone=no" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="msapplication-config" content="/icons/browserconfig.xml" />
  <meta name="msapplication-TileColor" content="#2B5797" />
  <meta name="msapplication-tap-highlight" content="no" />
  <meta name="theme-color" content="#000000"/>
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
  <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
  />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:url" content="https://crazystack-one.vercel.app/" />
  <meta name="twitter:title" content="CrazyStack" />
  <meta name="twitter:description" content="Best CrazyStack in the world" />
  <meta
    name="twitter:image"
    content="https://crazystack-one.vercel.app/icons/android-chrome-192x192.png"
  />
  <meta name="twitter:creator" content="@DavidWShadow" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="CrazyStack" />
  <meta property="og:description" content="Best CrazyStack in the world" />
  <meta property="og:site_name" content="CrazyStack" />
  <meta property="og:url" content="https://crazystack-one.vercel.app/" />
  <meta
    property="og:image"
    content="https://crazystack-one.vercel.app/icons/apple-touch-icon.png"
  />
</Head>
``` 
Este head contém informações importantes para otimizar o aplicativo para o SEO (Search Engine Optimization), bem como para torná-lo mais acessível em dispositivos móveis. Algumas destas tags incluem:

* `link rel="manifest"`: Este link refere-se ao arquivo `manifest.json` que fornece informações sobre o aplicativo, como o nome, a cor de tema, a descrição, entre outras coisas.
    
* `meta name="description"`: Esta tag fornece uma descrição curta do aplicativo que será usada pelos motores de busca na exibição dos resultados.
    
* `meta name="theme-color"`: Esta tag especifica a cor de tema do aplicativo.
    
* `link rel="apple-touch-icon"` e `link rel="icon"`: Estes links referem-se aos ícones do aplicativo que serão exibidos na tela inicial do usuário em dispositivos móveis.
    
* `meta name="twitter:card"` e `meta property="og:type"`: Estas tags especificam o tipo de conteúdo do aplicativo que será exibido no Twitter e nas mídias sociais, respectivamente.
    

Além disso, há também informações sobre o uso de fontes externas, otimização de recursos para dispositivos móveis, bem como configurações para o Twitter e o Facebook.
