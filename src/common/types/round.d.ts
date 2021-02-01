import { Tricks } from './tricks';

declare namespace Round {
  export interface State {
    tricks: Array<Array<Tricks.State>>;
  }
}
