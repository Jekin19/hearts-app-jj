import React from 'react';
import { useSelector } from 'react-redux';
import { getPlayers } from '../redux/reducers';
import Player from './Player';
import { Trick } from './Trick';

interface IHeartsGameProps {
  navBarHeight?: number;
}

export const HeartsGame = ({ navBarHeight }: IHeartsGameProps) => {
  const players = useSelector(getPlayers);
  const getHeight = () => {
    return `calc(100% - ${navBarHeight}px)`;
  };

  if (!players || players.length === 0) {
    return null;
  }
  return (
    <div className="content d-flex flex-column w-100" style={{ minHeight: getHeight() }}>
      <Player playerDirection="north" playerInfo={players[1]} cardsHidden />
      <div className="flex-grow-1 row-flex">
        <Player playerDirection="west" playerInfo={players[0]} cardsHidden />
        <div className="game-board">
          <div className="viewport" />
          <Trick />
        </div>
        <Player playerDirection="east" playerInfo={players[2]} cardsHidden />
      </div>
      <Player playerDirection="south" playerInfo={players[3]} cardsHidden={false} />
    </div>
  );
};
