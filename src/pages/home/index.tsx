/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiSquareFill, PiSquaresFourFill } from "react-icons/pi";

// Components
import Navbar from "../../components/Navbar";
import SortBy from "../../components/SortDropdown";
import ButtonPill from "../../components/ButtonPill";
import PokemonCard from "../../components/PokemonCard";

// RTK API
import { useLazyGetPokemonsQuery } from "../../../store/apis/pokemon";

// Types
import PokemonEntry from "./types";

// Constants
const CHUNK_SIZE = 20;

const Home = () => {
  // Refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // States
  const [count, setCount] = useState(0),
    [isLoading, setIsLoading] = useState(true),
    [searchTerm, setSearchTerm] = useState(""),
    [allPokemons, setAllPokemons] = useState<PokemonEntry[]>([]),
    [tileMode, setTileMode] = useState<"single" | "multi">("multi"),
    [filteredPokemons, setFilteredPokemons] = useState<PokemonEntry[]>([]),
    [renderedPokemons, setRenderedPokemons] = useState<PokemonEntry[]>([]);

  // APIs
  const [triggerGetPokemons] = useLazyGetPokemonsQuery();

  // Methods
  const fetchAllPokemons = async () => {
    let nextUrl: string | null = null;
    const all: PokemonEntry[] = [];

    try {
      do {
        const res = await triggerGetPokemons(nextUrl).unwrap(),
          entries = res.results.map((p: { name: string; url: string }) => ({
            name: p.name,
            url: p.url,
            id: parseInt(p.url.split("/")[6]), // Extracting ID from URL
          }));
        all.push(...entries);
        setCount(res.count);
        nextUrl = res.next;
      } while (nextUrl);

      setAllPokemons(all);
      setFilteredPokemons(all);
      setRenderedPokemons(all.slice(0, CHUNK_SIZE));
    } catch (err) {
      console.error("Failed to fetch Pokémon list", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setRenderedPokemons((prev) => {
      const nextChunk = filteredPokemons.slice(
        prev.length,
        prev.length + CHUNK_SIZE
      );
      return [...prev, ...nextChunk];
    });
  };

  const sortPokemons = (sortType: string) => {
    const sortedPokemons = [...filteredPokemons];
    if (sortType === "id-asc") sortedPokemons.sort((a, b) => a.id - b.id);
    else if (sortType === "id-desc") sortedPokemons.sort((a, b) => b.id - a.id);
    else if (sortType === "name-asc")
      sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortType === "name-desc")
      sortedPokemons.sort((a, b) => b.name.localeCompare(a.name));

    setFilteredPokemons(sortedPokemons);
    setRenderedPokemons(sortedPokemons.slice(0, CHUNK_SIZE));
  };

  // Effects
  useEffect(() => {
    fetchAllPokemons();
  }, []);

  useEffect(() => {
    setSearchTerm(""); // Reset search bar on page load
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = scrollContainerRef.current;
      if (!el) return;

      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200) loadMore();
    };

    const el = scrollContainerRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [filteredPokemons]);

  useEffect(() => {
    if (isLoading || allPokemons.length === 0) return;

    const timeout = setTimeout(() => {
      if (!searchTerm) {
        setFilteredPokemons(allPokemons);
        setRenderedPokemons(allPokemons.slice(0, CHUNK_SIZE));
        return;
      }

      const filtered = allPokemons.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredPokemons(filtered);
      setRenderedPokemons(filtered.slice(0, CHUNK_SIZE));
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, allPokemons, isLoading]);

  return (
    <div
      ref={scrollContainerRef}
      className={classNames(
        "h-screen",
        "overflow-auto",
        "bg-spinel-stone-black"
      )}
    >
      <Navbar onSearch={(term) => setSearchTerm(term)} />

      <div
        className={classNames(
          "flex",
          "pt-5",
          "px-5",
          "pb-10",
          "md:p-5",
          "gap-y-5",
          "mx-auto",
          "flex-col",
          "md:px-10",
          "container"
        )}
      >
        {/* Header */}
        <div
          className={classNames("flex", "flex-row", "gap-x-5", "items-center")}
        >
          <div className={classNames("flex-1")}>
            <SortBy onSort={sortPokemons} />
          </div>
          <div>
            <ButtonPill
              items={[
                <PiSquareFill key="single" />,
                <PiSquaresFourFill key="multi" />,
              ]}
              activeIndex={tileMode === "single" ? 0 : 1}
              onClick={(_e, i) =>
                i === 0 ? setTileMode("single") : setTileMode("multi")
              }
            />
          </div>
        </div>

        {/* Grid or No Result */}
        {renderedPokemons.length > 0 ? (
          <div
            className={classNames(
              "grid gap-4",
              tileMode === "multi"
                ? classNames(
                    "grid-cols-2",
                    "md:grid-cols-3",
                    "lg:grid-cols-4",
                    "xl:grid-cols-5",
                    "2xl:grid-cols-6"
                  )
                : "grid-cols-1"
            )}
          >
            <AnimatePresence initial={false}>
              {renderedPokemons.map(({ url }) => (
                <motion.div
                  key={url}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <PokemonCard count={count} url={url} tileMode={tileMode} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          !isLoading && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className={classNames(
                "flex",
                "justify-center",
                "items-center",
                "h-64",
                "text-gray-400",
                "text-lg"
              )}
            >
              No Pokémon found with that name.
            </motion.div>
          )
        )}

        {/* Loading spinner */}
        {isLoading && (
          <div
            className={classNames(
              "h-16",
              "mt-4",
              "flex",
              "w-full",
              "items-center",
              "justify-center"
            )}
          >
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={classNames("text-gray-400", "text-sm")}
            >
              Loading all Pokémon...
            </motion.span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
