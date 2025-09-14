"use client";

import Image from "next/image";
import React, { useState } from "react";
import PokemonType from "./pokemon-type";
import { useRouter } from "next/navigation";
import type { Pokemon } from "@/lib/types/pokemon";
import clsx from "clsx";

function Pokemon({ pokemon }: { pokemon: Pokemon }) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      onClick={() => router.push(`/pokemon/${pokemon.name}`)}
      className="cursor-pointer border border-gray-100 relative bg-gray-50 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-center items-center gap-2 p-6"
    >
      <div className="absolute -top-9 w-[75px] h-[75px]">
        <Image
          src={pokemon?.image ?? "/vercel.svg"}
          alt={pokemon?.name ?? ""}
          width={75}
          height={75}
          className={clsx(
            "object-contain transition-opacity duration-300 ease-out",
            loaded ? "opacity-100" : "opacity-0",
          )}
          unoptimized
          onLoadingComplete={() => setLoaded(true)}
        />
      </div>
      <h2 className="text-xl font-bold mt-10 text-gray-900 capitalize">
        {pokemon.name}
      </h2>
      <PokemonType types={pokemon.types} />
    </button>
  );
}

export default Pokemon;
