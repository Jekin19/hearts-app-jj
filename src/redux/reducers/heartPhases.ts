import { PhasesActionTypes } from '../actions/phases';
import { PLAY_CARD } from '../actions/players';
import { NEW_GAME, NEW_ROUND } from '../actions/round';
import { NEW_TRICK } from '../actions/tricks';

export const SET_PHASE = 'SET_PHASE';

// GAME_START:
//  Add Players
//  Fix Deck Size
// ROUND_START:
//  Deal
// PASSING:
//  Select Cards to pass
//  Pass Cards
// PLAYING:
//  Play Card
//  New Trick
// ROUND_END:
//  Display scores
//  Round_START:
// GAME_END:
//  Display scores
//  New Game
//
export const GAME_PHASES = {
  GAME_START: 'GAME_START',
  GAME_END: 'GAME_END',
  ROUND_NEW: 'ROUND_NEW',
  ROUND_START: 'ROUND_START',
  ROUND_END: 'ROUND_END',
  TRICK_START: 'TRICK_START',
  TRICK_END: 'TRICK_END',
  PASSING: 'PASSING',
  PLAYING: 'PLAYING'
} as const;

export const heartsPhase = (state = GAME_PHASES.GAME_START, action: PhasesActionTypes) => {
  switch (action.type) {
    case SET_PHASE:
      if (!(action.phase in GAME_PHASES)) {
        return state;
      }
      return GAME_PHASES[action.phase];
    case NEW_GAME:
      return GAME_PHASES.GAME_START;
    case NEW_ROUND:
      return GAME_PHASES.ROUND_NEW;
    case PLAY_CARD:
      return GAME_PHASES.PLAYING;
    case NEW_TRICK:
      return GAME_PHASES.TRICK_START;
    default:
      return state;
  }
};

export default heartsPhase;
