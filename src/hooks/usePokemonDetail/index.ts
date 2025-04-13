/* eslint-disable react-hooks/exhaustive-deps */

// Deps
import { useEffect } from "react";

// APIs
import { useLazyGetPokemonDetailQuery } from "../../../store/apis/pokemon";

export const usePokemonDetail = (url: string) => {
  // APIs
  const [trigger, result] = useLazyGetPokemonDetailQuery();

  // Effects
  useEffect(() => {
    trigger(url);
  }, [url]);

  // Constants
  const data = result.data,
    imageSrc = data?.sprites.other["official-artwork"].front_default,
    id = data?.id ?? "",
    name = data?.name ?? "",
    primaryType = data?.types?.[0]?.type?.name ?? "unknown";

  return { data, imageSrc, id, name, primaryType };
};
