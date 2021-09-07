---
title: 'Paginação no React Query'
excerpt: 'Nesse post você vai aprender paginação na lib React Query.'
coverImage: 'https://avatars.githubusercontent.com/u/13774579?v=4'
date: '2021-09-07T08:35:07.322Z'
author:
  name: Gustavo Miranda
  picture: 'https://avatars.githubusercontent.com/u/13774579?v=4'
ogImage:
  url: 'https://avatars.githubusercontent.com/u/13774579?v=4'
---
Fala Dev Doido!! Já sofreu com paginação? Seus problemas acabaram.
No React Query o jeito mais simples é o seguinte:

```javascript
 const result = useQuery(['projects', page], fetchProjects)
```

Mas claro que o mais simples nem sempre é o ideal... 
Se você rodar esse código notará que o state da query fica alternando entre os states de sucesso e loading. Isso porque cada página neste caso é tratada como uma nova query.

## E agora Dev Doido?

![Confused John Travolta GIF - Confused John Travolta What GIFs](https://c.tenor.com/9ud1r4sc-QQAAAAM/confused-john-travolta.gif)

Calma gente, ainda há salvação. O pessoal da lib React Query sabia disso e criou uma prop específica pra paginação chamada ``keepPreviousData``. É só colocar ela no objeto config como true e pronto. Veja o exemplo abaixo:

```javascript
import { useQuery } from "react-query";
import { useState } from "react";
export default function PageExample() {
  const [page, setPage] = useState(1);
  const [breweries, setBreweries] = useState([]);
  const fetchBreweries = (newPage = 1) =>
    fetch("https://api.openbrewerydb.org/breweries?page=" + newPage)
      .then((res) => res.json())
      .then((resJson) => setBreweries((prev) => [...prev, ...resJson]));

  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery(
    ["breweries", page],
    () => fetchBreweries(page),
    { keepPreviousData: true },
  );

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {breweries.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          if (!isPreviousData) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousData}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}
    </div>
  );
}
```

## Hook useInfiniteQuery

Temos também a hook ``useInfiniteQuery`` pra fazer esse trabalho de paginação.
Quando usamos ela, notamos que coisas diferentes acontecem, como por exemplo:
1. ``data`` agora é um objeto contendo dados infinitos.
2. ``data.pages`` é um array contendo cada página carregada.
3. ``data.pageParams`` é um array contendo os parâmetros usados pela paginação para carregar essas páginas.
4. As funções ``fetchNextPage`` e ``fetchPreviousPage`` agora existem.
5. As opções ``getNextPageParam`` e ``getPreviousPageParam`` agora estão disponíveis para determinar se existem mais dados para serem carregados e a informação contida neles. Essa informação é fornecida como um parâmetro adicional na query function ( que pode ser sobrescrito opcionalmente pelo override das funções ``fetchNextPage`` e ``fetchPreviousPage``).
6. Agora temos um booleano chamado ``hasPreviousPage`` tendo valor ``true`` se ``getPreviousPageParam`` retornar algum valor.
7. Os booleanos ``isFetchingNextPage`` e ``isFetchingPreviousPage`` agora estão disponíveis e podem ser identificados entre um refresh feito em segundo plano e um carregamento de mais dados.

```javascript
import { useInfiniteQuery } from "react-query";

export default function PageExample() {
  const fetchBreweries = ({ pageParam = 1 }) =>
    fetch("https://api.openbrewerydb.org/breweries?page=" + pageParam)
      .then((res) => res.json())
      .then((res) => {
        return { results: res, next: pageParam + 1, prev: pageParam - 1 };
      });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("breweries", fetchBreweries, {
    getNextPageParam: (lastPage, pages) => lastPage.next,
    getPreviousPageParam: (firstPage, pages) => firstPage.prev,
  });

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((group, i) => (
        <>
          {group.results.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </>
      ))}
      <div>
        <button
          onClick={() => {
            fetchNextPage();
          }}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}
```
Neste exemplo podemos ver uma API pública, em que retornamos os dados e na propriedade ``next`` indicamos se temos mais dados a serem carregados, incrementando sempre o número da página. Mesma coisa vemos na propriedade ``prev`` pra indicar se existe uma página anterior.

Bom por hoje é só pessoal, até mais!