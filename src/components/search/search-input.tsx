"use client";

import React from "react";
import { debounce } from "@/lib/helpers/debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = debounce((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      name="pokemon"
      className="search bg-gray-50 text-gray-900 p-3 rounded-xl"
      placeholder="Who’s that Pokémon?"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
      key={searchParams.get("query")?.toString() || ""}
    />
  );
}

export default SearchInput;
