import { isMobile } from "react-device-detect";

export const showPlayerHand = (playerDirection: string): boolean => {
  return !isMobile || playerDirection === "south";
};

export const defaultNavBarHeight = (height: number | undefined): number => {
  return isMobile ? 40 : height ?? 64;
};

export const getNavBarClassName = () => {
  return isMobile ? " pt-4 p-0 pl-3" : " pt-4 p-2 pl-3";
};

export const getScoreHeight = () => {
  return isMobile ? 200 : 350;
};
