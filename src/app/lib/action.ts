export async function searchPokemon(query: string | undefined): Promise<any> {
  if (!query?.trim()) {
    return null;
  }

  const API_URL = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;

  const response = await fetch(API_URL);

  if (!response.ok) {
    return null;
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      return null;
    }
    const pokemon = await response.json();

    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other.showdown.front_default,
      types: pokemon.types.map((t: any) => t.type.name),
    } as Pokemon;
  } catch (e) {
    console.error("Pokemon search failed:", e);
    return null;
  }
}

export async function getPokemons(offset: number) {
  const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=24&offset=${offset}`;

  const response = await fetch(API_URL);

  if (!response.ok) {
    return null;
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      return null;
    }
    const { results } = await response.json();

    const pokemons = await Promise.all(
      results.map(async ({ url }) => {
        const res = await fetch(url);
        return res.json();
      }),
    );

    return pokemons.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other.showdown.front_default,
      types: pokemon.types.map((t: any) => t.type.name),
    }));
  } catch (e) {
    console.error("Pokemon search failed:", e);
    return null;
  }
}
