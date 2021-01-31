import { Hearts } from '../../common/types/hearts';
import { store } from '../storeData';

export const initialState: Hearts.State = {
  players: [],
  phase: store.phase,
  rounds: []
};

export const getRoundNumber = (state: Hearts.State) => state.rounds.length;

export const getPassDirection = (state: Hearts.State) => {
  const roundNumber = getRoundNumber(state);
  const passDirections = [0, 1, -1, 2];
  return passDirections[roundNumber % passDirections.length];
};

// Player selectors
export const getPlayers = (state: Hearts.State) => state.players;
export const getCurrentPhase = (state: Hearts.State) => state.phase;
export const getPlayerByName = (state: Hearts.State, playerName: string) =>
  state?.players?.find((player) => player.name === playerName);
