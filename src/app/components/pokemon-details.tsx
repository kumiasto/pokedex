import Image from "next/image";
import { ReactNode } from "react";
import PokemonType from "./pokemon-type";
import clsx from "clsx";

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

function PokemonDetails() {
  return (
    <div className="flex flex-col w-full relative items-center gap-4 p-6 bg-gray-50 min-h-full">
      <Image
        className="absolute -top-14"
        src="/image/1.gif"
        alt={""}
        width={100}
        height={100}
      />
      <h3 className="mt-18 text-3xl font-bold text-gray-900">Bulbasaur</h3>
      <PokemonType type={["Ice", "Fighting"]} />
      <p className="text-center text-gray-700 my-3 text-[12px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit atque
        quis placeat minus ipsa tempore.
      </p>
      <div className="w-full flex-col flex gap-1">
        <p className="uppercase text-center font-semibold text-[10px]">
          Abilities
        </p>
        <div className="grid grid-cols-2 w-full gap-2">
          <PokemonData data="Razor" />
          <PokemonData data="Defiant" />
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-x-2 gap-y-4">
        <PokemonData label="Height" data="1.7m" />
        <PokemonData label="Weight" data="74kg" />
        <PokemonData label="Weaknesses" data="1.7m" />
        <PokemonData label="Base Exp" data="66" />
      </div>
    </div>
  );
}

export default PokemonDetails;
