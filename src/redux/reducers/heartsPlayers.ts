import { constants, ICardInfo, Suits } from '../../common/heartRules';
import {
  addPlayer,
  ADD_PLAYER,
  dealCard,
  DEAL_CARD,
  passCards,
  PASS_CARDS,
  playCard,
  PlayerActions,
  PLAY_CARD,
  toggleCard,
  TOGGLE_CARD
} from '../actions/players';
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
export const getPlayerIDs = (players: Array<IPlayerInfo>) => players.map((player) => player.id);

export const getPlayerByID = (players: Array<IPlayerInfo>, playerID: string) => {
  return players?.find((player) => player.id === playerID);
};

export const getPlayerHand = (players: Array<IPlayerInfo>, playerID: string) => {
  const player = getPlayerByID(players, playerID);
  return player?.playerHand;
};

export const getSelectedCards = (players: Array<IPlayerInfo>, playerID: string) => {
  const player = getPlayerByID(players, playerID);
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

export const playerHandContainsCard = (state: Array<IPlayerInfo>, playerID: string, card: ICardInfo) => {
  const playerHand = getPlayerHand(state, playerID);
  for (let c of playerHand as ICardInfo[]) {
    if (c.suit === card.suit && c.value === card.value) {
      return true;
    }
  }
  return false;
};

export const isPlayerHandOnlyHearts = (state: Array<IPlayerInfo>, playerID: string) => {
  const playerHand = getPlayerHand(state, playerID);
  for (let card of playerHand as Array<ICardInfo>) {
    if (card.suit !== 'H') {
      return false;
    }
  }
  return true;
};

export const playerHandContainsSuit = (state: Array<IPlayerInfo>, playerID: string, suit: Suits) => {
  const playerHand = getPlayerHand(state, playerID);
  for (let card of playerHand as Array<ICardInfo>) {
    if (card.suit === suit) {
      return true;
    }
  }
  return false;
};

const addCard = (cards: Array<ICardInfo>, c: ICardInfo) => {
  let sortIndex = 0;
  const newCardRank = constants.cardRank(c);
  for (sortIndex = 0; sortIndex < cards.length && newCardRank > constants.cardRank(cards[sortIndex]); sortIndex++) {}
  return [...cards.slice(0, sortIndex), c, ...cards.slice(sortIndex)];
};

const removeCard = (cards: Array<ICardInfo>, c: ICardInfo) => {
  const idx = cards.findIndex((card) => card.value === c.value && card.suit === c.suit);
  if (idx > -1) {
    return cards.slice(0, idx).concat(cards.slice(idx + 1));
  } else {
    return cards;
  }
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

const selectedCards = (state: ICardInfo[], action: ReturnType<typeof toggleCard>) => {
  const idx = state.findIndex((card) => card.value === action.card.value && card.suit === action.card.suit);
  if (idx > -1) {
    return state.slice(0, idx) ?? ([] as ICardInfo[]).concat(state.slice(idx + 1));
  } else {
    return [...state, action.card];
  }
};

const getPlayerStateOnToggle = (state: IPlayerInfo, action: ReturnType<typeof toggleCard>) => {
  if (state.id !== action.playerID) {
    return state;
  }
  const nextState = Object.assign({}, state, {
    selectedCards: selectedCards(state.selectedCards, action)
  });
  return nextState;
};

const playerHandOnPass = (state: Array<ICardInfo>, action: ReturnType<typeof passCards>) => {
  let containsAllCards = true;
  let containsNoCards = true;
  let idx = null;
  for (let card of action.cards) {
    idx = state.findIndex((c) => card.value === c.value && card.suit === c.suit);
    if (idx > -1) {
      containsAllCards = true;
      containsNoCards = false;
    } else {
      containsAllCards = false;
      containsNoCards = true;
    }
  }
  if (containsAllCards) {
    return action.cards.reduce(removeCard, state);
  } else if (containsNoCards) {
    return action.cards.reduce(addCard, state);
  }
  return state;
};

const getPlayerStateOnPassCards = (state: IPlayerInfo, action: ReturnType<typeof passCards>) => {
  if (action.fromPlayerID === action.toPlayerID) {
    return state;
  }
  let nextState = null;
  if (action.fromPlayerID === state.id) {
    nextState = Object.assign({}, state, {
      selectedCards: [],
      playerHand: playerHandOnPass(state.playerHand, action)
    });
    return nextState;
  } else if (action.toPlayerID === state.id) {
    nextState = Object.assign({}, state, {
      playerHand: playerHandOnPass(state.playerHand, action)
    });
    return nextState;
  }
  return state;
};

const getPlayerStateOnPlayCard = (state: IPlayerInfo, action: ReturnType<typeof playCard>) => {
  if (state.id !== action.playerID) {
    return state;
  }
  const nextState = Object.assign({}, state, {
    playerHand: removeCard(state.playerHand, action.card)
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
    case TOGGLE_CARD:
      return state.map((player) => getPlayerStateOnToggle(player, action as ReturnType<typeof toggleCard>));
    case PASS_CARDS:
      return state.map((player) => getPlayerStateOnPassCards(player, action as ReturnType<typeof passCards>));
    case PLAY_CARD:
      return state.map((player) => getPlayerStateOnPlayCard(player, action as ReturnType<typeof playCard>));
    default:
      return state;
  }
};

export default heartsPlayers;
