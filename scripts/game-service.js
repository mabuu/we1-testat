const DELAY_MS = 500;
const localUserScores = {};
let numericalScores = {};

// TODO: Update this function to do the right thing
function getRankingsFromPlayerStats() {
  numericalScores = {};
  for (const [playerName, playerScore] of Object.entries(localUserScores)) {
    if (typeof numericalScores[playerScore] === 'undefined') {
      numericalScores[playerScore] = [playerName];
    } else {
      numericalScores[playerScore].push(playerName);
    }
    return Object.keys(numericalScores)
        .map(Number)
        .sort((a, b) => a - b);
  }

  Object.keys(playerStats);
  // magic happens
  return [
    {
      rank: 1,
      wins: 4,
      players: ['Michael', 'Lisa'],
    },
    {
      rank: 2,
      wins: 3,
      players: ['Markus'],
    },
  ];
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
  const rankingsArray = getRankingsFromPlayerStats();
  setTimeout(() => rankingsCallbackHandlerFn(rankingsArray), DELAY_MS);
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
  // TODO: Replace calculation of didWin and update rankings while doing so.
  // optional: in local-mode (isConnected == false) store rankings in the browser localStorage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
  const systemHand = HANDS[Math.floor(Math.random() * 5)];
  console.log(playerHand + systemHand);
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
