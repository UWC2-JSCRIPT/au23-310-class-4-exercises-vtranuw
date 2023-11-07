const { getDeck } = require("./createCardDeck.js"); // import the getDeck from createCardDeck.js to use .
const blackjackDeck = getDeck();

// /**
//  * Represents a card player (including dealer).
//  * @constructor
//  * @param {string} name - The name of the player
//  */
// class CardPlayer {}; //TODO
class CardPlayer {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  drawCard() {
    const randomIndex = Math.floor(Math.random() * blackjackDeck.length);
    const drawnCard = blackjackDeck[randomIndex];
    this.hand.push(drawnCard);
  }
}
// // CREATE TWO NEW CardPlayers
// const dealer; // TODO
// const player; // TODO
const dealer = new CardPlayer("Dealer");
const player = new CardPlayer("Player");
console.log(player);
console.log(dealer);
// /**
//  * Calculates the score of a Blackjack hand
//  * @param {Array} hand - Array of card objects with val, displayVal, suit properties
//  * @returns {Object} blackJackScore
//  * @returns {number} blackJackScore.total
//  * @returns {boolean} blackJackScore.isSoft
//  */
const calcPoints = (hand) => {
  // CREATE FUNCTION HERE
  let total = 0;
  let isSoft = false; // Assume no Ace is counted as 11 by default

  for (const card of hand) {
    total += card.val;
  }

  // Check if there are Aces in the hand
  for (const card of hand) {
    if (card.val === 1 && total + 10 <= 21) {
      total += 10; // Treat the Ace as 11 points
      isSoft = true;
      break;
    }
  }

  return { total, isSoft };
};

// /**
//  * Determines whether the dealer should draw another card.
//  *
//  * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
//  * @returns {boolean} whether dealer should draw another card
//  */
const dealerShouldDraw = (dealerHand) => {
  // CREATE FUNCTION HERE
  const dealerScore = calcPoints(dealerHand);

  // If the dealer's total is 16 or less, or if it's exactly 17 and not soft, the dealer should draw.
  if (
    dealerScore.total <= 16 ||
    (dealerScore.total === 17 && !dealerScore.isSoft)
  ) {
    return true;
  } else {
    return false;
  }
};

// /**
//  * Determines the winner if both player and dealer stand
//  * @param {number} playerScore
//  * @param {number} dealerScore
//  * @returns {string} Shows the player's score, the dealer's score, and who wins
//  */
const determineWinner = (playerScore, dealerScore) => {
  // CREATE FUNCTION HERE
  if (playerScore > 21) {
    return `Player: ${playerScore} - Dealer: ${dealerScore}. Dealer wins!`;
  } else if (dealerScore > 21 || playerScore > dealerScore) {
    return `Player: ${playerScore} - Dealer: ${dealerScore}. Player wins!`;
  } else if (dealerScore > playerScore) {
    return `Player: ${playerScore} - Dealer: ${dealerScore}. Dealer wins!`;
  } else {
    return `Player: ${playerScore} - Dealer: ${dealerScore}. It's a tie!`;
  }
};

// /**
//  * Creates user prompt to ask if they'd like to draw a card
//  * @param {number} count
//  * @param {string} dealerCard
//  */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`;
};

// /**
//  * Logs the player's hand to the console
//  * @param {CardPlayer} player
//  */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(
    `${player.name}'s hand is ${displayHand.join(", ")} (${
      calcPoints(player.hand).total
    })`
  );
};

// /**
//  * Runs Blackjack Game
//  */
const startGame = function () {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  // for extra  credit:
  // Check for player's blackjack.
  // If the player gets exactly 21 after drawing her first 2 cards, the player immediately wins
  if (playerScore === 21) {
    return "Player wins with a Blackjack!";
  }
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return "You went over 21 - you lose!";
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  showHand(dealer)
  // for extra  credit:
  // Check for dealer's blackjack
  // If the dealer draws exactly 21 after drawing her first 2 cards, the dealer immediately wins.
  if (dealerScore === 21) {
    return "Dealer wins with a Blackjack!";
  }
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return "Dealer went over 21 - you win!";
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
};
console.log(startGame());
