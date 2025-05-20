/* eslint-disable react-hooks/exhaustive-deps */

// Deps
import classNames from "classnames";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Assets
import Logo from "../../assets/icons/smkn12logo.png";

const Navbar = ({
  onSearch,
  noSearch,
}: {
  noSearch?: boolean;
  onSearch: (val: string) => void;
}) => {
  // Hooks
  const navigate = useNavigate();

  // Refs
  const inputRef = useRef<HTMLInputElement>(null),
    timerRef = useRef<NodeJS.Timeout | null>(null);

  // States
  const [isSearchOpen, setIsSearchOpen] = useState(false),
    [searchValue, setSearchValue] = useState("");

  // Functions
  const openSearch = () => {
      setIsSearchOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    },
    closeSearch = () => {
      setIsSearchOpen(false);
      setSearchValue("");
    };

  // Effects
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isSearchOpen && !searchValue) {
      timerRef.current = setTimeout(() => {
        if (document.activeElement !== inputRef.current) {
          closeSearch();
        }
      }, 3000);
    }
    return () => clearTimeout(timerRef.current!);
  }, [isSearchOpen, searchValue]);

  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue]);

  return (
    <nav
      className={classNames(
        "z-50",
        "px-4",
        "py-3",
        "top-0",
        "sticky",
        "shadow-md",
        "bg-spinel-stone-black"
      )}
    >
      <div
        className={classNames(
          "flex",
          "mx-auto",
          "container",
          "items-center",
          "justify-between"
        )}
      >
        {/* Logo */}
        <img
          src={Logo}
          alt="Pokemon Logo"
          className={classNames("h-8", "cursor-pointer")}
          onClick={() => navigate("/")}
        />

        {!noSearch && (
          <div className={classNames("relative", "flex", "items-center")}>
            {/* Search Icon */}
            <AnimatePresence>
              {!isSearchOpen && (
                <motion.button
                  key="icon"
                  onClick={openSearch}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className={classNames(
                    "text-white",
                    "text-xl",
                    "cursor-pointer"
                  )}
                >
                  <FiSearch />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Search Input */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  key="input"
                  ref={inputRef}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onBlur={() => {
                    if (!searchValue) closeSearch();
                  }}
                  placeholder="Search..."
                  className={classNames(
                    "w-44",
                    "ml-2",
                    "px-4",
                    "py-1.5",
                    "text-sm",
                    "shadow-md",
                    "bg-white",
                    "rounded-md",
                    "text-black",
                    "focus:outline-none",
                    "placeholder-gray-500"
                  )}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "176px" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
