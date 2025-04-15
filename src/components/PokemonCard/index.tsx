import classNames from "classnames";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useState, useEffect, useCallback } from "react";

// Templates
import SkeletonLoader from "./templates/SkeletonLoader";

// Hooks
import { usePokemonDetail } from "../../hooks/usePokemonDetail";

// Utils
import getTypeClass from "../../utils/getTypeClass";

// Types
import PokemonCardProps from "./types";

const PokemonCard = ({ url, tileMode, count }: PokemonCardProps) => {
  // Hooks
  const navigate = useNavigate(),
    { imageSrc, id, name, primaryType } = usePokemonDetail(url);

  // States
  const [loaded, setLoaded] = useState(false),
    [isFlipped, setIsFlipped] = useState(false),
    [isDesktop, setIsDesktop] = useState(true);

  // Constants
  const imageKey = `${tileMode}-${id}`;

  // Callbacks
  const handleFlip = useCallback(() => {
      if (!isDesktop) setIsFlipped((prev) => !prev);
    }, [isDesktop]),
    handleHover = useCallback(
      (flip: boolean) => {
        if (isDesktop) setIsFlipped(flip);
      },
      [isDesktop]
    );

  // Effects
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsDesktop(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    setLoaded(false);
  }, [imageSrc]);

  // If data is still loading, show the skeleton loader
  if (!imageSrc || !name || !primaryType)
    return <SkeletonLoader tileMode={tileMode} />;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={classNames(
        "w-full",
        "relative",
        "cursor-pointer",
        "perspective-1000",
        tileMode === "single" ? "h-96" : "h-72"
      )}
      onClick={handleFlip}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className={classNames(
          "w-full",
          "h-full",
          "relative",
          "transition-all",
          "transform-style-preserve-3d"
        )}
      >
        {/* Front */}
        <div
          className={classNames(
            "flex",
            "px-5",
            "pb-5",
            "w-full",
            "h-full",
            "gap-y-3",
            "flex-col",
            "absolute",
            "rounded-lg",
            "ease-in-out",
            "backface-hidden",
            "bg-cotton-ball",
            tileMode === "single" ? "pt-5" : "pt-10"
          )}
        >
          {tileMode === "single" && (
            <div
              className={classNames(
                "flex",
                "flex-row",
                "items-center",
                "justify-between"
              )}
            >
              <h1
                className={classNames(
                  "text-lg",
                  "font-bold",
                  "capitalize",
                  "duration-300",
                  "transition-colors",
                  getTypeClass(primaryType)
                )}
              >
                {primaryType}
              </h1>
              <h3
                className={classNames("text-lg", "font-bold", "text-boatswain")}
              >
                #{`${id}`.padStart(`${count}`.length, "0")}
              </h3>
            </div>
          )}

          {imageSrc && (
            <img
              loading="lazy"
              key={imageKey}
              src={imageSrc}
              onLoad={() => setLoaded(true)}
              className={classNames(
                "duration-500",
                "aspect-square",
                "object-contain",
                "transition-opacity",
                !loaded && "opacity-0",
                tileMode === "single" ? "h-64 px-10" : "w-full h-40"
              )}
            />
          )}

          <h1
            className={classNames(
              "text-lg",
              "font-bold",
              "capitalize",
              "text-center"
            )}
          >
            {name}
          </h1>
        </div>

        {/* Back */}
        <div
          className={classNames(
            "flex",
            "px-5",
            "pb-5",
            "w-full",
            "h-full",
            "absolute",
            "flex-col",
            "rounded-lg",
            "rotate-y-180",
            "backface-hidden",
            "bg-cotton-ball",
            tileMode === "single"
              ? classNames("pt-5", "justify-center", "gap-y-5")
              : classNames("pt-5", "md:pt-10", "justify-between")
          )}
        >
          <h2
            className={classNames(
              "mb-2",
              "text-xl",
              "font-bold",
              tileMode === "multi" && "text-sm md:text-base"
            )}
          >
            Pokemon Details
          </h2>
          <p
            className={classNames(
              "text-gray-700",
              tileMode === "multi" && "text-sm"
            )}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            est excepturi
          </p>
          <button
            className={classNames(
              "px-3",
              "py-2",
              "mt-5",
              "border",
              "text-xs",
              "md:text-sm",
              "rounded-full",
              "cursor-pointer",
              "transition-all",
              "text-liberty-blue",
              "border-liberty-blue",
              "hover:bg-liberty-blue",
              "hover:text-cotton-ball"
            )}
            onClick={(e) => {
              e.stopPropagation();

              navigate(`/${id}`);
            }}
          >
            See More Detail
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PokemonCard;
