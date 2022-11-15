import {HANDS} from './game-service.js';

const nameInput = document.getElementById('name-input');
const greetHeader = document.getElementById('greet-header');
const gameSection = document.getElementById('game-section');
const handButtons = document.querySelectorAll('.hand-buttons');
const resultHeader = document.getElementById('result-header');
const resultSection = document.getElementById('result-section');
const saveNameButton = document.getElementById('save-name-button');
const historyTableBody = document.getElementById('history-tbody');
const scoreboardTableBody = document.getElementById('scoreboard-tbody');
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
const scores = {};
let scoreboard = {};
let nickname;

function toggleVisibility(element) {
    const isHidden = element.hidden;
    element.hidden = !isHidden;
}

function unhideElement(element) {
    element.hidden = false;
}

function hideElement(element) {
    element.hidden = true;
}

function setNickname() {
    nickname = nameInput.value;
    greetHeader.innerText = `Hello ${nickname}! Choose your hand:`;
    unhideElement(gameSection);
    hideElement(scoreboardSection);
}

function createScoreboard() {
    scoreboard = {};
    for (const [playerName, playerScore] of Object.entries(scores)) {
        (typeof scoreboard[playerScore] === 'undefined') ? scoreboard[playerScore] = [playerName] : scoreboard[playerScore].push(playerName);
    }
    return Object.keys(scoreboard)
        .map(Number)
        .sort((a, b) => a - b);
}

function showScoreboardSection() {
    toggleVisibility(scoreboardSection);
    scoreboardTableBody.innerText = '';
    scoreboard = createScoreboard();
    for (const key of createScoreboard()) {
        scoreboardTableBody.insertAdjacentHTML('afterbegin', `<tr>
        <td>${key}</td>
        <td>${scoreboard[key].join(' & ')}</td>
    </tr>`);
    }
}

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

function updateScore(score) {
    scores[nickname] = (typeof scores[nickname] === 'undefined') ? score : scores[nickname] + score;
}

function compareHands() {
    const playerHand = this.value;
    const computerHand = HANDS[Math.floor(Math.random() * 5)];
    const result = rules[playerHand][computerHand];
    updateScore(result);

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

closeScoreboardButton.addEventListener('click', showScoreboardSection);
showScoreboardButton.addEventListener('click', showScoreboardSection);
saveNameButton.addEventListener('click', setNickname);
handButtons.forEach(
    (handButton) => handButton.addEventListener('click', compareHands),
);
