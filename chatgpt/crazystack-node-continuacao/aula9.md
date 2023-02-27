---
title: 'Gerador de Controllers Dinâmico no CrazyStack Node.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-07-17T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

Bem-vindos à aula de Gerador de Controllers Dinâmico. Neste curso, vocês irão aprender sobre a utilização da biblioteca plop.js para geração automatizada de controllers em sua aplicação. Estes controllers serão baseados nos controllers de categoria que já foram desenvolvidos, que incluem funções como inserção, exclusão, atualização, carregamento e carregamento por página. Com a utilização deste gerador dinâmico, vocês poderão acelerar significativamente o desenvolvimento de seus projetos, evitando a repetição de tarefas manuais e garantindo a consistência em toda a aplicação. Então, vamos começar!

Este é um material auxiliar do bootcamp CrazyStack Node.js do DevDoido. Ele servirá como uma espécie de documentação de alguns códigos vistos durante as aulas apenas como material complementar, garanta já sua vaga no bootcamp [clicando AQUI!](https://crazystack.com.br).

```typescript
  plop.setGenerator("controllers", {
    description: "Create a new controller",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the controller?",
      },
    ],
    actions: [...controllersCreations],
  });
``` 
Este é um exemplo de código para gerar um novo controller usando a biblioteca Plop.js. O generator "controllers" é definido com uma descrição "Create a new controller", que significa criar um novo controlador. A seguir, são definidos os prompts, que são perguntas que serão feitas ao usuário para obter informações sobre o controlador que será criado. Neste caso, a única pergunta é "What is the name of the controller?" (Qual é o nome do controlador?). Por fim, as actions (ações) são listadas, que são as etapas que serão executadas para criar o novo controlador.

https://github.com/gumiranda/CrazyStackNodeJs/commit/d326f1b5e47145bbfb796e6774d64fc56ae898f9


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)