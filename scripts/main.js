import {HANDS, isConnected, getRankings, evaluateHand} from './game-service.js';

let nickname;

const nameInput = document.getElementById('name-input');
const greetHeader = document.getElementById('greet-header');
const handButtons = document.querySelectorAll('.hand-buttons');
const resultHeader = document.getElementById('result-header');
const saveNameButton = document.getElementById('save-name-button');
const changeNameButton = document.getElementById('change-name-button');
const chosenHandsHeader = document.getElementById('chosen-hands-header');
const rules = {
    Rock: {
        Rock: 0,
        Paper: -1,
        Scissors: 1,
        Well: -1,
        Match: 1,
    },
    Paper: {
        Rock: 1,
        Paper: 0,
        Scissors: -1,
        Well: 1,
        Match: -1,
    },
    Scissors: {
        Rock: -1,
        Paper: 1,
        Scissors: 0,
        Well: -1,
        Match: 1,
    },
    Well: {
        Rock: 1,
        Paper: -1,
        Scissors: 1,
        Well: 0,
        Match: -1,
    },
    Match: {
        Rock: -1,
        Paper: 1,
        Scissors: -1,
        Well: 1,
        Match: 0,
    },
};

// TODO: How to keep track of App state?
// TODO: Create View functions

function setNickname() {
    nickname = nameInput.value;
    greetHeader.innerText = `Hello ${nickname}! Choose your hand:`;
    console.log(`the name ${nickname} was passed through the function saveName`);
}
saveNameButton.addEventListener('click', setNickname);

function compareHands() {
    const playerHand = this.value;
    const computerHand = HANDS[Math.floor(Math.random() * 5)];
    resultHeader.innerText = '';
    chosenHandsHeader.innerText = `Player chose ${playerHand} and computer chose ${computerHand}`;

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
    }
}
handButtons.forEach((handButton) => handButton.addEventListener('click', compareHands));

// TODO: Replace the following demo code. It should not be included in the final solution

console.log('isConnected:', isConnected());

getRankings((rankings) => rankings.forEach((rankingEntry) => console.log(
    `Rank ${rankingEntry.rank} (${rankingEntry.wins} wins): ${rankingEntry.players}`,
)));

function pickHand() {
    const handIndex = Math.floor(Math.random() * 3);
    return HANDS[handIndex];
}

let count = 1;

function printWinner(hand, didWin) {
    console.log(count++, hand, didWin);
}

for (let i = 1; i < 10; i++) {
    const playerHand = pickHand();
    evaluateHand('peter', playerHand,
        ({
             systemHand,
             gameEval,
         }) => printWinner(playerHand, systemHand, gameEval));
}
