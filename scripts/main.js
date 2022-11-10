import {HANDS, isConnected, getRankings, evaluateHand} from './game-service.js';

let nickname;

const nameInput = document.getElementById('name-input');
const greetHeader = document.getElementById('greet-header');
const handButtons = document.querySelectorAll('.hand-buttons');
const resultHeader = document.getElementById('result-header');
const saveNameButton = document.getElementById('save-name-button');
const historyTable = document.getElementById('history-table');
const rules = {
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

// TODO: How to keep track of App state?
// TODO: Create View functions

function setNickname() {
    nickname = nameInput.value;
    greetHeader.innerText = `Hello ${nickname}! Choose your hand:`;
}
saveNameButton.addEventListener('click', setNickname);

function compareHands() {
    const playerHand = this.value;
    const computerHand = HANDS[Math.floor(Math.random() * 5)];
    resultHeader.innerText = '';

    historyTable.insertAdjacentHTML('afterbegin', `<tr><td>${nickname}</td><td>${playerHand}</td><td>${computerHand}</td></tr>`);
    history.push({nickname, playerHand, computerHand});

    const result = rules[playerHand][computerHand];
    switch (result) {
        case 1:
            resultHeader.innerText = `${nickname} wins with ${playerHand}!`;
            break;
        case 0:
            resultHeader.innerText = `It's a draw!! Both chose ${playerHand}`;
            break;
        case -1:
            resultHeader.innerText = `You lost against ${computerHand}`;
            break;
        default:
            resultHeader.innerText = `Sorry ${nickname}, something messed up :(`;
            break;
    }
}
handButtons.forEach((handButton) => handButton.addEventListener('click', compareHands));

function handChosen() {
    const playerHand = this.value;
    evaluateHand(nickname, playerHand, '?');
}

// TODO: Replace the following demo code. It should not be included in the final solution

console.log('isConnected:', isConnected());

getRankings((rankings) => rankings.forEach((rankingEntry) => console.log(
    `Rank ${rankingEntry.rank} (${rankingEntry.wins} wins): ${rankingEntry.players}`,
)));

let count = 1;

function printWinner(hand, didWin) {
    console.log(count++, hand, didWin);
}

for (let i = 1; i < 10; i++) {
    const playerHand = 'rock';
    evaluateHand('peter', playerHand,
        ({
             systemHand,
             gameEval,
         }) => printWinner(playerHand, systemHand, gameEval));
}
