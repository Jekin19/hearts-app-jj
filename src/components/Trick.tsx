import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentTrick, getPlayerIDs, getPOVPlayerIndex, getWinnerID } from '../redux/reducers';
import Card from './Card';
import { Slide } from './Slide';

export const Trick = () => {
  const trick = useSelector(getCurrentTrick);
  const playerIDs = useSelector(getPlayerIDs) || [];
  const winnerID = useSelector(getWinnerID);
  const POVIndex = useSelector(getPOVPlayerIndex);
  const directions = ['south', 'west', 'north', 'east'];
  const pnum = playerIDs.length;
  const directionMap: any = {};
  for (let i = 0; i < playerIDs.length; i++) {
    directionMap[playerIDs[(POVIndex + i) % pnum]] = directions[i];
  }
  const animationDirection = winnerID !== null ? directionMap[winnerID] : '';
  const cards = trick.map((move: any) => (
    <Card key={move.card.value + move.card.suit} direction={directionMap[move.playerID]} card={move.card} />
  ));
  return (
    <Slide direction={'out'} cardinal={animationDirection}>
      <div className="trick">{cards}</div>
    </Slide>
  );
};
