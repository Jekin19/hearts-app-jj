import { GAME_PHASES, SET_PHASE } from '../reducers/heartPhases';

export const startPassing = () => ({
  type: SET_PHASE,
  phase: GAME_PHASES.PASSING
});
export const startPlaying = () => ({
  type: SET_PHASE,
  phase: GAME_PHASES.PLAYING
});
export const startRound = () => ({
  type: SET_PHASE,
  phase: GAME_PHASES.ROUND_START
});
export const endRound = () => ({
  type: SET_PHASE,
  phase: GAME_PHASES.ROUND_END
});
export const endTrick = () => ({
  type: SET_PHASE,
  phase: GAME_PHASES.TRICK_END
});
export const endGame = () => ({ type: SET_PHASE, phase: GAME_PHASES.GAME_END });

export type PhasesActionTypes =
  | ReturnType<typeof startPassing>
  | ReturnType<typeof startPlaying>
  | ReturnType<typeof startRound>
  | ReturnType<typeof endRound>
  | ReturnType<typeof endTrick>
  | ReturnType<typeof endGame>;
