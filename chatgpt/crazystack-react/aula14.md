---
title: 'NavBar no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Na aula "Navbar no painel admin", vamos aprender como criar uma barra de navegação (ou navbar) para o painel administrativo de um sistema web. A navbar é um elemento muito importante em qualquer sistema web, pois permite que os usuários possam navegar pelas diferentes páginas e funcionalidades do sistema de forma intuitiva e eficiente.

Para essa aula, vamos utilizar o framework Chakra UI para construir a nossa navbar. O Chakra UI é um framework de design de componentes para React, que oferece uma série de componentes personalizáveis e fáceis de usar, o que o torna uma ótima escolha para a criação de interfaces de usuário.

Durante a aula, vamos criar uma navbar com alguns links para as principais seções do nosso sistema de agendamentos online. Também vamos usar o conceito de rotas do Next.js para tornar os links da navbar funcionais, ou seja, ao clicar em um link da navbar, o usuário será direcionado para a página correspondente.

Além disso, vamos explorar o conceito de responsividade, tornando a nossa navbar adaptável a diferentes tamanhos de tela e dispositivos. Isso é muito importante, já que muitos usuários acessam sistemas web de diferentes dispositivos, como computadores, tablets e smartphones.

Por fim, vamos criar uma função que permite abrir e fechar a navbar em dispositivos móveis, para que os usuários possam acessar facilmente os links da navbar em telas menores.

Com tudo isso, esperamos que você aprenda como criar uma navbar funcional e estilizada para o seu painel administrativo, oferecendo aos usuários uma experiência de usuário agradável e intuitiva.
 
## Box

```tsx
import { Box as BoxChakra, BoxProps } from "@chakra-ui/react";
export const Box = ({ children, ...rest }: BoxProps) => {
  return (
    <BoxChakra {...rest} data-testid="BoxTestId">
      {children}
    </BoxChakra>
  );
};
```
Este código define um componente Box que usa o Box do Chakra UI como base. O Box do Chakra UI é um componente de layout que fornece estilos básicos de caixa, como padding, margin, borders e outros.

O componente Box criado neste código permite a passagem de todas as propriedades aceitas pelo Box do Chakra UI, por meio do ...rest e adiciona um atributo data-testid com o valor BoxTestId. O data-testid é um atributo que não tem nenhuma funcionalidade específica, mas pode ser usado para identificar elementos no seu código de teste automatizado.

Portanto, o código permite a criação de um componente Box personalizado que pode ser usado em vez do Box do Chakra UI em outras partes do aplicativo, com a vantagem adicional de tornar o elemento identificável no código de teste automatizado.
## Avatar

```tsx
import { Avatar as AvatarChakra, AvatarProps } from "@chakra-ui/react";
export const Avatar = ({ children, ...rest }: AvatarProps) => {
  return (
    <AvatarChakra {...rest} data-testid="AvatarTestId">
      {children}
    </AvatarChakra>
  );
};
```
Este código exporta um componente chamado Avatar, que é uma simples camada de abstração em cima do componente Avatar do Chakra UI. Ele é usado para envolver o componente Avatar do Chakra e adicionar um atributo data-testid para fins de teste automatizado.

O componente Avatar do Chakra é usado para exibir uma imagem de perfil do usuário ou suas iniciais. Ele oferece uma ampla variedade de propriedades que podem ser usadas para personalizar a aparência do avatar, como name, src, size e bgColor.

Aqui, o componente Avatar é reutilizado para permitir que o atributo data-testid seja adicionado ao componente, tornando mais fácil testar o componente em testes automatizados. Além disso, essa abstração pode ser útil caso seja necessário adicionar algum comportamento ou lógica adicional ao componente Avatar em algum momento.
## Header

```tsx
import { Flex as FlexChakra, FlexProps } from "@chakra-ui/react";
interface HeaderProps extends FlexProps {
  children?: React.ReactNode;
}
export const Header = ({ children, ...rest }: HeaderProps) => {
  return (
    <FlexChakra
      as="header"
      h="20"
      w="100%"
      align="center"
      paddingX={["0", "0", "2", "4"]}
      top="0"
      zIndex={99}
      position="sticky"
      bgColor="purple.900"
      {...rest}
      data-testid="HeaderTestId"
    >
      {children}
    </FlexChakra>
  );
};
```
Esse código exporta um componente chamado `Header`, que é basicamente um `Flex` do Chakra UI utilizado como header da aplicação. Ele recebe propriedades do tipo `FlexProps` e também pode receber um `children`, que é um `ReactNode`.

No código, o `Header` é criado a partir do componente `FlexChakra` com algumas propriedades já pré-definidas, como:

* `as="header"`: indica que é um elemento `header` do HTML;
* `h="20"`: define a altura do `header`;
* `w="100%"`: define a largura máxima do `header`;
* `align="center"`: alinha o conteúdo ao centro verticalmente;
* `paddingX={["0", "0", "2", "4"]}`: define o padding horizontal em diferentes tamanhos dependendo da largura da tela;
* `top="0"`: posiciona o `header` no topo da página;
* `zIndex={99}`: define a ordem de empilhamento do elemento, ou seja, o `header` fica acima de outros elementos;
* `position="sticky"`: mantém o `header` sempre visível na parte superior da tela, mesmo quando o usuário rola a página;
* `bgColor="purple.900"`: define a cor de fundo do `header`.

As propriedades recebidas pelo componente `Header` são passadas para o `FlexChakra` utilizando a sintaxe de propagação de propriedades (`...rest`), de forma que as propriedades passadas para o `Header` possam ser utilizadas pelo `FlexChakra`.

Por fim, o `children` é renderizado dentro do `Header`, permitindo que outros componentes ou elementos possam ser adicionados dentro dele. A propriedade `data-testid` é utilizada para fins de teste automatizado.
## Logo

```tsx
import { Text } from "shared/ui/atoms";

export const Logo = () => {
  return (
    <Text fontWeight="bold" letterSpacing="tight" w="64" fontSize={["2xl", "3xl"]}>
      Belezix
      <Text color="green.300" marginLeft="2" as="span">
        Admin
      </Text>
    </Text>
  );
};
```
Esse código exporta o componente Logo, que é usado na barra de navegação do painel de administração. O componente é composto por um elemento Text do Chakra UI, que exibe o nome "Belezix" em negrito e com um espaçamento entre as letras mais apertado. Depois do nome, há outro elemento Text que exibe a palavra "Admin" em verde e com um espaçamento à esquerda de 2 unidades.

Dessa forma, o resultado é um texto "Belezix Admin" exibido na barra de navegação do painel de administração, com a palavra "Admin" destacada em verde. A propriedade w define a largura do componente, enquanto a propriedade fontSize define o tamanho da fonte do texto, variando entre "2xl" em telas menores e "3xl" em telas maiores.
## NotificationsNav

```tsx
import { Icon, HStack } from "@chakra-ui/react";
import { RiNotificationLine } from "react-icons/ri";

export const NotificationsNav = () => {
  return (
    <HStack
      spacing={["3", "4"]}
      mx={["3", "4"]}
      pr={["3", "4"]}
      py="1"
      color="purple.300"
      borderRightWidth={1}
      borderColor="purple.700"
      data-testid="NotificationsNavTestId"
    >
      <Icon as={RiNotificationLine} fontSize="20" />
    </HStack>
  );
};
```
Esse código exporta um componente chamado NotificationsNav, que renderiza um ícone de notificação. Esse ícone é importado do pacote react-icons/ri, que contém diversos ícones do React.

O componente é construído com um HStack do Chakra UI, que é um componente de layout que empilha os elementos horizontalmente. Ele tem alguns atributos, como o spacing para definir o espaçamento entre os elementos, o mx para definir a margem horizontal, o pr para definir o preenchimento à direita, o py para definir o preenchimento vertical, o color para definir a cor do ícone e o borderRightWidth e borderColor para adicionar uma borda à direita do componente.

Dentro do HStack, há um componente Icon do Chakra UI, que renderiza o ícone importado. O Icon tem um atributo as que define o tipo de ícone a ser renderizado, nesse caso o RiNotificationLine. Ele também tem um atributo fontSize para definir o tamanho do ícone.

Por fim, há um atributo data-testid para definir um identificador de teste para esse componente, que pode ser usado em testes automatizados.
## Profile

```tsx
import { Box, Flex, Text, Avatar } from "shared/ui/atoms";
import { useAuth } from "shared/libs";

type ProfileProps = {
  showProfileData?: boolean;
};
export const Profile = ({ showProfileData }: ProfileProps) => {
  const { user } = useAuth();

  return (
    <Flex align="center" mr={["2", "2", "0", "0"]} data-testid="ProfileTestId">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gustavo Miranda</Text>
          <Text color="purple.300" fontSize="small">
            {user?.email}
          </Text>
        </Box>
      )}
      <Avatar name="Gustavo Miranda" size="md" src="https://github.com/gumiranda.png" />
    </Flex>
  );
};
```
Este trecho de código implementa o componente Profile, que é usado para exibir informações do usuário logado, como seu nome, email e avatar. O componente recebe uma propriedade opcional showProfileData, que é usada para controlar se as informações do usuário devem ser exibidas ou não.

Para implementar esse componente, é utilizado o componente Flex do Chakra UI para posicionar os elementos. Em seguida, é verificado se showProfileData é true, e se for, um componente Box é usado para exibir o nome e o email do usuário em um formato específico. Caso contrário, apenas o avatar do usuário é exibido.

Para obter as informações do usuário logado, é utilizado o hook useAuth, que retorna um objeto contendo informações do usuário atualmente logado, incluindo seu nome e email. Essas informações são então exibidas no componente caso showProfileData seja true.

Por fim, é usado o componente Avatar do Chakra UI para exibir a imagem de perfil do usuário, que é passada como uma URL na propriedade src, e seu nome, que é passado na propriedade name.
## NavBar
```tsx
import { Header, Flex, Logo, Profile, NotificationsNav } from "shared/ui";
import { useBreakpointValue, Icon, IconButton } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useAuth, useSidebarDrawer } from "shared/libs";
export const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const { onOpen } = useSidebarDrawer();
  const isDesktopVersion = useBreakpointValue({ base: false, lg: true });
  return (
    <Header>
      {isAuthenticated && !isDesktopVersion && (
        <IconButton
          aria-label="Open sidebar"
          fontSize="24"
          icon={<Icon as={RiMenuLine} />}
          variant="unstyled"
          onClick={onOpen}
          mr="1"
        />
      )}
      <Logo />
      {isAuthenticated && (
        <Flex align="center" ml="auto">
          <NotificationsNav />
          <Profile showProfileData={isDesktopVersion} />
        </Flex>
      )}
    </Header>
  );
};
``` 
Esse é um código de um componente chamado NavBar, que é responsável por criar a barra de navegação da aplicação.

Ele importa outros componentes do projeto através do import, como o Header, Flex, Logo, Profile, NotificationsNav, além de outros recursos do Chakra UI, como o useBreakpointValue, Icon e IconButton. Também utiliza hooks personalizados, como useAuth e useSidebarDrawer.

Dentro do componente NavBar, é utilizado o hook useAuth para verificar se o usuário está autenticado. Caso esteja autenticado, é renderizado o ícone para abrir o menu lateral e o botão para notificações, utilizando o componente IconButton e NotificationsNav, respectivamente. Além disso, é renderizado o componente Profile com as informações do usuário caso esteja na versão desktop.

O componente Logo é utilizado para renderizar o logo da aplicação e o componente Header é utilizado para criar um cabeçalho.

O useBreakpointValue é usado para obter o valor atual do breakpoint (em qual tamanho de tela estamos), e verificar se estamos na versão desktop ou não.

Por fim, o componente NavBar é exportado, tornando-o disponível para ser utilizado em outros lugares da aplicação.

## Conclusão
Nesta aula aprendemos a criar uma Navbar responsiva para um painel de administração usando a biblioteca Chakra UI e React. Vimos como utilizar os componentes da biblioteca para criar uma interface consistente e moderna, além de aprender a criar nossos próprios componentes customizados a partir dos componentes já existentes.

Também exploramos alguns conceitos importantes como o uso de breakpoints para adaptar a interface a diferentes tamanhos de tela, o uso de ícones e imagens em nossa interface e como utilizar o contexto do React para compartilhar dados entre diferentes componentes.

Espero que com o conhecimento adquirido nesta aula, você se sinta mais confiante para criar interfaces complexas e responsivas em seus projetos usando as ferramentas apresentadas aqui. Lembre-se de sempre praticar e continuar aprendendo para se manter atualizado com as melhores práticas de desenvolvimento de interface de usuário.

## Desafio

Crie um novo componente chamado SearchInput que renderiza um campo de busca com ícone de lupa e placeholder. O componente deve ter a possibilidade de receber um prop chamado onSearch que será uma função para lidar com a ação de busca, quando o usuário pressionar a tecla "Enter" ou clicar no botão de busca. Em breve iremos implementar esse componente