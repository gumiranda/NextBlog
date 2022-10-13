---
title: 'Conheça o Clean vertical sliced architecture: a união dos 2 mundos'
excerpt: 'Nesse post eu mostro que é possível elevar seu nível no desenvolvimento de aplicações NodeJS.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-10-13T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Atualmente uma das arquiteturas de software mais adotadas pelos desenvolvedores é a arquitetura em camadas proposta por Robert C Martin na obra Arquitetura Limpa. Ela consiste em dividir o projeto em camadas independentes e bla bla bla.

Outra arquitetura que surgiu nos últimos anos é a arquitetura de fatias verticais (ou vertical slice architecture) proposta por Jimmy Bogard. Ela consiste em dividir o projeto em fatias. Cada fatia representa uma funcionalidade especifica do projeto. E dentro de cada fatia cabe ao desenvolvedor definir qual caminho seguir para efetuar o comportamento dessa funcionalidade, ou seja , não é necessário encaixar cada pedaço do sistema dentro de uma estrutura rígida de camadas na hora de desenvolver. Portanto cada pedaço é desenvolvido de forma isolada seguindo seu próprio estilo de implementação.

O principal benefício dessa abordagem é que os casos de uso são unidades isoladas, baseadas em entrada/saída autocontidas, como peças de Lego. Isso torna a base de código simples e fácil de manter.

Eu já havia implementado clean arch numa api rest nodejs anteriormente. Nela eu separava em pastas representando cada camada. Pra cada dominio de negocio eu criava um arquivo dentro de cada camada e ia acoplando ainda mais o sistema.

Uma vez pensei.. Mas e se separar esse sistema em fatias de forma organizada através de camadas? Porque não unir o melhor dos 2 mundos? Eai surgiu o clean vertical sliced architecture.

Inicialmente eu separei meu projeto em duas pastas: uma segmentada em domínios de negocio (politicas de alto nivel da aplicação) e outra contendo as políticas de mais baixo nível da aplicação: como configuração de rotas,middlewares,banco de dados, server http e vários arquivos reutilizáveis em todas as fatias (como manipulação de datas, formatação de objetos, validações etc).

Dentro de cada dominio de negocio eu resolvi estruturar em camadas independentes separando em entities,use cases,repositories,e controllers assim como no clean arch. A diferença é que neste sistema as camadas são convencionadas , e nao obrigatorias. Ou seja, nele eu serei capaz de implementar determinado dominio de negocio com menos ou mais camadas ou até mesmo sem camada nenhuma.

No clean architecture se eu quiser fazer isso pra determinado dominio eu estaria violando a arquitetura do sistema adotando entao o que robert c martin chama de "arquitetura relaxada".

Isso me trouxe uma flexibilidade maior para casos simples em que não existe a necessidade de implementar n camadas só porque o projeto todo está estruturado assim.

A implementação de Clean Architecture, Vertical Slice Architecture e DDD juntos tornou meu aplicativo extremamente fácil de manter porque os casos de uso são traduzidos em peças Lego independentes. A maioria deles são simples e estúpidos.

E foi exatamente por isso que eu criei o bootcamp CrazyStack. Nele eu crio uma aplicação completa de um sistema de agendamentos online de serviços aplicando conceitos avançados como Design Patterns, Clean Vertical Sliced Arch, TDD e DDD além de Testes unitários, e de integração

No primeiro módulo você aprenderá a construir uma API REST Nodejs. Serão criados casos de uso envolvendo regras de negócio complexas como listagem de horários disponíveis, geração de pedidos a partir de agendamentos efetivados, sistema de fidelidade,avaliações dos clientes e mais.

Tudo feito em Typescript e utilizando o banco de dados não relacional MongoDB. São mais de 2 mil testes unitários e de integração que cobre cerca de 90% do código do projeto.

Outro diferencial são os geradores de arquivos que permitem a geração de CRUD dinâmico seguindo uma programação orientada a modelos

Dê profundidade ao seu Typescript a partir de agora. USE O CUPOM DEVDOIDO60OFF e ganhe 60% de DESCONTO!!

Viaje nessa loucura!! 


[CLIQUE AQUI](https://hotmart.com/pt-br/marketplace/produtos/aprenda-nodejs-e-react-native-do-zero-ao-infinito/P34477060O)


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)