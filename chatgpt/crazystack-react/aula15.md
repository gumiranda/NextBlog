---
title: 'Criando tabela dinâmica e genérica no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---

Na aula "Criando tabela dinâmica e genérica com Chakra UI", vamos aprender como criar uma tabela dinâmica e genérica utilizando a biblioteca Chakra UI, que é uma das mais populares para desenvolvimento de interfaces de usuário em React.

O vídeo dessa aula será publicada em breve no bootcamp CrazyStack, se você ainda não garantiu sua vaga clique [aqui](https://crazystack.com.br)

Uma tabela é uma estrutura muito comum em aplicações web para exibir dados de forma organizada e facilmente acessível aos usuários. No entanto, criar tabelas pode ser uma tarefa tediosa e repetitiva, especialmente se tivermos que criar uma tabela diferente para cada conjunto de dados que desejamos exibir.

Nessa aula, iremos criar uma tabela dinâmica que poderá ser reutilizada em diferentes partes da aplicação, tornando o processo de exibição de dados muito mais fácil e eficiente.

Para isso, utilizaremos o poderoso sistema de grade do Chakra UI para criar uma tabela com colunas flexíveis e responsivas, capaz de se adaptar a diferentes tamanhos de tela. Além disso, usaremos props dinâmicas para renderizar diferentes tipos de dados e tornar nossa tabela ainda mais genérica.

Ao final da aula, você terá aprendido como criar uma tabela dinâmica e genérica utilizando o Chakra UI, tornando o processo de exibição de dados em suas aplicações muito mais fácil e eficiente.
## Table
```tsx
import {
  Table as TableChakra,
  TableProps,
  Thead,
  Tbody,
  TableHeadProps,
  TableBodyProps,
} from "@chakra-ui/react";
interface TableAtomProps extends TableProps {
  head: React.ReactNode;
  children: React.ReactNode;
  headProps?: TableHeadProps;
  bodyProps?: TableBodyProps;
}
export const Table = ({
  children,
  headProps,
  bodyProps,
  head,
  ...rest
}: TableAtomProps) => {
  return (
    <TableChakra {...rest} data-testid="TableTestId">
      <Thead {...headProps}>{head}</Thead>
      <Tbody {...bodyProps}>{children}</Tbody>
    </TableChakra>
  );
};
```
Este código define um componente Table que utiliza os componentes TableChakra, Thead, e Tbody do Chakra UI para criar uma tabela genérica e dinâmica. A interface TableAtomProps estende TableProps do Chakra UI e adiciona algumas propriedades personalizadas.

A propriedade head recebe um nó React que representa o cabeçalho da tabela. A propriedade children é responsável por receber os dados que serão exibidos na tabela. As propriedades headProps e bodyProps são opcionais e recebem as propriedades específicas do cabeçalho e do corpo da tabela, respectivamente.

O corpo da tabela é renderizado através da propriedade children passada para o componente Table. O cabeçalho da tabela é renderizado através da propriedade head, que é passada para o componente Thead.

O Table é um componente genérico e pode ser utilizado em diferentes contextos, com diferentes dados e cabeçalhos. O objetivo é facilitar a criação de tabelas no projeto e permitir uma maior flexibilidade na exibição dos dados.
## TableHead
```tsx
import { ReactNode } from "react";
import {
  Heading,
  HStack,
  Tooltip,
  FlexProps,
  Spinner,
  Icon,
  Flex,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine, RiFileListLine, RiDeleteBin6Line } from "react-icons/ri";

interface TableHeadProps extends FlexProps {
  children?: ReactNode;
  isLoading?: boolean;
  isFetching?: boolean;
  routeCreate: string;
  routeList: string;
  title: string;
  deleteSelectedAction?: () => void;
}
export const TableHead = ({
  children,
  deleteSelectedAction,
  isLoading = false,
  isFetching = false,
  routeCreate = "/",
  routeList = "/",
  title,
  ...rest
}: TableHeadProps) => {
  return (
    <Flex
      p={["0", "8"]}
      justify="space-between"
      align="center"
      {...rest}
      data-testid="TableHeadTestId"
    >
      <Heading size="lg">
        {title}
        {!isLoading && isFetching && <Spinner size="sm" color="purple.500" ml="4" />}
      </Heading>
      <HStack spacing="2">
        <NextLink passHref href={routeCreate}>
          <Button
            as="a"
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
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme={"purple"}
            leftIcon={<Icon fontSize="20" as={RiFileListLine} />}
          >
            Lista
          </Button>
        </NextLink>
        <Tooltip label="Excluir todos os selecionados">
          <Button onClick={deleteSelectedAction} size="sm" bg="purple.700">
            <Icon fontSize="20" as={RiDeleteBin6Line} />
          </Button>
        </Tooltip>
      </HStack>
      {children}
    </Flex>
  );
};
```
Este código apresenta um componente chamado TableHead, que é responsável por renderizar o cabeçalho de uma tabela. Ele recebe várias propriedades que definem o comportamento e a aparência do cabeçalho.

As propriedades recebidas são:

children: recebe um componente filho, que é renderizado dentro do cabeçalho da tabela.
deleteSelectedAction: é uma função que será chamada quando o botão de excluir todos os selecionados for clicado.
isLoading: indica se a tabela está carregando algum conteúdo.
isFetching: indica se a tabela está buscando novos dados.
routeCreate: recebe uma string que representa o caminho da rota para a página de criação de um novo item da tabela.
routeList: recebe uma string que representa o caminho da rota para a página de listagem de itens da tabela.
title: recebe uma string que é o título que será exibido no cabeçalho da tabela.
O componente TableHead usa alguns componentes do Chakra UI, como Heading, HStack, Tooltip, Flex e Button, e também os ícones do React, RiAddLine, RiFileListLine e RiDeleteBin6Line.

O retorno do componente é um Flex, que tem alguns elementos dentro dele. O primeiro elemento é um Heading que recebe o título definido na propriedade title. Se a tabela estiver buscando novos dados, um Spinner é exibido à direita do título.

O segundo elemento é um HStack que contém três botões. O primeiro botão é um botão de "Cadastrar" que, quando clicado, redireciona para a página definida na propriedade routeCreate. O segundo botão é um botão de "Lista" que, quando clicado, redireciona para a página definida na propriedade routeList. O terceiro botão é um botão de "Excluir todos os selecionados", que, quando clicado, chama a função definida na propriedade deleteSelectedAction.

O último elemento é children, que é o componente filho passado para o TableHead. Ele é renderizado à direita dos botões.

Por fim, o componente retorna um Flex com todos esses elementos e algumas propriedades definidas na propriedade rest.
## Head
```tsx
import { Tr, Th, Checkbox } from "@chakra-ui/react";
import { ReactNode } from "react";
export type Field = {
  id: string;
  label: string;
  displayKeyText: boolean;
  children?: any;
};

interface HeadProps {
  fields: Field[];
  mainChecked: boolean;
  setMainChecked: Function;
  setItems: Function;
}

export const Head = ({
  fields = [],
  mainChecked = false,
  setMainChecked,
  setItems,
}: HeadProps) => {
  return (
    <Tr>
      <Th px={["2", "2", "3"]} color="purple.200" width="8">
        <Checkbox
          colorScheme="green"
          isChecked={mainChecked}
          onChange={(e) => {
            setMainChecked(!mainChecked);
            setItems((prevState: any) =>
              prevState.map((prevItem: any) => ({ ...prevItem, value: !mainChecked }))
            );
          }}
        />
      </Th>
      {fields.map((field, index) => (
        <Th key={`${Math.random() * 10}-${index}`} color="white.50">
          {field.label}
        </Th>
      ))}
      <Th color="purple.300" style={{ textAlign: "end" }}>
        Ações
      </Th>
    </Tr>
  );
};
```
Esse é um código escrito em TypeScript que define um componente chamado `Head`. Esse componente é responsável por renderizar a linha de cabeçalho de uma tabela.

O componente recebe algumas propriedades:

* `fields`: um array de objetos que representam as colunas da tabela, contendo informações sobre o `id` do campo, seu `label`, e se deve ou não exibir o texto-chave (propriedade `displayKeyText`).
* `mainChecked`: um valor booleano que indica se a checkbox que seleciona todos os itens está marcada ou não.
* `setMainChecked`: uma função que permite atualizar o valor de `mainChecked`.
* `setItems`: uma função que permite atualizar os itens da tabela.

O componente `Head` é composto de uma linha `Tr` com três células `Th`. A primeira célula contém uma checkbox que permite selecionar ou deselecionar todos os itens da tabela. Essa checkbox tem a propriedade `isChecked` definida pelo valor de `mainChecked`. Quando o usuário marca ou desmarca essa checkbox, a função `onChange` é acionada, que chama a função `setMainChecked` passando o valor negado de `mainChecked`, e em seguida chama a função `setItems`, que atualiza o valor de todos os itens da tabela para o valor de `mainChecked`.

As outras células da linha `Tr` são criadas dinamicamente com base no array `fields` passado como propriedade. Cada célula contém o `label` do campo.

A última célula contém o texto "Ações".
## TableItems
```tsx
import { Tr, Td, Checkbox, Link, Icon } from "@chakra-ui/react";
import { Box, Text, Button, Table } from "shared/ui";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Head, Field } from "./Head";
import { RiPencilLine } from "react-icons/ri";

interface TableItemsProps {
  items: any[];
  route: string;
  fields: Field[];
  setItems: Function;
  linkOnMouseEnter: Function;
  children?: any;
}
export const TableItems = ({
  items = [],
  setItems,
  linkOnMouseEnter,
  fields = [],
  route = "/",
  children,
  ...rest
}: TableItemsProps) => {
  const router = useRouter();
  const [mainChecked, setMainChecked] = useState(false);
  return (
    <Table
      head={
        <Head
          fields={fields}
          mainChecked={mainChecked}
          setMainChecked={setMainChecked}
          setItems={setItems}
        />
      }
      colorScheme="whiteAlpha"
      {...rest}
      data-testid="TableItemsTestId"
    >
      {items?.map?.((item, index) => (
        <Tr
          key={`${Math.random() * 10}-${index}`}
          _hover={{
            background: "purple.700",
            cursor: "pointer",
          }}
        >
          <Td px={["2", "2", "3"]}>
            <Checkbox
              colorScheme={"green"}
              isChecked={item?.value}
              onChange={(e) => {
                setItems((prevState: any) =>
                  prevState.map((prevState: any) => {
                    const newArray = [...prevState];
                    newArray[index].value = e.target.checked;
                    return newArray;
                  })
                );
              }}
            />
          </Td>
          {fields?.map?.((field, ix) => (
            <Td
              key={`${Math.random() * 10}-${ix}`}
              whiteSpace="nowrap"
              maxW={0}
              overflow="hidden"
              textOverflow="ellipsis"
              onClick={() => {
                router.push(`${route}/${item?._id}`);
              }}
            >
              {field?.id === "name" ? (
                <Box>
                  <Link
                    color="green.400"
                    href={`/${route}/${item?._id}`}
                    onMouseEnter={() => linkOnMouseEnter(item)}
                  >
                    <Text fontWeight={"bold"}>{item[field?.id]}</Text>
                  </Link>
                </Box>
              ) : field?.displayKeyText === false ? (
                <>{React.cloneElement(field?.children, { ...item, id: field?.id })}</>
              ) : (
                <>{item[field?.id]}</>
              )}
            </Td>
          ))}
          <Td style={{ textAlign: "end" }}>
            <Button
              as="a"
              size="sm"
              href={`${route}/edit/${item?._id}`}
              fontSize="sm"
              colorScheme={"purple"}
            >
              <Icon fontSize="16" as={RiPencilLine} />
            </Button>
          </Td>
        </Tr>
      ))}
      {children}
    </Table>
  );
};
```
Esse código define um componente chamado `TableItems` que recebe uma lista de `items`, uma rota `route`, um conjunto de campos `fields`, uma função `setItems`, uma função `linkOnMouseEnter` e outros componentes como `children` como propriedades. O componente renderiza esses dados em uma tabela com funcionalidades adicionais.

A tabela é criada utilizando o componente `Table` importado do Chakra UI, e a primeira linha da tabela é o cabeçalho, que é definido pelo componente `Head` importado do mesmo arquivo desse componente. O `Head` recebe os mesmos dados que o `TableItems`, ou seja, a lista de `fields`, o estado do `mainChecked`, uma função `setMainChecked` e a função `setItems`.

Para cada item da lista `items`, é criada uma nova linha na tabela utilizando o componente `Tr`. Cada linha tem uma coluna com um `Checkbox` que, quando selecionado, define o valor de `value` do respectivo item no estado como verdadeiro, e quando desmarcado, define o valor de `value` do item no estado como falso.

Para cada campo na lista `fields`, é criada uma nova coluna na linha atual da tabela utilizando o componente `Td`. Se o campo atual tem um `id` igual a `"name"`, então é criada uma nova caixa (`Box`) que contém um link (`Link`) que leva o usuário à página de detalhes desse item específico. Se o campo atual tem um `displayKeyText` igual a `false`, então o campo atual é renderizado como uma clonagem do elemento filho (`children`) passado para ele (por exemplo, um componente de entrada de texto). Caso contrário, o valor do campo atual é renderizado diretamente.

Na última coluna de cada linha, é criado um botão de edição utilizando o componente `Button` e o ícone `RiPencilLine` do pacote de ícones `react-icons/ri`. O botão de edição leva o usuário à página de edição desse item específico.

Por fim, o componente `TableItems` renderiza quaisquer `children` adicionais passados a ele.
## TableContent
```tsx
import { Skeleton, Stack, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { TableItems } from "shared/ui/molecules";
type Field = {
  id: string;
  label: string;
  displayKeyText: boolean;
  children?: ReactNode;
};
interface TableContentProps {
  isLoading: boolean;
  children?: ReactNode;
  items: any[];
  fields: Field[];
  setItems: Function;
  linkOnMouseEnter: Function;
  error: any;
  route: string;
}
export const TableContent = ({
  children,
  isLoading = false,
  error = null,
  items = [],
  fields = [],
  setItems,
  route = "/",
  linkOnMouseEnter,
  ...rest
}: TableContentProps) => {
  return (
    <>
      {isLoading ||
        (items?.length === 0 ? (
          <Stack>
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
            <Skeleton height={"40px"} />
          </Stack>
        ) : error ? (
          <Flex justify="center">
            <Text>Nenhum registro encontrado</Text>
          </Flex>
        ) : (
          <TableItems
            items={items}
            setItems={setItems}
            route={route}
            fields={fields}
            linkOnMouseEnter={linkOnMouseEnter}
            {...rest}
          >
            {children}
          </TableItems>
        ))}
    </>
  );
};
```
Esse código é uma definição de um componente chamado `TableContent`. Esse componente tem como objetivo apresentar uma tabela de dados, que pode ser personalizada pelos parâmetros que recebe.

A tabela é composta por linhas, onde cada linha representa um item. Cada item é formado por um conjunto de campos, que são definidos pelo parâmetro `fields`.

O componente `TableContent` recebe vários parâmetros. O parâmetro `isLoading` é um booleano que indica se os dados estão sendo carregados ou não. O parâmetro `items` é um array que contém os itens que serão apresentados na tabela. O parâmetro `fields` é um array que define os campos que cada item da tabela terá. O parâmetro `setItems` é uma função que permite atualizar os itens da tabela. O parâmetro `linkOnMouseEnter` é uma função que é executada quando o mouse passa por cima de um link na tabela. O parâmetro `error` é uma mensagem de erro que pode ser exibida caso ocorra algum problema ao carregar os dados. O parâmetro `route` é a rota que será usada quando um item da tabela for clicado.

Se o parâmetro `isLoading` for verdadeiro, o componente exibe uma série de `Skeletons` (elementos que simulam o carregamento de dados) para indicar que os dados estão sendo carregados. Caso contrário, o componente verifica se a lista de `items` está vazia. Se estiver, o componente exibe uma mensagem indicando que nenhum registro foi encontrado. Se o parâmetro `error` estiver definido, o componente exibe uma mensagem de erro. Caso contrário, o componente exibe a tabela de dados.

A tabela de dados é criada através do componente `TableItems`, que é importado de um arquivo chamado `shared/ui/molecules`. Esse componente recebe os parâmetros `items`, `setItems`, `route`, `fields` e `linkOnMouseEnter`, que são os mesmos parâmetros que foram recebidos pelo componente `TableContent`. O componente `TableItems` é responsável por criar as linhas da tabela, com base nos dados que foram passados pelo parâmetro `items` e nas colunas que foram definidas pelo parâmetro `fields`.

Caso haja elementos filhos (`children`), esses elementos são adicionados à tabela como uma última linha.
## Generic Table 
```tsx
import { ReactNode } from "react";
import { TableContent, TableHead, Flex } from "shared/ui";
type Field = {
  id: string;
  label: string;
  displayKeyText: boolean;
  children?: ReactNode;
};
interface GenericTableProps {
  isLoading: boolean;
  children?: ReactNode;
  items: any[];
  fields: Field[];
  setItems: Function;
  linkOnMouseEnter: Function;
  error: any;
  route: string;
  routeCreate: string;
  routeList: string;
  title: string;
}
export const GenericTable = ({
  children,
  isLoading = false,
  error = null,
  items = [],
  fields = [],
  setItems,
  route = "/",
  linkOnMouseEnter,
  routeCreate,
  routeList,
  title,
  ...rest
}: GenericTableProps) => {
  return (
    <Flex
      margin={4}
      flexDirection={"column"}
      flexGrow="1"
      data-testid="GenericTableTestId"
    >
      <TableHead routeCreate={routeCreate} routeList={routeList} title={title} />
      <TableContent
        items={items}
        setItems={setItems}
        route={route}
        fields={fields}
        linkOnMouseEnter={linkOnMouseEnter}
        isLoading={isLoading}
        error={error}
        {...rest}
      >
        {children}
      </TableContent>
    </Flex>
  );
};
```
Esse é um componente chamado `GenericTable` que utiliza outros dois componentes chamados `TableHead` e `TableContent` do pacote `shared/ui`.

O componente `GenericTable` recebe várias propriedades (`props`) como parâmetros, que são:

* `isLoading` (boolean): indica se a tabela está em processo de carregamento de dados;
* `children` (ReactNode): uma lista de elementos React que são passados como filhos;
* `items` (array): um array com os dados da tabela;
* `fields` (array): um array de objetos que contém as informações sobre cada coluna da tabela, incluindo o `id`, o `label`, `displayKeyText` e `children` (opcional);
* `setItems` (function): uma função para definir os dados da tabela;
* `linkOnMouseEnter` (function): uma função para lidar com o evento `mouseenter` nos links da tabela;
* `error` (any): um possível erro que ocorre ao carregar a tabela;
* `route` (string): o caminho da URL que a tabela irá acessar;
* `routeCreate` (string): o caminho da URL para criar um novo item;
* `routeList` (string): o caminho da URL para listar os itens;
* `title` (string): o título da tabela.

O componente renderiza um `Flex` (uma caixa de contêiner flexível), com algumas propriedades CSS para definir sua aparência. Dentro do `Flex`, há dois componentes: `TableHead` e `TableContent`.

`TableHead` recebe três propriedades: `routeCreate`, `routeList` e `title`. Esse componente é responsável por renderizar o cabeçalho da tabela com o título e botões de ação para criar um novo item e listar os itens existentes.

`TableContent` é responsável por renderizar o conteúdo da tabela. Ele recebe várias propriedades, incluindo `items`, `fields`, `setItems`, `linkOnMouseEnter`, `isLoading`, `error` e `rest`. Ele também recebe `children`, que é a lista de elementos React passados como filhos. Dentro do `TableContent`, há outro componente chamado `TableItems` (que não é mostrado aqui).

Em resumo, o componente `GenericTable` é um componente reutilizável que renderiza uma tabela genérica com cabeçalho e conteúdo, recebendo dados e propriedades como parâmetros. Ele utiliza outros dois componentes, `TableHead` e `TableContent`, que lidam com a renderização do cabeçalho e conteúdo da tabela, respectivamente.
## CategoryListTablePage
```tsx
import { Box, GenericTable, Head } from "shared/ui";
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const CategoryListTablePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Categorias"}
        description="Página de listagem de categorias do painel de Admin Belezix"
      />
      <Box borderRadius={8} bg="purple.800" p="4" flexGrow="1">
        <GenericTable
          isLoading={false}
          items={[
            { _id: "11233", name: "valuetest", createdAt: new Date().toDateString() },
          ]}
          fields={[
            { id: "name", label: "Nome", displayKeyText: true },
            {
              id: "createdAt",
              label: "Data de criação",
              displayKeyText: false,
              children: <Text />,
            },
          ]}
          setItems={() => {}}
          linkOnMouseEnter={() => {}}
          error={undefined}
          route={"/categorys"}
          routeCreate={"/categorys/create"}
          routeList={"/categorys/list"}
          title={"Categorias"}
        />
      </Box>
    </>
  );
};
```
O código acima é um exemplo de página que utiliza um componente de tabela genérico (`GenericTable`) para exibir informações de uma lista de categorias. A página em si é composta por uma caixa (`Box`) que contém o componente `GenericTable`.

O componente `Head` é utilizado para definir metadados da página, como título e descrição.

O componente `Text` é definido dentro do arquivo e é utilizado para personalizar a exibição de dados na tabela. Ele recebe um objeto com dados e uma chave `id`, e retorna um elemento `h1` contendo o valor correspondente a essa chave.

O componente `GenericTable` é importado de um módulo de interface compartilhada (`"shared/ui"`) e recebe diversas propriedades, incluindo:

* `isLoading`: um booleano indicando se a tabela está carregando dados ou não;
* `items`: um array contendo objetos que representam as linhas da tabela;
* `fields`: um array contendo objetos que representam as colunas da tabela;
* `setItems`: uma função que é chamada quando as linhas da tabela são atualizadas;
* `linkOnMouseEnter`: uma função que é chamada quando o cursor é posicionado sobre um link na tabela;
* `error`: um objeto que representa um erro que pode ter ocorrido ao carregar os dados da tabela;
* `route`: uma string que representa a rota base para navegação dentro da tabela;
* `routeCreate`: uma string que representa a rota para criar um novo item na tabela;
* `routeList`: uma string que representa a rota para listar todos os itens da tabela;
* `title`: uma string que representa o título da tabela.

Note que o objeto passado como valor para a propriedade `fields` contém dois objetos, cada um representando uma coluna da tabela. A propriedade `id` de cada objeto é o nome da chave do objeto passado como valor para a propriedade `items` que deve ser exibido na coluna correspondente. A propriedade `label` define o rótulo da coluna. A propriedade `displayKeyText` é um booleano que indica se o valor da chave do objeto deve ser exibido diretamente na coluna ou se um componente personalizado deve ser utilizado. No caso da segunda coluna (`createdAt`), o componente `Text` é utilizado para exibir o valor formatado.

## Atomic Design na prática!
No código `TableHead`, é possível identificar a aplicação da metodologia de Atomic Design através da utilização de componentes átomos como `Box`, `Flex`, `Heading`, `IconButton` e `Text`. Esses componentes são combinados para formar um componente mais complexo, que é o `TableHead`. Esse componente é responsável por renderizar o cabeçalho da tabela, que contém o título da página, um botão para adicionar um novo registro e um ícone para exibir as opções de busca e filtragem. A utilização dessa metodologia permite a criação de componentes mais coesos e com maior reutilização de código, já que cada componente atômico pode ser utilizado em diferentes contextos e em diferentes níveis de complexidade.

No código `TableContent`, a metodologia de Atomic Design também é aplicada através da utilização de componentes átomos como `Stack`, `Flex`, `Text` e `Skeleton`. Esses componentes são combinados para formar um componente mais complexo, que é o `TableContent`. Esse componente é responsável por renderizar o conteúdo da tabela, que pode ser uma lista de registros ou uma mensagem de erro ou de carregamento. Novamente, a utilização dessa metodologia permite a criação de componentes mais coesos e com maior reutilização de código, já que cada componente atômico pode ser utilizado em diferentes contextos e em diferentes níveis de complexidade.

Já no código `GenericTable`, a metodologia de Atomic Design é aplicada através da composição de outros componentes, como `TableHead` e `TableContent`, que foram explicados anteriormente. Além disso, o componente `GenericTable` recebe diversas propriedades, como `isLoading`, `items`, `fields`, `setItems`, `linkOnMouseEnter`, `error`, `route`, `routeCreate`, `routeList` e `title`, que permitem personalizar a renderização da tabela de acordo com a necessidade da página em que é utilizada. A utilização dessa metodologia permite a criação de componentes mais flexíveis e reutilizáveis, que podem ser facilmente adaptados a diferentes contextos e necessidades.

A metodologia de Atomic Design é uma abordagem que tem ganhado cada vez mais espaço no desenvolvimento de interfaces de usuário. Ela consiste em dividir a interface em componentes atômicos, que são combinados para formar componentes mais complexos. Essa abordagem permite a criação de componentes mais coesos, flexíveis e reutilizáveis, o que torna o desenvolvimento mais rápido e eficiente. Além disso, a utilização de componentes atômicos permite a criação de uma linguagem visual consistente em toda a interface, o que melhora a usabilidade e a experiência do usuário. A aplicação dessa metodologia pode ser útil em outras telas, além de `CategoryListTablePage`, já que ela permite a criação de componentes flexíveis e reutilizáveis em diferentes contextos e necessidades.

## Exemplo de uso da GenericTable
Outro exemplo de uso seria numa outra tela de sistema de loja virtual. Nesse caso, podemos utilizar a GenericTable para criar essa tabela, passando as informações específicas de pedidos como parâmetros.

Exemplo de uso da GenericTable para apresentar uma lista de pedidos:

```typescript
import { Box, GenericTable, Head } from "shared/ui";

const OrderListTablePage = () => {
  return (
    <>
      <Head
        title={"Belezix Admin | Pedidos"}
        description="Página de listagem de pedidos do painel de Admin Belezix"
      />
      <Box borderRadius={8} bg="purple.800" p="4" flexGrow="1">
        <GenericTable
          isLoading={false}
          items={[
            { _id: "1", customer: "John Doe", total: 100, status: "em andamento" },
            { _id: "2", customer: "Jane Doe", total: 50, status: "concluído" },
            { _id: "3", customer: "Bob Smith", total: 75, status: "cancelado" },
          ]}
          fields={[
            { id: "_id", label: "ID", displayKeyText: true },
            { id: "customer", label: "Cliente", displayKeyText: true },
            { id: "total", label: "Total", displayKeyText: true },
            { id: "status", label: "Status", displayKeyText: true },
          ]}
          setItems={() => {}}
          linkOnMouseEnter={() => {}}
          error={undefined}
          route={"/orders"}
          routeCreate={"/orders/create"}
          routeList={"/orders/list"}
          title={"Pedidos"}
        />
      </Box>
    </>
  );
};

export default OrderListTablePage;
```
Nesse exemplo, passamos as informações específicas da lista de pedidos como propriedades para a GenericTable. Na propriedade items, passamos um array com os dados dos pedidos, e na propriedade fields, definimos as colunas da tabela e quais campos dos dados dos pedidos serão exibidos em cada coluna.

Além disso, a GenericTable já vem com funcionalidades como paginação e ordenação de dados, o que pode ser muito útil em listas grandes de informações. A metodologia de Atomic Design permite criar componentes reutilizáveis como esse, que podem ser utilizados em várias partes do sistema, facilitando a manutenção do código e tornando-o mais modular.

## Conclusão
Nesta aula, vimos a metodologia de Atomic Design, que é uma forma de organizar e estruturar componentes de forma escalável e consistente. Essa metodologia pode ser aplicada em diferentes níveis de granularidade, desde os átomos, que são os componentes mais simples, até os organismos, que são componentes mais complexos.

Vimos como aplicar a metodologia de Atomic Design no desenvolvimento de interfaces usando React e como criar um componente genérico, o `GenericTable`, que pode ser reutilizado em diferentes telas. Demonstramos como esse componente pode ser personalizado usando diferentes campos e diferentes tipos de dados.

Por fim, apresentamos um exemplo prático de como utilizar o `GenericTable` em outra tela, com campos e dados diferentes.

A metodologia de Atomic Design oferece muitos benefícios, como a criação de componentes mais reutilizáveis, uma interface mais consistente e fácil de manter, e uma melhor escalabilidade. Ela pode ser aplicada em projetos de qualquer tamanho e é especialmente útil em projetos grandes, em que a organização e a escalabilidade são fundamentais.

Em resumo, o uso da metodologia de Atomic Design e a criação de componentes genéricos como o `GenericTable` podem ajudar a tornar o processo de desenvolvimento de interfaces mais eficiente, escalável e consistente, resultando em uma melhor experiência do usuário.