import React from 'react';
import { Badge } from 'react-bootstrap';
import { showPlayerHand } from '../common/mobileRules';
import { IPlayerInfo } from '../redux/reducers/IPlayerInfo';
import PlayerHand from './PlayerHand';

interface IPlayerProp {
  playerDirection: string;
  playerInfo: IPlayerInfo;
  cardsHidden: boolean;
}
const Player = ({ playerDirection, playerInfo, cardsHidden }: IPlayerProp) => {
  return (
    <div className={'player player--' + playerDirection}>
      <div className="text-light text-center player__name m-1">
        <Badge variant="danger" className={'player-badge player-badge-' + playerDirection}>
          {playerInfo.name}
          <Badge pill variant="light" className="float-right">
            18
          </Badge>
        </Badge>
      </div>
      {showPlayerHand(playerDirection) && <PlayerHand playerInfo={playerInfo} cardsHidden={cardsHidden} />}
    </div>
  );
};

export default Player;
