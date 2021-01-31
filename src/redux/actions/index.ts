import { Dispatch } from 'redux';
import { Hearts } from '../../common/types/hearts';
import { getCurrentPhase, getPassDirection, getPlayerByName, getPlayers } from '../reducers';
import { GAME_PHASES } from '../reducers/heartPhases';
import { HEART_PLAYER_NAMES, PLAYER_TYPE } from '../reducers/heartsPlayers';
import { computerSelections, deal } from './deal';
import { startPlaying, startRound } from './phases';
import { addPlayer } from './players';
import { setPOV } from './ui';

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
          dispatch(startPlaying());
        }
        break;
    }
  };
};
