import React from "react";
import { store } from "../redux/storeData";
import Player from "./Player";
import { Trick } from "./Trick";

interface IHeartsGameProps {
  navBarHeight?: number;
}

export const HeartsGame = ({ navBarHeight }: IHeartsGameProps) => {
  const playerName = store.players[0].name;
  const getHeight = () => {
    return `calc(100% - ${navBarHeight}px)`;
  };
  return (
    <div className="content d-flex flex-column w-100" style={{ minHeight: getHeight() }}>
      <Player playerDirection="north" playerName={playerName} cardsHidden />
      <div className="flex-grow-1 row-flex">
        <Player playerDirection="west" playerName={playerName} cardsHidden />
        <div className="game-board">
          <div className="viewport" />
          <Trick />
        </div>
        <Player playerDirection="east" playerName={playerName} cardsHidden />
      </div>
      <Player playerDirection="south" playerName={playerName} cardsHidden={false} />
    </div>
  );
};
