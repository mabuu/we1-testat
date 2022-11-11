import {HANDS, isConnected, getRankings, evaluateHand} from './game-service.js';

const nameInput = document.getElementById('name-input');
const greetHeader = document.getElementById('greet-header');
const gameSection = document.getElementById('game-section');
const handButtons = document.querySelectorAll('.hand-buttons');
const resultHeader = document.getElementById('result-header');
const resultSection = document.getElementById('result-section');
const saveNameButton = document.getElementById('save-name-button');
const historyTableBody = document.getElementById('history-tbody');
const showScoreboardButton = document.getElementById('show-scoreboard-button');
const closeScoreboardButton = document.getElementById('close-scoreboard-button');
const scoreboardSection = document.getElementById('scoreboard-section');
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
let nickname;

function toggleVisibility(element) {
    const isHidden = element.hidden;
    element.hidden = !isHidden;
}

function unhideElement(element) {
    element.hidden = false;
}

function setNickname() {
    nickname = nameInput.value;
    greetHeader.innerText = `Hello ${nickname}! Choose your hand:`;
    unhideElement(gameSection);
}
saveNameButton.addEventListener('click', setNickname);


function showScoreboardSection() {
    toggleVisibility(scoreboardSection);
}
showScoreboardButton.addEventListener('click', showScoreboardSection);
closeScoreboardButton.addEventListener('click', showScoreboardSection);

function displayResults(playerHand, computerHand, resultEmoji) {
    resultHeader.innerHTML = `${resultEmoji} | ${nickname} throws ${playerHand} against ${computerHand}`;
    historyTableBody.insertAdjacentHTML('afterbegin', `<tr>
        <td>${resultEmoji}</td>
        <td>${nickname}</td>
        <td>${playerHand}</td>
        <td>${computerHand}</td>
    </tr>`);
    unhideElement(resultSection);
}

function compareHands() {
    const playerHand = this.value;
    const computerHand = HANDS[Math.floor(Math.random() * 5)];
    const result = rules[playerHand][computerHand];

    switch (result) {
        case 1:
            displayResults(playerHand, computerHand, '&#9989');
            break;
        case 0:
            displayResults(playerHand, computerHand, '&#129008');
            break;
        case -1:
            displayResults(playerHand, computerHand, '&#10060');
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
