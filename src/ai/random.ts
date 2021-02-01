import { ICardInfo, Suits } from '../common/heartRules';
import { Hearts } from '../common/types/hearts';
import {
  getCurrentTrickSuit,
  getPlayerHand,
  getSelectedCards,
  isHeartsBroken,
  playerHandContainsSuit
} from '../redux/reducers';

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

export const AIplayRandomCard = (state: Hearts.State, playerID: string) => {
  const hand = getPlayerHand(state, playerID);
  const suit = getCurrentTrickSuit(state);
  const hasLead = suit === null;
  const followSuit = playerHandContainsSuit(state, playerID, suit as Suits);
  const brokenHearts = isHeartsBroken(state);

  let cardPool: ICardInfo[] | undefined = [];

  if (followSuit) {
    cardPool = hand?.filter((card) => card.suit === suit);
  } else if (hasLead && !brokenHearts) {
    cardPool = hand?.filter((card) => card.suit !== 'H');
    if (cardPool?.length === 0) {
      // Only hearts left in hand
      cardPool = hand;
    }
  } else {
    cardPool = hand;
  }

  return getRandomElement(cardPool as ICardInfo[]);
};
