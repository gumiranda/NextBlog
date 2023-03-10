---
title: 'Sidebar no painel do CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

A aula de "Sidebar" irá ensinar como criar uma barra lateral (ou sidebar) personalizada no painel de administração de um sistema de agendamentos online.

O vídeo dessa aula será publicada em breve no bootcamp CrazyStack, se você ainda não garantiu sua vaga clique [aqui](https://crazystack.com.br)

A barra lateral é uma parte importante do painel de administração, pois fornece acesso rápido a várias seções e funcionalidades da aplicação. É uma maneira eficiente de navegar no sistema e ajuda a melhorar a experiência do usuário.

Durante a aula, os alunos irão aprender a utilizar o framework Next.js e a biblioteca React para criar a barra lateral. Eles irão aprender a dividir a página em dois componentes principais: a barra lateral e o conteúdo principal da página. A barra lateral será fixa na tela e exibirá uma lista de links para as diferentes seções do painel de administração. O conteúdo principal será atualizado dinamicamente ao clicar em cada link da barra lateral.

Os alunos irão aprender a utilizar o componente Link do Next.js para criar links para as diferentes seções do painel de administração, e a utilizar o componente useState do React para gerenciar o estado da barra lateral (aberta ou fechada). Eles também irão aprender a utilizar Chakra UI para estilizar a barra lateral e o conteúdo principal da página.

Ao final da aula, os alunos terão aprendido como criar uma barra lateral personalizada no painel de administração do sistema de agendamentos online. Eles terão adquirido habilidades em Next.js, React e Chakra UI, e terão aprendido a utilizar essas ferramentas para criar uma experiência de usuário mais agradável e eficiente.

O código a seguir é a implementação de um componente `ActiveLink` que utiliza as bibliotecas Next.js e React para renderizar links que ficam ativos (ou em destaque) quando a página atual corresponde ao link.

Vamos analisar cada parte do código em detalhes:

```tsx
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react"; 
```
As primeiras linhas do código importam os módulos necessários para a implementação do componente. Importamos o `Link` da biblioteca Next.js, que é utilizado para criar links entre as diferentes páginas da aplicação. Também importamos o `useRouter` da biblioteca Next.js, que é utilizado para obter informações sobre a rota atual da aplicação. Por fim, importamos o `cloneElement` e `ReactElement` da biblioteca React, que são utilizados para clonar elementos React.

```tsx
interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}
```
Aqui, definimos uma interface `ActiveLinkProps` que extende as propriedades da interface `LinkProps` do `Link` do Next.js. Além disso, adicionamos a propriedade `children` do tipo `ReactElement`, que é utilizada para renderizar o conteúdo do link, e a propriedade opcional `shouldMatchExactHref`, que indica se o link deve corresponder exatamente ao caminho atual da URL.

```tsx
export const ActiveLink = ({
  children,
  shouldMatchExactHref,
  ...rest
}: ActiveLinkProps) => { 
```
Aqui, definimos a função do componente `ActiveLink`, que recebe as propriedades definidas na interface `ActiveLinkProps`. O parâmetro `children` é utilizado para renderizar o conteúdo do link, e o parâmetro `shouldMatchExactHref` indica se o link deve corresponder exatamente ao caminho atual da URL. O parâmetro `rest` contém todas as outras propriedades que foram passadas para o componente.

```tsx
const { asPath = "/" } = useRouter();
```

Aqui, utilizamos o `useRouter` do Next.js para obter a rota atual da aplicação. Armazenamos o valor da rota atual na constante `asPath`.

```tsx
let isActive = false;
  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }
  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  } 
```
Nesta parte do código, verificamos se o link atual corresponde à rota atual da aplicação. Se o parâmetro `shouldMatchExactHref` estiver definido como verdadeiro, o link deve corresponder exatamente à rota atual da aplicação. Caso contrário, o link pode corresponder a um caminho que inicie com a rota atual da aplicação. Se o link corresponder à rota atual, a variável `isActive` é definida como verdadeira.

```tsx
return (
    <Link {...rest}>
      {cloneElement(children, { color: isActive ? "green.400" : "purple.50" })}
    </Link>
  );
```
Finalmente, renderizamos o link utilizando o `Link` do Next.js. 

## Código completo:
```tsx
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";
interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}
export const ActiveLink = ({
  children,
  shouldMatchExactHref,
  ...rest
}: ActiveLinkProps) => {
  const { asPath = "/" } = useRouter();
  let isActive = false;
  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }
  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }
  return (
    <Link {...rest}>
      {cloneElement(children, { color: isActive ? "green.400" : "purple.50" })}
    </Link>
  );
};
```
## Sidebar
```tsx
import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerBody,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSidebarDrawer } from "shared/libs";
type SidebarProps = {
  children?: React.ReactNode;
  title: string;
};
export const Sidebar = ({ title = "Navegação", children }: SidebarProps) => {
  const { isOpen, onClose } = useSidebarDrawer();
  const isDrawerSidebar = useBreakpointValue({ base: true, lg: false });
  if (isDrawerSidebar) {
    return (
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        data-testid="SidebarTestId"
        placement="left"
      >
        <DrawerOverlay>
          <DrawerContent bg="purple.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>{title}</DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }
  return (
    <Box as="aside" m="8" w="64" data-testid="SidebarTestId">
      {children}
    </Box>
  );
};
```
Este código é responsável por renderizar a barra lateral da página de administração de um sistema de agendamentos online. Ele usa componentes do Chakra UI para estilização e comportamento responsivo.

A função `Sidebar` recebe dois parâmetros: `title` e `children`. O parâmetro `title` é usado para definir o título da barra lateral. O parâmetro `children` é usado para renderizar o conteúdo dentro da barra lateral.

A função começa importando os componentes necessários do Chakra UI e a função `useSidebarDrawer` de um módulo compartilhado `libs`. O `useBreakpointValue` é usado para tornar o componente responsivo.

A seguir, a função usa a `useSidebarDrawer` para obter o estado de `isOpen` e a função `onClose`, que são usados para controlar o comportamento da barra lateral.

Depois disso, a função usa `useBreakpointValue` para verificar se a barra lateral deve ser exibida como uma gaveta ou como uma barra lateral fixa. Se a barra lateral for exibida como uma gaveta, ela será renderizada usando o componente `Drawer` do Chakra UI. O componente `DrawerOverlay` é usado para fornecer um fundo escuro quando a gaveta estiver aberta, e o componente `DrawerContent` é usado para renderizar o conteúdo da gaveta.

Dentro do `DrawerContent`, o componente `DrawerCloseButton` é usado para fornecer um botão de fechar a gaveta. O componente `DrawerHeader` é usado para exibir o título da barra lateral, e o componente `DrawerBody` é usado para renderizar o conteúdo da barra lateral.

Se a barra lateral não for exibida como uma gaveta, ela será renderizada como uma barra lateral fixa. Nesse caso, a função `Sidebar` renderiza uma `Box` do Chakra UI, que é usada para fornecer estilos e propriedades de layout para o conteúdo da barra lateral.

Por fim, a função `Sidebar` retorna a barra lateral, que é composta por um dos dois componentes renderizados, dependendo do tamanho da tela e do comportamento responsivo.
## NavSection
explique detalhadamente e de forma didática o código a seguir:
```tsx
import { Box, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
interface NavSectionProps {
  title: string;
  children: ReactNode;
}
export const NavSection = ({ title, children, ...rest }: NavSectionProps) => {
  return (
    <Box {...rest} data-testid="NavSectionTestId">
      <Text fontWeight={"bold"} color="purple.400" fontSize="small">
        {title}
      </Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
};
```
Este é um componente chamado `NavSection` que representa uma seção da barra de navegação da aplicação. Ele recebe duas props: `title` (uma string com o título da seção) e `children` (um elemento ou vários elementos filhos que serão renderizados dentro da seção).

O componente retorna um `Box` com a prop `data-testid` que é usada para testes automatizados. Dentro do `Box`, há um `Text` que exibe o título da seção com fonte em negrito, cor roxa e tamanho de fonte pequeno.

Em seguida, há um `Stack` com espaçamento de `4` entre os itens e um `mt` (margin-top) de `8`. Ele recebe os elementos filhos que serão renderizados dentro da seção.

Resumindo, esse componente é uma seção da barra de navegação que pode conter um título e um ou mais itens. Ele é responsável por renderizar o título em negrito na cor roxa e os elementos filhos com espaçamento.
## NavLink
```tsx
import { Icon, Link as NavLinkChakra, LinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink, Text } from "shared/ui/atoms";
interface NavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
  href: string;
}
export const NavLink = ({ icon, href, children, ...rest }: NavLinkProps) => {
  return (
    <ActiveLink href={href} passHref>
      <NavLinkChakra display="flex" align="center" {...rest} data-testid="NavLinkTestId">
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </NavLinkChakra>
    </ActiveLink>
  );
};
```
Este é um componente chamado `NavLink`, que representa um link para ser usado em uma barra de navegação. Ele é composto por um ícone, um texto e um link, e é usado para facilitar a navegação entre as diferentes seções do sistema de agendamentos online.

Aqui está uma explicação mais detalhada do código:

* Primeiro, importamos vários componentes do Chakra UI, incluindo `Icon` e `Link`, bem como `ActiveLink` e `Text` de outros componentes personalizados.
    
* Em seguida, definimos uma interface para as propriedades que este componente pode receber. Ele inclui `icon`, que representa o ícone que será exibido ao lado do link, `href`, que representa o link para o qual o usuário será redirecionado quando clicar no link, e `children`, que é o texto que será exibido ao lado do ícone.
    
* O componente `NavLink` em si é uma função que retorna um link com o ícone e o texto ao lado dele. Para fazer isso, ele usa `ActiveLink`, que é outro componente personalizado que fornece um link que é destacado quando a página atual corresponde ao link atual.
    
* O `NavLink` recebe as propriedades `icon`, `href` e `children` e as passa para `ActiveLink`. Dentro de `ActiveLink`, ele usa `NavLinkChakra`, que é um componente `Link` do Chakra UI com algumas personalizações. Ele exibe o ícone e o texto em uma linha usando o `display="flex"` e o `align="center"`.
    
* Para exibir o ícone, o componente `Icon` é usado com o ícone recebido como propriedade. O tamanho do ícone é definido com `fontSize="20"`.
    
* O texto é exibido ao lado do ícone usando o componente `Text`. O `ml="4"` define uma margem à esquerda do texto, para separá-lo do ícone.
    
* Por fim, o componente `NavLink` é exportado para que possa ser usado em outros lugares do código.
## SidebarContext
```tsx
import { createContext, useContext, ReactNode, useEffect } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";

type SidebarDrawerProviderProps = {
  children: ReactNode;
};
type SidebarDrawerContextData = UseDisclosureReturn;
const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();
  useEffect(() => {
    disclosure.onClose();
  }, [disclosure, router.asPath]);
  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}
export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
``` 
Esse trecho de código é responsável por criar um contexto e um provider para controle do estado do drawer da sidebar.

Primeiramente, são importadas as funções necessárias do Chakra UI (`useDisclosure`) e do Next.js (`useRouter`).

Depois, é definido o tipo das props recebidas pelo componente `SidebarDrawerProvider`, que no caso é apenas um `children` que é do tipo `ReactNode`.

Em seguida, é criado um contexto para armazenar as informações do drawer, utilizando a função `createContext` do React, que retorna um objeto com o valor padrão definido como um objeto vazio do tipo `SidebarDrawerContextData`, que por sua vez é uma interface que define as propriedades do hook `useDisclosure`.

O componente `SidebarDrawerProvider` é criado e recebe as props `children`. Dentro do componente, a função `useDisclosure` é utilizada para criar um objeto com as propriedades `isOpen`, `onOpen`, `onClose` e `onToggle` que serão utilizadas para controlar o estado do drawer. Além disso, o hook `useRouter` é utilizado para monitorar a mudança de rotas e fechar o drawer automaticamente ao trocar de página.

Por fim, é criado um `Provider` que recebe o valor do objeto criado pela função `useDisclosure` e o disponibiliza para todos os componentes filhos que utilizarem o hook `useSidebarDrawer`, que é exportado como um atalho para utilizar o contexto.

Nesta aula, aprendemos como implementar uma barra lateral de navegação no painel de administração de um sistema de agendamentos online. Utilizamos a biblioteca Chakra UI para construir os componentes da interface e o Next.js para gerenciar as rotas da aplicação.

Começamos criando a estrutura básica da barra lateral e em seguida implementamos os links de navegação. Utilizamos o componente ActiveLink para garantir que o link correspondente à página atual fosse destacado.

Em seguida, adicionamos a funcionalidade de abrir e fechar a barra lateral em dispositivos móveis usando o componente Drawer do Chakra UI. Também criamos um contexto para gerenciar o estado do Drawer em toda a aplicação.

Por fim, adicionamos uma seção de configurações de usuário na barra lateral e utilizamos o componente Link do Chakra UI para criar links de logout e para a página de perfil do usuário.

Ao final desta aula, você deve estar familiarizado com os conceitos e técnicas necessárias para construir uma barra lateral de navegação em um sistema web usando o Next.js e o Chakra UI.