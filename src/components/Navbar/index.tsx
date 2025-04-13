/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import Logo from "../../assets/icons/logo.png";
import { useNavigate } from "react-router";
import classNames from "classnames";

const Navbar = ({
  onSearch,
  noSearch,
}: {
  noSearch?: boolean;
  onSearch: (val: string) => void;
}) => {
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Escape closes search
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // 3-second no-focus & empty input → close
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

  const openSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchValue("");
  };

  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue]);

  return (
    <nav
      className={classNames(
        "z-50",
        "flex",
        "px-4",
        "py-3",
        "top-0",
        "sticky",
        "shadow-md",
        "items-center",
        "justify-between",
        "bg-spinel-stone-black"
      )}
    >
      {/* Logo */}
      <img
        src={Logo}
        alt="Pokemon Logo"
        className="h-8 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {!noSearch && (
        <div className="relative flex items-center">
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
                className="text-white text-xl"
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
                className="ml-2 px-4 py-1.5 text-sm rounded-md shadow-md focus:outline-none w-44 bg-white text-black placeholder-gray-500"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "176px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
