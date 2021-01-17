import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(preloadedState = { initial: "initial" }) {
  const middleWares = [logger, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middleWares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const rootReducer = combineReducers({
    initial: (state, action) => state ?? { initial: "initial" },
  });

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  return store;
}
