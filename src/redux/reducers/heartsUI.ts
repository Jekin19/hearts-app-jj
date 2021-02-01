import { SET_PLAYER_POV, UIActionTypes } from '../actions/ui';

const heartsUI = (state = { POV: null }, action: UIActionTypes) => {
  switch (action.type) {
    case SET_PLAYER_POV:
      return { POV: action.playerID };
    default:
      return state;
  }
};

export const getCurrentPOV = (state: UI.State) => state.POV;

export default heartsUI;
