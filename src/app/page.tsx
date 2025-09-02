import PokemonList from "./components/pokemon-list";
import PokemonDetails from "./components/pokemon-details";
import SearchInput from "./components/search-input";
import { getPokemons, searchPokemon } from "./lib/action";

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const { query } = await searchParams;

  const initialPokemons = await getPokemons(0);
  const searchedPokemon = query ? await searchPokemon(query) : null;

  return (
    <main className="min-h-full w-[1100px] mx-auto">
      <h1 className="header">Pokedex</h1>
      <SearchInput />
      <section className="w-full flex flex-col content mt-3">
        <PokemonList
          initialPokemons={initialPokemons}
          searchedPokemon={searchedPokemon}
        />
      </section>
      <section className="w-[300px] shadow-2xl rounded-2xl sidebar">
        <PokemonDetails />
      </section>
    </main>
  );
}
