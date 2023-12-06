// make a standard deck of cards. shuffle the deck and draw 2 cards at random. display the 2 cards.

function makeDeck() {
  let deck = [];
  const suits = ['Hearts','Spades','Clubs','Diamonds'];
  const specialNumbers = new Map([
    [1, 'Ace'],
    [11, 'Jack'],
    [12, 'Queen'],
    [13, 'King']
  ]);
  const numbers = Array.from(Array(13).keys()).map(i => specialNumbers.has(i+1) ? specialNumbers.get(i+1) : i+1);
  
  suits.forEach(suit => {
    numbers.forEach(number => {
      const card = `${number} of ${suit}`;
      deck.push(card);
    });
  });

  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function drawFromDeckAtRandom(deck) {
  return deck.splice(Math.random() * deck.length, 1);
}

const deck = makeDeck();
console.log(deck);

shuffleDeck(deck);
console.log(deck);

const card1 = drawFromDeckAtRandom(deck);
const card2 = drawFromDeckAtRandom(deck);
console.log(card1);
console.log(card2);
console.log(`${deck.length} cards remain in the deck`); // should be 50