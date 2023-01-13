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
Outra arquitetura que surgiu nos últimos anos é a arquitetura de fatias verticais (ou vertical slice architecture) proposta por Jimmy Bogard. Ela consiste em dividir o projeto em fatias. Cada fatia representa uma funcionalidade especifica do projeto. E dentro de cada fatia cabe ao desenvolvedor definir qual caminho seguir para efetuar o comportamento dessa funcionalidade, ou seja, não é necessário encaixar cada pedaço do sistema dentro de uma estrutura rígida de camadas na hora de desenvolver. Portanto cada pedaço é desenvolvido de forma isolada seguindo seu próprio estilo de implementação.

Eu já havia implementado Clean architecture numa API REST Node.js anteriormente. Nela eu separava em pastas representando cada camada. Pra cada dominio de negocio eu criava um arquivo dentro de cada camada e ia acoplando ainda mais o sistema.
Uma vez pensei.. Mas e se separar esse sistema em fatias de forma organizada através de camadas? Porque não unir o melhor dos 2 mundos? Eai surgiu o clean vertical sliced architecture.

## E surgiu então o Clean vertical sliced architecture

O Clean vertical sliced architecture é uma abordagem que combina as vantagens da arquitetura em camadas proposta por Robert C. Martin, conhecida como Clean Architecture, com a arquitetura de fatias verticais proposta por Jimmy Bogard. Ela consiste em dividir o projeto em fatias, cada uma representando uma funcionalidade específica, permitindo que o desenvolvedor escolha o melhor caminho para implementar essa funcionalidade. Isso torna a base de código mais simples e fácil de manter, pois os casos de uso são unidades autônomas, semelhantes a peças de Lego. Ao combinar essa abordagem com o Domain-Driven Design (DDD), o projeto se torna ainda mais organizado e fácil de manter.

A principal vantagem do Clean vertical sliced architecture é a flexibilidade que ela oferece, permitindo que o desenvolvedor implemente cada funcionalidade de acordo com suas necessidades, sem se sentir limitado por uma estrutura rígida de camadas. Isso também permite que o desenvolvimento seja feito de forma isolada, facilitando a manutenção e a escalabilidade do projeto.

Além disso, a estruturação do projeto em fatias baseadas em domínios de negócio e camadas independentes, como entities, use cases, repositories e controllers, permite uma melhor organização e compreensão do código, tornando-o mais fácil de manter e evitando problemas de complexidade crescente.
Por fim, a combinação dessa abordagem com o DDD permite uma melhor representação do negócio no código, facilitando a comunicação entre desenvolvedores e stakeholder e tornando o projeto mais alinhado com as necessidades do negócio.

## Como se aplica essa arquitetura?
Um exemplo de como aplicar o Clean vertical sliced architecture em um projeto seria o seguinte:

Inicialmente eu separei meu projeto em duas pastas: uma segmentada em domínios de negocio (politicas de alto nivel da aplicação) e outra contendo as políticas de mais baixo nível da aplicação: como configuração de rotas, middlewares, banco de dados, server HTTP e vários arquivos reutilizáveis em todas as fatias (como manipulação de datas, formatação de objetos, validações etc).
Dentro de cada pasta de domínio, eu criei sub-pastas para armazenar as camadas independentes, como entities, use cases, repositories e controllers assim como no Clean arch. A diferença é que neste sistema as camadas são convencionadas, e não obrigatórias. Ou seja, nele eu serei capaz de implementar determinado dominio de negocio com menos ou mais camadas ou até mesmo sem camada nenhuma.
O foco, em cada camada, é escrever códigos que sejam específicos para o domínio de negócio em questão. Por exemplo, no caso da camada de entities, escrever as entidades específicas para o domínio de negócio, como Usuário, Produto, etc.

No clean architecture se eu quiser fazer isso pra determinado dominio eu estaria violando a arquitetura do sistema adotando entao o que Robert C. Martin chama de "arquitetura relaxada".

Isso me trouxe uma flexibilidade maior para casos simples em que não existe a necessidade de implementar n camadas só porque o projeto todo está estruturado assim.

A implementação de Clean Architecture, Vertical Slice Architecture e DDD juntos tornou meu aplicativo extremamente fácil de manter porque os casos de uso são traduzidos em peças Lego independentes. A maioria deles são simples e estúpidos.

E foi exatamente por isso que eu criei o bootcamp CrazyStack. Nele eu crio uma aplicação completa de um sistema de agendamentos online de serviços aplicando conceitos avançados como Design Patterns, Clean Vertical Sliced Arch, TDD e DDD além de Testes unitários, e de integração

No primeiro módulo você aprenderá a construir uma API REST Nodejs. Serão criados casos de uso envolvendo regras de negócio complexas como listagem de horários disponíveis, geração de pedidos a partir de agendamentos efetivados, sistema de fidelidade,avaliações dos clientes e mais.

Tudo feito em Typescript e utilizando o banco de dados não relacional MongoDB. São mais de 2 mil testes unitários e de integração que cobre cerca de 90% do código do projeto.

Outro diferencial são os geradores de arquivos que permitem a geração de CRUD dinâmico seguindo uma programação orientada a modelos

Dê profundidade ao seu Typescript a partir de agora. USE O CUPOM JANEIRODOIDO e ganhe 55% de DESCONTO!!

Viaje nessa loucura!! 


[CLIQUE AQUI](https://crazystack.com.br)


[LINK DO REPOSITÓRIO](https://github.com/gumiranda/CrazyStackNodeJs)