import React from "react";
import Card from "./Card";
import { ICardInfo } from "../common/heartRules";
import { store } from "../redux/storeData";

const isToggled = (selectedCards: any, card: any) => {
  return selectedCards.findIndex((c: any) => c.suit === card.suit && c.value === card.value) > -1;
};

interface IPlayerHandProps {
  cardsHidden: boolean;
}

const PlayerHand = ({ cardsHidden }: IPlayerHandProps) => {
  const cards = store.players[0].playerHand;
  const selectedCards = store.players[0].selectedCards;
  const cardElements = cards.map((card) => (
    <Card
      key={card.value + card.suit}
      onClickHandler={() => {}}
      card={card as ICardInfo}
      toggled={isToggled(selectedCards, card)}
      overturned={cardsHidden}
    />
  ));
  return <div className="hand m-3">{cardElements}</div>;
};

export default PlayerHand;
