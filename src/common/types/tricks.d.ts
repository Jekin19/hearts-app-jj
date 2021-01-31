import { ICardInfo } from '../heartRules';

declare namespace Tricks {
  export interface State {
    card: ICardInfo;
    playerID: string;
  }
}
