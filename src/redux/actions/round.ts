export const NEW_ROUND = 'NEW_ROUND';
export const NEW_GAME = 'NEW_GAME';

export const newRound = () => ({ type: NEW_ROUND });
export const newGame = () => ({ type: NEW_GAME });

export type RoundActions = ReturnType<typeof newRound> | ReturnType<typeof newGame>;
