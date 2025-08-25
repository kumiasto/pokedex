import clsx from "clsx";
import React from "react";

const typeStyles = {
  Normal: "bg-[#A8A77A]",
  Fire: "bg-[#EE8130]",
  Water: "bg-[#6390F0]",
  Electric: "bg-[#F7D02C]",
  Grass: "bg-[#7AC74C]",
  Ice: "bg-[#96D9D6]",
  Fighting: "bg-[#C22E28]",
  Poison: "bg-[#A33EA1]",
  Ground: "bg-[#E2BF65]",
  Flying: "bg-[#A98FF3]",
  Psychic: "bg-[#F95587]",
  Bug: "bg-[#A6B91A]",
  Rock: "bg-[#B6A136]",
  Ghost: "bg-[#735797]",
  Dragon: "bg-[#6F35FC]",
  Dark: "bg-[#705746]",
  Steel: "bg-[#B7B7CE]",
  Fairy: "bg-[#D685AD]",
};

type PokemonTypeProps = {
  type: Array<keyof typeof typeStyles>;
};

function PokemonType({ type }: PokemonTypeProps) {
  return (
    <div className="flex gap-2">
      {type.map((t) => (
        <div
          key={t}
          className={clsx(
            "px-2 py-1 rounded-xl uppercase font-semibold text-[10px] text-gray-50",
            typeStyles[t],
          )}
        >
          {t}
        </div>
      ))}
    </div>
  );
}

export default PokemonType;
