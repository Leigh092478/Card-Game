
(function() {
  angular.module('cardGame', ['DeckOfCards']);

  angular
    .module('cardGame')
    .controller('DemoController', DemoController);

  DemoController.$inject = ['deckFactory'];
  
  function DemoController(deckFactory) {
    var self = this;
    self.deck = deckFactory.createNewDeck();
    self.dealt = [];
    self.shuffle = self.deck.shuffle;
    self.reset = reset;
    self.dealOne = dealOne;
    self.dealAll = dealAll;
    self.dealShuffledDeck = dealShuffledDeck;
    
    function reset() {
      self.dealt = [];
      self.deck.reset();
    }
    
    function dealOne() {
      var nextCard = self.deck.dealOneCard();
      if (nextCard) {
        self.dealt.push(nextCard);
      }
      return nextCard;
    }
    
    function dealAll() {
      while (dealOne()) {}
    }

    function dealShuffledDeck() {
      self.reset();
      self.shuffle();
      self.dealAll();
    }
  }
  
})();