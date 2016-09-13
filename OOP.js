// CTCI Trees

// Object-oriented Design

// 7.1 Deck of cards: Design data structures for a generic deck of cards.
// Explain how you would subclass the data structures to implement blackjack.

  class CardGame {
    constructor() {
      this.turn = 0;
      this.deck = new Deck();
    }
    dealCard() {
      return this.deck.getCard();
    }
  }

  class BlackJack extends CardGame {
    constructor(player) {
      super();
      this.player = player;
      this.dealer = new Dealer();
    }
  }

  class Deck {
    constructor() {
      this.cards = this.generateCards();
      this.played = [];
    }
    generateCards() {
      var suits = ['spades', 'diamonds', 'hearts', 'clubs'];
      var ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
      let cards = [];

      suits.forEach(suit => {
        ranks.forEach(rank => {
          cards.push(new Card(rank, suit));
        });
      });

      return cards
    }
    getCard() {
      if (this.cards.length === 0) {
        return null;
      } else {
        let random = Math.floor(Math.random() * (this.cards.length - this.played.length));
        let randomCard = this.cards[random];
        // shift card from unplayed to played
        this.played.push(this.cards.splice(random, 1)[0]);
        return randomCard;
      }
    }
  }

  class Card {
    constructor(rank, suit) {
      this.rank = rank;
      this.suit = suit;
    }
    getValue() {
      if (this.rank == 'jack' || 'queen' || 'king') {
        return [10];
      } else if (this.rank == 'ace') {
        return [1, 11];
      } else {
        return parseInt(this.rank, 10);
      }
    }
  }

  class Player {
    constructor(name) {
      this.name = name;
      this.cards = [];
    }
    drawCard() {
      // how to structure this? does the player emit an event, to which the game responds?
      // should the game be "shared by the players?
      // should the game be a single class?
    }
  }

  class Dealer extends Player {
    constructor() {
      super('dealer');
    }
  }