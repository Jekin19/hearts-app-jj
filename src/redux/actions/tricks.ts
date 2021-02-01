export const NEW_TRICK = 'NEW_TRICK';

export const newTrick = () => ({
  type: NEW_TRICK
});

export type TrickActionTypes = ReturnType<typeof newTrick>;
