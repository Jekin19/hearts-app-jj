import React from "react";
import { Toast } from "./Toast";
import { ScoresTable } from "./ScoresTable";

export const GameOver = () => {
  return (
    <div className={"p-3"}>
      <div className="text-center text-light">
        <Toast />
      </div>

      <div className="d-flex justify-content-center m-2">
        <ScoresTable />
      </div>
    </div>
  );
};
