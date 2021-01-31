import { v4 as uuidV4 } from 'uuid';
import { ICardInfo } from '../../common/heartRules';

export const PLAY_CARD = 'PLAY_CARD';
export const ADD_PLAYER = 'ADD_PLAYER';
export const DEAL_CARD = 'DEAL_CARD';
export const TOGGLE_CARD = 'TOGGLE_CARD';

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

export type PlayerActions = ReturnType<typeof addPlayer> | ReturnType<typeof dealCard>;
