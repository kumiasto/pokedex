import clsx from "clsx";
import React from "react";

const typeStyles = {
  normal: "bg-[#A8A77A]",
  fire: "bg-[#EE8130]",
  water: "bg-[#6390F0]",
  electric: "bg-[#F7D02C]",
  grass: "bg-[#7AC74C]",
  ice: "bg-[#96D9D6]",
  fighting: "bg-[#C22E28]",
  poison: "bg-[#A33EA1]",
  ground: "bg-[#E2BF65]",
  flying: "bg-[#A98FF3]",
  psychic: "bg-[#F95587]",
  bug: "bg-[#A6B91A]",
  rock: "bg-[#B6A136]",
  ghost: "bg-[#735797]",
  dragon: "bg-[#6F35FC]",
  dark: "bg-[#705746]",
  steel: "bg-[#B7B7CE]",
  fairy: "bg-[#D685AD]",
};

type PokemonTypeProps = {
  types: Array<keyof typeof typeStyles>;
};

function PokemonType({ types }: PokemonTypeProps) {
  return (
    <div className="flex gap-2">
      {types?.map((type) => (
        <div
          key={type}
          className={clsx(
            "px-2 py-1 rounded-xl uppercase font-semibold text-[10px] text-gray-50",
            typeStyles[type],
          )}
        >
          {type}
        </div>
      ))}
    </div>
  );
}

export default PokemonType;
