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

Uma tabela é uma estrutura muito comum em aplicações web para exibir dados de forma organizada e facilmente acessível aos usuários. No entanto, criar tabelas pode ser uma tarefa tediosa e repetitiva, especialmente se tivermos que criar uma tabela diferente para cada conjunto de dados que desejamos exibir.

Nessa aula, iremos criar uma tabela dinâmica que poderá ser reutilizada em diferentes partes da aplicação, tornando o processo de exibição de dados muito mais fácil e eficiente.

Para isso, utilizaremos o poderoso sistema de grade do Chakra UI para criar uma tabela com colunas flexíveis e responsivas, capaz de se adaptar a diferentes tamanhos de tela. Além disso, usaremos props dinâmicas para renderizar diferentes tipos de dados e tornar nossa tabela ainda mais genérica.

Ao final da aula, você terá aprendido como criar uma tabela dinâmica e genérica utilizando o Chakra UI, tornando o processo de exibição de dados em suas aplicações muito mais fácil e eficiente.
## Table
explique detalhadamente e de forma didática o código a seguir:
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
explique detalhadamente e de forma didática o código a seguir:
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
explique detalhadamente e de forma didática o código a seguir:
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
## TableItems
explique detalhadamente e de forma didática o código a seguir:
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
## TableContent
explique detalhadamente e de forma didática o código a seguir:
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
## Generic Table
explique detalhadamente e de forma didática o código a seguir:
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

## CategoryListTablePage
explique detalhadamente e de forma didática o código a seguir:
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