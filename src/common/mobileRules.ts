import { isMobile } from 'react-device-detect';

export const showPlayerHand = (playerDirection: string): boolean => {
  return !isMobile || playerDirection === 'south';
};
