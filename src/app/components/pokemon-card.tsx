"use client";

import Image from "next/image";
import React from "react";
import PokemonType from "./pokemon-type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Pokemon({ pokemon }: { pokemon: Pokemon }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("id", pokemon.id.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer border border-gray-100 relative w-100px h-100px bg-gray-50 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-center items-center gap-2 p-6"
    >
      <div className="absolute -top-7 w-[50px] h-[50px]">
        <Image src={pokemon.image} alt="" fill className="object-contain" />
      </div>
      <h2 className="text-xl font-bold mt-8 text-gray-900 capitalize">
        {pokemon.name}
      </h2>
      <PokemonType types={pokemon.types} />
    </button>
  );
}

export default Pokemon;
