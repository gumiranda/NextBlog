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
  console.log("data", data);
  console.log("error", error);
  console.log("hasNextPage", hasNextPage);
  console.log("isFetching", isFetching);
  console.log("isFetchingNextPage", isFetchingNextPage);
  console.log("status", status);
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
