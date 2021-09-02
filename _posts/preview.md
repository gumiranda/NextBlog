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
 Essa abordagem requer um nível de configuração maior.  ~~Mas isso não é obstáculo nenhum pra devs doidos como nós não é mesmo?~~ 

  

## Introdução

  

A exata implementação desse
