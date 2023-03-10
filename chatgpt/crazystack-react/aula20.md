---
title: 'Desenvolvendo um componente de Paginação para React com Chakra UI no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
A aula "Desenvolvendo um componente de Paginação para React com Chakra UI" é um tutorial que ensina como criar um componente de paginação para uma aplicação web utilizando React e a biblioteca de design Chakra UI. O vídeo dessa aula será publicada em breve no bootcamp CrazyStack, se você ainda não garantiu sua vaga clique [aqui](https://crazystack.com.br)

O objetivo principal do tutorial é ensinar os fundamentos do desenvolvimento de um componente de paginação personalizado, que possa ser utilizado em diferentes projetos React. O tutorial começa explicando os conceitos básicos de paginação, como o número de registros por página e o número total de registros.

Em seguida, o tutorial apresenta o código-fonte para o componente de paginação, explicando detalhadamente cada trecho do código. O componente utiliza a biblioteca Chakra UI para a estilização visual dos elementos, como botões e indicadores de página.

O código-fonte do componente é dividido em várias funções auxiliares, que realizam tarefas como a geração dos números de página e o cálculo do número total de páginas. O componente também possui um conjunto de propriedades que permitem a personalização do comportamento e da aparência visual da paginação.

Durante o tutorial, são apresentados exemplos práticos de como utilizar o componente de paginação em diferentes projetos React, mostrando como é fácil integrá-lo em uma aplicação já existente. O tutorial também ensina como fazer o tratamento de eventos, como o clique em botões de página, utilizando o React.

Ao final da aula, o aluno terá desenvolvido um componente de paginação personalizado para React com Chakra UI, além de ter aprendido conceitos fundamentais de paginação em aplicações web e a utilizar a biblioteca Chakra UI para estilização visual de componentes. O aluno também terá adquirido conhecimento sobre o desenvolvimento de componentes reutilizáveis em React, uma habilidade fundamental para a criação de aplicações web escaláveis e de fácil manutenção.

## Atomic Design
Durante a aula, também será aplicado o conceito de Atomic Design, uma metodologia de design que consiste em dividir a interface em pequenos átomos, que são componentes simples e reutilizáveis, e construir moléculas, organismos, templates e páginas a partir deles. Isso permite que o desenvolvimento de interfaces seja mais escalável, modular e eficiente.

Será apresentado como criar componentes atômicos e utilizá-los para construir componentes de moléculas e organismos, como a paginação. Também será mostrado como utilizar as ferramentas do Chakra UI, uma biblioteca de componentes visuais, para estilizar e compor os componentes, tornando o processo mais fácil e produtivo.

Dessa forma, a aula não só ensinará como criar um componente de paginação para React, mas também mostrará uma metodologia de desenvolvimento que pode ser aplicada em outros projetos, tornando-os mais organizados, estruturados e fáceis de dar manutenção.

## Um clássico chamado Paginação
A paginação é uma técnica muito comum em interfaces de usuário para dividir grandes conjuntos de dados em partes menores e mais gerenciáveis. Em vez de exibir todos os dados de uma só vez, a paginação permite exibir uma quantidade limitada de dados em cada página e fornecer aos usuários a capacidade de navegar entre as páginas.

Na prática, a paginação é implementada através de botões de navegação, que permitem que o usuário vá para a página anterior ou para a próxima página. Esses botões geralmente são acompanhados por uma caixa de seleção que permite que o usuário selecione diretamente a página desejada.

A implementação da paginação pode variar de acordo com a tecnologia usada. Em HTML, por exemplo, a paginação pode ser implementada através de tags <a> ou <button> que disparam eventos para carregar a próxima página ou retroceder uma página.

Já em frameworks como React, a paginação pode ser implementada através de componentes específicos que recebem informações como o número total de páginas, a página atual e a função para atualizar a página atual. Esses componentes geralmente usam estado para gerenciar a página atual e renderizar os botões de navegação e a caixa de seleção de página.

Nessa aula veremos os componentes visuais e suas implementações.
  
## PaginationItem (Átomo)
```tsx
import { Button } from "@chakra-ui/react";
type PaginationItemProps = {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
};
export const PaginationItem = ({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) => {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme={"green"}
        disabled
        _disabled={{ bgColor: "green.500", cursor: "default" }}
      >
        {number}
      </Button>
    );
  }
  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="purple.700"
      _hover={{ bg: "purple.500" }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
};
```
O código acima representa o componente PaginationItem, que é um átomo do nosso sistema de design atômico. Esse componente é responsável por renderizar um item da nossa lista de paginação.

O componente recebe três propriedades:

* "isCurrent": que indica se o item é a página atual (por padrão, é falso);
* "number": que é o número da página que o item representa;
* "onPageChange": que é a função que será chamada quando o usuário clicar em um item da paginação.

Na primeira condição do componente, é verificado se o item é a página atual, caso seja verdadeiro, o componente renderiza um botão desabilitado com a cor verde. Caso contrário, na segunda condição, o componente renderiza um botão habilitado com a cor roxa que chama a função "onPageChange" quando clicado.

Essas duas possibilidades de renderização permitem que o usuário tenha uma visualização clara de qual página está atualmente visualizando e quais são as outras opções disponíveis para seleção.
## PageIndicator (Molécula)
```tsx
import { Box } from "shared/ui";
interface PageIndicatorProps {
  pageInitial: number;
  pageEnd: number;
  total: number;
}
export const PageIndicator = ({ pageInitial, pageEnd, total }: PageIndicatorProps) => {
  return (
    <Box>
      <strong>{pageInitial}</strong>-<strong>{pageEnd}</strong> de <strong>{total}</strong>
    </Box>
  );
};
```
O componente `PageIndicator` é uma molécula responsável por mostrar ao usuário em qual intervalo de registros ele está na paginação.

O código é bem simples e consiste em receber as propriedades `pageInitial`, `pageEnd` e `total`. A partir dessas informações, o componente renderiza o intervalo de registros exibidos na página atual e o total de registros no formato `pageInitial-pageEnd de total`.

O elemento `<Box>` utilizado no componente é um átomo da biblioteca `Chakra UI`, responsável por criar um container retangular com estilos padrões de espaçamento, bordas e background.

Como este componente é uma molécula, ele não contém lógica específica ou interações complexas com o usuário, sendo usado como uma simples forma de apresentar informações ao usuário de forma clara e objetiva.
## PaginationGroupItems (Molécula)
```tsx
import { Stack } from "@chakra-ui/react";
import { PaginationItem, Text } from "shared/ui/atoms";
interface PaginationGroupItemsProps {
  currentPage: number;
  siblingsCount: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  previousPages: number[];
  nextPages: number[];
}

export const PaginationGroupItems = ({
  currentPage,
  siblingsCount,
  onPageChange,
  previousPages,
  nextPages,
  lastPage,
}: PaginationGroupItemsProps) => {
  return (
    <Stack direction="row" spacing="2">
      {currentPage > 1 + siblingsCount && (
        <>
          <PaginationItem onPageChange={onPageChange} number={1} />
          {currentPage > 2 + siblingsCount && (
            <Text textAlign={"center"} width="8" color="purple.300">
              ...
            </Text>
          )}
        </>
      )}
      {previousPages.length > 0 &&
        previousPages?.map?.((page) => (
          <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        ))}
      <PaginationItem onPageChange={onPageChange} isCurrent number={currentPage} />
      {nextPages.length > 0 &&
        nextPages?.map?.((page) => (
          <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        ))}
      {currentPage + siblingsCount < lastPage && (
        <>
          {currentPage + 1 + siblingsCount < lastPage && (
            <>
              <Text textAlign={"center"} width="8" color="purple.300">
                ...
              </Text>
            </>
          )}
          <PaginationItem onPageChange={onPageChange} number={lastPage} />
        </>
      )}
    </Stack>
  );
};
```
O componente `PaginationGroupItems` é uma molécula responsável por renderizar os itens da paginação. Ele recebe diversas props, como o número da página atual, a quantidade de irmãos (siblingsCount), o número da última página, uma função para ser chamada quando ocorrer uma mudança de página (onPageChange) e os números das páginas anteriores (previousPages) e posteriores (nextPages) à página atual.

O componente utiliza o `Stack` do Chakra UI para renderizar os itens da paginação em uma direção horizontal, com um espaçamento de 2. Dentro do `Stack`, são renderizados os botões que representam as páginas.

O primeiro `if` verifica se a página atual está a uma distância maior que `siblingsCount` da primeira página e, caso positivo, renderiza o botão da primeira página e os "..." que representam uma separação visual. O segundo `if` verifica se há páginas anteriores à atual e, se houver, as renderiza utilizando o `map` em `previousPages`. Em seguida, o botão da página atual é renderizado com a propriedade `isCurrent` definida como `true`. O terceiro `if` verifica se há páginas posteriores à atual e, se houver, as renderiza utilizando o `map` em `nextPages`. O último `if` verifica se a página atual está a uma distância maior que `siblingsCount` da última página e, caso positivo, renderiza os "..." que representam uma separação visual e o botão da última página.

Dentro do `Stack`, cada botão é representado pelo componente `PaginationItem`, que recebe como props o número da página e a função `onPageChange` para ser chamada quando o botão for clicado. O componente `PaginationItem` é um átomo que renderiza um botão do Chakra UI com o número da página. Se a página atual for igual ao número da página do botão, o botão é renderizado com a propriedade `isCurrent` definida como `true` e com uma cor verde. Caso contrário, é renderizado com a cor roxa e com a funcionalidade de chamar a função `onPageChange` ao ser clicado.
## Pagination (organism)
```tsx
import { PageIndicator, PaginationGroupItems } from "shared/ui/molecules";
import { Stack } from "@chakra-ui/react";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}
const siblingsCount = 1;
function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}
export const Pagination = ({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) => {
  const lastPage = Number.isInteger(totalCountOfRegisters / registersPerPage)
    ? totalCountOfRegisters / registersPerPage
    : Math.floor(totalCountOfRegisters / registersPerPage) + 1;
  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
      : [];
  const paginationGroupItemsProps = {
    currentPage,
    siblingsCount,
    onPageChange,
    previousPages,
    nextPages,
    lastPage,
  };
  return (
    <Stack
      direction={["column", "row"]}
      spacing="6"
      align="center"
      mt="8"
      justify="space-between"
    >
      <PageIndicator
        pageInitial={currentPage}
        pageEnd={currentPage + registersPerPage}
        total={totalCountOfRegisters}
      />
      <PaginationGroupItems {...paginationGroupItemsProps} />
    </Stack>
  );
};
```
O código acima descreve a implementação do componente `Pagination`, que é um organismo de interface de usuário que exibe uma lista de itens de paginação e uma indicação da página atual. O componente recebe um conjunto de propriedades para personalização da funcionalidade e aparência da paginação.

O componente é composto por outros componentes do tipo `PageIndicator` e `PaginationGroupItems` que são importados a partir do diretório `shared/ui/molecules`. O componente `PageIndicator` exibe uma indicação da página atual, mostrando o número da primeira e última página exibidas e o total de páginas. O componente `PaginationGroupItems` é responsável por exibir os itens de paginação.

O componente `Pagination` recebe um conjunto de propriedades, incluindo `totalCountOfRegisters` que é o número total de registros a serem exibidos e `registersPerPage` que é o número de registros exibidos por página. Além disso, a propriedade `currentPage` é opcional e define a página atual, por padrão é a página 1. A propriedade `onPageChange` é uma função de callback que é chamada quando o usuário seleciona uma nova página.

O componente utiliza a função `generatePagesArray` para gerar um array de números de página. Ele é usado para gerar as páginas anteriores e posteriores à página atual e exibí-las no componente `PaginationGroupItems`. O componente `Pagination` também usa a variável `lastPage` para definir o número total de páginas.

Finalmente, o componente `Pagination` renderiza os componentes `PageIndicator` e `PaginationGroupItems` dentro de um `Stack` que é utilizado para posicionar e alinhar os elementos. A propriedade `direction` do `Stack` é ajustada de acordo com o tamanho da tela, mudando de vertical para horizontal.
## CategoryListPage (Template)
```tsx
import { Box, GenericTable, Head, Pagination } from "shared/ui";
import { GetCategorysResponse } from "entidades/category/category.api";
import { useCategoryList } from "../categoryList.hook";
type CategoryListTablePageProps = {
  data: GetCategorysResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const CategoryListTablePage = ({ page = 0, data }: CategoryListTablePageProps) => {
  const {
    categorys,
    setCategorys,
    handlePrefetchCategory,
    deleteSelectedAction,
    total,
    setPage,
  } = useCategoryList({
    page,
    initialData: data,
  });
  return (
    <>
      <Head
        title={"Belezix Admin | Categorias"}
        description="Página de listagem de categorias do painel de Admin Belezix"
      />
      <Box borderRadius={8} bg="purple.800" p="4" flexGrow="1">
        <GenericTable
          deleteSelectedAction={deleteSelectedAction}
          isLoading={false}
          items={categorys}
          fields={[
            { id: "name", label: "Nome", displayKeyText: true },
            {
              id: "createdAt",
              label: "Data de criação",
              displayKeyText: false,
              children: <Text />,
            },
          ]}
          setItems={setCategorys}
          linkOnMouseEnter={handlePrefetchCategory}
          error={undefined}
          route={"/categorys/details"}
          routeCreate={"/categorys/create"}
          routeList={"/categorys/list"}
          title={"Categorias"}
        />
        <Pagination
          onPageChange={setPage}
          currentPage={page}
          totalCountOfRegisters={total}
        />
      </Box>
    </>
  );
};
```
Esse é um componente de uma página de listagem de categorias que utiliza diversos componentes de uma biblioteca compartilhada chamada "shared/ui".

A página recebe dois props: "data", que é um objeto que contém a resposta de uma requisição GET a uma API que retorna as categorias, e "page", que é o número da página atual.

O componente começa importando diversos componentes da biblioteca compartilhada, como o "Box", o "GenericTable", a "Head" e a "Pagination", além de importar também uma tipagem chamada "GetCategorysResponse" e um hook personalizado chamado "useCategoryList".

Em seguida, é definido um componente chamado "Text", que recebe um id e um objeto de dados e retorna um elemento "h1" contendo o valor do campo correspondente ao id.

Logo depois, o componente principal chamado "CategoryListTablePage" é definido, recebendo os props "page" e "data". Dentro desse componente, é utilizado o hook "useCategoryList" para obter as categorias e outras informações da página. O hook "useCategoryList" recebe um objeto contendo a página atual e os dados iniciais da requisição GET.

Dentro do componente "CategoryListTablePage", é renderizado um componente "Head" para configurar as informações de título e descrição da página, e um componente "Box" com um estilo específico. Dentro desse "Box", é renderizado um componente "GenericTable", que recebe as categorias e outras informações, como as colunas a serem exibidas na tabela e os links de rota.

Após a tabela, é renderizado um componente "Pagination" que recebe como props o número da página atual, o total de registros e uma função para mudar a página atual. Esse componente permite que o usuário navegue entre as páginas da lista de categorias.

Em resumo, esse código define um componente "CategoryListTablePage" que recebe os dados de categorias e renderiza uma tabela com informações sobre cada categoria, além de um componente "Pagination" para permitir a navegação entre as páginas.
## CategoryListHook
```tsx
import { GetCategorysResponse } from "entidades/category/category.api";
import { useState, useEffect } from "react";
import { useUi } from "shared/libs";
import { api, queryClientInstance } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { CategoryProps } from "entidades/category";
import { useRouter } from "next/router";
type CategoryListHook = {
  initialData: GetCategorysResponse;
  page: number;
};
export const useCategoryList = (data: CategoryListHook) => {
  const router = useRouter();
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [categorys, setCategorys] = useState(data?.initialData?.categorys ?? []);
  const handlePrefetchCategory = async ({ _id: categoryId }: any) => {
    await queryClientInstance.prefetchQuery(
      ["category", categoryId],
      async () => {
        const { data = null } = (await api.get(`/category/load?_id=${categoryId}`)) || {};
        return data;
      },
      { staleTime: 1000 * 60 * 10 }
    );
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
        queryClientInstance.invalidateQueries(["categorys", data.page]);
        queryClientInstance.refetchQueries(["categorys", data.page]);
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
  const deleteSelectedAction = async () => {
    deleteCategory.mutateAsync(
      categorys.filter((category: CategoryProps) => category.value)
    );
  };
  const changePage = (newpage: number) => {
    router.replace(`/categorys/${newpage}`);
  };
  useEffect(() => {
    setCategorys(data?.initialData?.categorys ?? []);
  }, [data?.initialData?.categorys]);
  return {
    categorys,
    setCategorys,
    handlePrefetchCategory,
    deleteSelectedAction,
    page,
    setPage: changePage,
    total: data?.initialData?.totalCount,
  };
};
```
Esse código é responsável por definir um hook personalizado chamado `useCategoryList`, que retorna um objeto com diversas funções e dados que são utilizados na página de listagem de categorias.

Primeiro, o hook recebe um objeto com duas propriedades: `initialData`, que é um objeto com dados iniciais para exibir na tabela de categorias, e `page`, que é o número da página atual da tabela.

Dentro do hook, são definidos diversos estados utilizando o hook `useState`, como o estado `categorys`, que armazena as categorias que serão exibidas na tabela, e o estado `page`, que armazena o número da página atual. Também é utilizado o hook `useEffect` para atualizar o estado `categorys` sempre que `initialData.categorys` for alterado.

Além disso, o hook utiliza outros hooks como `useUi` (que retorna dados relacionados à interface do usuário), `useMutation` (que define uma operação de mutação de dados) e `useRouter` (que retorna o objeto de roteamento do Next.js). Esses hooks são utilizados para definir diversas funções, como `handlePrefetchCategory` (que pré-carrega dados da categoria), `deleteSelectedAction` (que deleta as categorias selecionadas), `changePage` (que altera a página atual) e `deleteCategory` (que define a operação de deleção de categorias).

Por fim, o hook retorna um objeto com todas as funções e estados definidos, como `categorys`, `setCategorys`, `handlePrefetchCategory`, `deleteSelectedAction`, `page`, `setPage` e `total`. Esse objeto é utilizado na página de listagem de categorias para exibir e manipular os dados da tabela.

## Atomic Design 
O Atomic Design foi aplicado de forma muito eficiente nos arquivos anteriores, especialmente na construção da UI do painel de administração do Belezix. A estrutura da interface foi organizada em componentes atômicos, moleculares e organismos, conforme propõe o Atomic Design, o que torna a construção e a manutenção da interface mais fácil e escalável.

Os componentes atômicos, como Button e Input, foram criados de forma independente e reutilizável em todo o projeto, o que facilita a construção de novos componentes. Os componentes moleculares, como Header e Pagination, são compostos por componentes atômicos e funcionam como blocos de construção maiores. Por fim, os organismos, como CategoryListTablePage, são compostos por componentes moleculares e atômicos e formam a interface do usuário.

Além disso, o Atomic Design permitiu uma padronização consistente na aparência e comportamento dos componentes, o que ajuda a manter uma identidade visual coerente em toda a aplicação. O uso consistente de temas e paletas de cores também ajuda a manter a coesão visual do projeto.

## Conclusão
Nesta aula, vimos como implementar a paginação em uma aplicação web usando React e a biblioteca Next.js. Primeiro, aprendemos sobre a importância da paginação para melhorar a experiência do usuário e a eficiência do carregamento de dados.

Em seguida, vimos como dividir os dados em páginas usando uma API externa chamando através do Axios. Aprendemos como calcular o número total de páginas com base no número total de registros e no tamanho da página.

Depois disso, vimos como implementar a navegação entre as páginas usando os recursos de roteamento do Next.js. Criamos uma página para cada página de dados e definimos uma rota para cada uma delas. Em seguida, implementamos a navegação entre as páginas usando links e botões.

Por fim, vimos como aplicar o conceito de Atomic Design para organizar os componentes em diferentes níveis de abstração. Usamos componentes atômicos, moleculares e organizacionais para construir a interface da aplicação de forma modular e reutilizável.

Ao final da aula, tivemos uma aplicação funcional com paginação e uma interface bem organizada usando o Atomic Design.