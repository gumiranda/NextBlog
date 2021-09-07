import { useQuery } from "react-query";
import axios from "axios";

export default function PageOfPokemons() {
  const result = useQuery("getAllPokemons", getPokemons);
  const { status, data, error } = result || {};
  if (status === "loading") {
    return <span>Loading...</span>;
  }
  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  // Nesse ponto já assumimos que `isSuccess === true`
  return <div>{data && <p>{JSON.stringify(data)}</p>}</div>;
}
const getPokemons = async () => {
  try {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=50");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
