"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Pokemon from "./pokemon-card";
import { getPokemons } from "@/lib/action";
import { usePathname, useRouter } from "next/navigation";
import type { Pokemon as PokemonType } from "@/lib/types/pokemon";

const ListWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
    {children}
  </div>
);

export default function PokemonList({
  initialPokemons,
  searchedPokemon,
  query,
}: {
  initialPokemons: PokemonType[];
  searchedPokemon?: PokemonType | null;
  query?: string;
}) {
  const [items, setItems] = useState<PokemonType[]>(initialPokemons);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isPending, startTransition] = useTransition();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [showTop, setShowTop] = useState(false);

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
          rootMargin: "600px 0px",
          threshold: 0,
        },
      );
      observer.observe(loadMoreRef.current);

      return () => observer.disconnect();
    }
  }, [page, hasMore, isPending, searchedPokemon]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (searchedPokemon) {
    return (
      <ListWrapper>
        <Pokemon pokemon={searchedPokemon} key={searchedPokemon.id} />
      </ListWrapper>
    );
  }

  if (query && !searchedPokemon) {
    return (
      <div className="w-full flex flex-col items-center gap-4 py-10">
        <p className="text-sm text-gray-700">
          No results for <span className="font-semibold">{query}</span>
        </p>
        <button
          type="button"
          onClick={() => router.replace(pathname)}
          className="px-3 py-1.5 rounded-md text-sm bg-gray-100 hover:bg-gray-200 text-gray-900"
        >
          Clear search
        </button>
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col content mt-3">
      <ListWrapper>
        {items.map((pokemon, idx) => (
          <Pokemon
            pokemon={pokemon}
            key={pokemon.id}
            priority={page === 1 && idx < 6 && !query}
          />
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
      {!searchedPokemon && showTop && (
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 m-auto"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M12 4a.75.75 0 01.53.22l6 6a.75.75 0 11-1.06 1.06L12.75 6.69V20a.75.75 0 01-1.5 0V6.69l-4.72 4.59a.75.75 0 11-1.06-1.06l6-6A.75.75 0 0112 4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </section>
  );
}
