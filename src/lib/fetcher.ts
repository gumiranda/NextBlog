import useSWR from "swr";

export function useFetch(url: string, revalidateOnFocus: boolean = false) {
  const { data, error } = useSWR(
    url,
    async (newUrl) => {
      const response = await fetch(newUrl);
      return response.json();
    },
    { revalidateOnFocus },
  );

  return { data, error };
}
