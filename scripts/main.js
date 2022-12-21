import {HANDS, isConnected, getRankings, evaluateHand, setConnected} from './game-service.js';

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
const toggleServerModeButton = document.getElementById('toggle-server-mode-button');
let nickname;

HANDS.forEach((hand) => {
    handChoicesDiv.insertAdjacentHTML('beforeend', `
        <button id="${hand}-button" class="hand-buttons" type="button" value="${hand}">
            ${hand.charAt(0).toUpperCase() + hand.slice(1)}
        </button>
    `);
});

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
    if (nameInput.value.length <= 2) {
        hideElement(gameSection);
        greetHeader.innerText = 'Um zu spielen muss ein Name mit mindestens 2 Zeichen angegeben werden!';
        return;
    }
    nickname = nameInput.value;
    greetHeader.innerText = `Hallo ${nickname}! Wähle eine Hand:`;
    unhideElement(gameSection);
    hideElement(scoreboardSection);
}

// helper function to avoid xss
function createTableData(value) {
    // eslint-disable-next-line @web-and-design/wed/check-html-gen
    const td = document.createElement('td');
    td.textContent = value;
    return td.innerHTML;
}

function createScoreboardTable(scoreboard) {
    scoreboard.forEach((scoreboardEntry) => scoreboardTableBody.insertAdjacentHTML(
        'afterbegin', `<tr>
            <td>${createTableData(scoreboardEntry[0])}</td>
            <td>${createTableData(scoreboardEntry[1].join(' & '))}</td>
        </tr>`,
    ));
}

function showScoreboardSection() {
    if (scoreboardSection.hidden) {
        scoreboardTableBody.innerText = '';
        getRankings(createScoreboardTable);
    }
    toggleVisibility(scoreboardSection);
}

function displayResults(playerHand, computerHand, resultEmoji) {
    resultHeader.innerHTML = `${resultEmoji} | ${nickname} spielt ${playerHand} gegen ${computerHand}`;
    historyTableBody.insertAdjacentHTML('afterbegin', `<tr>
        <td>${resultEmoji}</td>
        <td>${nickname}</td>
        <td>${playerHand}</td>
        <td>${computerHand}</td>
    </tr>`);
    hideElement(timeoutSection);
    unhideElement(resultSection);
}

function toggleServerMode() {
    if (isConnected()) {
        toggleServerModeButton.innerText = 'Servermodus: aus';
        setConnected(false);
    } else {
        toggleServerModeButton.innerText = 'Servermodus: aktiviert';
        setConnected(true);
        getRankings(createScoreboardTable);
    }
}

toggleServerModeButton.addEventListener('click', toggleServerMode);
closeScoreboardButton.addEventListener('click', showScoreboardSection);
showScoreboardButton.addEventListener('click', showScoreboardSection);
saveNameButton.addEventListener('click', setNickname);

const handButtons = Array.prototype.slice.call(document.querySelectorAll('.hand-buttons'));
handButtons.forEach(
    (handButton) => {
        const {value} = handButton;
        handButton.addEventListener('click', () => {
            evaluateHand(nickname, value, displayResults);
            visualizeTimeout();
        });
    },
);
