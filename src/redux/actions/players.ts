import { v4 as uuidV4 } from 'uuid';
import { ICardInfo } from '../../common/heartRules';

export const PLAY_CARD = 'PLAY_CARD';
export const ADD_PLAYER = 'ADD_PLAYER';
export const DEAL_CARD = 'DEAL_CARD';
export const TOGGLE_CARD = 'TOGGLE_CARD';
export const PASS_CARDS = 'PASS_CARDS';

export const addPlayer = (name: string, playerType = 'Human') => ({
  type: ADD_PLAYER,
  id: uuidV4(),
  name,
  playerType
});

export const dealCard = (playerID: string, card: ICardInfo) => ({
  type: DEAL_CARD,
  playerID,
  card
});

export const toggleCard = (playerID: string, card: ICardInfo) => ({
  type: TOGGLE_CARD,
  playerID,
  card
});

export const playCard = (playerID: string, card: ICardInfo) => ({
  type: PLAY_CARD,
  playerID,
  card
});

export const passCards = (fromPlayerID: string, toPlayerID: string, cards: Array<ICardInfo>) => ({
  type: PASS_CARDS,
  fromPlayerID,
  toPlayerID,
  cards
});

export type PlayerActions =
  | ReturnType<typeof addPlayer>
  | ReturnType<typeof dealCard>
  | ReturnType<typeof playCard>
  | ReturnType<typeof passCards>;
