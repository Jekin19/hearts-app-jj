import { constants, ICardInfo } from '../../common/heartRules';
import { Hearts } from '../../common/types/hearts';
import { addPlayer, ADD_PLAYER, dealCard, DEAL_CARD, PlayerActions } from '../actions/players';
import { IPlayerInfo } from './IPlayerInfo';

export const HEART_PLAYER_NAMES = {
  Player1: 'Alice',
  Player2: 'Bob',
  Player3: 'Carol',
  Player4: 'You'
} as const;

export const PLAYER_TYPE = {
  AI: 'AI',
  Human: 'Human'
};

export const getPlayerByID = (state: Hearts.State, playerID: string) => {
  return state?.players?.find((player) => player.id === playerID);
};

export const getPlayerHand = (state: Hearts.State, playerID: string) => {
  const player = getPlayerByID(state, playerID);
  return player?.playerHand;
};

export const getSelectedCards = (state: Hearts.State, playerID: string) => {
  const player = getPlayerByID(state, playerID);
  return player?.selectedCards;
};

const heartsPlayer = (state = {}, action: PlayerActions) => {
  let nextState = null;
  switch (action.type) {
    case ADD_PLAYER:
      const currAction = action as ReturnType<typeof addPlayer>;
      nextState = {
        id: currAction.id,
        name: currAction.name,
        playerType: currAction.playerType,
        playerHand: [],
        selectedCards: []
      };
      return nextState;
    default:
      return state;
  }
};

const addCard = (cards: Array<ICardInfo>, c: ICardInfo) => {
  let sortIndex = 0;
  const newCardRank = constants.cardRank(c);
  for (sortIndex = 0; sortIndex < cards.length && newCardRank > constants.cardRank(cards[sortIndex]); sortIndex++) {}
  return [...cards.slice(0, sortIndex), c, ...cards.slice(sortIndex)];
};

const getPlayerStateOnDeal = (state: IPlayerInfo, action: ReturnType<typeof dealCard>) => {
  if (state.id !== action.playerID) {
    return state;
  }
  const nextState = Object.assign({}, state, {
    playerHand: addCard(state.playerHand, action.card)
  });
  return nextState;
};

const heartsPlayers = (state = [], action: PlayerActions) => {
  let nextState = null;
  switch (action.type) {
    case ADD_PLAYER:
      nextState = [...state, heartsPlayer(state, action)];
      return nextState;
    case DEAL_CARD:
      return state.map((player) => getPlayerStateOnDeal(player, action as ReturnType<typeof dealCard>));
    default:
      return state;
  }
};

export default heartsPlayers;
