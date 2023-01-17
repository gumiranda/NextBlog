Me ajuda a escrever um ebook de como eu desenvolvi um sistema de agendamentos online chamado belezix usando nodejs react native
Claro, posso ajudá-lo a escrever um ebook sobre o desenvolvimento do seu sistema de agendamentos online chamado Belezix usando Node.js e React Native. Algumas dicas para começar:

Introdução: Explique o propósito do seu ebook e forneça uma visão geral do sistema Belezix e as tecnologias usadas para desenvolvê-lo.

Desenvolvimento do Back-end: Detalhe como você usou Node.js para criar a API do Belezix e como ela se conecta ao banco de dados.

Desenvolvimento do Front-end: Descrição sobre o desenvolvimento do aplicativo React Native e como ele se comunica com a API do Belezix.

Desafios e soluções: Fale sobre os desafios que você enfrentou durante o desenvolvimento do Belezix e como os superou.

Deployment e manutenção: Explique como você implementou o sistema Belezix em produção e como você planeja manter e atualizá-lo.

Conclusão: Resuma as principais lições aprendidas durante o desenvolvimento do Belezix e forneça dicas para outros desenvolvedores que desejam criar um sistema semelhante.

Lembre-se de incluir códigos e capturas de tela ilustrativas para ajudar os leitores a entender melhor o processo. E se precisar de mais ajuda, estou aqui para ajudar.





Desenvolve a introduçao falando que eu usei node fastify typescript jest e mongodb e no react native usei expo
Introdução:

Este ebook foi escrito para compartilhar minha experiência no desenvolvimento do sistema de agendamentos online Belezix. O objetivo deste sistema é facilitar a marcação de horários para salões de beleza e outros estabelecimentos de beleza.

Para o desenvolvimento do Belezix, eu escolhi usar as tecnologias Node.js, Fastify, TypeScript, Jest e MongoDB para o back-end e React Native com Expo para o front-end. A escolha dessas tecnologias foi baseada na minha experiência anterior com elas e na sua capacidade de atender às necessidades do projeto.

Node.js foi usado como plataforma para criar a API do Belezix. Fastify foi escolhido como framework para construir a API pois é leve e fácil de usar. TypeScript foi usado para dar mais tipagem e segurança ao código. Jest foi usado para realizar testes automatizados. MongoDB foi escolhido como banco de dados pois é escalável e fácil de usar.

React Native com Expo foi escolhido para o desenvolvimento do aplicativo mobile pois é uma tecnologia poderosa e fácil de usar. Expo foi usado para simplificar o processo de desenvolvimento e implantação do aplicativo.

Este ebook irá mostrar como essas tecnologias foram utilizadas para criar o Belezix e compartilhará as lições aprendidas durante o desenvolvimento do projeto.





No capitulo 2 desenvolve falando do uso do fastify e seus plugins. Alem de jest pro testes unitarios e do mongodb
Capítulo 2: Desenvolvimento do Back-end

O back-end do Belezix foi construído usando Node.js com o framework Fastify. Fastify é um framework leve e rápido que foi escolhido para construir a API do Belezix pois é fácil de usar e tem uma boa documentação.

Para aumentar a funcionalidade da API, foram utilizados alguns plugins do Fastify. Um dos plugins mais importantes utilizados foi o fastify-swagger, que permitiu a geração automática da documentação da API. Isso ajudou a tornar a API mais fácil de usar para os desenvolvedores de front-end e outros desenvolvedores que precisavam integrar com o Belezix.

O MongoDB foi escolhido como banco de dados para o Belezix. Ele é escalável e fácil de usar, o que o tornou uma boa escolha para o projeto. A biblioteca mongodb foi usada para se comunicar com o banco de dados MongoDB, permitindo que dados fossem armazenados, recuperados e atualizados facilmente.

Para garantir a qualidade do código, Jest foi utilizado para realizar testes unitários. Isso permitiu que bugs fossem detectados e corrigidos antes que o código fosse implantado em produção. Testes unitários foram escritos para todas as principais funcionalidades do Belezix, garantindo que o sistema estivesse funcionando corretamente antes de ser lançado.

Em resumo, no desenvolvimento do back-end do Belezix, optamos por usar o framework Fastify com alguns plugins, MongoDB como banco de dados e Jest para testes unitários. Todas essas escolhas se mostraram eficazes e contribuíram para o sucesso do projeto.





Desenvolve o capitulo do front end com react native e expo
Capítulo 3: Desenvolvimento do Front-end

O front-end do Belezix foi construído usando React Native com Expo. React Native é uma tecnologia poderosa que permite desenvolver aplicativos móveis para iOS e Android usando JavaScript e React. Expo foi escolhido como plataforma de desenvolvimento para o Belezix pois simplifica o processo de desenvolvimento e implantação do aplicativo.

A estrutura do aplicativo foi construída usando o padrão de navegação de pilha, permitindo que os usuários naveguem facilmente entre as telas. A biblioteca react-navigation foi usada para implementar a navegação.

Para se comunicar com a API do Belezix, a biblioteca axios foi utilizada. Isso permitiu que o aplicativo fizesse chamadas HTTP para a API e recebesse dados em formato JSON, o que foi fácil de lidar e exibir na interface do usuário.

Para melhorar a experiência do usuário, foram usadas bibliotecas como react-native-calendars e react-native-calendar-events. Essas bibliotecas foram usadas para exibir calendários e eventos, respectivamente, tornando mais fácil para os usuários verificarem suas reservas e agendarem novos horários.

Expo também forneceu recursos adicionais como a capacidade de fazer push notifications e acesso a câmera e galeria. Isso permitiu que o aplicativo tivesse funcionalidades adicionais e melhorasse a experiência do usuário.

Em resumo, no desenvolvimento do front-end do Belezix, optamos por usar React Native com Expo para construir o aplicativo. Usamos bibliotecas como react-navigation, axios, react-native-calendars e react-native-calendar-events para aumentar a funcionalidade e melhorar a experiência do usuário. A escolha dessas tecnologias se mostrou eficaz e contribuiu para o sucesso do projeto.





Desenvolve o capitulo 4 destacando os desafios em lista horarios de cada profissional de acordo com horario de funcionamento e duraçao do serviço
Capítulo 4: Desafios e Soluções

Durante o desenvolvimento do Belezix, enfrentamos alguns desafios que precisaram ser superados. Alguns dos desafios mais significativos incluem:

Gerenciamento de horários dos profissionais: Cada profissional tem seus próprios horários de trabalho e disponibilidade, o que torna difícil garantir que haja horários disponíveis para todos os clientes. Para superar esse desafio, criamos uma lógica que verifica a disponibilidade dos profissionais antes de permitir que os clientes agendem horários.

Gerenciamento de horários de funcionamento do estabelecimento: O estabelecimento tem seus próprios horários de funcionamento, e esses horários podem mudar de acordo com as necessidades do negócio. Para superar esse desafio, criamos uma lógica que verifica os horários de funcionamento do estabelecimento antes de permitir que os clientes agendem horários.

Duração dos serviços: Cada serviço tem uma duração diferente, o que torna difícil garantir que haja tempo suficiente entre os agendamentos. Para superar esse desafio, criamos uma lógica que verifica a duração dos serviços antes de permitir que os clientes agendem horários.

Notificações em tempo real: É importante que os clientes e profissionais sejam notificados em tempo real sobre alterações nos agendamentos. Para superar esse desafio, usamos o Firebase para enviar notificações em tempo real para os clientes e profissionais.

Integração com outros sistemas: O Belezix precisava ser integrado com outros sistemas, como sistemas de pagamento e sistemas de gerenciamento de clientes. Para superar esse desafio, usamos a biblioteca Stripe para a integração com sistemas de pagamento e a biblioteca Firebase para a integração com sistemas de gerenciamento de clientes.

Esses desafios foram superados com a implementação de lógicas específicas e usando bibliotecas e ferramentas adequadas.





Desenvolva o capitulo 5 falando do deploy continuo da api no oracle cloud e do ci cd com eas build no expo
Capítulo 5: Deployment e Manutenção

Uma vez que o Belezix foi desenvolvido, foi necessário implementar um processo de deploy e manutenção eficiente para garantir que o sistema estivesse sempre disponível e atualizado.

Para o deploy do back-end, optamos por usar o Oracle Cloud como plataforma. Ele forneceu recursos escaláveis e confiáveis, garantindo que a API do Belezix pudesse suportar um grande número de usuários. Além disso, foi utilizado o Oracle Cloud Container Engine para orquestrar os contêineres do sistema e garantir alta disponibilidade.

Para o deploy do front-end, optamos por usar o Expo como plataforma. Ele forneceu recursos de build e deploy automatizado, permitindo que o aplicativo fosse construído e implantado facilmente. Além disso, foi usado o Expo Eas Build para implementar um processo de CI/CD (Integração Contínua e Entrega Contínua) para garantir que as atualizações fossem lançadas rapidamente.

Para garantir a segurança, o Belezix foi configurado com autenticação de usuário e autorização, garantindo que somente usuários autorizados pudessem acessar as informações e funcionalidades do sistema.

A manutenção do sistema incluiu a monitoração constante do desempenho, a correção de bugs e a implementação de novas funcionalidades. Isso foi feito com a ajuda de ferramentas de monitoramento, como o Oracle Cloud Monitoring, para garantir que o sistema estivesse sempre funcionando corretamente.

Em resumo, para o deploy e manutenção do Belezix, optamos por usar o Oracle Cloud para o back-end e o Expo com Eas Build para o front-end. Isso permitiu que o sistema fosse implantado e atualizado de forma eficiente e garantiu alta disponibilidade e segurança do sistema.





Desenvolve a conclusao falando do desafio em gerenciar horarios, pedidos, sistema de fidelidade com pontos e geolocalizaçao de usuarios e estabelecimentos no mongodb
Conclusão:

O desenvolvimento do sistema de agendamentos online Belezix foi um desafio emocionante que me permitiu aplicar minhas habilidades de desenvolvimento de software e aprender novas tecnologias.

Um dos desafios mais significativos que enfrentamos foi o gerenciamento de horários dos profissionais, horários de funcionamento do estabelecimento, duração dos serviços e notificações em tempo real. Isso foi superado com a implementação de lógicas específicas e o uso de bibliotecas e ferramentas adequadas.

Outro desafio importante foi o gerenciamento de pedidos, sistema de fidelidade com pontos e geolocalização de usuários e estabelecimentos. Isso foi superado usando MongoDB como banco de dados. MongoDB é escalável e fácil de usar, o que o tornou uma boa escolha para o projeto.

O Belezix foi implementado com sucesso e está sendo usado por muitos estabelecimentos de beleza e clientes. O sistema torna mais fácil para os clientes agendarem horários e para os estabelecimentos gerenciarem seus agendamentos.

Eu espero que





Finaliza
este ebook tenha sido útil para você e que você tenha aprendido sobre como desenvolvi o Belezix usando Node.js, Fastify, TypeScript, Jest, MongoDB, React Native e Expo. Eu gostaria de agradecer pela oportunidade de compartilhar minha experiência e espero que esteja inspirado para iniciar seu próprio projeto de desenvolvimento de software.





Fala que esse sistema serviu de base pro meu curso de nodejs chamado crazystack
Eu gostaria de mencionar que o Belezix também serviu como base para o meu curso de Node.js chamado "Crazystack". O curso é projetado para ensinar outros desenvolvedores como desenvolver sistemas web e mobile usando as tecnologias mencionadas neste ebook. O curso inclui lições práticas e exemplos reais baseados no desenvolvimento do Belezix, tornando-o uma ótima opção para aqueles que desejam aprender sobre essas tecnologias.





Reescreve tudo mr
Este ebook foi escrito para compartilhar minha experiência no desenvolvimento do sistema de agendamentos online Belezix. Este sistema foi construído usando Node.js, Fastify, TypeScript, Jest, MongoDB, React Native e Expo.

O desenvolvimento do Belezix foi um desafio emocionante que me permitiu aplicar minhas habilidades de desenvolvimento de software e aprender novas tecnologias. Um dos desafios mais significativos que enfrentamos foi o gerenciamento de horários dos profissionais, horários de funcionamento do estabelecimento, duração dos serviços e notificações em tempo real. Isso foi superado com a implementação de lógicas específicas e o uso de bibliotecas e ferramentas adequadas.

Outro desafio importante foi o gerenciamento de pedidos, sistema de fidelidade com pontos e geolocalização de usuários e estabelecimentos. Isso foi superado usando MongoDB como banco de dados. MongoDB é escalável e fácil de usar, o que o tornou uma boa escolha para o projeto.

O Belezix foi implementado com sucesso e está sendo usado por muitos estabelecimentos de beleza e clientes. Além disso, este projeto foi utilizado como base para meu curso "Crazystack" onde ensino outros desenvolvedores como desenvolver sistemas web e mobile usando as tecnologias mencionadas neste ebook.





Continua
O capítulo 2 deste ebook aborda o uso do Fastify e seus plugins, juntamente com Jest para testes unitários e MongoDB para gerenciamento de dados. O capítulo 3 aborda o desenvolvimento do front-end usando React Native e Expo, incluindo a estrutura do aplicativo, a comunicação com a API, a exibição de calendários e eventos e recursos adicionais como notificações e acesso à câmera e galeria.

O capítulo 4 aborda os desafios enfrentados durante o desenvolvimento, incluindo o gerenciamento de horários, pedidos, sistema de fidelidade com pontos e geolocalização de usuários e estabelecimentos. O capítulo 5 discute o processo de deploy e manutenção usando Oracle Cloud para o back-end e Expo com Eas Build para o front-end, incluindo a configuração de autenticação e autorização e monitoramento constante do desempenho.

Em resumo, o Belezix é um sistema de agendamentos online desenvolvido usando Node.js, Fastify, TypeScript, Jest, MongoDB, React Native e Expo. Ele foi projetado para tornar mais fácil para os clientes agendarem horários e para os estabelecimentos gerenciarem seus agendamentos. Ele foi utilizado como base para meu curso "Crazystack" para ensinar outros desenvolvedores a desenvolver sistemas web e mobile usando essas tecnologias.





Formata pra twitter
"Acabei de escrever um ebook sobre como desenvolvi o sistema de agendamentos online Belezix usando #Nodejs #Fastify #Typescript #Jest #MongoDB #ReactNative e #Expo. Inclui desafios e soluções, além de como foi usado como base para meu curso #Crazystack. Baixe agora! #desenvolvimento #agendamentosonline"





Cria a ementa do curso
Ementa do Curso "Crazystack":

Introdução ao Node.js
O que é Node.js
Instalação e configuração
Conhecendo o ambiente de desenvolvimento
Desenvolvimento do Back-end com Node.js e Fastify
Criação de uma API RESTful
Uso de plugins do Fastify
Testes unitários com Jest
Gerenciamento de dados com MongoDB
Desenvolvimento do Front-end com React Native e Expo
Estruturação de um aplicativo
Comunicação com a API
Exibição de calendários e eventos
Notificações e acesso à câmera e galeria
Desafios e Soluções
Gerenciamento de horários
Pedidos e sistema de fidelidade
Geolocalização de usuários e estabelecimentos
Deployment e Manutenção
Oracle Cloud para o Back-end
Expo com Eas Build para o Front-end
Configuração de autenticação e autorização
Monitoramento constante do desempenho
Projeto Final - Aplicação completa do Belezix
Desenvolvimento de todas as funcionalidades
Testes e depuração
Deployment e manutenção
Este curso é projetado para ensinar outros desenvolvedores como desenvolver sistemas web e mobile usando Node.js, Fastify, TypeScript, Jest, MongoDB, React Native e Expo. Ele inclui lições práticas e exemplos reais baseados no desenvolvimento do Belezix.





Cria uma descriçao dessas aulas Configuração inicial do projeto e criação do primeiro teste unitário
Configuração de Eslint e Prettier
Criação da primeira entidade do projeto
Introdução à arquitetura utilizada no projeto
Criando gerador de arquivo com o Plop
Configuração inicial do projeto e criação do primeiro teste unitário:
Nesta aula, os alunos aprenderão a configurar um novo projeto Node.js e configurar as ferramentas de teste unitário Jest. Eles criarão seu primeiro teste unitário para garantir que o ambiente de desenvolvimento esteja configurado corretamente.

Configuração de Eslint e Prettier:
Nesta aula, os alunos aprenderão a configurar e usar as ferramentas Eslint e Prettier para garantir que o código seja consistente e seguir as melhores práticas de desenvolvimento. Eles aprenderão a configurar regras personalizadas e automatizar a formatação do código.

Criação da primeira entidade do projeto:
Nesta aula, os alunos aprenderão a criar sua primeira entidade, ou seja, um modelo de dados, para o projeto. Eles aprenderão a criar esquemas de banco de dados MongoDB e como usá-los para validar e salvar dados.

Introdução à arquitetura utilizada no projeto:
Nesta aula, os alunos aprenderão sobre a arquitetura de aplicativos baseada em módulos utilizada no projeto. Eles aprenderão como dividir o projeto em módulos independentes e como gerenciar a comunicação entre eles.

Criando gerador de arquivo com o Plop:
Nesta aula, os alunos aprenderão a usar a ferramenta Plop para automatizar a criação de arquivos e estruturas de diretórios comuns no projeto. Eles aprenderão a criar modelos personalizados e como usá-los para gerar código rapidamente.





Cria descriçao das aulas: Página inicial


Marketplace


Tecnologia da Informação


CrazyStack - O Bootcamp do Dev Doido

CrazyStack - O Bootcamp do Dev Doido
Gustavo Miranda
Formato:
Cursos Online e Serviços de Assinatura
Idioma:
Português





Nesse curso criaremos uma API em NodeJs com Typescript, MongoDb e Fastify de forma prática e direta. Se você procura um bootcamp de programação que ensina na prática Design Patterns, Clean Vertical Sliced Architecture, SOLID, MDA, DDD e TDD, esse é o curso ideal pra você. Meu objetivo é ampliar seus horizontes na criação de um grande e organizado sistema de software.

Vamos criar um sistema de agendamentos online completo com Login, Cadastro, Criação de Categorias, Serviços, Profissionais, Solicitações de Agendamento, Lista de Horários disponíveis, Avaliações e Média de estrelas geradas pra um dado Profissional/ Estabelecimento.

No decorrer de todo treinamento mostro na prática como usar o Jest em todos os testes unitários e automatizados na nossa aplicação. No total são mais de 2 mil testes cobrindo mais de 90% de todo o projeto. Um curso totalmente orientado a código limpo, organizado e bem estruturado, separando cada arquivo em cada pasta por afinidade, e não por semelhança.

Aplico diversos padrões e boas práticas que facilitem a manutenção e desenvolvimento de novas funcionalidades.

Criando um gerador de arquivo personalizado eu mostro que é possível a criação em massa de CRUD para novos domínios de negócio através de modelos. Algo até então inédito no mundo dos bootcamps de programação javascript.

Vamos falar sobre a aplicação de hooks como middlewares no fastify para gerenciamento de permissões nas rotas, manipulação de access token e refresh token via JWT.

Esse curso fará você aprender a se divertir no processo. Eu imito os mais diversos tipos de personagens numa linguagem leve e descontraída. Você terá a oportunidade de conhecer um curso totalmente fora dos padrões existentes na indústria.

01Introdução
Configuração inicial do projeto e criação do primeiro teste unitário
Configuração de Eslint e Prettier
Criação da primeira entidade do projeto
Introdução à arquitetura utilizada no projeto
Criando gerador de arquivo com o Plop
02Implementação de Category UseCases
Criando contract addCategoryRepository
Gerador de teste genérico
Criando useCase addCategory
Criando tipo genérico Query
Criando contract loadCategoryRepository
Criando useCase loadCategory
Criando contract loadCategoryByPageRepository
Criando useCase loadCategoryByPage
Criando contract deleteCategoryRepository
Criando useCase deleteCategory
Criando contract updateCategoryRepository
Criando useCase updateCategory
03Implementação de Serviços UseCases
Criando contract addServiceRepository
Gerador de teste genérico
Criando useCase addService
Criando tipo genérico Query
Criando contract loadServiceRepository
Criando useCase loadService
Criando contract loadServiceByPageRepository
Criando useCase loadServiceByPage
Criando contract deleteServiceRepository
Criando useCase deleteService
Criando contract updateServiceRepository
Criando useCase updateService

04Implementaçã





Cria descriçao das aulas: Criando contract addCategoryRepository
Gerador de teste genérico
Criando useCase addCategory
Criando tipo genérico Query
Criando contract loadCategoryRepository
Criando useCase loadCategory
Criando contract loadCategoryByPageRepository
Criando useCase loadCategoryByPage
Criando contract deleteCategoryRepository
Criando useCase deleteCategory
Criando contract updateCategoryRepository
Criando useCase updateCategory
Criando contract addCategoryRepository: Nesta aula, os alunos aprenderão a criar o contrato de repositório para adicionar categorias ao banco de dados. Eles aprenderão sobre a importância de seguir uma arquitetura baseada em contratos e como isso facilita a manutenção e extensão do projeto.

Gerador de teste genérico: Nesta aula, os alunos aprenderão a criar um gerador de testes genérico para automatizar a criação de testes unitários para as entidades do projeto. Eles aprenderão a criar modelos personalizados e como usá-los para gerar testes rapidamente.

Criando useCase addCategory: Nesta aula, os alunos aprenderão a criar a useCase de adição de categorias. Eles aprenderão sobre a importância de seguir uma arquitetura baseada em useCases e como isso facilita a manutenção e extensão do projeto.

Criando tipo genérico Query: Nesta aula, os alunos aprenderão a criar um tipo genérico para representar as queries utilizadas no projeto. Eles aprenderão sobre a importância de seguir uma arquitetura baseada em tipos genéricos e como isso facilita a manutenção e extensão do projeto.

Criando contract loadCategoryRepository: Nesta aula, os alunos aprenderão a criar o contrato de repositório para carregar categorias do banco de dados. Eles aprenderão sobre a importância de seguir uma arquitetura baseada em contratos e como isso facilita a manutenção e extensão do projeto.

Criando useCase loadCategory: Nesta aula, os alunos aprenderão a criar a useCase de carregamento de categorias. Eles aprenderão sobre a importância de seguir uma arquitetura baseada em useCases e como isso facilita a manutenção e extensão do projeto.

Criando contract loadCategoryByPageRepository: Nesta aula, os alunos aprenderão a criar o contrato de repositório para carregar categorias do banco de dados por página. Eles aprenderão sobre a importância de seguir uma arquitetura baseada em contratos e como isso facilita a manutenção e extensão do projeto.

Criando useCase loadCategoryByPage: Nesta aula, os alunos aprenderão a criar a useCase de carregamento de categorias por página. Eles aprenderão sobre a importância de seguir uma ar





Finalize
Criando useCase loadCategoryByPage: Nesta aula, os alunos aprenderão a criar a useCase de carregamento de categorias por página. Eles aprenderão sobre a importância de seguir uma arquitetura baseada em useCases e como isso facilita a manutenção e extensão do projeto.

Criando contract deleteCategoryRepository: Nesta aula, os alunos aprenderão a criar o contrato de repositório para deletar categorias do banco de dados. Eles aprenderão sobre a importância de seguir uma arquitetura baseada em contratos e como isso facilita a manutenção e extensão do projeto.

Criando useCase deleteCategory: Nesta aula, os alunos aprenderão a criar a useCase de deleção de categorias. Eles aprenderão sobre a importância de seguir uma arquitetura baseada em useCases e como isso facilita a manutenção e extensão do projeto.

Criando contract updateCategoryRepository: Nesta aula, os alunos aprenderão a criar o contrato de repositório para atualizar categorias do banco de dados. Eles aprenderão sobre a importância de seguir uma arquitetura baseada em contratos e como isso facilita a manutenção e extensão do projeto.

Criando useCase updateCategory: Nesta aula, os alunos aprenderão a criar a useCase de atualização de categorias. Eles aprenderão sobre





Continue
a importância de seguir uma arquitetura baseada em useCases e como isso facilita a manutenção e extensão do projeto. Além disso, eles aprenderão sobre as boas práticas para garantir que as atualizações sejam realizadas de forma segura e precisa, garantindo a integridade dos dados.

Este curso de CrazyStack - O Bootcamp do Dev Doido, vai oferecer uma abordagem prática e direta para construir uma API completa usando NodeJs, Typescript, MongoDb e Fastify. Os alunos aprenderão sobre Design Patterns, Clean Vertical Sliced Architecture, SOLID, MDA, DDD e TDD, e como aplicá-los em seus projetos. Eles também aprenderão sobre as melhores práticas de testes automatizados e como garantir que o código seja limpo, organizado e bem estruturado. Além disso, o curso inclui tópicos avançados como geradores de arquivos personalizados e hooks como middlewares para gerenciamento de permissões nas rotas. Este é um curso divertido e fora dos padrões existentes na indústria, que vai deixar você se divertir enquanto aprende.





O curso tem essas aulas tbm Página inicial


Marketplace


Tecnologia da Informação


CrazyStack - O Bootcamp do Dev Doido

CrazyStack - O Bootcamp do Dev Doido
Gustavo Miranda
Formato:
Cursos Online e Serviços de Assinatura
Idioma:
Português





Nesse curso criaremos uma API em NodeJs com Typescript, MongoDb e Fastify de forma prática e direta. Se você procura um bootcamp de programação que ensina na prática Design Patterns, Clean Vertical Sliced Architecture, SOLID, MDA, DDD e TDD, esse é o curso ideal pra você. Meu objetivo é ampliar seus horizontes na criação de um grande e organizado sistema de software.

Vamos criar um sistema de agendamentos online completo com Login, Cadastro, Criação de Categorias, Serviços, Profissionais, Solicitações de Agendamento, Lista de Horários disponíveis, Avaliações e Média de estrelas geradas pra um dado Profissional/ Estabelecimento.

No decorrer de todo treinamento mostro na prática como usar o Jest em todos os testes unitários e automatizados na nossa aplicação. No total são mais de 2 mil testes cobrindo mais de 90% de todo o projeto. Um curso totalmente orientado a código limpo, organizado e bem estruturado, separando cada arquivo em cada pasta por afinidade, e não por semelhança.

Aplico diversos padrões e boas práticas que facilitem a manutenção e desenvolvimento de novas funcionalidades.

Criando um gerador de arquivo personalizado eu mostro que é possível a criação em massa de CRUD para novos domínios de negócio através de modelos. Algo até então inédito no mundo dos bootcamps de programação javascript.

Vamos falar sobre a aplicação de hooks como middlewares no fastify para gerenciamento de permissões nas rotas, manipulação de access token e refresh token via JWT.

Esse curso fará você aprender a se divertir no processo. Eu imito os mais diversos tipos de personagens numa linguagem leve e descontraída. Você terá a oportunidade de conhecer um curso totalmente fora dos padrões existentes na indústria.

01Introdução
02Implementação de Category UseCases
Criando contract addCategoryRepository
Gerador de teste genérico
Criando useCase addCategory
Criando tipo genérico Query
Criando contract loadCategoryRepository
Criando useCase loadCategory
Criando contract loadCategoryByPageRepository
Criando useCase loadCategoryByPage
Criando contract deleteCategoryRepository
Criando useCase deleteCategory
Criando contract updateCategoryRepository
Criando useCase updateCategory
03Geração dinâmica de UseCases
Gerando CRUD para User
Gerando CRUD para Service
Gerando CRUD para client e product
Gerando CRUD para Owner
Gerando CRUD para Account e Appointment
Gerando CRUD para Fidelity
Gerando CRUD para Ride
Gerando CRUD para Recurrence
Gerando CRUD de Order
Gerando CRUD para Rating
Gerando CRUD para RatingResult
Criando useCase LoadAverageRatingResult
Gerando CRUD para Request
Overview de todas as regras de negócio do sistema
Página inicial: Nesta aula, os alunos aprenderão sobre a página in




O curso tem as aulas Geração dinâmica de UseCases
Gerando CRUD para User
Gerando CRUD para Service
Gerando CRUD para client e product
Gerando CRUD para Owner
Gerando CRUD para Account e Appointment
Gerando CRUD para Fidelity
Gerando CRUD para Ride
Gerando CRUD para Recurrence
Gerando CRUD de Order
Gerando CRUD para Rating
Gerando CRUD para RatingResult
Criando useCase LoadAverageRatingResult
Gerando CRUD para Request
Overview de todas as regras de negócio do sistema
Geração dinâmica de UseCases: Nesta aula, os alunos aprenderão sobre a geração dinâmica de useCases. Eles aprenderão como criar CRUD (Create, Read, Update, Delete) para entidades como User, Service, Client e Product, Owner, Account e Appointment, Fidelity, Ride, Recurrence, Order, Rating, RatingResult, e Request. Eles também aprenderão como usar o gerador de arquivo personalizado para automatizar esse processo e como isso pode ser usado para criar novos domínios de negócio rapidamente.

Gerando CRUD para User: Nesta aula, os alunos aprenderão a gerar CRUD para a entidade User. Eles verão como usar o gerador de arquivo personalizado para criar as useCases de adição, carregamento, deleção e atualização de usuários. Eles também aprenderão sobre as boas práticas para garantir que essas operações sejam realizadas de forma segura e precisa, garantindo a integridade dos dados.

Gerando CRUD para Service: Nesta aula, os alunos aprenderão a gerar CRUD para a entidade Service. Eles verão como usar o gerador de arquivo personalizado para criar as useCases de adição, carregamento, deleção e atualização de serviços. Eles também aprenderão sobre as boas práticas para garantir que essas operações sejam realizadas de forma segura e precisa, garantindo a integridade dos dados.

16





Continua o 16
Gerando CRUD para Client e Product: Nesta aula, os alunos aprenderão a gerar CRUD para as entidades Client e Product. Eles verão como usar o gerador de arquivo personalizado para criar as useCases de adição, carregamento, deleção e atualização de clientes e produtos. Eles também aprenderão sobre as boas práticas para garantir que essas operações sejam realizadas de forma segura e precisa, garantindo a integridade dos dados.

Gerando CRUD para Owner: Nesta aula, os alunos aprenderão a gerar CRUD para a entidade Owner. Eles verão como usar o gerador de arquivo personalizado para criar as useCases de adição, carregamento, deleção e atualização de proprietários. Eles também aprenderão sobre as boas práticas para garantir que essas operações sejam realizadas de forma segura e precisa, garantindo a integridade dos dados.

Gerando CRUD para Account e Appointment: Nesta aula, os alunos aprenderão a gerar CRUD para as entidades Account e Appointment. Eles verão como usar o gerador de arquivo personalizado para criar as useCases de adição, carregamento, deleção e atualização de contas e agendamentos. Eles também aprenderão sobre as boas práticas para garantir que essas operaç





Continue
ões sejam realizadas de forma segura e precisa, garantindo a integridade dos dados.

Gerando CRUD para Fidelity: Nesta aula, os alunos aprenderão a gerar CRUD para a entidade Fidelity. Eles verão como usar o gerador de arquivo personalizado para criar as useCases de adição, carregamento, deleção e atualização de programas de fidelidade. Eles também aprenderão sobre as boas práticas para garantir que essas operações sejam realizadas de forma segura e precisa, garantindo a integridade dos dados.

Gerando CRUD para Ride: Nesta aula, os alunos aprenderão a gerar CRUD para a entidade Ride. Eles verão como usar o gerador de arquivo personalizado para criar as useCases de adição, carregamento, deleção e atualização de corridas. Eles também aprenderão sobre as boas práticas para garantir que essas operações sejam realizadas de forma segura e precisa, garantindo a integridade dos dados.

Gerando CRUD para Recurrence: Nesta aula, os alunos aprenderão a gerar CRUD para a entidade