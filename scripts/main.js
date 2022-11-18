import {HANDS, isConnected, getRankings, evaluateHand} from './game-service.js';

const nameInput = document.getElementById('name-input');
const gameSection = document.getElementById('game-section');
const greetHeader = document.getElementById('greet-header');
const resultHeader = document.getElementById('result-header');
const resultSection = document.getElementById('result-section');
const handChoicesDiv = document.getElementById('hand-choices-div');
const saveNameButton = document.getElementById('save-name-button');
const timeoutSection = document.getElementById('timeout-section');
const historyTableBody = document.getElementById('history-tbody');
const scoreboardSection = document.getElementById('scoreboard-section');
const scoreboardTableBody = document.getElementById('scoreboard-tbody');
const showScoreboardButton = document.getElementById('toggle-scoreboard-button');
const closeScoreboardButton = document.getElementById('close-scoreboard-button');
let nickname;

HANDS.forEach((hand) => {
    handChoicesDiv.insertAdjacentHTML('beforeend', `
        <button id="${hand}-button" class="hand-buttons" type="button" value="${hand}">${hand.charAt(0)
        .toUpperCase() + hand.slice(1)}</button>
    `);
});
const handButtons = Array.prototype.slice.call(document.querySelectorAll('.hand-buttons'));

function toggleVisibility(element) {
    element.hidden = !element.hidden;
}

function unhideElement(element) {
    element.hidden = false;
}

function hideElement(element) {
    element.hidden = true;
}

function visualizeTimeout() {
    unhideElement(timeoutSection);
}

function setNickname() {
    nickname = nameInput.value;
    greetHeader.innerText = `Hello ${nickname}! Choose your hand:`;
    unhideElement(gameSection);
    hideElement(scoreboardSection);
}

function createScoreboardTable(scoreboard) {
    scoreboard.forEach((scoreboardEntry) => scoreboardTableBody.insertAdjacentHTML(
        'afterbegin', `<tr>
        <td>${scoreboardEntry[0]}</td>
        <td>${scoreboardEntry[1].join(' & ')}</td>
        </tr>`,
    ));
}

function showScoreboardSection() {
    toggleVisibility(scoreboardSection);
    scoreboardTableBody.innerText = '';
    getRankings(createScoreboardTable);
}

function displayResults(playerHand, computerHand, resultEmoji) {
    resultHeader.innerHTML = `${resultEmoji} | ${nickname} throws ${playerHand} against ${computerHand}`;
    historyTableBody.insertAdjacentHTML('afterbegin', `<tr>
        <td>${resultEmoji}</td>
        <td>${nickname}</td>
        <td>${playerHand}</td>
        <td>${computerHand}</td>
    </tr>`);
    hideElement(timeoutSection);
    unhideElement(resultSection);
}

closeScoreboardButton.addEventListener('click', showScoreboardSection);
showScoreboardButton.addEventListener('click', showScoreboardSection);
saveNameButton.addEventListener('click', setNickname);
handButtons.forEach(
    (handButton) => {
        const {value} = handButton;
        handButton.addEventListener('click', () => {
            evaluateHand(nickname, value, displayResults);
            visualizeTimeout();
        });
    },
);
