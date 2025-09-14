import PokemonList from "@/components/pokemon/pokemon-list";
import SearchInput from "@/components/search/search-input";
import PokedexLogo from "@/components/ui/pokedex-logo";
import { getPokemons, getPokemon } from "@/lib/action";

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const { query } = searchParams;

  const initialPokemons = await getPokemons(0);
  const searchedPokemon = query ? await getPokemon(query) : null;

  return (
    <main className="home-grid">
      <PokedexLogo className="header mt-6" />
      <SearchInput />
      <section className="w-full flex flex-col content mt-3">
        <PokemonList
          initialPokemons={initialPokemons}
          searchedPokemon={searchedPokemon}
          query={query}
        />
      </section>
    </main>
  );
}
