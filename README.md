## Pokédex — Next.js + TypeScript + Tailwind

A simple Pokédex built with Next.js App Router, TypeScript, and Tailwind CSS. Search Pokémon, browse an infinite list, and view detailed stats, weaknesses, and evolution chains.

## Features

- Search with URL syncing and debounce
- Infinite scroll (IntersectionObserver)
- Detail page: abilities, height, weight, base exp, stats bars, weaknesses
- Evolution chain (via species → evolution-chain)
- Type chips with colors (consistent across list/detail)
- Scroll-to-top floating button

## Tech Stack

- Next.js (App Router), React 19, TypeScript
- Tailwind CSS v4
- PokeAPI as data source

## Project Structure

- `src/components/ui`: small reusable UI pieces (back-link, pokedex-logo)
- `src/components/pokemon`: domain components (card, list, type chips)
- `src/components/search`: search input
- `src/lib`: API calls, helpers and types
  - `src/lib/action.ts`: PokeAPI integrations
  - `src/lib/types/pokemon.ts`: shared types
  - `src/lib/helpers/debounce.ts`: debounce utility
- `src/app`: Next.js app routes and pages

## Getting Started

Prerequisites: Node 18+ (recommended 20).

Install and run the dev server:

```bash
npm ci
npm run dev
# http://localhost:3000
```

Build and start production server:

```bash
npm run build
npm start
```

Lint and type-check:

```bash
npm run lint
npx tsc --noEmit
```

## Configuration

- Remote images: configured in `next.config.ts` for `raw.githubusercontent.com` (PokeAPI sprites).
- No environment variables required.

## Credits

- Data powered by [PokeAPI](https://pokeapi.co/)

## License

This project is for portfolio/demo purposes.
