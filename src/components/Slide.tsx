import React from "react";

interface ISlideProps {
  direction: string;
  cardinal: string;
  children: React.ReactNode;
}

export const Slide = ({ direction, cardinal, children }: ISlideProps) => {
  let cName = "slide";
  if (direction && cardinal) {
    cName += "-" + direction + "-" + cardinal;
  }
  return <div className={cName}>{children}</div>;
};
