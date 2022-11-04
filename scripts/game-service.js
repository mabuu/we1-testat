/*
 * You are allowed to change the code here.
 * However, you are not allowed to change the signature of the exported functions and objects.
 */

const DELAY_MS = 1000;
const playerStats = {
  Markus: {
    user: 'Markus',
    win: 3,
    lost: 6,
  },
  Michael: {
    user: 'Michael',
    win: 4,
    lost: 5,
  },
  Lisa: {
    user: 'Lisa',
    win: 4,
    lost: 5,
  },
};

// TODO: Update this function to do the right thing
function getRankingsFromPlayerStats() {
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

console.log('eval scissors-scissors: ', getGameEval('scissors', 'scissors'));

export function evaluateHand(playerName, playerHand, gameRecordHandlerCallbackFn) {
  // TODO: Replace calculation of didWin and update rankings while doing so.
  // optional: in local-mode (isConnected == false) store rankings in the browser localStorage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
  const systemHand = HANDS[Math.floor(Math.random() * 5)];
  const gameEval = getGameEval(playerHand, systemHand);
  setTimeout(() => gameRecordHandlerCallbackFn({
    playerHand,
    systemHand,
    gameEval,
  }), DELAY_MS);
}
