import { constants, ICardInfo } from '../../common/heartRules';
import { Tricks } from '../../common/types/tricks';
import { PhasesActionTypes } from '../actions/phases';
import { playCard, PLAY_CARD } from '../actions/players';
import { RoundActions } from '../actions/round';
import { NEW_TRICK } from '../actions/tricks';

export const getCurrentTrick = (tricks: Array<Array<Tricks.State>>) => tricks[0];
export const getPreviousTrick = (tricks: Array<Array<Tricks.State>>) => {
  if (tricks.length > 1) {
    return tricks[1];
  } else {
    return [];
  }
};

const getCardSuit = (card: ICardInfo) => {
  return card.suit;
};

export const getTrickSuit = (trick: Array<Tricks.State>) => {
  if (!trick.length) {
    return null;
  }
  return getCardSuit(trick[0].card);
};

export const getTrickWinnerID = (trick: Array<Tricks.State>) => {
  let winningPlayerID = null,
    winningCard = null;
  winningCard = trick[0].card;
  winningPlayerID = trick[0].playerID;
  const suit = getTrickSuit(trick);
  for (let c = 0; c < trick.length; c++) {
    let { card, playerID } = trick[c];
    if (
      suit === getCardSuit(card) &&
      constants.cardValues[card.value].rank > constants.cardValues[winningCard.value].rank
    ) {
      winningCard = card;
      winningPlayerID = playerID;
    }
  }
  return winningPlayerID;
};

export const getCurrentWinnerID = (state: Array<Array<Tricks.State>>) => {
  const currentTrick = getCurrentTrick(state);
  if (!currentTrick.length) {
    return null;
  }
  return getTrickWinnerID(currentTrick);
};

export const getLastMove = (tricks: Array<Tricks.State>) => tricks[tricks.length - 1];

export const getCompletedTricks = (tricks: Array<Array<Tricks.State>>) => tricks.slice(1);

export const getTrickPointValue = (trick: Array<Tricks.State>) =>
  trick.reduce((acc, move) => acc + constants.pointValue(move.card), 0);

export const heartsTricks = (state: Array<Array<Tricks.State>> = [[]], action: RoundActions | PhasesActionTypes) => {
  switch (action.type) {
    case PLAY_CARD:
      const currentTrick = getCurrentTrick(state);
      const newTrick = [
        ...currentTrick,
        {
          card: (action as ReturnType<typeof playCard>).card,
          playerID: (action as ReturnType<typeof playCard>).playerID
        }
      ];
      const nextState = [newTrick, ...state.slice(1)];
      return nextState;
    case NEW_TRICK:
      return [[], ...state];
    default:
      return state;
  }
};
