export const SET_PLAYER_POV = 'UI:SET_PLAYER_POV';

export const setPOV = (playerID: string) => ({
  type: SET_PLAYER_POV,
  playerID
});
