// Deps
import React from "react";
import { v4 as uuid } from "uuid";
import classNames from "classnames";

// Types
import ButtonPillProps from "./types";

const ButtonPill = ({ items, activeIndex, onClick }: ButtonPillProps) => {
  return (
    <div className={classNames("flex", "flex-row")}>
      {items.map((el, i, arr) => (
        <React.Fragment key={`button-pill-${uuid()}-${i}`}>
          <button
            onClick={(e) => onClick(e, i)}
            className={classNames(
              "p-3",
              "ease-in-out",
              "duration-300",
              "transition-all",
              "cursor-pointer",
              "hover:scale-105",
              "hover:shadow-lg",
              "text-velvet-robe",
              "hover:bg-velvet-robe",
              "hover:text-cotton-ball",
              activeIndex === i ? "bg-liberty-blue" : "bg-chronicle",
              arr.length === 1
                ? "rounded-xl"
                : i === 0
                ? "rounded-l-xl"
                : i === arr.length - 1
                ? "rounded-r-xl"
                : ""
            )}
          >
            {el}
          </button>
          {i < arr.length - 1 && (
            <div className={classNames("border-r", "border-r-velvet-robe")} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ButtonPill;
