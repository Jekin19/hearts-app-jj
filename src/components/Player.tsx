import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { showPlayerHand } from '../common/mobileRules';
import { getPlayers, getScores } from '../redux/reducers';
import { IPlayerInfo } from '../redux/reducers/IPlayerInfo';
import PlayerHand from './PlayerHand';

interface IPlayerProp {
  playerDirection: string;
  playerInfo: IPlayerInfo;
  cardsHidden: boolean;
}
const Player = ({ playerDirection, playerInfo, cardsHidden }: IPlayerProp) => {
  const scores = useSelector(getScores);
  const players = useSelector(getPlayers);
  const [playerScore, setPlayerScore] = useState(0);

  useEffect(() => {
    console.log(JSON.stringify(scores));
    const currentScore = scores[scores.length - 1];
    const playerIndex = players.findIndex((player) => player.id === playerInfo.id);
    setPlayerScore(currentScore[playerIndex]);
  }, [scores, players, playerInfo]);

  return (
    <div className={'player player--' + playerDirection}>
      <div className="text-light text-center player__name m-1">
        <Badge variant="danger" className={'player-badge player-badge-' + playerDirection}>
          {playerInfo.name}
          <Badge pill variant="light" className="float-right">
            {playerScore}
          </Badge>
        </Badge>
      </div>
      {showPlayerHand(playerDirection) && <PlayerHand playerInfo={playerInfo} cardsHidden={cardsHidden} />}
    </div>
  );
};

export default Player;
