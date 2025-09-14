import Image from "next/image";
import { ReactNode } from "react";
import clsx from "clsx";
import PokemonType from "@/components/pokemon/pokemon-type";
import { getPokemonDetails, getEvolutionChain } from "@/lib/action";
import BackLink from "@/components/ui/back-link";
import Link from "next/link";

// Normalization cap for base stats (historic max in games)
const MAX_BASE_STAT = 255;

type PokemonDataProps = {
  data: ReactNode;
  label?: string;
  className?: string;
};

function PokemonData({ label, data, className }: PokemonDataProps) {
  return (
    <div className="flex flex-col justify-center gap-1">
      {label ? (
        <p className="uppercase text-center font-semibold text-[10px]">
          {label}
        </p>
      ) : null}
      <div
        className={clsx(
          "px-2 bg-gray-100 py-1 text-gray-900 rounded-xl uppercase font-semibold text-[10px] text-center",
          className,
        )}
      >
        {data}
      </div>
    </div>
  );
}

type PageProps = {
  params: { name: string };
};

export default async function Page({ params }: PageProps) {
  const { name } = params;
  const [pokemon, evolution] = await Promise.all([
    getPokemonDetails(name),
    getEvolutionChain(name),
  ]);

  if (!pokemon) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6">
        <div className="relative mb-4">
          <BackLink />
        </div>
        <p className="text-sm text-gray-700">No Pokémon found.</p>
      </div>
    );
  }

  function StatRow({ name, value }: { name: string; value: number }) {
    const pct = Math.min(100, Math.round((value / MAX_BASE_STAT) * 100));

    return (
      <div className="flex items-center gap-3">
        <span className="w-24 uppercase text-[10px] font-semibold text-gray-700">
          {name}
        </span>
        <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500" style={{ width: `${pct}%` }} />
        </div>
        <span className="w-14 text-[10px] font-semibold text-gray-900 text-right">
          {value}/{MAX_BASE_STAT}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="relative mb-8">
        <div className="absolute left-0 top-0">
          <BackLink />
        </div>
        <div className="flex flex-col items-center gap-3">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={180}
            height={180}
            className="drop-shadow-md"
          />
          <h1 className="text-4xl font-extrabold text-gray-900 capitalize">
            {pokemon.name}
          </h1>
          <PokemonType types={pokemon.types} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <PokemonData label="Height" data={`${pokemon.height} m`} />
        <PokemonData label="Weight" data={`${pokemon.weight} kg`} />
        <PokemonData label="Base Exp" data={`${pokemon.baseExperience}`} />
      </div>

      <div className="mb-6">
        <p className="uppercase text-center font-semibold text-[10px] mb-2">
          Abilities
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {pokemon.abilities.map((a) => (
            <span
              key={a}
              className="px-2 py-1 rounded-xl uppercase font-semibold text-[10px] text-gray-50 bg-gray-800"
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="uppercase text-center font-semibold text-[10px] mb-2">
          Stats
        </p>
        <div className="flex flex-col gap-2">
          {pokemon.stats.map((s) => (
            <StatRow key={s.name} name={s.name} value={s.value} />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="uppercase text-center font-semibold text-[10px] mb-2">
          Weaknesses
        </p>
        {pokemon.weaknesses.length ? (
          <div className="flex justify-center">
            <PokemonType types={pokemon.weaknesses} />
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="text-[12px] text-gray-600">None</span>
          </div>
        )}
      </div>

      <div>
        <p className="uppercase text-center font-semibold text-[10px] mb-2">
          Evolution
        </p>
        {evolution.length ? (
          <div className="flex flex-wrap items-center justify-center gap-6">
            {evolution
              .filter((p) => p.name !== pokemon.name)
              .map((p) => (
                <Link
                  href={`/pokemon/${p.name}`}
                  key={p.id}
                  className="flex flex-col items-center gap-2 group"
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={72}
                    height={72}
                    className="rounded-full bg-gray-100 p-2 group-hover:scale-105 transition"
                  />
                  <span className="text-xs font-semibold capitalize text-gray-900">
                    {p.name}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-600">
                    Stage {p.stage}
                  </span>
                  <div className="scale-90">
                    <PokemonType types={p.types} />
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="text-[12px] text-gray-600">None</span>
          </div>
        )}
      </div>
    </div>
  );
}
