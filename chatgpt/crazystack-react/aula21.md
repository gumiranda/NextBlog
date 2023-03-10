---
title: 'Lista genérica com Grid Layout usando Chakra UI no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Fala dev doido! Nesta aula, vamos aprender como criar uma lista genérica com layout de grid usando a biblioteca de componentes Chakra UI em React. A lista é um componente fundamental em muitas aplicações e pode ser usada para exibir uma variedade de conteúdos, como itens de uma loja, postagens em um blog ou mensagens em uma caixa de entrada. O layout de grid é uma técnica popular para organizar esses itens em uma grade visualmente agradável e responsiva. Com a ajuda da biblioteca Chakra UI, que fornece componentes pré-construídos com estilo personalizável, criaremos uma lista genérica com layout de grid que pode ser facilmente adaptada para diversos tipos de conteúdo. Vamos começar!

O vídeo dessa aula será publicada em breve no bootcamp CrazyStack, se você ainda não garantiu sua vaga clique [aqui](https://crazystack.com.br)

## Atomic Design
Além disso, para a criação da Lista genérica com Grid Layout, aplicaremos a metodologia Atomic Design, que é uma abordagem para criação de interfaces que divide os elementos em pequenos blocos, chamados de átomos, que são combinados para formar moléculas, organismos e templates. Essa metodologia ajuda a criar componentes mais reutilizáveis e escaláveis, facilitando a manutenção e evolução do sistema. A utilização do Chakra UI, uma biblioteca de componentes para React que utiliza a metodologia Atomic Design, será fundamental para a implementação da nossa lista genérica com grid layout.

## Card (Átomo)
```tsx
import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";

interface CardProps {
  item?: any;
  fields?: any;
  mainField?: any;
  children?: React.ReactNode;
  onClick?: Function;
}
export const Card = ({ item, fields, mainField, children, onClick }: CardProps) => {
  return (
    <>
      {!!item && (
        <Flex
          wordBreak={"break-word"}
          p="2"
          as="button"
          w="full"
          alignItems="center"
          justifyContent={"center"}
          onClick={onClick as any}
        >
          <Box
            bg="white"
            maxW="sm"
            borderWidth={"1px"}
            rounded="lg"
            shadow="lg"
            position="relative"
          >
            <Box p="6">
              <Flex mt="1" alignContent={"center"} flexDir="column">
                <Box
                  fontSize="2xl"
                  fontWeight={"semibold"}
                  as="h4"
                  maxWidth={"234px"}
                  color="purple.700"
                  overflow="hidden"
                  whiteSpace={"nowrap"}
                  textOverflow={"ellipsis"}
                  lineHeight="tight"
                  isTruncated
                >
                  {item?.[mainField]}
                </Box>
                {!!item &&
                  fields?.map?.(({ id, label }: any, index: number) => (
                    <React.Fragment key={`${Math.random() * 10}-${index}`}>
                      {!!item?.[id] && (
                        <Text color="purple.700">{`${label ?? ""} ${item?.[id]}`}</Text>
                      )}
                    </React.Fragment>
                  ))}
              </Flex>
              {children}
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
};
```
Este é o código de um componente chamado "Card" que utiliza a biblioteca Chakra UI. Ele é um componente atômico, que faz parte da metodologia de design atomic design, e pode ser usado como um bloco de construção para construir interfaces de usuário mais complexas.

O componente Card é usado para exibir informações de um item de dados de forma visualmente agradável. Ele recebe algumas propriedades, como item (o objeto de dados que deve ser exibido), fields (um array de objetos com informações dos campos que devem ser exibidos), mainField (o campo principal que deve ser destacado) e children (para adicionar outros componentes dentro do Card). Também há uma propriedade opcional onClick para executar uma ação quando o usuário clicar no Card.

O componente consiste em uma estrutura de Flex e Box para criar um layout responsivo e permitir a centralização dos elementos. O Box principal é onde as informações do item são exibidas e tem um estilo de sombra e borda arredondada para criar um visual agradável.

Dentro do Box, há um título principal que exibe o valor do campo mainField do item passado como propriedade. Abaixo do título principal, um loop é feito em cada objeto do array fields e exibe o rótulo (label) e o valor do campo correspondente do item. O rótulo é opcional e pode ser omitido se não for passado como propriedade.

Por fim, o Card renderiza qualquer componente filho passado como propriedade children abaixo das informações do item. Se nenhum item for passado como propriedade, o Card não é exibido.
## List (Átomo)

```tsx
import { List as ListChakra, ListProps } from "@chakra-ui/react";
export const List = ({ children, ...rest }: ListProps) => {
  return (
    <ListChakra {...rest} data-testid="ListTestId">
      {children}
    </ListChakra>
  );
};
```
Esse é um exemplo de um átomo chamado List, que é uma extensão do componente de lista do Chakra UI. Esse componente recebe todas as propriedades (props) padrão do Chakra UI para o componente de lista e renderiza o conteúdo filho.

O componente de lista é muito útil em aplicações React para exibir uma lista de itens em uma estrutura organizada e padronizada. No código apresentado, o átomo List simplesmente passa todas as propriedades recebidas por meio do spread operator (`...rest`) para o componente List do Chakra UI, e em seguida, renderiza o conteúdo filho dentro dessa lista.

A utilização do `data-testid` na tag `<ListChakra>` possibilita a realização de testes automatizados no componente, permitindo que seu comportamento seja testado mesmo se a estrutura do componente for alterada.
## ListItem (Átomo)
```tsx
import { ListItem as ListItemChakra, ListItemProps } from "@chakra-ui/react";
export const ListItem = ({ children, ...rest }: ListItemProps) => {
  return (
    <ListItemChakra {...rest} data-testid="ListItemTestId">
      {children}
    </ListItemChakra>
  );
};
```
Esse código implementa o componente ListItem, que é um átomo utilizado em conjunto com o componente List para renderizar itens de uma lista.

O componente ListItem é uma pequena abstração em cima do componente ListItem do Chakra UI, responsável por definir o estilo e comportamento padrão dos itens da lista.

Na primeira linha do código, é feito o import do componente ListItemChakra do Chakra UI, que será utilizado como base para a construção do componente ListItem.

Em seguida, é definida a interface ListItemProps, que define as propriedades que podem ser passadas para o componente ListItem. Essa interface simplesmente estende as propriedades do componente ListItemChakra do Chakra UI.

Finalmente, é definido o componente ListItem, que recebe como parâmetro as propriedades definidas na interface ListItemProps, e retorna o componente ListItemChakra do Chakra UI com as propriedades passadas e o children (conteúdo do item da lista) renderizado dentro dele.

Esse código é bastante simples e serve como uma pequena abstração para o componente ListItem do Chakra UI, tornando a sua utilização mais simples e intuitiva.
## GenericListGrid (Molécula)
```tsx
import React from "react";
import { List, ListItem, Flex } from "shared/ui";

interface GenericListProps {
  items: any[];
  renderItem: React.FC;
  children?: React.ReactNode;
}

export const GenericListGrid = ({ items, renderItem, children }: GenericListProps) => {
  return (
    <>
      <Flex minW={["100%", "100%", "100%", "auto"]} justifyContent="center">
        <Flex justifyContent={"center"}>
          {!!items && items.length > 0 && (
            <List
              display="grid"
              gridAutoColumns={"1fr"}
              gridAutoRows="1fr"
              gridTemplateColumns={[
                "1fr",
                "1fr",
                "1fr 1fr",
                "1fr 1fr 1fr",
                "1fr 1fr 1fr 1fr",
              ]}
              gridTemplateRows={["1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]}
              gap="8"
            >
              {items?.map?.((item, index) => (
                <ListItem key={`${Math.random() * 10}-${index}`}>
                  {renderItem(item)}
                </ListItem>
              ))}
            </List>
          )}
          {children}
        </Flex>
      </Flex>
    </>
  );
};
```
O código apresentado define um componente de molécula chamado `GenericListGrid`, que é uma lista genérica com layout de grid. Ele recebe três props: `items`, que é um array contendo os itens a serem renderizados na lista; `renderItem`, uma função que recebe um item da lista e retorna o componente a ser renderizado para aquele item; e `children`, que é uma prop opcional para renderizar componentes adicionais dentro da lista.

O componente `GenericListGrid` é composto por um elemento `Flex` que centraliza todo o conteúdo da lista, e dentro dele há outro elemento `Flex` que é responsável por posicionar a lista e os possíveis componentes adicionais. A lista em si é renderizada como um componente `List` do Chakra UI, que utiliza um layout de grid para posicionar os itens. O número de colunas e linhas do grid é definido de forma responsiva, de acordo com o tamanho da tela, através das propriedades `gridTemplateColumns` e `gridTemplateRows`.

Cada item da lista é renderizado como um componente `ListItem`, que recebe como filho o componente retornado pela função `renderItem`, que é chamada para cada item do array `items`. O `key` de cada `ListItem` é gerado randomicamente através da expressão `Math.random() * 10}-${index}`, garantindo que cada item da lista tenha um `key` único.
## GridContent (Organismo)
```tsx
import { Skeleton, Stack, Flex, Text } from "@chakra-ui/react";
import { GenericListGrid } from "shared/ui/molecules";

type Field = {
  id: string;
  label: string;
  displayKeyText: boolean;
  children?: React.ReactNode;
};
interface GridContentProps {
  isLoading: boolean;
  children?: any;
  items: any[];
  fields: Field[];
  renderItem: React.FC;
  error: any;
  route: string;
  entityDisplayName: string;
}

export const GridContent = ({
  children,
  isLoading = false,
  items = [],
  fields = [],
  renderItem,
  error = null,
  route = "/",
  entityDisplayName,
  ...rest
}: GridContentProps) => {
  return (
    <>
      {isLoading || !items ? (
        <Stack>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : error ? (
        <Flex justify="center">
          <Text>Falha ao obter {entityDisplayName}s</Text>
        </Flex>
      ) : (
        <GenericListGrid items={items} renderItem={renderItem} {...rest}>
          {children}
        </GenericListGrid>
      )}
    </>
  );
};
```
O código `GridContent` define um componente do tipo organismo que é responsável por renderizar uma lista de itens em formato de grid. O componente recebe uma série de props, que incluem:

* `isLoading`: um booleano que indica se o conteúdo está carregando.
* `items`: um array de itens que serão exibidos na lista.
* `fields`: um array de objetos que descrevem cada campo que será exibido em cada item da lista. Cada objeto tem as seguintes propriedades:
    * `id`: o identificador do campo.
    * `label`: o rótulo do campo.
    * `displayKeyText`: um booleano que indica se o campo deve exibir o texto-chave (geralmente o ID) do item.
    * `children`: opcionalmente, um componente React que renderiza o conteúdo do campo.
* `renderItem`: um componente React que é usado para renderizar cada item na lista.
* `error`: um objeto que indica se houve um erro ao carregar o conteúdo.
* `route`: a rota que deve ser usada para navegar até o detalhe do item selecionado.
* `entityDisplayName`: o nome exibido do item, no plural.

O componente renderiza o conteúdo de três formas diferentes, dependendo do valor das props:

1.  Se `isLoading` for verdadeiro ou `items` estiver vazio, o componente exibe uma série de elementos `Skeleton` para indicar que o conteúdo está sendo carregado.
2.  Se `error` for verdadeiro, o componente exibe uma mensagem de erro indicando que houve uma falha ao carregar os itens.
3.  Caso contrário, o componente renderiza a lista de itens usando o componente `GenericListGrid`,
## GridHead (Organismo)
```tsx
import { Heading, HStack, FlexProps, Spinner, Icon } from "@chakra-ui/react";
import { Flex, Button } from "shared/ui";
import NextLink from "next/link";
import { RiAddLine, RiTable2 } from "react-icons/ri";
interface GridHeadProps extends FlexProps {
  isLoading?: boolean;
  isFetching?: boolean;
  routeCreate?: string;
  routeList?: string;
  title: string;
  deleteSelectedAction?: Function;
  children?: React.ReactNode;
}

export const GridHead = ({
  children,
  isLoading = false,
  isFetching = false,
  routeCreate = "/",
  routeList = "/",
  title,
  deleteSelectedAction,
  ...rest
}: GridHeadProps) => {
  return (
    <Flex p={["0", "8"]} justify="space-between" align="center" {...rest}>
      <Heading size="lg" fontWeight="normal">
        {title}
        {!isLoading && isFetching && <Spinner size="sm" color="purple.500" ml="4" />}
      </Heading>
      <HStack spacing="2">
        <NextLink passHref href={routeCreate}>
          <Button
            size="sm"
            fontSize="sm"
            colorScheme={"green"}
            leftIcon={<Icon fontSize="20" as={RiAddLine} />}
          >
            Cadastrar
          </Button>
        </NextLink>
        <NextLink passHref href={routeList}>
          <Button
            size="sm"
            fontSize="sm"
            colorScheme={"purple"}
            leftIcon={<Icon fontSize="20" as={RiTable2} />}
          >
            Tabela
          </Button>
        </NextLink>
      </HStack>
      {children}
    </Flex>
  );
};
```
O código define um componente chamado `GridHead`, que é uma barra de cabeçalho para uma lista de itens. Ele recebe várias propriedades para personalizar seu comportamento e aparência, incluindo:

* `isLoading`: um booleano que indica se os dados da lista estão sendo carregados.
* `isFetching`: um booleano que indica se os dados estão sendo atualizados (por exemplo, em resposta a uma ação do usuário).
* `routeCreate` e `routeList`: URLs para os botões "Cadastrar" e "Tabela" na barra de cabeçalho, respectivamente.
* `title`: o título da barra de cabeçalho.
* `deleteSelectedAction`: uma função a ser chamada quando o botão "Excluir selecionados" é clicado (esse botão não está presente no código fornecido).
* `children`: conteúdo adicional a ser exibido à direita dos botões.

A barra de cabeçalho é composta por um `Flex` que contém um `Heading` com o título e um `HStack` com os botões "Cadastrar" e "Tabela". O botão "Cadastrar" é um link para a página especificada em `routeCreate`, e o botão "Tabela" é um link para a página especificada em `routeList`. O botão "Cadastrar" tem um ícone "RiAddLine" à esquerda e o botão "Tabela" tem um ícone "RiTable2" à esquerda.

Se `isLoading` for verdadeiro, a barra de cabeçalho exibirá um `Spinner` indicando que os dados estão sendo carregados. Se `isFetching` for verdadeiro (e `isLoading` for falso), um `Spinner` menor será exibido à direita do título para indicar que os dados estão sendo atualizados.

Por fim, o conteúdo adicional especificado em `children` é exibido à direita dos botões.
## GenericGrid (Template)
```tsx
import { GridContent, GridHead, Flex } from "shared/ui";
type Field = {
  id: string;
  label: string;
  displayKeyText: boolean;
  children?: React.ReactNode;
};

interface GenericGridProps {
  isLoading: boolean;
  children?: any;
  items: any[];
  fields: Field[];
  renderItem: React.FC;
  error: any;
  route: string;
  routeList: string;
  routeCreate: string;
  entityDisplayName: string;
  title: string;
}
export const GenericGrid = ({
  children,
  isLoading = false,
  items = [],
  fields = [],
  renderItem,
  error = null,
  route = "/",
  routeList = "/",
  routeCreate = "/",
  entityDisplayName,
  title,
  ...rest
}: GenericGridProps) => {
  return (
    <Flex margin={4} flexDir="column" flexGrow="1">
      <GridHead routeCreate={routeCreate} title={title} routeList={routeList} />
      <GridContent
        entityDisplayName={entityDisplayName}
        items={items}
        route={route}
        fields={fields}
        isLoading={isLoading}
        renderItem={renderItem}
        error={error}
        {...rest}
      >
        {children}
      </GridContent>
    </Flex>
  );
};
```
O código apresenta o componente `GenericGrid` que é uma espécie de template para a criação de grids (tabelas) de forma genérica. O componente é composto por um `GridHead` e um `GridContent`, que são subcomponentes, e recebe algumas propriedades que definem as características da tabela.

As propriedades do componente são:

* `isLoading`: indica se a tabela está carregando;
* `children`: elementos filhos que serão renderizados dentro do componente;
* `items`: dados que serão exibidos na tabela;
* `fields`: definições dos campos que serão exibidos;
* `renderItem`: função que recebe um item e retorna o conteúdo que será exibido em cada célula da tabela;
* `error`: indica se ocorreu algum erro ao buscar os dados;
* `route`: rota que será usada na navegação;
* `routeList`: rota que leva para a página que exibe a lista de itens da tabela;
* `routeCreate`: rota que leva para a página de criação de um novo item da tabela;
* `entityDisplayName`: nome do item que será exibido na tabela;
* `title`: título da tabela.

O componente `GenericGrid` é composto por um componente `Flex` que define a estrutura geral da tabela. Dentro desse componente, temos o `GridHead` e o `GridContent`.

O `GridHead` é responsável por exibir o cabeçalho da tabela, com o título, botões de ação (cadastrar, exibir em tabela) e outros elementos que possam ser adicionados posteriormente. É passada para ele as propriedades `routeCreate`, `title` e `routeList`.

O `GridContent` é responsável por exibir o conteúdo da tabela, que é a lista de itens. É passada para ele as propriedades `entityDisplayName`, `items`, `route`, `fields`, `isLoading`, `renderItem` e `error`. Além disso, o elemento `children` é renderizado dentro do `GridContent`.
## InfiniteList (Template)
O código a seguir é um template de um componente chamado `InfiniteList`, que tem a finalidade de exibir uma lista de itens de forma infinita, ou seja, permitir a exibição de mais elementos à medida que o usuário rola a página.
```tsx
import React, { useEffect, useState, useRef } from "react";
import { Flex, Box } from "shared/ui";

interface InfiniteListProps {
  children: React.ReactNode;
  hasNextPage: boolean;
  fetchNextPage: Function;
  entityName: string;
}

export const InfiniteList = ({
  children,
  hasNextPage,
  fetchNextPage,
  entityName,
}: InfiniteListProps) => {
  const [element, setElement] = useState<any>(null);
  const observer = useRef<IntersectionObserver>();
  const prevY = useRef(0);
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const { y } = firstEntry.boundingClientRect;
        if (prevY.current > y) {
          fetchNextPage();
        }
        prevY.current = y;
      },
      { threshold: 0.5 }
    );
  }, []);
  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver?.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver?.unobserve(currentElement);
      }
    };
  }, [element]);
  return (
    <Flex flexGrow="1" flexDir="column">
      <Box borderRadius={8} bg="purple.800" p="8" minH="89vh">
        {children}
      </Box>
      <Box justifySelf={"flex-end"} bg="purple.800" p="8">
        {hasNextPage ? (
          <h1 ref={setElement}>Carregando {entityName}...</h1>
        ) : (
          <h1 ref={setElement}>Não há mais {entityName}...</h1>
        )}
      </Box>
    </Flex>
  );
};
```
O código apresentado implementa um componente chamado InfiniteList que é responsável por lidar com o scroll infinito de uma lista de itens. O scroll infinito, também conhecido como "lazy loading" ou "infinite scrolling", é uma técnica utilizada em interfaces de usuário que consiste em carregar os itens de uma lista sob demanda, à medida que o usuário vai rolando a página.

O componente `InfiniteList` recebe como props:

* `children`: os itens da lista a serem renderizados.
* `hasNextPage`: um valor booleano indicando se há mais páginas a serem carregadas.
* `fetchNextPage`: uma função que é chamada quando o usuário chega ao final da lista e precisa carregar a próxima página.
* `entityName`: uma string que representa o nome da entidade que está sendo listada.

O componente é composto por um container `Flex` com `flexDir="column"`, que contém dois filhos:

* Um `Box` com `borderRadius={8}` e `bg="purple.800"`, que envolve os itens da lista e ocupa a maior parte da tela.
* Um `Box` com `justifySelf={"flex-end"}` e `bg="purple.800"`, que fica na parte inferior da tela e contém uma mensagem de carregamento.

O componente utiliza um hook `useRef` para criar uma referência à mensagem de carregamento, que será utilizada pelo `IntersectionObserver`. Esse hook também é utilizado para armazenar o valor da posição vertical anterior do elemento em relação à borda inferior da janela, para que seja possível determinar se o usuário está rolando a página para baixo ou para cima.

O componente utiliza dois hooks `useEffect` para criar e atualizar o `IntersectionObserver`:

* O primeiro `useEffect` é executado uma única vez, quando o componente é montado, e cria o `IntersectionObserver`. Esse `IntersectionObserver` observa o elemento de referência e chama a função `fetchNextPage` quando o elemento está 50% visível na janela.
* O segundo `useEffect` é executado toda vez que o elemento de referência é atualizado, e atualiza o `IntersectionObserver` para observar o novo elemento.

Por fim, a mensagem de carregamento é exibida na tela quando há mais páginas a serem carregadas e a mensagem "Não há mais \[entityName\]..." é exibida quando não há mais páginas a serem carregadas.

Em resumo, o `InfiniteList` é um componente que utiliza o `IntersectionObserver` para detectar quando o usuário está chegando ao final da lista e chama a função `fetchNextPage` para carregar mais itens. Esse componente permite que grandes quantidades de dados sejam carregadas sob demanda, melhorando a experiência do usuário e reduzindo a sobrecarga do servidor.
## useCategoryUI
```tsx
import { Icon } from "@chakra-ui/react";
import React from "react";
import { useUi } from "shared/libs";
import { Button, Card, Text } from "shared/ui";
import NextLink from "next/link";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";

export const useCategoryUi = ({ deleteSelectedAction }: any) => {
  const { showModal, onClose } = useUi();
  const openModalItem = ({ item = null, fields = [] }: any) => {
    const modalProps = {
      newModalBody: (
        <>
          {fields.map((field: any, ix: number) => (
            <React.Fragment key={`${ix}-${field?.id}`}>
              <Text fontSize="xl" color="purple.800">
                {field?.label}
              </Text>
              <Text color="purple.700">{item[field?.id]}</Text>
            </React.Fragment>
          ))}
        </>
      ),
      newModalFooter: (
        <>
          <Button
            colorScheme="red"
            mr={3}
            leftIcon={<Icon fontSize="20" as={RiDeleteBin6Line} />}
            onClick={() => {
              onClose();
              deleteSelectedAction(item);
            }}
          >
            Excluir
          </Button>
          <NextLink passHref href={`/categorys/edit/${item?._id}`}>
            <Button
              colorScheme="purple"
              leftIcon={<Icon fontSize="20" as={RiEditLine} />}
              onClick={onClose}
            >
              Editar
            </Button>
          </NextLink>
        </>
      ),
      content: item?.name,
    };
    showModal(modalProps);
  };
  const renderItem = (item: any) => (
    <Card
      {...item}
      onClick={() => {
        openModalItem(item);
      }}
    />
  );
  return { renderItem };
};
```
Esse código exporta um hook customizado chamado `useCategoryUi`, que recebe um objeto contendo a ação de deleção de um item da lista de categorias.

Dentro desse hook, há uma chamada ao hook `useUi` do pacote `shared/libs`, que retorna as funções `showModal` e `onClose` para manipulação de um modal na interface.

O hook `useCategoryUi` retorna um objeto contendo a função `renderItem`, que é responsável por renderizar cada item da lista de categorias como um componente `Card` do pacote `shared/ui`. Cada `Card` recebe as propriedades do objeto `item` e também uma função de callback que chama a função `openModalItem` ao ser clicado.

A função `openModalItem` recebe um objeto contendo um item da lista de categorias e seus respectivos campos, e usa as funções `showModal` e `onClose` para exibir um modal com as informações do item selecionado. Esse modal contém o nome da categoria como título, uma seção com o rótulo e valor de cada campo do objeto e dois botões, um para deletar e outro para editar o item.

No botão de exclusão é chamada a função `deleteSelectedAction` passando o item selecionado como parâmetro, enquanto que no botão de edição é feita uma navegação para a página de edição da categoria correspondente.
## CategoryListGridPage (Page)
```tsx
import { InfiniteList, GenericGrid, Head } from "shared/ui";
import { useCategoryInfiniteList } from "../categoryInfiniteList.hook";
import { useCategoryUi } from "entidades/category/category.ui";

export const CategoryGridPage = () => {
  const {
    isFetching,
    error,
    data: fetchData,
    fetchNextPage,
    hasNextPage,
    deleteSelectedAction,
    loading,
  } = useCategoryInfiniteList();
  const categoryGridProps = {
    categorys:
      fetchData?.pages
        ?.map?.((page: any) => page?.categorys)
        ?.reduce?.((a: any, b: any) => a.concat(b)) ??
      fetchData ??
      [],
    isLoading: loading,
    error,
    isFetching,
    deleteSelectedAction,
    fields: [
      { id: "name", label: "Nome", displayKeyText: true },
      { id: "createdAt", label: "Data de criação", displayKeyText: true },
    ],
  };
  const items =
    categoryGridProps?.categorys?.map?.((item: any) => ({
      item,
      fields: categoryGridProps.fields,
      mainField: "name",
    })) ?? [];
  const { renderItem } = useCategoryUi({ deleteSelectedAction });
  return (
    <>
      <Head
        title={"Belezix Admin | Categorias"}
        description="Página de listagem de categorias do painel de Admin Belezix"
      />
      <InfiniteList
        hasNextPage={hasNextPage as any}
        fetchNextPage={fetchNextPage}
        entityName="categorias"
      >
        <GenericGrid
          items={items}
          renderItem={renderItem}
          route={"/categorys/list"}
          routeList={"/categorys/1"}
          routeCreate={"/categorys/create"}
          entityDisplayName={"Categoria"}
          title={"Categorias"}
          {...categoryGridProps}
        />
      </InfiniteList>
    </>
  );
};
```
Esse código é referente a uma página de listagem de categorias, que utiliza o componente `InfiniteList` para renderizar uma lista paginada de categorias. A página utiliza os hooks `useCategoryInfiniteList` e `useCategoryUi` para buscar e formatar as informações das categorias, respectivamente.

A página começa importando alguns componentes do diretório "shared/ui", como o `InfiniteList`, que é um componente de lista paginada, e o `GenericGrid`, que é um componente genérico de grid para renderização de listas. Além disso, ele importa o hook `useCategoryInfiniteList` que é responsável por buscar as informações das categorias e o hook `useCategoryUi` que é responsável por formatar as informações para renderização na lista.

Em seguida, ele define uma constante `categoryGridProps` que contém as propriedades a serem passadas para o componente `GenericGrid`. Essas propriedades incluem as informações das categorias, informações de erro, carregamento e paginação, bem como as informações dos campos a serem exibidos na lista.

Depois disso, ele transforma as informações das categorias em um array de objetos que contêm as informações dos campos e do item, que é utilizado na renderização da lista no `GenericGrid`. Para isso, ele utiliza a função `map` para mapear as categorias para o formato desejado.

Em seguida, ele utiliza o hook `useCategoryUi` para obter a função `renderItem`, que é responsável por renderizar cada item da lista. Essa função é passada como propriedade para o componente `GenericGrid`.

Por fim, ele utiliza o componente `InfiniteList` para renderizar a lista paginada de categorias, passando as propriedades necessárias para a paginação e o componente `GenericGrid` para renderizar a lista propriamente dita. Ele também utiliza o componente `Head` para definir o título e descrição da página.
## CategoryInfiniteList Hook
```tsx
import { useMutation } from "@tanstack/react-query";
import { useUi } from "shared/libs";
import { api } from "shared/api";
import { queryClientInstance } from "shared/api";
import { useRouter } from "next/router";
import { useGetInfiniteCategorys } from "entidades/category/category.lib";

export const useCategoryInfiniteList = () => {
  const router = useRouter();
  const { showModal, loading } = useUi();
  const all = useGetInfiniteCategorys({
    getNextPageParam: (lastPage: any, pages) => lastPage.next,
    getPreviousPageParam: (firstPage: any, pages) => firstPage.prev,
  });
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = all || {};
  const firstPage: any = data?.pages[0];
  const total: any = (firstPage?.total as any) || {};
  const deleteSelectedAction = async (item: any) => {
    deleteCategory.mutateAsync([item]);
  };
  const deleteCategory = useMutation(
    async (categorysToDelete: any = []) => {
      try {
        if (categorysToDelete?.length > 0) {
          return Promise.all(
            categorysToDelete?.map?.((category: any) =>
              api.delete(`/category/delete?_id=${category._id}`)
            )
          );
        }
        return null;
      } catch (error) {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      }
    },
    {
      onSuccess: () => {
        queryClientInstance.invalidateQueries(["categorysInfinite", data?.pages ?? 1]);
        queryClientInstance.refetchQueries(["categorysInfinite", data?.pages]);
        router.reload();
      },
      onError: () => {
        showModal({
          content: "Ocorreu um erro inesperado no servidor, tente novamente mais tarde",
          title: "Erro no servidor",
          type: "error",
        });
      },
      retry: 3,
    }
  );
  return {
    deleteSelectedAction,
    isFetching,
    error,
    total,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    loading,
  };
};
```
Esse é um hook chamado `useCategoryInfiniteList` que retorna um objeto contendo informações e funcionalidades necessárias para exibir uma lista de categorias de forma infinita em uma página.

* `useRouter` é usado para obter o objeto de roteamento do Next.js.
* `useUi` é usado para gerenciar a exibição de modais de feedback para o usuário.
* `useGetInfiniteCategorys` é usado para obter os dados da lista de categorias de forma infinita, com suporte a paginação.
* `useMutation` é usado para realizar a ação de exclusão de uma ou mais categorias, utilizando a API.

O hook retorna um objeto que contém as seguintes propriedades:

* `deleteSelectedAction`: função que recebe um item (categoria) como parâmetro e chama a mutação `deleteCategory` para excluí-lo.
* `isFetching`: indica se os dados estão sendo buscados no servidor.
* `error`: indica se ocorreu um erro na busca dos dados.
* `total`: indica o total de categorias.
* `data`: contém as informações das categorias buscadas na API, incluindo as páginas já carregadas, se houver.
* `fetchNextPage`: função que busca a próxima página de categorias.
* `hasNextPage`: indica se existe uma próxima página a ser buscada.
* `isFetchingNextPage`: indica se a próxima página está sendo buscada.
* `status`: indica o status da busca das categorias.
* `loading`: indica se alguma operação está em andamento, como exclusão de categoria.

A mutação `deleteCategory` é usada para excluir uma ou mais categorias, recebendo um array de categorias como parâmetro. A mutação retorna uma Promise que exclui as categorias da API. Se a exclusão for bem sucedida, o hook invalida e refetcha a query de busca das categorias para atualizar a lista na tela. Se ocorrer algum erro na mutação, um modal de erro é exibido para o usuário.

## Resumo
Durante a aula, vimos a implementação de uma lista infinita em uma aplicação React utilizando a biblioteca React Query. Essa funcionalidade é importante pois permite que uma grande quantidade de dados seja exibida na tela sem sobrecarregar a aplicação, já que apenas uma pequena parte dos dados é carregada inicialmente e o restante é carregado sob demanda.

Além disso, vimos como o Atomic Design pode ser utilizado para estruturar componentes em uma aplicação React de forma organizada e escalável. Utilizando essa abordagem, é possível criar componentes atômicos que podem ser combinados em moléculas, organismos e templates para criar interfaces de usuário complexas e reutilizáveis.

Os códigos apresentados ilustram esses conceitos na prática. O hook `useCategoryInfiniteList` utiliza o React Query para implementar uma lista infinita de categorias e controlar a lógica de paginação e carregamento dos dados. Esse hook é utilizado na página `CategoryGridPage`, que por sua vez utiliza componentes de UI atômicos como `GenericGrid` e `InfiniteList` para construir a interface de usuário.

Ao utilizar o Atomic Design, os componentes de UI podem ser facilmente combinados e personalizados para criar interfaces de usuário consistentes e escaláveis. Isso é exemplificado pelo uso do componente `useCategoryUi` na página `CategoryGridPage`, que encapsula a lógica de renderização de cada item da lista de categorias e pode ser facilmente personalizado para atender a diferentes requisitos de design.

Em resumo, a aula destacou a importância de utilizar técnicas de otimização de performance, como a lista infinita, e de estruturar componentes de UI de forma organizada e reutilizável, como no Atomic Design, para criar interfaces de usuário eficientes e escaláveis em aplicações React.

## Lista infinita everywhere!
As aplicações para o uso de lista infinita e do atomic design são inúmeras, e podem ser adaptadas para diversas áreas e finalidades. Aqui estão algumas possíveis aplicações:

1.  E-commerce: uma lista infinita pode ser usada para exibir uma grande quantidade de produtos em uma página sem precisar recarregar a página, melhorando a experiência do usuário e aumentando as chances de venda. O atomic design pode ser aplicado para criar componentes reutilizáveis, como botões, ícones e campos de entrada.
    
2.  Redes sociais: uma lista infinita pode ser usada para exibir o feed de notícias de um usuário, permitindo que ele role para baixo e veja mais postagens sem precisar clicar em um botão "carregar mais". O atomic design pode ser aplicado para criar componentes de interface do usuário, como caixas de comentários, botões de curtir e compartilhar e perfis de usuário.
    
3.  Aplicativos de gerenciamento de tarefas: uma lista infinita pode ser usada para exibir uma grande quantidade de tarefas em uma página, permitindo que o usuário role para baixo para ver mais tarefas sem precisar clicar em um botão "carregar mais". O atomic design pode ser aplicado para criar componentes de interface do usuário, como botões de conclusão de tarefas, campos de entrada de tarefas e listas de tarefas.
    
4.  Ferramentas de análise de dados: uma lista infinita pode ser usada para exibir uma grande quantidade de dados em uma página, permitindo que o usuário role para baixo para ver mais dados sem precisar clicar em um botão "carregar mais". O atomic design pode ser aplicado para criar componentes de interface do usuário, como gráficos, tabelas e filtros de dados.
    

Essas são apenas algumas das possíveis aplicações para o uso de lista infinita e atomic design. As possibilidades são muitas e podem ser adaptadas para atender às necessidades de qualquer projeto.