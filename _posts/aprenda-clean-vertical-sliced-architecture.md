---
title: 'Como eu vejo Clean Architecture'
excerpt: 'Nesse post vamos falar sobre o assunto do momento em muitas rodas de conversa entre devs. A famigerada e exaltada Clean Architecture.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-04-18T09:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

 ## Introdução
Um dos temas mais discutidos na comunidade Dev nos últimos anos tem sido arquitetura de software. Depois que um desenvolvedor aprende determinada tecnologia, no meio do percurso ele se depara com desafios de qualidade e escalabilidade de código. Por isso, neste artigo vamos falar sobre Clean Architecture e suas aplicações.

 ## O que é Arquitetura Limpa?
Arquitetura Limpa é uma arquitetura de software proposta por Robert Cecil Martin (ou tio Bob para os íntimos) que tem como principal objetivo organizar o código escrito através do uso de certos princípios e regras definidas.

Na obra escrita pelo autor chamada *Arquitetura Limpa*, temos diversos desses princípios e regras detalhados e exemplificados que podem ser incorporados independente de tecnologia e linguagem de programação usada. Tive a oportunidade de ler esse livro umas 3 ou 4 vezes, e a cada leitura é possível gerar novas reflexões sobre a forma que tratamos nosso código.

Creio que a principal reflexão que pode ser gerada a partir desse livro é sobre acoplamento. Muita gente acha que o principal é aprender a arquitetura dividida em camadas e sair programando em cima de cada camada, mas se não tomarmos o devido cuidado acerca do acoplamento que nosso código pode gerar, podemos ter um sistema aparentemente organizado mas extremamente dependente de detalhes de baixo nível.

 ## Mas o que seriam esses detalhes de baixo nível?
Os detalhes de baixo nível mais comuns são compostos por frameworks e ferramentas específicas para lidar com banco de dados, interface gráfica e protocolos de comunicação entre sistemas. Torna-se perigoso juntar no código esses detalhes a regras de negócio.

O livro fala a todo momento em políticas e como elas podem ser agrupadas. E essas políticas possuem níveis que variam de acordo com a proximidade que elas tem com as entradas e saídas do sistema. Quanto mais perto estiver mais de baixo nível essa política será.

**Segundo o autor:**

*[...] as políticas são agrupadas em componentes com base na forma como mudam. [...] As políticas de nível mais alto — as que estão mais longe das entradas e saídas — tendem a mudar com menos frequência e por razões mais importantes do que as políticas de nível mais baixo. As políticas de nível mais baixo — as que estão mais próximas das entradas e saídas — tendem a mudar com frequência e com mais urgência, mas por razões menos importantes*

**Mas em resumo, Robert C. Martin destaca que:**

*Manter essas políticas separadas, com todas as dependências de código-fonte apontando na direção das políticas de nível mais alto, reduz o impacto da mudança. Mudanças triviais, mas urgentes, nos níveis mais baixos do sistema devem causar pouco ou nenhum impacto sobre os níveis mais altos e mais importantes.*

 ## O famoso diagrama
 Você certamente já viu esse diagrama em algum lugar, mas **o que ele representa?** **Como eu posso aplicar essa coisa no meu código?**

![Clean Architecture Structure](https://cabra.dev/wp-content/uploads/2022/01/infografico_cabra.dev_-1024x576.jpg)



![Clean Architecture Structure Detailed](https://cabra.dev/wp-content/uploads/2022/02/photo_2021-08-17_12-10-11.jpg)
Lembre-se que as políticas são agrupadas em componentes com base na forma como mudam. As políticas que mudam pelas mesmas razões e ao mesmo tempo são agrupadas de acordo com os princípios SRP e CCP. As políticas de nível mais alto — as que estão mais longe das entradas e saídas — tendem a mudar com menos frequência e por razões mais importantes do que as políticas de nível mais baixo. As políticas de nível mais baixo — as que estão mais próximas das entradas e saídas — tendem a mudar com frequência e com mais urgência, mas por razões menos importantes

.

Manter essas políticas separadas, com todas as dependências de código-fonte apontando na direção das políticas de nível mais alto, reduz o impacto da mudança. Mudanças triviais, mas urgentes, nos níveis mais baixos do sistema devem causar pouco ou nenhum impacto sobre os níveis mais altos e mais importantes

.

Os casos de uso não descrevem como o sistema aparece para o usuário. Em vez disso, descrevem regras específicas da aplicação que regem a interação entre os usuários e as Entidades. O modo como os dados entram e saem do sistema é irrelevante para os casos de uso

.

Um caso de uso é um objeto. Ele tem uma ou mais funções que implementam as regras de negócio específicas da aplicação. Também tem elementos de dados que incluem os dados de entrada, os dados de saída e as referências para as devidas Entidades com as quais interage

.
As entidades não conhecem os casos de uso que as controlam. Esse é outro exemplo da direção das dependências de acordo com o Princípio de Inversão de Dependência. Os conceitos de alto nível, como as Entidades, não sabem nada sobre os conceitos de nível mais baixo, como os casos de uso. Mas os casos de uso de nível mais baixo sabem sobre as Entidades de nível mais alto

.
Por que as Entidades são de alto nível e os casos de uso são de nível mais baixo? Porque os casos de uso são específicos para uma única aplicação e, portanto, estão mais perto das entradas e saídas desse sistema. As Entidades são generalizações que podem ser usadas em muitas aplicações diferentes e, portanto, estão mais distantes das entradas e saídas do sistema. Os casos de uso dependem das Entidades, mas as Entidades não dependem dos casos de uso

.
As regras de negócio são a razão da existência de um sistema de software. Elas são a funcionalidade central. Elas carregam o código que gera ou economiza dinheiro. Elas são as joias da família. As regras de negócio devem permanecer puras, imaculadas por preocupações mais básicas como a interface do usuário ou o banco de dados usado. Em tese, o código que representa as regras de negócio deve ser o coração do sistema, contendo as preocupações menores como plug-ins. As regras de negócio devem ser o código mais independente e reutilizável do sistema

.

As arquiteturas não se resumem (e nem devem se resumir) a frameworks. As arquiteturas não devem ser estabelecidas por frameworks. Os frameworks são ferramentas à nossa disposição e não arquiteturas a que devemos nos resignar. Se a sua arquitetura é baseada em frameworks, ela não pode ser baseada nos seus casos de uso

.

As boas arquiteturas devem ser centradas em casos de uso para que os arquitetos possam descrever com segurança as estruturas que suportam esses casos de uso, sem se comprometerem com frameworks, ferramentas e ambiente

s

Uma boa arquitetura de software permite o adiamento de decisões sobre frameworks, banco de dados, servidores web e outros problemas de ambientes e ferramentas. Os frameworks são opções que devem ser deixadas abertas. Uma boa arquitetura elimina a necessidade de se decidir sobre Rails, Spring, Hibernate, Tomcat ou MySQL até um ponto muito posterior no projeto. Uma boa arquitetura também facilita que se mude de ideia sobre essas decisões. Uma boa arquitetura enfatiza os casos de uso e os desacopla das preocupações periféricas

.

Embora todas essas arquiteturas variem de alguma forma em seus detalhes, elas são muito similares. Todas têm o mesmo objetivo: a separação das preocupações. Todas realizam essa separação ao dividirem o software em camadas. Cada uma tem, pelo menos, uma camada para regras de negócio e uma camada para interfaces de usuário e sistema

.

Cada uma dessas arquiteturas produz sistemas com as seguintes características: Independência de frameworks. A arquitetura não depende da existência de nenhuma biblioteca de software carregada de recursos. Isso permite que você use esses frameworks como ferramentas em vez de ser obrigado a adaptar o seu sistema às restrições limitadas dos frameworks. Testabilidade. As regras de negócio podem ser testadas sem a UI, banco de dados, o servidor web ou qualquer outro elemento externo. Independência da UI. A UI pode mudar facilmente, sem alterar o resto do sistema. Uma UI web pode ser substituída por uma UI console, por exemplo, sem alterar as regras de negócio. Independência do banco de dados. Você pode trocar Oracle ou SDL Server por um Mongo, BigTable ou CouchDB, entre outros, pois as suas regras de negócio não estão ligadas à base de dados. Independência de qualquer agência externa. Na verdade, as suas regras de negócio não sabem nada sobre as interfaces do mundo externo

.

Entidades
As Entidades reúnem as Regras Cruciais de Negócios da empresa inteira. Uma entidade pode ser um objeto com métodos ou um conjunto de estruturas de dados e funções. Isso não importa, contanto que as entidades possam ser usadas por muitas aplicações diferentes na empresa. Se você não tem uma empresa e está escrevendo apenas uma única aplicação, essas entidades são os objetos de negócios da aplicação. Elas concentram as regras mais gerais e de nível mais alto. No mínimo, são propensas a mudar quando ocorrer alguma mudança externa. Por exemplo, você não gostaria que esses objetos fossem impactados por uma mudança na navegação de página ou na segurança. Nenhuma mudança operacional em qualquer aplicação específica deve influenciar a camada da entidade.

Casos de Uso
O software da camada de casos de uso contém as regras de negócio específicas da aplicação. Ele reúne e implementa todos os casos de uso do sistema. Esses casos de uso orquestram o fluxo de dados para e a partir das entidades e orientam essas entidades na aplicação das Regras Cruciais de Negócios a fim de atingir os objetivos do caso de uso. Não queremos que as mudanças nessa camada afetem as entidades. Também não queremos que essa camada seja afetada por mudanças em externalidades como a base de dados, a UI ou qualquer framework comum. A camada de casos de uso deve ser isolada dessas preocupações. Contudo, esperamos que mudanças na operação da aplicação afetem os casos de uso e, portanto, o software dessa camada. Se os detalhes de um caso de uso mudarem, uma parte do código dessa camada certamente será afetada

.

Adaptadores de Interface

O software da camada de adaptadores de interface consiste em um conjunto de adaptadores que convertem dados no formato que é mais conveniente para os casos de uso e entidades, para o formato mais conveniente para algum agente externo como a base de dados ou a web. É essa camada, por exemplo, que contém completamente a arquitetura MVC para a GUI. Os apresentadores, visualizações e controladores pertencem à camada de adaptadores de interface. Os modelos provavelmente são apenas estruturas de dados transmitidas dos controladores para os casos de uso e, então, dos casos de uso para os apresentadores e visualizações. De maneira similar, os dados dessa camada são convertidos da forma mais conveniente para entidades e casos de uso para a forma mais conveniente para o framework de persistência em uso (por exemplo, a base de dados).Nenhum código interno desse círculo deve saber nada sobre a base de dados. Se a base de dados for SQL, todo o SQL deverá ser restrito a essa camada — e, em particular, às partes dessa camada que têm a ver com a base de dados. Também deve haver outro adaptador nessa camada para converter dados de forma externa, como um serviço externo, para a forma interna usada pelos casos de uso e entidades.

Frameworks e Drivers

A camada mais externa do modelo na Figura 22.1 é geralmente composta de frameworks e ferramentas como a base de dados e o framework web. Em geral, você não programa muita coisa nessa camada além do código de associação que estabelece uma comunicação com o círculo interno seguinte. Todos os detalhes ficam na camada de frameworks e drivers. A web é um detalhe. A base de dados é um detalhe. Mantemos essas coisas do lado de fora, onde não podem fazer mal nenhum

.

Ao separar o software em camadas e obedecer a Regra da Dependência, você criará um sistema intrinsecamente testável, com todos os benefícios inerentes. Quando uma das partes externas do sistema se tornar obsoleta, como a base de dados ou o framework web, você poderá substituir o elemento obsoleto com um esforço mínimo

.

Gateways de Banco de Dados Entre os interagentes dos casos de uso e o banco de dados, ficam os gateways do banco de dados.
Esses gateways são interfaces polimórficas que contêm métodos para cada operação de criar, ler, atualizar ou deletar, que possa ser realizada pela aplicação na base de dados.


O Detalhe Final
O componente Main é o detalhe final — a política de nível mais baixo. É o ponto de entrada inicial do sistema. Nada, além do sistema operacional, depende dele. Seu trabalho é criar todas as Factories, strategies e outros utilitários globais e, então, entregar o controle para as porções abstratas de alto nível do sistema. É nesse componente Main que as dependências devem ser injetadas por um framework de Injeção de Dependência. Uma vez injetadas em Main, o Main distribui essas dependências normalmente, sem usar o framework. Pense em Main como o mais sujo dos componentes sujos

.

Muitos frameworks de acesso de dados permitem que linhas e tabelas da base de dados sejam transferidas para o sistema como objetos. Esse é um erro arquitetural, pois acopla os casos de uso, as regras de negócio e, em alguns casos, até mesmo a UI à estrutura relacional dos dados

.

A web é um detalhe

Primeiro, pensamos que todo o poder computacional ficaria em fazendas de servidores e os navegadores seriam burros. Então começamos a colocar applets nos navegadores. Mas não gostamos disso, então movemos o conteúdo dinâmico de volta para os servidores. Mas não gostamos disso, então inventamos a Web 2.0 e movemos muito do processamento de volta para o navegador com Ajax e JavaScript. Fomos tão longe que criamos aplicações enormes para serem executadas nos navegadores. E agora estamos muito animados para colocar esse JavaScript de volta no servidor com Node. (Suspiro.

)

O desfecho é simplesmente este: a GUI é um detalhe. A web é uma GUI. Então a web é um detalhe. E, como arquiteto, você deve colocar detalhes como esses atrás de limites que os mantenham separados da sua lógica de negócios central

.

A lógica de negócios pode ser pensada como um conjunto de casos de uso, em que cada um realiza alguma função em nome de um usuário. Cada caso de uso pode ser descrito com base nos dados de entrada, no processamento realizado e nos dados de saída

.
Em algum ponto da dança entre a UI e a aplicação, os dados de entrada podem ser definidos como completos, permitindo que o caso de uso seja executado. Após a conclusão, os dados resultantes podem ser realimentados na dança entre a UI e a aplicação. Os dados de entrada completos e os dados de saída resultantes podem ser colocados em estruturas de dados e usados como valores de entrada e valores de saída no processo que executa o caso de uso. Nessa abordagem, podemos considerar que cada caso de uso opera o dispositivo de entrada e saída da UI de forma independente do dispositivo

.
Esse tipo de abstração não é fácil e provavelmente exigirá várias iterações até que você consiga acertá-la. Mas é possível. E já que o mundo está cheio de gênios do marketing, não é difícil entender como isso frequentemente é muito necessário

.SOLID

SRP: Princípio da Responsabilidade Única (Single Responsibility Principle) Um corolário ativo da lei de Conway: a melhor estrutura para um sistema de software deve ser altamente influenciada pela estrutura social da organização que o utiliza, de modo que cada módulo de software tenha uma, e apenas uma, razão para mudar

.

Em geral, ao escutarem esse nome, os programadores imaginam logo que todos os módulos devem fazer apenas uma coisa. Não se engane, saiba que há um princípio como esse. Uma função deve fazer uma, e apenas uma, coisa. Usamos esse princípio quando refatoramos funções grandes em funções menores; usamos isso nos níveis mais baixos. Mas ele não é um dos princípios SOLID — não é o SRP

.
Portanto, a versão final do SRP é: Um módulo deve ser responsável por um, e apenas um, ator

.
São problemas que ocorrem porque aproximamos demais o código do qual diferentes atores dependem. Por isso, o SRP diz para separar o código do qual diferentes atores dependam

“Uma classe deve ter apenas uma razão para mudar”. Mas e se eu disser que uma classe representa um CRUD e muda quando as regras desse CRUD mudam não é razoável

?

OCP: Princípio do Aberto/Fechado (Open-Closed Principle

)
Em essência, para que os sistemas de software sejam fáceis de mudar, eles devem ser projetados de modo a permitirem que o comportamento desses sistemas mude pela inserção de um novo código em vez da alteração do código existente

.
Um artefato de software deve ser aberto para extensão, mas fechado para modificação

.
Ou seja,

o comportamento de um artefato de software deve ser extensível sem que isso modifique esse artefato

.
Uma boa arquitetura de software deve reduzir a quantidade de código a ser mudado para o mínimo possível. Zero seria o ideal. Como fazer isso? Primeiro, devemos separar adequadamente as coisas que mudam por razões diferentes (o Princípio da Responsabilidade Única) para, então, organizarmos as dependências entre essas coisas de forma apropriada (o Princípio da Inversão de Dependência)

.
Depois dessa separação, precisamos organizar as dependências de código-fonte para garantir que as mudanças em uma dessas responsabilidades não causem mudanças na outra. Além disso, a nova organização deve viabilizar a possibilidade de extensão do comportamento sem a necessidade de se desfazer a modificação. Para isso, particionamos os processos em classes e separamos essas classes em componente

s
Ex: controllers,usecases,repositories,mongo repository

Para que componente A seja protegido das mudanças no componente B, o componente B deve depender do componente A.

Queremos proteger o Controlador das mudanças nos Apresentadores. Queremos proteger os Apresentadores das mudanças nas Visualizações. Queremos proteger a Interface das mudanças em — bem, tudo. A Interface está na posição que mais se enquadra no OCP. As mudanças na Base de Dados, no Controlador, nos Apresentadores ou nas Visualizações não terão impacto sobre a Interface. Por que a Interface tem uma posição tão privilegiada? Porque contém as regras de negócio. A Interface inclui as políticas de nível mais alto da aplicação. Todos os outros componentes estão lidando com questões periféricas. A Interface está a cargo da questão central. Embora o Controlador esteja na periferia da Interface, continua sendo central aos Apresentadores e Visualizações. E, mesmo que os Apresentadores estejam na periferia do Controlador, são centrais às Visualizações. Observe como isso cria uma hierarquia de proteção baseada na noção de "nível". Por serem o conceito de nível mais alto, as Interfaces são as mais protegidas. Já as Visualizações estão entre os conceitos de nível mais baixo e, portanto, são as menos protegidas. Os Apresentadores têm um nível mais alto que as Visualizações, mas estão em um nível mais baixo do que o Controlador ou a Interface. É assim que funciona o OCP no nível arquitetural. Os arquitetos separam a funcionalidade com base no como, por que e quando da mudança e, em seguida, organizam essa funcionalidade separada em uma hierarquia de componentes. Os componentes de nível mais alto na hierarquia são protegidos das mudanças feitas em componentes de nível mais baixo

.

A interface FinancialReportRequester tem um propósito diferente. Está lá para proteger o FinancialReportController de saber demais sobre os detalhes da Interface. Se essa interface não estivesse lá, o Controlador teria dependências transitivas no FinancialEntities. As dependências transitivas violam o princípio geral de que as entidades de software não dependem de coisas que não usam diretamente. Veremos esse princípio novamente quando falarmos sobre o Princípio de Segregação de Interface e do Princípio do Reúso Comum. Então, embora a nossa primeira prioridade seja proteger a Interface de mudanças no Controlador, também queremos proteger o Controlador de mudanças na Interface ocultando os detalhes da Interface

.
particionamos o sistema em componentes e organizamos esses componentes em uma hierarquia de dependência que proteja os componentes de nível mais alto das mudanças em componentes de nível mais baixo

.

Meu software está saudável se ao precisar alterar um requisito eu sei o impacto da minha alteração, tenho um escopo de alteração definido e limitado condizente com a mudança no negócio.

Ok, mas o que eu preciso para alcançar isso?

“Em português, Abstração. Em inglês, abstraction. Em francês…

”
Então agora vou definir três verdades sobre OCP na minha humilde opinião:

1 — As relações entre os artefatos devem ter ao menos uma camada de abstração

.
2 — Cada relação direta entre artefatos é potencialmente um risco e deve ser vista com atenção.

Por exemplo, quando utilizamos o padrão Bridge e temos nosso “Service” e “ServiceImpl”. Ao relacionar com o Resources ou Controller fazemos por meio da abstração, nesse caso em Java a Interface

.

Observação: Isso não deve quebrar o SRP, ou seja, devem ser aplicadas abstrações de forma exponencial ao crescimento do software. Claro, mantendo os arquivos coesos e com responsabilidades únicas. Dica: “Interfaces funcionais” vão ajudar muito aqui

.

LSP: Princípio de Substituição de Liskov (Liskov Substitution Principle

)
Resumindo, este princípio diz que, para criar sistemas de software a partir de partes intercambiáveis, essas partes devem aderir a um contrato que permita que elas sejam substituídas umas pelas outras

.
O LSP pode, e deve, ser estendido ao nível da arquitetura. Uma simples violação da capacidade de substituição pode contaminar a arquitetura do sistema com uma quantidade significante de mecanismos extras

.
Uncle Bob retrata em seu paper o que considera uma violação do OCP (princípio aberto-fechado):

“Tal função viola o princípio Aberto-Fechado porque deve ser modificado sempre que uma nova derivada da classe base é criada.

”

Assim, fica claro que uma relação entre artefatos deve desprezar sua parte concreta de tal forma que a abstração se mantenha inviolável. Em outras palavras, eu devo poder substituir o SUBTIPO pelo TIPO ou TIPO pelo SUBTIPO e a aplicação deve permanecer tendo o comportamento esperado.

“Tudo está conectado, o fim é o começo e o começo é o fim”.

Quem aqui já assistiu ou conhece a série Dark? rsrsrs

Para garantir o princípio da substituição de Liskov, eu conceituo três pontos:

1 — Toda relação deve ser garantida independente do nível hierárquico do maior para menor desprezando o conhecimento de seus herdeiros

.
Nesse ponto estamos falando de herança. Por tanto, eu vou definir que deve ser evitada e sugiro composição, mas em alguns casos pontuais pode, ou até deve, ser utilizada

.
2 — Toda relação deve ser garantida por meio de abstração prioritariamente.

Aqui falo explicitamente sobre o alicerce do OCP.

3 — Toda relação deve ser passível de adições sem que prejudique as relações existentes

.
Aqui mais uma vez toca no OCP, afinal “tudo está conectado” rsrsrs… Seja estendendo uma classe (quando estritamente necessário) ou implementando uma abstração, jamais deve comprometer o código existente

.


ISP: Princípio da Segregação de Interface (Interface Segregation Principle

)

Este princípio orienta que os projetistas de software evitem depender de coisas que não usam

.
Em geral, é prejudicial depender de módulos que contenham mais elementos do que você precisa. Isso obviamente vale para as dependências de código-fonte que podem forçar desnecessariamente a recompilação e a reimplantação — mas também é válido para um nível arquitetural muito mais alto

.

O problema que ISP quer resolver é o que Uncle Bob vai chamar de Interface Gorda ou Poluída. Existem vários exemplos, mas quero trazer algo do nosso dia a dia.

Pense em uma interface de um CRUD, por exemplo. Nela você tem inúmeras ações de responsabilidades diferentes que vão desde criar, alterar, deletar e até consultar diversas formas inclusive.


Calma, eu já cometi esse deslize também, já construí APIs com uma única interface CRUD(Service) que possuíam todos os métodos do CRUD. O ponto central aqui é a coesão pela visão do Uncle Bob como especificado no SRP e é justamente para ele que vamos voltar e que vai nos dar as diretrizes de como garantir este princípio aplicado para os relacionamentos cliente/servidor.

Coesão, precisamos falar de coesão


Esse é um ponto que abre muita margem para discussões e que diferentes autores vão ter seu próprio significado dentro do contexto do que estão trazendo para a mesa. Aqui se refere a SRP, ou seja, “às forças que fazem com que um módulo, ou uma classe, mude.” como disse Uncle Bob

.

Agora que entendemos o conceito e as entrelinhas, como damos corpo a esse princípio e como podemos nos guiar quando vermos nossos clientes/servidores se estão de acordo?

1 — Todo princípio deve respeitar os demais.

2 — Entenda Interface como Abstração. Dessa forma, evite ao máximo servidores concretos, mas se necessário utilize sem ferir outros princípios.

3 — Uma classe concreta nunca deve ser obrigada a utilizar uma abstração que não use.

Voltando ao CRUD(Service)


Para finalizar, vamos resolver o problema que falei do CRUD(Service). Na prática criamos uma interface para cada “ação abstrata” do CRUD.

CreateDomainService -> CreateDomainServiceImpl

AlterDomainService -> AlterDomainServiceImpl

GetDomainService -> GetDomainServiceImpl

DeleteDomainService -> DeleteDomainServiceImpl

Injetamos as interfaces no nosso Resources e bingo

.

DIP: Princípio da Inversão de Dependência (Dependency Inversion Principle) O código que implementa uma política de alto nível não deve depender do código que implementa detalhes de nível mais baixo. São os detalhes que devem depender das políticas

.
Segundo o Princípio da Inversão de Dependência (DIP), os sistemas mais flexíveis são aqueles em que as dependências de código-fonte se referem apenas a abstrações e não a itens concretos

.
Em uma interface abstrata, toda mudança corresponde a uma mudança em suas implementações concretas. Por outro lado, as mudanças nas implementações concretas normalmente ou nem sempre requerem mudanças nas interfaces que implementam. As interfaces são, portanto, menos voláteis que as implementações

.
Podemos inferir, então, que as arquiteturas de software estáveis são aquelas que evitam depender de implementações concretas, e que favorecem o uso de interfaces abstratas estáveis. Essa implicação pode ser sintetizada em um conjunto de práticas de programação muito específicas: Não se refira a classes concretas voláteis. Refira-se a interfaces abstratas

.
Ela também estabelece restrições severas sobre a criação de objetos e geralmente força o uso de Fábricas Abstratas (Abstract Factories).

Não derive de classes concretas voláteis. Trata-se de um complemento à regra anterior que merece menção especial. Em linguagens estaticamente tipadas, a herança é o relacionamento de código-fonte mais forte e rígido de todos e, consequentemente, deve ser usado com muito cuidado

.

Não sobrescreva funções concretas. Funções concretas muitas vezes exigem dependências de código-fonte. Quando você faz o override dessas funções, você não elimina essas dependências — na verdade, acaba herdando-as. Para controlar essas dependências, converta a função em abstrata e crie múltiplas implementações

.
Nunca mencione o nome de algo que seja concreto e volátil. Essa é apenas uma reafirmação do próprio princípio

.

“Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações; Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.

”
Vamos viajar para a década de 90, mais precisamente no ano que o Brasil levou o tetracampeonato na Copa do Mundo. Uncle Bob escreveu pela primeira vez sobre DIP em 1994 e o assunto continua atual.

O que Uncle Bob quer dizer é:

“Do maior para menor, da teoria para a prática.” Carly, 2020 rsrsrs

Trazendo para nosso mundo, as camadas de nossas APIs da mais externa para a mais interna devem se relacionar nesse sentido de dependência. A relação entre essas camadas deve se dar por abstrações

.

Basicamente se seguirmos o SOLID até aqui o DIP será seguido naturalmente, em especial OCP e LS

P
“O que torna um design rígido, frágil e difícil de reutilizar. É a interdependência de subsistemas dentro desse design. Um design é rígido se não puder ser alterado facilmente.”

Uncle Bob em seu paper original traz sua visão de que as dependências podem gerar enormes problemas e propõe sua resposta ao problema apresentado como dito acima.

Mas ele também entende que dependências são necessárias e que existem dois tipos de dependências, as boas e as ruins.

Quanto mais difícil é para uma classe mudar, melhor que ela seja uma dependência. Ele vai chamar classes assim de “classes responsáveis”.

“Sua aplicação não deve depender de classes concretas.”

Mas isso é impossível. Sim, por isso o conceito de dependências boas e ruins

.
Uma vez que sua classe vai precisar depender de classes concretas, devem ser analisados OCP e LSP. Se ainda for necessário uma dependência concreta, que seja uma boa dependência. Assim, escolha e analise as dependências concretas de forma que sejam classes responsáveis, classes que dificilmente venham a mudar

.



Fábricas (Factories) Para que essas regras sejam cumpridas, a criação de objetos concretos voláteis requer um tratamento especial. Esse cuidado é justificado porque, em praticamente todas as linguagens, a criação de um objeto requer uma dependência de código-fonte na definição concreta desse objeto. Na maioria das linguagens orientadas a objetos, como Java, usamos uma Fábrica Abstrata (Abstract Factory) para lidar com essa dependência indesejada

.
As violações do DIP não podem ser removidas completamente, mas é possível reuni-las em um número menor de componentes concretos para que fiquem separadas do resto do sistema. A maioria dos sistemas contém pelo menos um desses componentes concretos — muitas vezes chamados main porque contêm a função main



Event sourcing

Essa é a ideia por trás do event sourcing.3 Event sourcing é uma estratégia em que armazenamos as transações, mas não o estado. Quando o estado for solicitado, simplesmente aplicamos todas as transações desde o início. É claro que podemos pegar atalhos. Por exemplo, podemos calcular e salvar o estado todos os dias à meia-noite. Então, quando a informação de estado for solicitada, calculamos apenas as transações feitas a partir da meia-noite

.Sobre frameworks
frameworks não são arquiteturas — embora alguns tentem ser

.

Como Uncle Bob disse, abordagens como "portas e adaptadores", "arquitetura hexagonal", "limites, controladores, entidades" e assim por diante, têm como objetivo criar arquiteturas onde o código focado em negócios/domínio é independente e separado dos detalhes de implementação técnica como frameworks e bases de dados

.

Se vc injetar um repository numa classe controller

Essa organização é conhecida como arquitetura em camadas relaxada (Relaxed Layered Architecture), já que as camadas têm permissão para pular suas vizinhas adjacentes

.

não é recomendável contornar a camada de lógica de negócios, especialmente se essa lógica de negócios for responsável pelo acesso autorizado a registros individuais, por exemplo. Embora o novo caso de uso funcione, talvez não esteja implementado da maneira prevista
A política de mais baixo nível existente no sistema geralmente se concentra no ponto inicial de execução de um programa. Na linguagem C por exemplo, a função main() concentra tudo a respeito da inicialização da aplicação, sendo portanto a política mais próxima da entrada e saída do sistema.

Outro exemplo seria algum framework Javascript Web, neles sempre existe aquele arquivo (ou pasta) inicial que carrega nas costas o sistema para ser mostrado em tela. Geralmente é nesse arquivo (ou pasta) que abarrotamos de libs externas e coisas globais do sistema. Códigos que lidam com conexões a banco de dados, bibliotecas de interface gráfica e comunicação com sistemas externos também podem ser consideradas políticas de baixo nível.

Fonte:
[Infográfico Cabra.dev](https://cabra.dev/2022/01/30/diagrama-clean-arch-ui-melhorada/)