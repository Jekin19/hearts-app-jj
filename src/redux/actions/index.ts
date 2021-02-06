import { Dispatch } from 'redux';
import { ICardInfo } from '../../common/heartRules';
import { Hearts } from '../../common/types/hearts';
import {
  getCurrentPhase,
  getCurrentPlayer,
  getCurrentPlayerID,
  getCurrentTrickSuit,
  getPassDirection,
  getPlayerByName,
  getPlayerIDs,
  getPlayers,
  getSelectedCards,
  isCurrentPhase,
  isGameComplete,
  isHeartsBroken,
  isPlayerHandOnlyHearts,
  isReadyToPass,
  isRoundComplete,
  isTrickComplete,
  playerHandContainsCard,
  playerHandContainsSuit
} from '../reducers';
import { GAME_PHASES } from '../reducers/heartPhases';
import { HEART_PLAYER_NAMES, PLAYER_TYPE } from '../reducers/heartsPlayers';
import { IPlayerInfo } from '../reducers/IPlayerInfo';
import { computerSelections, deal } from './deal';
import { endGame, endRound, endTrick, startPassing, startPlaying, startRound } from './phases';
import { addPlayer, passCards, playCard, toggleCard } from './players';
import { setPOV } from './ui';
import { AIplayRandomCard as aiPlayChoice } from '../../ai/random';
import { newTrick } from './tricks';
import { newGame, newRound } from './round';

export const addPlayerToState = (playerName: string, playerType: string = 'Human', POV = false) => (
  dispatch: Dispatch,
  getState: () => Hearts.State
) => {
  dispatch(addPlayer(playerName, playerType));
  if (POV) {
    const state = getState();
    const player = getPlayerByName(state, playerName);
    // TODO add reducer for POV
    player?.id && dispatch(setPOV(player?.id));
  }
};

const passCardsAction = () => {
  return (dispatch: any, getState: () => Hearts.State) => {
    const state = getState();
    const pass = getPassDirection(state);

    const playerIDs = getPlayerIDs(state);
    for (let i = 0; i < playerIDs.length; i++) {
      const selectedCards = getSelectedCards(state, playerIDs[i]);
      dispatch(
        passCards(
          playerIDs[i],
          playerIDs[(i + playerIDs.length + pass) % playerIDs.length],
          selectedCards as ICardInfo[]
        )
      );
    }
  };
};

const computerMove = (currentPlayer: IPlayerInfo) => {
  return (dispatch: any, getState: () => Hearts.State) => {
    const state = getState();
    const nextCard = aiPlayChoice(state, currentPlayer.id);
    dispatch(playCard(currentPlayer.id, nextCard));
    dispatch(gameTick());
  };
};

const MOVE_DELAY = 500; // ms
export const delayedPromise = (delay: number, action: () => void) => {
  setTimeout(() => action(), delay);
};

export const gameTick = () => {
  return (dispatch: any, getState: () => Hearts.State) => {
    switch (getCurrentPhase(getState())) {
      case GAME_PHASES.GAME_START:
        const playerIDs = getPlayers(getState());
        // Add all players
        if (playerIDs.length === 0) {
          dispatch(addPlayerToState(HEART_PLAYER_NAMES.Player1, PLAYER_TYPE.AI));
          dispatch(addPlayerToState(HEART_PLAYER_NAMES.Player2, PLAYER_TYPE.AI));
          dispatch(addPlayerToState(HEART_PLAYER_NAMES.Player3, PLAYER_TYPE.AI, dispatch));
          dispatch(addPlayerToState(HEART_PLAYER_NAMES.Player4, PLAYER_TYPE.Human, true));
        }
        dispatch(startRound());
        break;
      case GAME_PHASES.ROUND_START:
        if (getPassDirection(getState()) === 0) {
          // Skip if hand is for holding.
          dispatch(deal());
          dispatch(startPlaying());
        } else {
          dispatch(deal());
          dispatch(computerSelections());
          dispatch(startPassing());
        }
        break;
      case GAME_PHASES.PASSING:
        if (isReadyToPass(getState())) {
          dispatch(passCardsAction());
          dispatch(startPlaying());
        }
        break;
      case GAME_PHASES.PLAYING:
        if (isTrickComplete(getState())) {
          dispatch(endTrick());
        } else {
          const currentPlayer = getCurrentPlayer(getState());
          if (currentPlayer?.playerType === PLAYER_TYPE.AI) {
            delayedPromise(MOVE_DELAY, () => dispatch(computerMove(currentPlayer)));
          }
        }
        break;
      case GAME_PHASES.TRICK_END:
        if (isRoundComplete(getState())) {
          delayedPromise(MOVE_DELAY, () => dispatch(endRound()));
        } else {
          delayedPromise(MOVE_DELAY, () => dispatch(newTrick()));
        }
        break;

      case GAME_PHASES.TRICK_START:
        dispatch(startPlaying());
        break;

      case GAME_PHASES.ROUND_NEW:
        dispatch(startRound());
        break;

      case GAME_PHASES.ROUND_END:
        if (isGameComplete(getState())) {
          dispatch(endGame());
        } else {
          dispatch(newRound());
          break;
        }
    }
  };
};

export const onNewGame = () => {
  return (dispatch: any, getState: () => Hearts.State) => {
    dispatch(newGame());
    dispatch(gameTick());
  };
};

const isValidMove = (state: Hearts.State, playerID: string, card: ICardInfo) => {
  if (isTrickComplete(state)) {
    return false;
  }

  // Does Player possess card
  if (!playerHandContainsCard(state, playerID, card)) {
    return false;
  }

  // Suit to follow
  const suit = getCurrentTrickSuit(state);

  if (suit === null) {
    // Player has the lead
    // Check if hearts broken
    if (card.suit === 'H' && !isHeartsBroken(state)) {
      // Need to check if only hearts left in hand
      if (isPlayerHandOnlyHearts(state, playerID)) {
        return true;
      }
      return false;
    }
    return true;
  }

  if (card.suit === suit || !playerHandContainsSuit(state, playerID, suit)) {
    // Following suit or Can't follow suit
    return true;
  }
  return false;
};

export const playCardAction = (playerID: string, card: ICardInfo) => {
  return (dispatch: any, getState: () => Hearts.State) => {
    const state = getState();
    if (getCurrentPlayerID(state) === playerID && isValidMove(state, playerID, card)) {
      // Play card, and tick over the game state
      dispatch(playCard(playerID, card));
    } else {
      // Invalid card or playing out of turn.
      // return Promise.reject('Invalid Card Played.');
    }
  };
};
export const playOrToggleCard = (playerID: string, card: ICardInfo) => {
  return (dispatch: any, getState: () => Hearts.State) => {
    const state = getState();
    let action = null;
    if (isCurrentPhase(state, GAME_PHASES.PASSING)) {
      action = toggleCard;
    } else if (isCurrentPhase(state, GAME_PHASES.PLAYING)) {
      action = playCardAction;
    }
    action && dispatch(action(playerID, card));
  };
};
