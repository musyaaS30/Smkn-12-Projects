import React, { JSX } from "react";

export default interface ButtonPillProps {
  items: (JSX.Element | string)[];
  activeIndex?: number;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    i: number
  ) => void;
}
