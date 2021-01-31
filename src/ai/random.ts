import { ICardInfo } from '../common/heartRules';
import { Hearts } from '../common/types/hearts';
import { getPlayerHand, getSelectedCards } from '../redux/reducers/heartsPlayers';

const getRandomElement = (array: Array<ICardInfo>) => {
  const max = array.length;
  const ri = Math.floor(Math.random() * max);
  return array[ri];
};

export const aiPassChoice = (state: Hearts.State, playerID: string) => {
  const hand = getPlayerHand(state, playerID);
  const selectedCards = getSelectedCards(state, playerID);

  const cardPool =
    hand?.filter((card) => selectedCards?.findIndex((sc) => sc.suit === card.suit && sc.value === card.value) === -1) ??
    [];

  return getRandomElement(cardPool);
};
