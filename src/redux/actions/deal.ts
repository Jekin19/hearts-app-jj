import { Dispatch } from 'redux';
import { aiPassChoice } from '../../ai/random';
import { ICardInfo, Suits } from '../../common/heartRules';
import { Hearts } from '../../common/types/hearts';
import { getPlayers } from '../reducers';
import { dealCard, toggleCard } from './players';

const randomPop = (array: Array<ICardInfo>) => {
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
};

export const deal = () => {
  return (dispatch: Dispatch, getState: () => Hearts.State) => {
    const suits: Array<Suits> = ['C', 'D', 'S', 'H'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const players = getPlayers(getState());
    let deck = [];

    for (let s = 0; s < suits.length; s++) {
      for (let v = 0; v < values.length; v++) {
        const cardInfo: ICardInfo = { value: values[v], suit: suits[s] };
        deck.push(cardInfo);
      }
    }

    const deckSize = deck.length;
    for (let d = 0; d < deckSize; d++) {
      dispatch(dealCard(players[d % players.length].id, randomPop(deck)));
    }

    return Promise.resolve('Finished Dealing');
  };
};

const computerSelectPassCard = (playerID: string) => {
  return (dispatch: Dispatch, getState: () => Hearts.State) => {
    const state = getState();
    let card = aiPassChoice(state, playerID);
    dispatch(toggleCard(playerID, card));
  };
};

export const computerSelections = () => {
  return (dispatch: any, getState: () => Hearts.State) => {
    const state = getState();
    const players = getPlayers(state);
    const aiPlayers = players.filter((p) => p.playerType === 'AI');
    for (let p = 0; p < aiPlayers.length; p++) {
      for (let i = 0; i < 3; i++) {
        dispatch(computerSelectPassCard(aiPlayers[p].id));
      }
    }
    return Promise.resolve('Done Selections');
  };
};
