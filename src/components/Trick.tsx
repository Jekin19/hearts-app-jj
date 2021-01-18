import React from "react";
import { store } from "../redux/storeData";
import Card from "./Card";
import { Slide } from "./Slide";

export const Trick = () => {
  const trick: any = store.rounds[0].tricks[0];
  const playerIDs = store.players.map((player) => player.id);
  const winnerID = null;
  const POVIndex = 3;
  const directions = ["south", "west", "north", "east"];
  const pnum = playerIDs.length;
  const directionMap: any = {};
  for (let i = 0; i < playerIDs.length; i++) {
    directionMap[playerIDs[(POVIndex + i) % pnum]] = directions[i];
  }
  const animationDirection = winnerID !== null ? directionMap[winnerID] : "";
  const cards = trick.map((move: any) => (
    <Card key={move.card.value + move.card.suit} direction={directionMap[move.playerID]} card={move.card} />
  ));
  return (
    <Slide direction={"out"} cardinal={animationDirection}>
      <div className="trick">{cards}</div>
    </Slide>
  );
};
