import { IPlayerInfo } from '../../redux/reducers/IPlayerInfo';
import { GAME_PHASES } from '../../redux/reducers/heartPhases';
import { Tricks } from './tricks';
import { Round } from './round';

declare namespace Hearts {
  export interface State {
    players: Array<IPlayerInfo>;
    phase: GAME_PHASES;
    rounds: Array<Round.State>;
    ui: UI.State;
  }
}
