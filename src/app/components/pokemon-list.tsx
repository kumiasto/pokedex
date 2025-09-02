"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Pokemon from "./pokemon-card";
import { getPokemons } from "../lib/action";

const ListWrapper = ({ children }) => (
  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
    {children}
  </div>
);

export default function PokemonList({ initialPokemons, searchedPokemon }) {
  const [items, setItems] = useState(initialPokemons);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isPending, startTransition] = useTransition();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadMoreRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasMore &&
            !searchedPokemon &&
            !isPending
          ) {
            startTransition(async () => {
              const offset = page * 24;
              const pokemons = await getPokemons(offset);

              if (!pokemons?.length) {
                setHasMore(false);
                return;
              }

              setItems((prev) => [...prev, ...pokemons]);
              setPage((prev) => prev + 1);
            });
          }
        },
        {
          threshold: 0.1,
        },
      );
      observer.observe(loadMoreRef.current);

      return () => observer.disconnect();
    }
  }, [page, hasMore, isPending, searchedPokemon]);

  if (searchedPokemon) {
    return (
      <ListWrapper>
        <Pokemon pokemon={searchedPokemon} key={searchedPokemon.id} />
      </ListWrapper>
    );
  }

  console.log(items);
  console.log(hasMore);

  return (
    <section className="w-full flex flex-col content mt-3">
      <ListWrapper>
        {items.map((pokemon) => (
          <Pokemon pokemon={pokemon} key={pokemon.id} />
        ))}
      </ListWrapper>
      {hasMore && (
        <div
          className="w-full flex justify-center items-center my-6"
          ref={loadMoreRef}
        >
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
    </section>
  );
}
