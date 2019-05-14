// Deck Of Cards module

(function() {
  angular.module('DeckOfCards', []);

  angular
    .module('DeckOfCards')
    .factory('deckFactory', deckFactory);

  deckFactory.$inject = ['$sce'];
  
  function deckFactory ($sce) {
    var suits = [{
      name: 'Clubs',
      color: 'black',
      glyph: $sce.trustAsHtml('&#x2663;')
    }, {
      name: 'Spades',
      color: 'black',
      glyph: $sce.trustAsHtml('&#x2660;')
    }, {
      name: 'Hearts',
      color: 'red',
      glyph: $sce.trustAsHtml('&#x2665;')
    }, {
      name: 'Diamonds',
      color: 'red',
      glyph: $sce.trustAsHtml('&#x2666;')
    }];

    function Card(suit, letter, name) {
      return {
        suit: suit,
        letter: letter,
        name: name || letter,
        displayName: (name || letter) + ' of ' + suit.name
      };
    }
    
     function Deck() {
      var deck = {};
      deck.cards = [];
      deck.shuffle = shuffle;
      deck.dealOneCard = dealOneCard;
      deck.cut = cut;
      deck.cutInPlace = cutInPlace;
      deck.reset = reset;
      deck.reset();
      
      //generate a randmon int between a min and max
      function randomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
      }
      
      // cuts the cards and returns a top and bottom pile
      function cut(cards) {
        if (!cards || !cards.length) {
          return {
            top: [],
            bottom: []
          };
        } else if (cards.length === 1) {
          return {
            top: [cards[0]],
            bottom: []
          };
        } else {
          var middle = Math.floor(cards.length / 2);
          var variance = randomInt(0, 12) - 6;
          middle += variance;
          middle = Math.max(middle, 1);
          return {
            top: cards.slice(0, middle),
            bottom: cards.slice(middle)
          };
        }
      }
      
      // function that cuts the cards and puts the bottom on the top
      function cutInPlace(pile) {
        var halves = cut(pile);
        return halves.bottom.concat(halves.top);
      }
      
      // huffle the cards
      function shuffle() {
        for (var i = 0; i < 20; i++) {
          var halves = cut(deck.cards);
          var pile = [];
          while (halves.top.length > 0 || halves.bottom.length > 0) {
            var take = randomInt(1, 5);
            pile = pile.concat(halves.top.splice(0, take));
            take = randomInt(1, 5);
            pile = pile.concat(halves.bottom.splice(0, take));
          }
          deck.cards = cutInPlace(pile);
        }
      }

      function dealOneCard() {
        return deck.cards.shift();
      }
      
      // reset the cards to a new deck in order
      function reset() {
        deck.cards = [];
        suits.forEach(function(suit) {
          deck.cards.push(Card(suit, 'A', 'Ace'));
          for (var i = 2; i <= 10; i++) {
            deck.cards.push(Card(suit, i+''));
          }
          deck.cards.push(Card(suit, 'J', 'Jack'));
          deck.cards.push(Card(suit, 'Q', 'Queen'));
          deck.cards.push(Card(suit, 'K', 'King'));
        });
      }

      return deck;
    }

    return {
      createNewDeck: Deck
    };
  }
  
})();