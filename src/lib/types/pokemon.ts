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
