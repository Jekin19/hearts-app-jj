import { ICardInfo, Suits } from '../../common/heartRules';
import { Hearts } from '../../common/types/hearts';
import { store } from '../storeData';
import * as fromHeartsRounds from './heartsRounds';
import * as fromHeartsTricks from './heartsTricks';
import * as fromHeartsPlayers from './heartsPlayers';
import * as fromHeartsUI from './heartsUI';
import { GAME_PHASES } from './heartPhases';

export const initialState: Hearts.State = {
  players: [],
  phase: store.phase,
  rounds: [{ tricks: [[]] }],
  ui: { POV: null }
};

export const getPassDirection = (state: Hearts.State) => {
  const roundNumber = getRoundNumber(state);
  const passDirections = [0, 1, -1, 2];
  return passDirections[roundNumber % passDirections.length];
};

export const isReadyToPass = (state: Hearts.State) => {
  if (!isCurrentPhase(state, GAME_PHASES.PASSING)) {
    return false;
  }

  const playerIDs = getPlayerIDs(state);

  for (let p = 0; p < playerIDs.length; p++) {
    let selectedCards = getSelectedCards(state, playerIDs[p]);
    if (selectedCards?.length !== 3) {
      return false;
    }
  }
  return true;
};

// Player selectors
export const getPlayers = (state: Hearts.State) => state.players;
export const getCurrentPhase = (state: Hearts.State) => state.phase;
export const getPlayerByName = (state: Hearts.State, playerName: string) =>
  state?.players?.find((player) => player.name === playerName);
export const getPlayerHand = (state: Hearts.State, playerID: string) => {
  const player = fromHeartsPlayers.getPlayerByID(state.players, playerID);
  return player?.playerHand;
};
export const getSelectedCards = (state: Hearts.State, playerID: string) =>
  fromHeartsPlayers.getSelectedCards(state.players, playerID);
export const getPlayerIDs = (state: Hearts.State) => fromHeartsPlayers.getPlayerIDs(state.players);

export const getCurrentPlayer = (state: Hearts.State) => {
  let players = getPlayers(state);
  if (!players.length) {
    // No players yet
    return null;
  }

  const currentTrick = getCurrentTrick(state);
  // If an empty trick, get the previous trick's winner.
  if (!currentTrick.length) {
    const previousTrick = getPreviousTrick(state);
    if (!previousTrick.length) {
      // Start of game, start with first player
      return players[0];
    }
    // Retain lead of previous trick winner
    const previousWinnerID = fromHeartsTricks.getTrickWinnerID(previousTrick);
    return players.find((player) => player.id === previousWinnerID);
  }
  // If an ongoing trick, get the next player.
  const lastMove = fromHeartsTricks.getLastMove(currentTrick);
  const idx = players.findIndex((p) => p.id === lastMove.playerID);
  return players[(idx + 1) % players.length];
};

export const getCurrentPlayerID = (state: Hearts.State) => {
  const currentPlayer = getCurrentPlayer(state);
  if (currentPlayer === null) {
    return null;
  }
  return currentPlayer?.id;
};

export const isTrickComplete = (state: Hearts.State) => {
  const players = getPlayers(state);
  const currentTrick = getCurrentTrick(state);
  if (players.length === currentTrick.length) {
    return true;
  }
  return false;
};

export const getPOVPlayerIndex = (state: Hearts.State) => {
  const playerIDs = getPlayerIDs(state);
  const POVPlayerID = getCurrentPOV(state);
  return playerIDs.indexOf(POVPlayerID as string);
};

export const isRoundComplete = (state: Hearts.State) => {
  for (let playerID of getPlayerIDs(state)) {
    const playerHand = getPlayerHand(state, playerID);
    if (playerHand && playerHand.length > 0) {
      return false;
    }
  }
  return true;
};

export const getScoreTotals = (state: Hearts.State) => {
  const currentScores = getScores(state);
  let sum = [...currentScores[0]].fill(0);
  for (let roundScore of currentScores) {
    for (let s = 0; s < roundScore.length; s++) {
      sum[s] += roundScore[s];
    }
  }
  return sum;
};

export const isGameComplete = (state: Hearts.State) => {
  // First check if round is complete..
  if (!isRoundComplete(state)) {
    return false;
  }
  // Check cumulate score for each player.  Return true when scores reach above 100
  const scoreTotals = getScoreTotals(state);
  for (let s = 0; s < scoreTotals.length; s++) {
    if (scoreTotals[s] > 100) {
      return true;
    }
  }
  return false;
};

// Phase selectors
export const isCurrentPhase = (state: Hearts.State, phase: string) => state.phase === phase;
export const playerHandContainsCard = (state: Hearts.State, playerID: string, card: ICardInfo) =>
  fromHeartsPlayers.playerHandContainsCard(state.players, playerID, card);
export const isPlayerHandOnlyHearts = (state: Hearts.State, playerID: string) =>
  fromHeartsPlayers.isPlayerHandOnlyHearts(state.players, playerID);
export const playerHandContainsSuit = (state: Hearts.State, playerID: string, suit: Suits) =>
  fromHeartsPlayers.playerHandContainsSuit(state.players, playerID, suit);

// Round selectors
export const getRoundNumber = (state: Hearts.State) => fromHeartsRounds.getRoundNumber(state.rounds);
export const getCurrentTrick = (state: Hearts.State) => fromHeartsRounds.getCurrentTrick(state.rounds);
export const getPreviousTrick = (state: Hearts.State) => fromHeartsRounds.getPreviousTrick(state.rounds);
export const getCurrentTrickSuit = (state: Hearts.State) => fromHeartsRounds.getCurrentTrickSuit(state.rounds);
export const isHeartsBroken = (state: Hearts.State) => fromHeartsRounds.isHeartsBroken(state.rounds);
export const getCurrentWinnerID = (state: Hearts.State) => fromHeartsRounds.getCurrentWinnerID(state.rounds);
export const getScores = (state: Hearts.State) => fromHeartsRounds.getScores(state.rounds, getPlayerIDs(state));

// UI selectors
export const getCurrentPOV = (state: Hearts.State) => fromHeartsUI.getCurrentPOV(state.ui);

export const getWinnerID = (state: Hearts.State) => (isTrickComplete(state) ? getCurrentWinnerID(state) : null);
