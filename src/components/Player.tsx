import React from "react";
import { Badge } from "react-bootstrap";
import PlayerHand from "./PlayerHand";

interface IPlayerProp {
  playerDirection: string;
  playerName: string;
  cardsHidden: boolean;
}
const Player = ({ playerDirection, playerName, cardsHidden }: IPlayerProp) => {
  return (
    <div className={"player player--" + playerDirection}>
      <div className="text-light text-center player__name m-1">
        <Badge variant="primary">
          {playerName}
          <Badge pill variant="light" className="float-right">
            4
          </Badge>
        </Badge>
      </div>
      <PlayerHand cardsHidden={cardsHidden} />
    </div>
  );
};

export default Player;
