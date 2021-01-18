import React from "react";
import { store } from "../redux/storeData";
import Player from "./Player";

export const HeartsGame: React.FC = () => {
  const playerName = store.players[0].name;
  return (
    <div className="content d-flex flex-column w-100" style={{ height: "calc(100% - 56px)" }}>
      <Player playerDirection="north" playerName={playerName} />
      <div className="flex-grow-1 row-flex">
        <Player playerDirection="west" playerName={playerName} />
        <div className="game-board">
          <div className="viewport" />
        </div>
        <Player playerDirection="east" playerName={playerName} />
      </div>
      <Player playerDirection="south" playerName={playerName} />
    </div>
  );
};
