import React, { useCallback } from 'react';
import Card from './Card';
import { ICardInfo } from '../common/heartRules';
import { IPlayerInfo } from '../redux/reducers/IPlayerInfo';
import { getCurrentPhase, getCurrentPlayer, getPlayerHand, getSelectedCards } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { Hearts } from '../common/types/hearts';
import { gameTick, playOrToggleCard } from '../redux/actions';
import { PLAYER_TYPE } from '../redux/reducers/heartsPlayers';
import { GAME_PHASES } from '../redux/reducers/heartPhases';

const isToggled = (selectedCards: any, card: any) => {
  return selectedCards.findIndex((c: any) => c.suit === card.suit && c.value === card.value) > -1;
};

interface IPlayerHandProps {
  playerInfo: IPlayerInfo;
  cardsHidden: boolean;
}

const PlayerHand = ({ playerInfo, cardsHidden }: IPlayerHandProps) => {
  const cards = useSelector((state: Hearts.State) => getPlayerHand(state, playerInfo.id)) as Array<ICardInfo>;
  const selectedCards = useSelector((state: Hearts.State) => getSelectedCards(state, playerInfo.id));
  const dispatch = useDispatch();
  const currentPlayer = useSelector(getCurrentPlayer);
  const currentPhase = useSelector(getCurrentPhase);
  const onCardClick = useCallback(
    (card: ICardInfo) => {
      if (!cardsHidden) {
        if (
          currentPhase === GAME_PHASES.PASSING ||
          (currentPhase === GAME_PHASES.PLAYING && currentPlayer?.playerType === PLAYER_TYPE.Human)
        ) {
          dispatch(playOrToggleCard(playerInfo.id, card));
          dispatch(gameTick());
        }
      }
    },
    [dispatch, cardsHidden, playerInfo.id, currentPlayer, currentPhase]
  );

  const cardElements = cards.map((card) => (
    <Card
      key={card.value + card.suit}
      onClickHandler={() => onCardClick(card)}
      card={card as ICardInfo}
      toggled={isToggled(selectedCards, card)}
      overturned={cardsHidden}
    />
  ));
  return <div className="hand m-3">{cardElements}</div>;
};

export default PlayerHand;
