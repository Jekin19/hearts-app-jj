import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState } from './reducers';
import heartsPhase from './reducers/heartPhases';
import heartsPlayers from './reducers/heartsPlayers';
import { heartsRounds } from './reducers/heartsRounds';
import heartsUI from './reducers/heartsUI';

export default function configureStore(preloadedState = initialState) {
  const middleWares = [logger, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middleWares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const rootReducer = combineReducers({
    players: heartsPlayers,
    phase: heartsPhase,
    rounds: heartsRounds,
    ui: heartsUI
  });

  const store = createStore(rootReducer, {}, composedEnhancers);
  return store;
}
