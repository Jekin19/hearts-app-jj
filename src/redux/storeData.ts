export const store = {
  players: [
    {
      id: "e85b3df3-9451-494b-a3ea-1065d8243231",
      name: "Alice",
      playerType: "AI",
      playerHand: [
        {
          value: "4",
          suit: "C",
        },
        {
          value: "10",
          suit: "C",
        },
        {
          value: "Q",
          suit: "C",
        },
        {
          value: "K",
          suit: "C",
        },
        {
          value: "10",
          suit: "D",
        },
        {
          value: "10",
          suit: "H",
        },
        {
          value: "J",
          suit: "H",
        },
        {
          value: "Q",
          suit: "H",
        },
        {
          value: "K",
          suit: "H",
        },
      ],
      selectedCards: [],
    },
    {
      id: "98438b15-a4b4-487c-9fdf-d44e83cc68bd",
      name: "Bob",
      playerType: "AI",
      playerHand: [
        {
          value: "3",
          suit: "C",
        },
        {
          value: "5",
          suit: "C",
        },
        {
          value: "8",
          suit: "C",
        },
        {
          value: "J",
          suit: "C",
        },
        {
          value: "A",
          suit: "C",
        },
        {
          value: "4",
          suit: "D",
        },
        {
          value: "10",
          suit: "S",
        },
        {
          value: "5",
          suit: "H",
        },
        {
          value: "8",
          suit: "H",
        },
      ],
      selectedCards: [],
    },
    {
      id: "5c0e85bd-1670-484e-8c3f-86cea5cd54c2",
      name: "Carol",
      playerType: "AI",
      playerHand: [
        {
          value: "6",
          suit: "C",
        },
        {
          value: "2",
          suit: "D",
        },
        {
          value: "5",
          suit: "D",
        },
        {
          value: "K",
          suit: "D",
        },
        {
          value: "A",
          suit: "D",
        },
        {
          value: "9",
          suit: "S",
        },
        {
          value: "4",
          suit: "H",
        },
        {
          value: "6",
          suit: "H",
        },
        {
          value: "A",
          suit: "H",
        },
      ],
      selectedCards: [],
    },
    {
      id: "05e4cbf6-d2f9-443f-a1d7-d7a06a72ab0b",
      name: "You",
      playerType: "Human",
      playerHand: [
        {
          value: "2",
          suit: "C",
        },
        {
          value: "7",
          suit: "C",
        },
        {
          value: "9",
          suit: "C",
        },
        {
          value: "6",
          suit: "D",
        },
        {
          value: "7",
          suit: "D",
        },
        {
          value: "Q",
          suit: "D",
        },
        {
          value: "2",
          suit: "H",
        },
        {
          value: "3",
          suit: "H",
        },
        {
          value: "7",
          suit: "H",
        },
        {
          value: "9",
          suit: "H",
        },
      ],
      selectedCards: [],
    },
  ],
  rounds: [
    {
      tricks: [
        [
          {
            card: {
              value: "K",
              suit: "S",
            },
            playerID: "e85b3df3-9451-494b-a3ea-1065d8243231",
          },
          {
            card: {
              value: "J",
              suit: "S",
            },
            playerID: "98438b15-a4b4-487c-9fdf-d44e83cc68bd",
          },
          {
            card: {
              value: "4",
              suit: "S",
            },
            playerID: "5c0e85bd-1670-484e-8c3f-86cea5cd54c2",
          },
        ],
        [
          {
            card: {
              value: "8",
              suit: "S",
            },
            playerID: "98438b15-a4b4-487c-9fdf-d44e83cc68bd",
          },
          {
            card: {
              value: "5",
              suit: "S",
            },
            playerID: "5c0e85bd-1670-484e-8c3f-86cea5cd54c2",
          },
          {
            card: {
              value: "2",
              suit: "S",
            },
            playerID: "05e4cbf6-d2f9-443f-a1d7-d7a06a72ab0b",
          },
          {
            card: {
              value: "A",
              suit: "S",
            },
            playerID: "e85b3df3-9451-494b-a3ea-1065d8243231",
          },
        ],
        [
          {
            card: {
              value: "3",
              suit: "D",
            },
            playerID: "5c0e85bd-1670-484e-8c3f-86cea5cd54c2",
          },
          {
            card: {
              value: "8",
              suit: "D",
            },
            playerID: "05e4cbf6-d2f9-443f-a1d7-d7a06a72ab0b",
          },
          {
            card: {
              value: "9",
              suit: "D",
            },
            playerID: "e85b3df3-9451-494b-a3ea-1065d8243231",
          },
          {
            card: {
              value: "J",
              suit: "D",
            },
            playerID: "98438b15-a4b4-487c-9fdf-d44e83cc68bd",
          },
        ],
        [
          {
            card: {
              value: "6",
              suit: "S",
            },
            playerID: "e85b3df3-9451-494b-a3ea-1065d8243231",
          },
          {
            card: {
              value: "3",
              suit: "S",
            },
            playerID: "98438b15-a4b4-487c-9fdf-d44e83cc68bd",
          },
          {
            card: {
              value: "Q",
              suit: "S",
            },
            playerID: "5c0e85bd-1670-484e-8c3f-86cea5cd54c2",
          },
          {
            card: {
              value: "7",
              suit: "S",
            },
            playerID: "05e4cbf6-d2f9-443f-a1d7-d7a06a72ab0b",
          },
        ],
      ],
    },
  ],
  phase: "PLAYING",
  ui: {
    POV: "05e4cbf6-d2f9-443f-a1d7-d7a06a72ab0b",
  },
};
