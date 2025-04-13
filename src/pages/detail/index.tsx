/* eslint-disable react-hooks/exhaustive-deps */

// Deps
import classNames from "classnames";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

// Components
import Navbar from "../../components/Navbar";

// APIs
import { useLazyGetPokemonDetailQuery } from "../../../store/apis/pokemon";

const PokemonDetail = () => {
  // Hooks
  const { id } = useParams();

  // States
  const [hp, setHp] = useState(0),
    [maxHp, setMaxHp] = useState(1000),
    [hpPercent, setHpPercent] = useState(0);

  // APIs
  const [triggerGetPokemonDetail, resultGetPokemonDetail] =
    useLazyGetPokemonDetailQuery();

  // Effects
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
          "px-5",
          "py-10",
          "gap-y-5",
          "mx-auto",
          "flex-col",
          "container",
          "xl:flex-row"
        )}
      >
        <div
          className={classNames("flex", "flex-col", "md:flex-row", "flex-1")}
        >
          <h3 className={classNames("text-velvet-robe", "text-lg")}>
            #{id?.padStart(4, "0")}
          </h3>

          <div className={"px-24"}>
            <img
              className={classNames(
                "w-full",
                "min-w-64",
                "aspect-square",
                "object-contain"
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
            "flex",
            "flex-1",
            "h-full",
            "flex-col",
            "gap-y-10"
          )}
        >
          <h1
            className={classNames(
              "text-4xl",
              "font-bold",
              "capitalize",
              "text-white"
            )}
          >
            {resultGetPokemonDetail.data?.name}
          </h1>

          <div
            className={classNames(
              "py-5",
              "flex",
              "px-10",
              "flex-1",
              "gap-y-5",
              "flex-col",
              "rounded-xl",
              "text-white",
              "bg-dark-rift"
            )}
          >
            {/* Health Section */}
            <div className={classNames("flex", "flex-col", "gap-y-2")}>
              <h3 className={classNames("text-2xl", "text-velvet-robe")}>
                Health
              </h3>

              <div
                className={classNames(
                  "h-3",
                  "w-full",
                  "relative",
                  "rounded-full",
                  "overflow-hidden",
                  "bg-dark-rift"
                )}
              >
                <div
                  className={classNames(
                    "top-0",
                    "h-full",
                    "left-0",
                    "absolute",
                    "rounded-full",
                    "duration-700",
                    "bg-green-500",
                    "transition-all"
                  )}
                  style={{ width: `${hpPercent}%` }}
                />
              </div>

              <p
                className={classNames(
                  "mt-1",
                  "text-3xl",
                  "font-bold",
                  "text-white"
                )}
              >
                {hp}{" "}
                <span
                  className={classNames(
                    "text-xl",
                    "font-normal",
                    "text-cotton-ball/60"
                  )}
                >
                  from {maxHp}
                </span>
              </p>
            </div>

            <hr className={classNames("border-cotton-ball/40", "border-t-2")} />

            <div className={classNames("flex", "flex-row", "justify-between")}>
              <div className={classNames("flex-1", "flex", "flex-col")}>
                <h3 className={classNames("text-2xl", "text-velvet-robe")}>
                  Attack
                </h3>
                <h3 className={classNames("text-3xl")}>
                  {resultGetPokemonDetail.data?.stats?.find(
                    (s) => s.stat.name === "attack"
                  )?.base_stat ?? 0}
                </h3>
              </div>
              <div className={classNames("flex-1", "flex", "flex-col")}>
                <h3 className={classNames("text-2xl", "text-velvet-robe")}>
                  Defense
                </h3>
                <h3 className={classNames("text-3xl")}>
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
