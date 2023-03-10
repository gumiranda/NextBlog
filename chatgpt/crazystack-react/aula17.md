---
title: 'Hook de gerenciamento de categorias com React Query e Axios no CrazyStack Next.js'
excerpt: 'Nesse post explicarei alguns códigos da aula.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2022-05-21T05:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Na aula "Hook de gerenciamento de categorias com React Query e Axios", você aprenderá como usar React Query e Axios para gerenciar categorias em um aplicativo React. O React Query é uma biblioteca de gerenciamento de cache que ajuda a tornar as consultas e mutações de dados mais eficientes. Já o Axios é uma biblioteca de requisições HTTP que facilita a interação do aplicativo com um servidor.

O vídeo dessa aula será publicada em breve no bootcamp CrazyStack, se você ainda não garantiu sua vaga clique [aqui](https://crazystack.com.br)

Você verá como criar um hook customizado para gerenciar as categorias do seu aplicativo. Esse hook terá funções para buscar as categorias do servidor, pré-carregar dados de uma categoria específica, excluir categorias e selecionar categorias para exclusão em massa. Você também verá como usar o React Query para armazenar em cache os dados das categorias e como usar o Axios para fazer requisições para o servidor.

Durante a aula, serão apresentados exemplos de código e explicações detalhadas para que você possa acompanhar e entender todo o processo de criação do hook. Você também aprenderá a usar alguns recursos avançados do React Query, como invalidação manual de cache e revalidação de dados após uma mutação.

Ao final da aula, você terá um entendimento sólido de como usar o React Query e o Axios para gerenciar dados em um aplicativo React e como criar um hook personalizado para gerenciar as categorias do seu aplicativo.
## Category Model
```tsx
export type CategoryProps = {
  _id: string;
  name: string;
  createdAt: string;
  value?: boolean;
};

class Category {
  protected props: CategoryProps;
  constructor(props: CategoryProps) {
    this.props = props;
  }
  public static build(props: CategoryProps) {
    return new Category(props);
  }
  get name(): string {
    return this.props.name;
  }
  get createdAt(): string {
    return this.props.createdAt;
  }
  format(): CategoryProps {
    return {
      _id: this.props._id,
      name: this.props.name,
      value: false,
      createdAt: new Date(this.props.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
  }
}
export const categoryModel = (props: CategoryProps) => Category.build(props);
```
Esse trecho de código apresenta a definição de um modelo para a entidade "Categoria" em uma aplicação. O modelo é implementado como uma classe chamada "Category", que recebe como argumento um objeto com as propriedades esperadas para uma categoria: "_id" (identificador único), "name" (nome) e "createdAt" (data de criação).

A classe Category possui um método estático chamado "build", que cria uma nova instância da classe a partir dos argumentos passados. Além disso, possui também um método chamado "format", que retorna as informações da categoria formatadas de acordo com a conveniência da aplicação.

Por fim, é exportada uma função chamada "categoryModel", que recebe um objeto com as propriedades da categoria e retorna uma nova instância da classe Category, criada com base nesses argumentos. Essa função pode ser usada para criar novas instâncias da classe de forma mais simples em outros lugares da aplicação.
## Category API
```tsx
import { setupAPIClient } from "shared/api";
import { CategoryProps, categoryModel } from "./category.model";
export type GetCategorysResponse = {
  categorys: CategoryProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getCategorys = async (
  page: number,
  ctx: any
): Promise<GetCategorysResponse> => {
  const { data } = await setupAPIClient(ctx).get("/category/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc" },
  });
  const { categorys, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    categorys: categorys?.map?.((props: CategoryProps) => categoryModel(props).format()),
    totalCount,
  };
  if (lastPage > page) {
    Object.assign(response, { next: page + 1 });
  }
  if (page > 1) {
    Object.assign(response, { prev: page - 1 });
  }
  return response;
};
type InfiniteProps = {
  pageParam: number;
  ctx: any;
};
export const getInfiniteCategorys = async ({
  pageParam = 1,
  ctx,
}: InfiniteProps): Promise<GetCategorysResponse> => {
  return getCategorys(pageParam, ctx);
};
```
Esse código é responsável por definir as funções de comunicação com a API relacionadas às categorias no front-end.

A função `getCategorys` é utilizada para fazer uma requisição GET para o endpoint `/category/loadByPage`, passando como parâmetros a página e a ordenação dos resultados por data de criação. Em seguida, são tratados os dados recebidos, que contêm uma lista de categorias e o número total de registros. A função então retorna um objeto contendo a lista de categorias formatadas com o auxílio do modelo de categoria (`categoryModel`), além do total de registros.

A constante `registerByPage` define o número de registros que serão carregados por página, e é usada para calcular o número total de páginas.

A função `getInfiniteCategorys` utiliza a biblioteca React Query para criar uma consulta infinita, que permite que a lista de categorias seja carregada dinamicamente à medida que o usuário rola a página. Ela recebe um objeto contendo o número da página e o contexto, e simplesmente chama a função `getCategorys`.

Em resumo, essas funções facilitam o consumo da API relacionada às categorias no front-end, permitindo que as informações sejam recuperadas e tratadas de forma organizada e prática.
## Category Lib
```tsx
import { getCategorys, getInfiniteCategorys } from "./category.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetCategorys = (
  page: number,
  options?: UseQueryOptions,
  ctx?: any
): any => {
  return useQuery(["categorys", page], () => getCategorys(page, ctx), {
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteCategorys = (options?: UseInfiniteQueryOptions) => {
  return useInfiniteQuery(["categorys"], () => getInfiniteCategorys, options as any);
};
```
Esse código exporta duas funções personalizadas de hook, `useGetCategorys` e `useGetInfiniteCategorys`, que são construídas usando o `useQuery` e `useInfiniteQuery` do pacote `@tanstack/react-query`. Esses hooks são usados para fazer consultas em cache e em tempo real de uma lista de categorias, utilizando a `Category API` que foi explicada anteriormente.

A função `useGetCategorys` recebe como parâmetros o número da página, opções para a consulta (como tempo de cache), e um objeto de contexto. Ela retorna um objeto contendo o estado da consulta. Quando a consulta é feita pela primeira vez, o `useQuery` irá buscar os dados da API e armazená-los em cache por um tempo determinado. Se o cache ainda for válido, ele irá retornar imediatamente os dados armazenados em cache. Caso contrário, ele irá fazer uma nova consulta na API para buscar dados atualizados.

A função `useGetInfiniteCategorys` é similar, mas é usada para consultas infinitas, ou seja, quando há uma lista de itens que pode crescer continuamente. Ela também recebe opções de consulta e retorna um objeto de estado. Nesse caso, o `useInfiniteQuery` é utilizado para buscar os dados. Ele permite que os dados sejam carregados de forma incremental, à medida que o usuário rola a lista de itens, de forma a evitar carregar muitos dados de uma vez só. Ele também armazena os dados em cache para evitar buscas desnecessárias.

Em resumo, essas funções personalizadas de hook simplificam a consulta e gerenciamento de dados de uma lista de categorias utilizando o React Query, permitindo uma maior reutilização de código e melhorando a performance do aplicativo.
## categorys/[page]
```tsx
import { CategoryListTablePage } from "screens/category/list/table";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "shared/libs/utils";
import { getCategorys } from "entidades/category/category.api";
export const getServerSideProps: GetServerSideProps = withSSRAuth(async (context) => {
  const page = Number(context?.query?.page ?? 1);
  const data = await getCategorys(page, context);
  return {
    props: {
      data,
      page,
    },
  };
});

export default CategoryListTablePage;
```
Esse trecho de código configura a página que lista as categorias da aplicação no lado do servidor (SSR). Ele define a função `getServerSideProps`, que é executada pelo Next.js antes de renderizar a página, para buscar as informações de categoria da API utilizando a função `getCategorys` do arquivo `category.api.ts`.

Essa função recebe um objeto de contexto, que é uma forma do Next.js compartilhar informações entre as diferentes fases do processo de renderização da página. A função também verifica o valor do parâmetro de consulta `page` na URL da página, que é passado pelo usuário, ou assume o valor padrão 1 se não houver nenhum valor.

Depois de obter as informações de categoria, a função `getServerSideProps` retorna um objeto com as informações buscadas e o valor da página atual para serem passados para a página `CategoryListTablePage`. Essas informações são acessadas pela página por meio das props.
## CategoryListTablePage
```tsx
import { Box, GenericTable, Head } from "shared/ui";
import { GetCategorysResponse } from "entidades/category/category.api";
import { useCategoryList } from "../categoryList.hook";
type CategoryListTablePageProps = {
  data: GetCategorysResponse;
  page: number;
};
const Text = ({ id, ...data }: any) => {
  return <h1 data-testid={"h1TestId" + id}>{data[id]}</h1>;
};
export const CategoryListTablePage = ({
  page = 0,
  data = { categorys: [], totalCount: 0, next: 0, prev: 0 },
}: CategoryListTablePageProps) => {
  console.log({ data });
  const { categorys, setCategorys, handlePrefetchCategory, deleteSelectedAction } =
    useCategoryList({
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
      </Box>
    </>
  );
};
```
O arquivo `CategoryListTablePage` exporta o componente funcional que define a página de listagem de categorias da aplicação.

O componente recebe as seguintes props:

* `page`: um número que indica a página atual de resultados da listagem (default: 0);
* `data`: um objeto contendo a lista de categorias (`categorys`), o total de categorias (`totalCount`) e as páginas anterior (`prev`) e próxima (`next`) disponíveis (default: objeto vazio).

A função `useCategoryList` é chamada para gerenciar o estado da lista de categorias. Esta função é responsável por retornar objetos com métodos para atualizar e manipular a lista de categorias.

O componente renderiza um `Head` com informações sobre a página. Em seguida, é exibido um `GenericTable` que recebe as seguintes props:

* `deleteSelectedAction`: função que será executada ao selecionar uma categoria para ser deletada;
* `isLoading`: booleano que indica se a tabela está em processo de carregamento de dados;
* `items`: array contendo as categorias listadas;
* `fields`: um array contendo as informações das colunas da tabela. Cada objeto do array contém as propriedades `id`, `label`, `displayKeyText` e `children` (opcional);
* `setItems`: função para atualizar o array de categorias listadas;
* `linkOnMouseEnter`: função que será executada ao passar o mouse sobre um link de categoria;
* `error`: uma mensagem de erro, caso ocorra;
* `route`: a rota para a página de detalhes da categoria;
* `routeCreate`: a rota para a página de criação de categorias;
* `routeList`: a rota para a página de listagem de categorias;
* `title`: o título da tabela.

O componente também define um componente funcional `Text` que recebe uma propriedade `id` e um objeto `data`, e renderiza um `h1` com o valor da propriedade do objeto correspondente ao `id`.

No geral, o componente `CategoryListTablePage` é responsável por renderizar a tabela de listagem de categorias e gerenciar o estado da lista de categorias. Ele utiliza o hook `useCategoryList` para manipular as informações exibidas na tabela e renderiza um `Head` com informações da página.
## Category List Hook
```tsx
import { GetCategorysResponse } from "entidades/category/category.api";
import { useState } from "react";
import { useUi } from "shared/libs";
import { api, queryClientInstance } from "shared/api";
import { useMutation } from "@tanstack/react-query";
import { CategoryProps } from "entidades/category";
type CategoryListHook = {
  initialData: GetCategorysResponse;
  page: number;
};
export const useCategoryList = (data: CategoryListHook) => {
  const { showModal } = useUi();
  const [page, setPage] = useState(data.page);
  const [categorys, setCategorys] = useState(data.initialData.categorys);
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
  return {
    categorys,
    setCategorys,
    handlePrefetchCategory,
    deleteSelectedAction,
    page,
    setPage,
  };
};
```
Esse trecho de código implementa um hook customizado chamado `useCategoryList`. Ele recebe um objeto `data` contendo as informações iniciais da listagem de categorias e a página atual da listagem. O hook retorna um objeto com as seguintes propriedades:

* `categorys`: um estado contendo as categorias atualmente exibidas na listagem;
* `setCategorys`: uma função para atualizar o estado de categorias;
* `handlePrefetchCategory`: uma função que recebe como argumento um objeto de categoria e realiza uma busca prévia na API para buscar informações adicionais dessa categoria;
* `deleteSelectedAction`: uma função que deleta as categorias selecionadas na listagem;
* `page`: um estado contendo a página atual da listagem;
* `setPage`: uma função para atualizar o estado da página atual da listagem.

O hook utiliza vários recursos do React, como o `useState` para criar os estados de `categorys` e `page`, além do `useUi` para utilizar um componente de modal compartilhado pela aplicação. Ele também faz uso da biblioteca `react-query` para realizar requisições à API. A função `deleteCategory` é uma função assíncrona que usa a `api` para deletar as categorias selecionadas. Em caso de sucesso, as queries do `queryClientInstance` são atualizadas; em caso de erro, um modal é exibido. A função `deleteSelectedAction` usa a função `mutateAsync` da biblioteca `react-query` para realizar a deleção das categorias selecionadas.

## Perceberam a organização?
Uma boa arquitetura front-end é fundamental para garantir a escalabilidade, manutenção e evolução de um projeto. Cada arquivo e módulo deve ter uma responsabilidade clara e estar bem organizado dentro da estrutura do projeto.

No contexto dos arquivos vistos anteriormente, podemos destacar a importância de cada um deles dentro de uma arquitetura front-end bem estruturada:

* `category.model.ts`: Este arquivo contém as definições de tipos e interfaces relacionados a categorias. Isso inclui tipos para as respostas da API, como `GetCategoriesResponse`, bem como a definição da interface `CategoryProps`, que define as propriedades de uma categoria. Manter essas definições em um único lugar ajuda a garantir consistência em todo o código que lida com categorias, tornando o código mais fácil de entender e manter.

* `category.api.ts`: Esse arquivo é responsável por lidar com a comunicação entre a aplicação front-end e a API backend, definindo as chamadas HTTP e o formato dos dados que são esperados. É importante que essa camada de comunicação esteja bem definida e organizada, para que seja fácil adicionar novas chamadas HTTP e manter a consistência dos dados.

* `category.lib.ts`: Este arquivo contém funções auxiliares para lidar com a biblioteca `@tanstack/react-query`. Como o nome sugere, as funções aqui definidas ajudam a lidar com as queries relacionadas à categoria, como prefetch, cache invalidation, entre outras. Algumas das funções definidas aqui incluem `useCategory`, que retorna um hook personalizado para lidar com uma única categoria, e `useCategoryList`, que retorna um hook para lidar com a listagem de categorias.
    
* `CategoryListTablePage.tsx`: Esse arquivo é responsável por renderizar a tabela de categorias e controlar o estado dos dados da página. É importante que essa página seja bem estruturada e modularizada, para que seja fácil adicionar novas funcionalidades, manter o código e garantir a escalabilidade do projeto.
    
* `CategoryListHook.tsx`: Esse arquivo é um hook personalizado que encapsula a lógica de negócio relacionada à lista de categorias. Essa separação de responsabilidades é importante para manter o código limpo e coeso, facilitando a manutenção e evolução do projeto.
    
* `api.ts`: Esse arquivo é responsável por criar uma instância do cliente HTTP (axios) que será utilizada para realizar as chamadas HTTP na aplicação. É importante que essa camada de comunicação esteja bem organizada e encapsulada, para que seja fácil adicionar novas configurações e opções de autenticação.
    
* `@tanstack/react-query`: É uma biblioteca que oferece uma solução de gerenciamento de estado e caching para chamadas HTTP. É importante utilizar uma biblioteca desse tipo para garantir a escalabilidade da aplicação e evitar problemas de desempenho e consistência de dados.
    
Ao utilizar uma arquitetura bem definida e modularizada, com arquivos e módulos bem separados e responsáveis, é possível garantir a escalabilidade, manutenção e evolução de um projeto front-end, facilitando o trabalho da equipe de desenvolvimento e melhorando a experiência do usuário final.

Imagine dar manutenção num projeto em que toda essa lógica estivesse presente num arquivo só? Já pensou? Dar manutenção em um projeto com toda essa lógica em um único arquivo seria bastante difícil e propenso a erros.

Ter todo o código em um único arquivo dificultaria a compreensão do fluxo de dados e das responsabilidades de cada parte da aplicação. Além disso, seria difícil testar o código, pois seria necessário testar todas as funcionalidades do arquivo ao mesmo tempo.

Ao separar o código em diferentes arquivos, seguindo uma estrutura de arquitetura bem definida, torna-se mais fácil entender a funcionalidade de cada arquivo e sua interação com os demais, tornando a manutenção do código mais eficiente.

Com essa abordagem, é possível modificar uma parte específica da aplicação sem afetar o restante, tornando a correção de bugs e adição de novas funcionalidades mais simples e seguras. Além disso, a separação de responsabilidades também permite a reutilização de código em diferentes partes da aplicação.


