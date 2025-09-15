export type Pokemon = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

export type PokemonDetails = Pokemon & {
  height: number;
  weight: number;
  baseExperience: number;
  abilities: string[];
  stats: { name: string; value: number }[];
  weaknesses: string[];
};

export type PokemonEvolution = Pokemon & {
  stage: number;
};

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
export type PokemonRaw = {
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
export type SpeciesRaw = { evolution_chain?: { url?: string } };
export type EvolutionNode = {
  species: { name: string };
  evolves_to: EvolutionNode[];
};
export type EvolutionChainRaw = { chain: EvolutionNode };
export type TypeResourceRaw = {
  damage_relations?: { double_damage_from?: { name: string }[] };
};
