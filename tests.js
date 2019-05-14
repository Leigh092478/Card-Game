// Jasmine unit tests for the Deck Of Cards module

describe('Unit Testing Deck Of Cards module', function() {
  beforeEach(module('DeckOfCards'));

  // the service under test (deckFactory)
  var $service;
  // the deck instance under test
  var deck;
  var numberOfCardsInDeck = 52;

  beforeEach(inject(function(_deckFactory_) {
    $service = _deckFactory_;
  }));

  describe('deckFactory.createNewDeck', function() {
    it('exposes a Deck constructor', function() {
      expect($service.createNewDeck).toBeDefined();
      expect(typeof $service.createNewDeck).toBe('function');
    });
    
    describe('Deck instance', function() {
      beforeEach(function() {
        deck = $service.createNewDeck();
      });
      
      it('is a deck with 52 cards', function() {
        expect(deck.cards).toBeDefined();
        expect(deck.cards.length).toBe(numberOfCardsInDeck);
      });
      
      it('has required methods shuffle and dealOneCard', function() {
        expect(typeof deck.shuffle).toBe('function');
        expect(typeof deck.dealOneCard).toBe('function');
      });
      
      it('can deal a card', function() {
        var card = deck.dealOneCard();
        // expect that dealing a card reduced the count of cards in the deck
        expect(deck.cards.length).toBe(numberOfCardsInDeck - 1);
      });
      
      it('can deal all cards', function() {
        for (var i = 0; i < numberOfCardsInDeck; i++) {
          expect(deck.dealOneCard()).toBeTruthy();
        }
        expect(deck.dealOneCard()).toBeFalsy();
      });
      
      it('can shuffle', function() {
        var compares = [];
        // compare an unshuffled deck
        compares.push(angular.copy(deck.cards));
        
        // create 10 shuffles of a deck, and compare them to each other, they should all be unique
        for (var m = 0; m < 10; m++) {
          deck.shuffle();
          compares.push(angular.copy(deck.cards));
        }
        
        for (var i = 0; i < compares.length - 1; i++) {
          var leftCompare = compares[i];
          for (var j = i + 1; j < compares.length; j++) {
            var rightCompare = compares[j];
            expect(angular.equals(leftCompare, rightCompare)).toBe(false);
          }
        }
      });
    });
  });
});