/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLazyGetPokemonDetailQuery } from "../../../store/apis/pokemon";

const PokemonDetail = () => {
  const { id } = useParams();

  const [triggerGetPokemonDetail, resultGetPokemonDetail] =
    useLazyGetPokemonDetailQuery();

  const [hp, setHp] = useState(0);
  const [maxHp, setMaxHp] = useState(1000);
  const [hpPercent, setHpPercent] = useState(0);

  useEffect(() => {
    if (id) triggerGetPokemonDetail(`/pokemon/${id}`);
  }, [id]);

  useEffect(() => {
    const hpStat = resultGetPokemonDetail.data?.stats?.find(
      (s) => s.stat.name === "hp"
    );

    if (hpStat) {
      const baseStat = hpStat.base_stat;
      setHp(baseStat);

      const dynamicMax = 1000;
      setMaxHp(dynamicMax);
      setHpPercent((baseStat / dynamicMax) * 100);
    }
  }, [resultGetPokemonDetail.data?.stats]);

  return (
    <div
      className={classNames(
        "h-screen",
        "overflow-auto",
        "bg-spinel-stone-black"
      )}
    >
      <Navbar noSearch onSearch={() => {}} />

      <div
        className={classNames(
          "flex",
          "flex-col",
          "md:flex-row",
          "gap-y-5",
          "container",
          "mx-auto",
          "px-5",
          "py-10"
        )}
      >
        <div
          className={classNames("flex", "flex-col", "md:flex-row", "flex-1")}
        >
          <h3 className={classNames("text-velvet-robe", "text-lg")}>
            #{id?.padStart(4, "0")}
          </h3>

          <div className="px-24">
            <img
              className={classNames(
                "min-w-64",
                "object-contain",
                "aspect-square",
                "w-full"
              )}
              loading="eager"
              src={
                resultGetPokemonDetail.data?.sprites.other["official-artwork"]
                  .front_default || ""
              }
            />
          </div>
        </div>

        <div
          className={classNames(
            "flex-1",
            "h-full",
            "flex-col",
            "flex",
            "gap-y-10"
          )}
        >
          <h1
            className={classNames(
              "capitalize",
              "text-4xl",
              "font-bold",
              "text-white"
            )}
          >
            {resultGetPokemonDetail.data?.name}
          </h1>

          <div className="rounded-xl bg-dark-rift flex flex-col text-white px-10 py-5 gap-y-5 flex-1">
            {/* Health Section */}
            <div className="flex flex-col gap-y-2">
              <h3 className="text-2xl  text-velvet-robe">Health</h3>

              <div className="relative w-full h-3 rounded-full bg-[#2A2E3B] overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-700 rounded-full"
                  style={{ width: `${hpPercent}%` }}
                />
              </div>

              <p className="text-white text-3xl font-bold mt-1">
                {hp}{" "}
                <span className="text-cotton-ball/60 font-normal text-xl">
                  from {maxHp}
                </span>
              </p>
            </div>

            <hr className={classNames("border-cotton-ball/40", "border-t-2")} />

            <div className={classNames("flex", "flex-row", "justify-between")}>
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl text-velvet-robe">Attack</h3>
                <h3 className="text-3xl">
                  {resultGetPokemonDetail.data?.stats?.find(
                    (s) => s.stat.name === "attack"
                  )?.base_stat ?? 0}
                </h3>
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl  text-velvet-robe">Defense</h3>
                <h3 className="text-3xl">
                  {resultGetPokemonDetail.data?.stats?.find(
                    (s) => s.stat.name === "defense"
                  )?.base_stat ?? 0}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
