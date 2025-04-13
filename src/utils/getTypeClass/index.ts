const getTypeClass = (type: string): string => {
  const typeMap: Record<string, string> = {
    grass: "text-poke-type-grass",
    rock: "text-poke-type-rock",
    bug: "text-poke-type-bug",
    dark: "text-poke-type-dark",
    dragon: "text-poke-type-dragon",
    electric: "text-poke-type-electric",
    fairy: "text-poke-type-fairy",
    fighting: "text-poke-type-fighting",
    fire: "text-poke-type-fire",
    flying: "text-poke-type-flying",
    ghost: "text-poke-type-ghost",
    ground: "text-poke-type-ground",
    ice: "text-poke-type-ice",
    normal: "text-poke-type-normal",
    poison: "text-poke-type-poison",
    psychic: "text-poke-type-psychic",
    steel: "text-poke-type-steel",
    stellar: "text-poke-type-stellar",
    water: "text-poke-type-water",
    unknown: "text-poke-type-unknown",
  };

  return typeMap[type] ?? "text-poke-type-unknown";
};

export default getTypeClass;
