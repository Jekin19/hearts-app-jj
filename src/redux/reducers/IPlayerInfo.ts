import { ICardInfo } from '../../common/heartRules';

export interface IPlayerInfo {
  id: string;
  name: string;
  playerType: string;
  playerHand: Array<ICardInfo> | [];
  selectedCards: Array<ICardInfo> | [];
}
