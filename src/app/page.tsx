import { redirect } from "next/navigation";
import Pokemon from "./components/pokemon-card";
import PokemonDetails from "./components/pokemon-details";
import SearchInput from "./components/search-input";

const pokemon = [
  {
    id: 1,
    name: {
      english: "Bulbasaur",
      japanese: "フシギダネ",
      chinese: "妙蛙种子",
      french: "Bulbizarre",
    },
    type: ["Grass", "Poison"],
    base: {
      HP: 45,
      Attack: 49,
      Defense: 49,
      "Sp. Attack": 65,
      "Sp. Defense": 65,
      Speed: 45,
    },
  },
  {
    id: 2,
    name: {
      english: "Ivysaur",
      japanese: "フシギソウ",
      chinese: "妙蛙草",
      french: "Herbizarre",
    },
    type: ["Grass", "Poison"],
    base: {
      HP: 60,
      Attack: 62,
      Defense: 63,
      "Sp. Attack": 80,
      "Sp. Defense": 80,
      Speed: 60,
    },
  },
  {
    id: 3,
    name: {
      english: "Venusaur",
      japanese: "フシギバナ",
      chinese: "妙蛙花",
      french: "Florizarre",
    },
    type: ["Grass", "Poison"],
    base: {
      HP: 80,
      Attack: 82,
      Defense: 83,
      "Sp. Attack": 100,
      "Sp. Defense": 100,
      Speed: 80,
    },
  },
  {
    id: 4,
    name: {
      english: "Charmander",
      japanese: "ヒトカゲ",
      chinese: "小火龙",
      french: "Salamèche",
    },
    type: ["Fire"],
    base: {
      HP: 39,
      Attack: 52,
      Defense: 43,
      "Sp. Attack": 60,
      "Sp. Defense": 50,
      Speed: 65,
    },
  },
  {
    id: 5,
    name: {
      english: "Charmeleon",
      japanese: "リザード",
      chinese: "火恐龙",
      french: "Reptincel",
    },
    type: ["Fire"],
    base: {
      HP: 58,
      Attack: 64,
      Defense: 58,
      "Sp. Attack": 80,
      "Sp. Defense": 65,
      Speed: 80,
    },
  },
  {
    id: 6,
    name: {
      english: "Charizard",
      japanese: "リザードン",
      chinese: "喷火龙",
      french: "Dracaufeu",
    },
    type: ["Fire", "Flying"],
    base: {
      HP: 78,
      Attack: 84,
      Defense: 78,
      "Sp. Attack": 109,
      "Sp. Defense": 85,
      Speed: 100,
    },
  },
  {
    id: 7,
    name: {
      english: "Squirtle",
      japanese: "ゼニガメ",
      chinese: "杰尼龟",
      french: "Carapuce",
    },
    type: ["Water"],
    base: {
      HP: 44,
      Attack: 48,
      Defense: 65,
      "Sp. Attack": 50,
      "Sp. Defense": 64,
      Speed: 43,
    },
  },
  {
    id: 8,
    name: {
      english: "Wartortle",
      japanese: "カメール",
      chinese: "卡咪龟",
      french: "Carabaffe",
    },
    type: ["Water"],
    base: {
      HP: 59,
      Attack: 63,
      Defense: 80,
      "Sp. Attack": 65,
      "Sp. Defense": 80,
      Speed: 58,
    },
  },
  {
    id: 9,
    name: {
      english: "Blastoise",
      japanese: "カメックス",
      chinese: "水箭龟",
      french: "Tortank",
    },
    type: ["Water"],
    base: {
      HP: 79,
      Attack: 83,
      Defense: 100,
      "Sp. Attack": 85,
      "Sp. Defense": 105,
      Speed: 78,
    },
  },
  {
    id: 10,
    name: {
      english: "Caterpie",
      japanese: "キャタピー",
      chinese: "绿毛虫",
      french: "Chenipan",
    },
    type: ["Bug"],
    base: {
      HP: 45,
      Attack: 30,
      Defense: 35,
      "Sp. Attack": 20,
      "Sp. Defense": 20,
      Speed: 45,
    },
  },
  {
    id: 11,
    name: {
      english: "Metapod",
      japanese: "トランセル",
      chinese: "铁甲蛹",
      french: "Chrysacier",
    },
    type: ["Bug"],
    base: {
      HP: 50,
      Attack: 20,
      Defense: 55,
      "Sp. Attack": 25,
      "Sp. Defense": 25,
      Speed: 30,
    },
  },
  {
    id: 12,
    name: {
      english: "Butterfree",
      japanese: "バタフリー",
      chinese: "巴大蝶",
      french: "Papilusion",
    },
    type: ["Bug", "Flying"],
    base: {
      HP: 60,
      Attack: 45,
      Defense: 50,
      "Sp. Attack": 90,
      "Sp. Defense": 80,
      Speed: 70,
    },
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const id = await searchParams;

  if (!id) {
    redirect("/?id=1");
  }
  return (
    <main className="min-h-full w-[1100px] mx-auto">
      <h1 className="header">Pokedex</h1>
      <SearchInput />
      <section className="w-full flex flex-col content mt-3">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
          {pokemon.map((pokemon) => (
            <Pokemon pokemon={pokemon} key={pokemon.id} />
          ))}
        </div>
      </section>
      <section className="w-[300px] shadow-2xl rounded-2xl sidebar">
        <PokemonDetails />
      </section>
    </main>
  );
}
