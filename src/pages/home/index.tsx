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
import projectlist from "../../constants/projects";

// Constants
const CHUNK_SIZE = 20;

const Home = () => {
  // Refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // States
  const
    [searchTerm, setSearchTerm] = useState(""),
    [tileMode, setTileMode] = useState<"single" | "multi">("multi"),
    [projects, setProjects] = useState(

      projectlist
      
    );

  // APIs



  
  useEffect(() => {
    setSearchTerm(""); // Reset search bar on page load
  }, []);

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
            {/* <SortBy onSort={sortPokemons} /> */}
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
              {
            
            projects.filter(el=> el.name.toLowerCase().includes(searchTerm)).map(({ imgurl, name, url, desc }, i) => (
                <motion.div
                  layout
                  key={`${imgurl}-${i}`}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                >
                  <PokemonCard imgurl={imgurl} name={name} tileMode={tileMode} url={url} desc={desc}/>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
      </div>
    </div>
  );
};

export default Home;
