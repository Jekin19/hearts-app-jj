import React from 'react';
import Card from './Card';
import { ICardInfo } from '../common/heartRules';
import { IPlayerInfo } from '../redux/reducers/IPlayerInfo';
import { getPlayerHand, getSelectedCards } from '../redux/reducers/heartsPlayers';
import { useDispatch, useSelector } from 'react-redux';
import { Hearts } from '../common/types/hearts';

const isToggled = (selectedCards: any, card: any) => {
  return selectedCards.findIndex((c: any) => c.suit === card.suit && c.value === card.value) > -1;
};

interface IPlayerHandProps {
  playerInfo: IPlayerInfo;
  cardsHidden: boolean;
}

const PlayerHand = ({ playerInfo: player, cardsHidden }: IPlayerHandProps) => {
  const cards = useSelector((state: Hearts.State) => getPlayerHand(state, player.id)) as Array<ICardInfo>;
  const selectedCards = useSelector((state: Hearts.State) => getSelectedCards(state, player.id));
  const dispatch = useDispatch();

  const action = (id: string) => {
    return (dispatch: any, getState: () => Hearts.State) => {
      console.log(dispatch);
      console.log(id);
    };
  };

  const cardElements = cards.map((card) => (
    <Card
      key={card.value + card.suit}
      onClickHandler={() => dispatch(action('test'))}
      card={card as ICardInfo}
      toggled={isToggled(selectedCards, card)}
      overturned={cardsHidden}
    />
  ));
  return <div className="hand m-3">{cardElements}</div>;
};

export default PlayerHand;
