interface IHeartsRulesProps {
  name: string;
  numDecks: number;
  handSize: number;
  cardSuits: ICardSuit;
  cardValues: any;
  pointValue: any;
  cardRank: any;
}

export type Suits = 'S' | 'H' | 'C' | 'D';

export const constants: IHeartsRulesProps = {
  name: 'Hearts',
  numDecks: 1,
  handSize: 13,
  cardSuits: {
    S: {
      name: 'Spades',
      symbol: '\u2660',
      colour: 'black',
      rank: 26
    },
    H: {
      name: 'Hearts',
      symbol: '\u2665',
      colour: 'red',
      rank: 39
    },
    C: {
      name: 'Clubs',
      symbol: '\u2663',
      colour: 'black',
      rank: 0
    },
    D: {
      name: 'Diamonds',
      symbol: '\u2666',
      colour: 'red',
      rank: 13
    }
  },

  cardValues: {
    '2': { name: 'Two', symbol: '2', rank: 1 },
    '3': { name: 'Three', symbol: '3', rank: 2 },
    '4': { name: 'Four', symbol: '4', rank: 3 },
    '5': { name: 'Five', symbol: '5', rank: 4 },
    '6': { name: 'Six', symbol: '6', rank: 5 },
    '7': { name: 'Seven', symbol: '7', rank: 6 },
    '8': { name: 'Eight', symbol: '8', rank: 7 },
    '9': { name: 'Nine', symbol: '9', rank: 8 },
    '10': { name: 'Ten', symbol: '10', rank: 9 },
    J: { name: 'Jack', symbol: 'J', rank: 10 },
    Q: { name: 'Queen', symbol: 'Q', rank: 11 },
    K: { name: 'King', symbol: 'K', rank: 12 },
    A: { name: 'Ace', symbol: 'A', rank: 13 }
  },

  pointValue: (card: ICardInfo) => {
    if (card.suit === 'H') {
      return 1;
    } else if (card.suit === 'S' && card.value === 'Q') {
      return 13;
    } else {
      return 0;
    }
  },

  cardRank: (card: ICardInfo) => {
    if (card === undefined || card.suit === undefined || card.value === undefined) {
      return 0;
    }
    return constants.cardSuits[card.suit].rank + constants.cardValues[card.value].rank;
  }
};

export interface ICardValueProps {
  value: string;
}

export interface ICardSymbolProps {
  symbol: string;
}

export interface ICardInfo extends ICardValueProps {
  suit: Suits;
}

interface ISuitProps {
  name: string;
  symbol: string;
  colour: string;
  rank: number;
}
interface ICardSuit {
  [key: string]: ISuitProps;
}
