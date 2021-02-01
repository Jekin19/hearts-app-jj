import { Round } from '../../common/types/round';
import { Tricks } from '../../common/types/tricks';
import { PhasesActionTypes } from '../actions/phases';
import { NEW_GAME, NEW_ROUND, RoundActions } from '../actions/round';
import * as fromHeartsTricks from './heartsTricks';

export const getRoundNumber = (rounds: Array<Round.State>) => rounds.length;
export const getCurrentTrick = (rounds: Array<Round.State>) => fromHeartsTricks.getCurrentTrick(rounds[0].tricks);
export const getPreviousTrick = (rounds: Array<Round.State>) => fromHeartsTricks.getPreviousTrick(rounds[0].tricks);
export const getCurrentTrickSuit = (rounds: Array<Round.State>) =>
  fromHeartsTricks.getTrickSuit(getCurrentTrick(rounds));
export const getRoundTrickHistory = (rounds: Array<Round.State>) =>
  fromHeartsTricks.getCompletedTricks(rounds[0].tricks as Array<Array<Tricks.State>>);
export const getCurrentWinnerID = (rounds: Array<Round.State>) => fromHeartsTricks.getCurrentWinnerID(rounds[0].tricks);

export const isHeartsBroken = (rounds: Array<Round.State>) => {
  for (let trick of getRoundTrickHistory(rounds)) {
    for (let move of trick) {
      if (move.card.suit === 'H') {
        return true;
      }
    }
  }
  return false;
};

export const getScores = (state: Array<Round.State>, playerIDs: Array<string>) => {
  const scores = [];
  let trickPoints = 0;
  let trickWinner = null;
  for (let r = state.length - 1; r >= 0; r--) {
    let round = state[r];
    const roundScores = [0, 0, 0, 0].fill(0, 0, playerIDs.length);
    for (let trick of round.tricks) {
      trickPoints = fromHeartsTricks.getTrickPointValue(trick);
      if (trickPoints > 0) {
        trickWinner = fromHeartsTricks.getTrickWinnerID(trick);
        roundScores[playerIDs.indexOf(trickWinner)] += trickPoints;
      }
    }
    // Check if someone shot the moon.
    for (let i = 0; i < roundScores.length; i++) {
      if (roundScores[i] === 26) {
        roundScores[i] -= 52; // Erase current score, and go negative.
      }
    }
    scores.push(roundScores);
  }
  return scores;
};

const heartsRound = (state: Round.State = { tricks: [[]] }, action: RoundActions | PhasesActionTypes) => {
  return {
    tricks: fromHeartsTricks.heartsTricks(state.tricks, action)
  };
};

export const heartsRounds = (
  state: Array<Round.State> = [{ tricks: [[]] }],
  action: RoundActions | PhasesActionTypes
) => {
  switch (action.type) {
    case NEW_ROUND:
      return [heartsRound(undefined, action), ...state];
    case NEW_GAME:
      return [heartsRound(undefined, action)];
    default:
      return [heartsRound(state[0], action), ...state.slice(1)];
  }
};
