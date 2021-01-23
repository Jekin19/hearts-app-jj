import React from "react";
import { Badge } from "react-bootstrap";
import { showPlayerHand } from "../common/mobileRules";
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
        <Badge variant="danger" className={"player-badge player-badge-" + playerDirection}>
          {playerName}
          <Badge pill variant="light" className="float-right">
            18
          </Badge>
        </Badge>
      </div>
      {showPlayerHand(playerDirection) && <PlayerHand cardsHidden={cardsHidden} />}
    </div>
  );
};

export default Player;
