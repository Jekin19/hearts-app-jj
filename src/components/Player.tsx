import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { showPlayerHand } from '../common/mobileRules';
import { getPlayers, getScores } from '../redux/reducers';
import { PLAYER_TYPE } from '../redux/reducers/heartsPlayers';
import { IPlayerInfo } from '../redux/reducers/IPlayerInfo';
import PlayerHand from './PlayerHand';
import { RenderIf } from './RenderIf';
import { Toast } from './Toast';
import useScreenOrientation from '../common/screen-orientation-hook';
interface IPlayerProp {
  playerDirection: string;
  playerInfo: IPlayerInfo;
  cardsHidden: boolean;
}
const Player = ({ playerDirection, playerInfo, cardsHidden }: IPlayerProp) => {
  const scores = useSelector(getScores);
  const players = useSelector(getPlayers);
  const screenOrientation = useScreenOrientation();
  const [playerScore, setPlayerScore] = useState(0);

  const eastWestPlayerMargin = (playerDirection: any) => {
    if (isMobile && screenOrientation?.includes('landscape')) {
      switch (playerDirection) {
        case 'east':
          return ' mr-5 ml-5';
        case 'west':
          return ' mr-5 ml-5';
        default:
          break;
      }
    }
    return '';
  };

  useEffect(() => {
    const currentScore = scores[scores.length - 1];
    const playerIndex = players.findIndex((player) => player.id === playerInfo.id);
    setPlayerScore(currentScore[playerIndex]);
  }, [scores, players, playerInfo]);

  return (
    <div className={'player player--' + playerDirection + eastWestPlayerMargin(playerDirection)}>
      <div className='text-light text-center player__name m-1'>
        <RenderIf validate={playerInfo.playerType === PLAYER_TYPE.Human}>
          <Toast />
        </RenderIf>
        <Badge variant='danger' className={'player-badge player-badge-' + playerDirection}>
          {playerInfo.name}
          <Badge pill variant='light' className='float-right'>
            {playerScore}
          </Badge>
        </Badge>
      </div>
      {showPlayerHand(playerDirection) && <PlayerHand playerInfo={playerInfo} cardsHidden={cardsHidden} />}
    </div>
  );
};

export default Player;
