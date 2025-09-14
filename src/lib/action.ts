import type { Pokemon, PokemonDetails, PokemonEvolution } from "@/lib/types/pokemon";

type TypesEntryRaw = { type: { name: string; url: string } };
type SpritesRaw = {
  front_default?: string | null;
  other?: {
    home?: { front_default?: string | null };
    ["official-artwork"]?: { front_default?: string | null };
    showdown?: { front_default?: string | null };
  };
};
type AbilityRaw = { ability: { name: string } };
type StatRaw = { base_stat: number; stat: { name: string } };
type PokemonRaw = {
  id: number;
  name: string;
  sprites: SpritesRaw;
  types: TypesEntryRaw[];
  abilities: AbilityRaw[];
  stats: StatRaw[];
  height: number;
  weight: number;
  base_experience: number;
};
type SpeciesRaw = { evolution_chain?: { url?: string } };
type EvolutionNode = { species: { name: string }; evolves_to: EvolutionNode[] };
type EvolutionChainRaw = { chain: EvolutionNode };
type TypeResourceRaw = { damage_relations?: { double_damage_from?: { name: string }[] } };

export async function getPokemon(
  query: string | undefined,
): Promise<Pokemon | null> {
  if (!query?.trim()) return null;

  const API_URL = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) return null;
    const pokemon: PokemonRaw = await response.json();

    const image =
      // Prefer small sprite for list/search speed
      pokemon?.sprites?.front_default ??
      pokemon?.sprites?.other?.home?.front_default ??
      pokemon?.sprites?.other?.["official-artwork"]?.front_default ??
      pokemon?.sprites?.other?.showdown?.front_default ??
      "/vercel.svg";

    return {
      id: pokemon.id,
      name: pokemon.name,
      image,
      types: pokemon.types.map((t) => t.type.name),
    } satisfies Pokemon;
  } catch (e) {
    console.error("Pokemon search failed:", e);
    return null;
  }
}

export async function getPokemons(offset: number): Promise<Pokemon[]> {
  const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=24&offset=${offset}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) return [];
    const { results }: { results: { name: string; url: string }[] } = await response.json();

    const pokemons: Array<PokemonRaw | null> = await Promise.all(
      results.map(async ({ url }) => {
        const res = await fetch(url);
        if (!res.ok) return null;
        const poke: PokemonRaw = await res.json();
        return poke;
      }),
    );

    return pokemons
      .filter((p): p is PokemonRaw => Boolean(p))
      .map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        image:
          // Prefer small sprite for list speed
          pokemon?.sprites?.front_default ??
          pokemon?.sprites?.other?.home?.front_default ??
          pokemon?.sprites?.other?.["official-artwork"]?.front_default ??
          pokemon?.sprites?.other?.showdown?.front_default ??
          "/vercel.svg",
        types: pokemon.types.map((t) => t.type.name),
      }));
  } catch (e) {
    console.error("Pokemon list fetch failed:", e);
    return [];
  }
}

export async function getPokemonDetails(
  query: string | undefined,
): Promise<PokemonDetails | null> {
  if (!query?.trim()) return null;
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) return null;
    const pokemon: PokemonRaw = await res.json();

    const image =
      pokemon?.sprites?.other?.home?.front_default ??
      pokemon?.sprites?.other?.["official-artwork"]?.front_default ??
      pokemon?.sprites?.front_default ??
      pokemon?.sprites?.other?.showdown?.front_default ??
      "/vercel.svg";

    const abilities: string[] = pokemon.abilities
      ?.map((a) => a.ability.name)
      .filter(Boolean);

    const stats: { name: string; value: number }[] = pokemon.stats?.map(
      (s) => ({
        name: s.stat.name,
        value: s.base_stat,
      }),
    );

    const typeUrls: string[] = pokemon.types?.map((t) => t.type.url);
    const typeResponses: Array<TypeResourceRaw | null> = await Promise.all(
      typeUrls.map(async (url) => {
        try {
          const r = await fetch(url);
          if (!r.ok) return null;
          const data: TypeResourceRaw = await r.json();
          return data;
        } catch {
          return null;
        }
      }),
    );
    const weaknessesSet = new Set<string>();
    for (const tr of typeResponses) {
      const list = tr?.damage_relations?.double_damage_from || [];
      for (const item of list) {
        if (item?.name) weaknessesSet.add(item.name);
      }
    }

    const details: PokemonDetails = {
      id: pokemon.id,
      name: pokemon.name,
      image,
      types: pokemon.types.map((t) => t.type.name),
      height: Number((pokemon.height / 10).toFixed(1)),
      weight: Number((pokemon.weight / 10).toFixed(1)),
      baseExperience: pokemon.base_experience,
      abilities,
      stats,
      weaknesses: Array.from(weaknessesSet),
    };

    return details;
  } catch (e) {
    console.error("Pokemon details fetch failed:", e);
    return null;
  }
}

export async function getEvolutionChain(
  name: string,
): Promise<PokemonEvolution[]> {
  if (!name?.trim()) return [];
  try {
    const speciesRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${name.toLowerCase()}`,
    );
    if (!speciesRes.ok) return [];
    const species: SpeciesRaw = await speciesRes.json();
    const evoUrl: string | undefined = species?.evolution_chain?.url;
    if (!evoUrl) return [];

    const evoRes = await fetch(evoUrl);
    if (!evoRes.ok) return [];
    const evo: EvolutionChainRaw = await evoRes.json();

    const pairs: { name: string; stage: number }[] = [];
    const walk = (node: EvolutionNode, depth: number) => {
      if (node?.species?.name)
        pairs.push({ name: node.species.name, stage: depth });
      (node?.evolves_to || []).forEach((child: EvolutionNode) =>
        walk(child, depth + 1),
      );
    };
    walk(evo?.chain, 1);
    if (!pairs.length) return [];

    const entries = await Promise.all(
      pairs.map(async ({ name: n, stage }) => {
        try {
          const pRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${n.toLowerCase()}`,
          );
          if (!pRes.ok) return null;
          const p: PokemonRaw = await pRes.json();
          const image =
            p?.sprites?.other?.home?.front_default ??
            p?.sprites?.other?.["official-artwork"]?.front_default ??
            p?.sprites?.front_default ??
            p?.sprites?.other?.showdown?.front_default ??
            "/vercel.svg";
          return {
            id: p.id,
            name: p.name,
            image,
            types: p.types.map((t) => t.type.name),
            stage,
          } as PokemonEvolution;
        } catch {
          return null;
        }
      }),
    );

    return entries.filter(Boolean) as PokemonEvolution[];
  } catch (e) {
    console.error("Evolution chain fetch failed:", e);
    return [];
  }
}
