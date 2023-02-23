---
title: 'Loading genérico no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

### Objetivos da aula:

* Compreender a importância de exibir indicadores de carregamento em sistemas web
* Aprender a utilizar a biblioteca `react-loading-overlay-ts` para exibir indicadores de carregamento em componentes React

### Tópicos abordados:

* A importância de indicadores de carregamento em sistemas web
* O que é a biblioteca `react-loading-overlay-ts` e como ela funciona
* Utilizando a biblioteca `react-loading-overlay-ts` para exibir indicadores de carregamento em componentes React

### Atividades práticas:

* Adicionar a biblioteca `react-loading-overlay-ts` ao projeto Next.js
* Utilizar a biblioteca `react-loading-overlay-ts` para exibir um indicador de carregamento enquanto as requisições do sistema de agendamentos são processadas
* Personalizar o indicador de carregamento com estilos CSS personalizados, como cores e animações
  

Exibir indicadores de carregamento em sistemas web é importante porque ajuda a melhorar a experiência do usuário e a aumentar a satisfação dos usuários com a aplicação. Quando uma aplicação web faz uma solicitação de dados ou envia uma requisição ao servidor, é importante que o usuário seja informado de que a aplicação está processando uma solicitação e que ele precisa esperar.

Sem indicadores de carregamento, o usuário pode se sentir frustrado ou confuso se a aplicação não responder imediatamente. Por outro lado, um indicador de carregamento bem projetado pode ajudar a tranquilizar o usuário, mostrando que a aplicação está em processo de atender sua solicitação e que ele precisa aguardar.

Indicadores de carregamento também são importantes porque podem fornecer feedback em tempo real sobre a velocidade da conexão de internet do usuário. Se uma solicitação de dados ou envio de requisição estiver demorando muito, o indicador de carregamento pode mostrar que a conexão está lenta e que o usuário precisa aguardar um pouco mais.

Além disso, exibir indicadores de carregamento pode ajudar a reduzir a taxa de rejeição do usuário, ou seja, a taxa de usuários que abandonam a aplicação devido a tempos de carregamento lentos ou a uma experiência frustrante. Um indicador de carregamento pode ajudar a manter os usuários engajados e comprometidos com a aplicação, mesmo quando as solicitações demoram um pouco mais para serem processadas.
 
```tsx
 <LoadingOverlay
        styles={{
          spinner: (base) => ({ ...base }),
          wrapper: { width: "100%", height: "100%" },
          content: null,
          overlay: (base) => ({ ...base, position: "fixed" }),
        }}
        active={!!isFetching || !!isMutating || loading}
        spinner
        text="Carregando..."
  />
```

Este código está utilizando a biblioteca `react-loading-overlay-ts` para exibir um indicador de carregamento em um componente React.

Aqui está uma explicação detalhada de cada uma das propriedades usadas no componente `LoadingOverlay`:

* `styles`: uma propriedade opcional que permite personalizar o estilo do indicador de carregamento. Neste caso, o código está definindo o estilo do spinner (ou ícone de carregamento) para o estilo base, o wrapper (que é o contêiner do spinner) para ocupar 100% da largura e altura da página, o conteúdo como nulo (para não exibir nenhum conteúdo durante o carregamento) e a overlay (que é a camada de fundo do indicador de carregamento) para ter posição fixa na página.
* `active`: uma propriedade obrigatória que indica se o indicador de carregamento deve estar ativo ou não. Neste caso, o indicador de carregamento será exibido se `isFetching` (que pode ser verdadeiro ou falso) ou `isMutating` (que também pode ser verdadeiro ou falso) ou `loading` (que é uma outra variável que também pode ser verdadeiro ou falso) forem verdadeiros.
* `spinner`: uma propriedade opcional que indica se o indicador de carregamento deve incluir um ícone de spinner ou não. Neste caso, o valor é verdadeiro, o que significa que o ícone de spinner será exibido.
* `text`: uma propriedade opcional que permite adicionar um texto personalizado ao indicador de carregamento. Neste caso, o texto é definido como "Carregando...".

Em resumo, este código está utilizando a biblioteca `react-loading-overlay-ts` para exibir um indicador de carregamento personalizado em um componente React, que será exibido quando as variáveis `isFetching`, `isMutating` ou `loading` forem verdadeiras. O indicador de carregamento inclui um ícone de spinner e um texto personalizado, e é estilizado para ocupar 100% da largura e altura da página.