/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLazyGetPokemonDetailQuery } from "../../../store/apis/pokemon";

export const usePokemonDetail = (url: string) => {
  const [trigger, result] = useLazyGetPokemonDetailQuery();

  useEffect(() => {
    trigger(url);
  }, [url]);

  const data = result.data;
  const imageSrc = data?.sprites.other["official-artwork"].front_default;
  const id = data?.id ?? "";
  const name = data?.name ?? "";
  const primaryType = data?.types?.[0]?.type?.name ?? "unknown";

  return { data, imageSrc, id, name, primaryType };
};
