import React from "react";
import PlayerHand from "./PlayerHand";

interface IPlayerProp {
  playerDirection: string;
  playerName: string;
}
const Player = ({ playerDirection, playerName }: IPlayerProp) => {
  return (
    <div className={"player player--" + playerDirection}>
      <div className="text-light text-center player__name m-2">{playerName}</div>
      <PlayerHand cardsHidden />
    </div>
  );
};

export default Player;
