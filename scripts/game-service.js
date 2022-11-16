const DELAY_MS = 500;
const localUserScores = {};
let numericalScores = {};

function getRankingsFromPlayerStats() {
  numericalScores = {};
  for (const [playerName, playerScore] of Object.entries(localUserScores)) {
    if (typeof numericalScores[playerScore] === 'undefined') {
      numericalScores[playerScore] = [playerName];
    } else {
      numericalScores[playerScore].push(playerName);
    }
  }
  const sortedScores = Object.keys(numericalScores)
      .map(Number)
      .sort((a, b) => a - b);
  const sortedScoreboard = [];
  for (const score of sortedScores) {
    sortedScoreboard.push([score, numericalScores[score]]);
  }
  return sortedScoreboard;
}

export const HANDS = ['rock', 'paper', 'scissors', 'well', 'match'];

let isConnectedState = false;

export function setConnected(newIsConnected) {
  isConnectedState = Boolean(newIsConnected);
}

export function isConnected() {
  return isConnectedState;
}

export function getRankings(rankingsCallbackHandlerFn) {
  const scoreboard = getRankingsFromPlayerStats();
  setTimeout(() => rankingsCallbackHandlerFn(scoreboard), DELAY_MS);
}

const evalLookup = {
  rock: {
    rock: 0,
    paper: -1,
    scissors: 1,
    well: -1,
    match: 1,
  },
  paper: {
    rock: 1,
    paper: 0,
    scissors: -1,
    well: 1,
    match: -1,
  },
  scissors: {
    rock: -1,
    paper: 1,
    scissors: 0,
    well: -1,
    match: 1,
  },
  well: {
    rock: 1,
    paper: -1,
    scissors: 1,
    well: 0,
    match: -1,
  },
  match: {
    rock: -1,
    paper: 1,
    scissors: -1,
    well: 1,
    match: 0,
  },
};

function getGameEval(playerHand, systemHand) {
  return evalLookup[playerHand][systemHand];
}

export function evaluateHand(playerName, playerHand, gameRecordHandlerCallbackFn) {
  const systemHand = HANDS[Math.floor(Math.random() * 5)];
  const gameEval = getGameEval(playerHand, systemHand);
  let resultEmoji;
  switch (gameEval) {
    case 1:
      resultEmoji = '&#9989';
      break;
    case 0:
      resultEmoji = '&#129008';
      break;
    case -1:
      resultEmoji = '&#10060';
      break;
    default:
      resultEmoji = '';
  }
  localUserScores[playerName] = (typeof localUserScores[playerName] === 'undefined') ? gameEval : localUserScores[playerName] + gameEval;
  setTimeout(() => gameRecordHandlerCallbackFn(playerHand, systemHand, resultEmoji), DELAY_MS);
}
