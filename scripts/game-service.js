export const HANDS = ['Schere', 'Stein', 'Papier', 'Brunnen', 'Streichholz'];
const DELAY_MS = 1000;
const localUserScores = {};
const onlineUserScores = {};
let numericalScores = {};
let isConnectedState = false;
const winMap = {
    true: -1,
    false: 1,
    undefined: 0,
};
const evalLookup = {
    Stein: {
        Stein: 0,
        Papier: -1,
        Schere: 1,
        Brunnen: -1,
        Streichholz: 1,
    },
    Papier: {
        Stein: 1,
        Papier: 0,
        Schere: -1,
        Brunnen: 1,
        Streichholz: -1,
    },
    Schere: {
        Stein: -1,
        Papier: 1,
        Schere: 0,
        Brunnen: -1,
        Streichholz: 1,
    },
    Brunnen: {
        Stein: 1,
        Papier: -1,
        Schere: 1,
        Brunnen: 0,
        Streichholz: -1,
    },
    Streichholz: {
        Stein: -1,
        Papier: 1,
        Schere: -1,
        Brunnen: 1,
        Streichholz: 0,
    },
};

export function setConnected(newIsConnected) {
    isConnectedState = Boolean(newIsConnected);
}

export function isConnected() {
    return isConnectedState;
}

function getRankingsFromPlayerStats(scores) {
    numericalScores = {};
    for (const [playerName, playerScore] of Object.entries(scores)) {
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

function convertOnlineStats(onlineStats) {
    const players = Object.keys(onlineStats);
    players.forEach((player) => {
        onlineUserScores[player] = onlineStats[player].win - onlineStats[player].lost;
    });
}

export function getRankings(rankingsCallbackHandlerFn) {
    if (isConnected()) {
        const url = 'https://stone.sifs0005.infs.ch/ranking';
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => convertOnlineStats(responseData));
        return rankingsCallbackHandlerFn(getRankingsFromPlayerStats(onlineUserScores));
    }
    return rankingsCallbackHandlerFn(getRankingsFromPlayerStats(localUserScores));
}

function getGameEval(playerHand, systemHand) {
    return evalLookup[playerHand][systemHand];
}

function chooseResultEmoji(gameEval) {
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
    return resultEmoji;
}

function evaluateHandOffline(playerName, playerHand, gameRecordHandlerCallbackFn) {
    const systemHand = HANDS[Math.floor(Math.random() * 5)];
    const gameEval = getGameEval(playerHand, systemHand);

    localUserScores[playerName] = (typeof localUserScores[playerName] === 'undefined') ? gameEval : localUserScores[playerName] + gameEval;
    setTimeout(() => gameRecordHandlerCallbackFn(
        playerHand,
        systemHand,
        chooseResultEmoji(gameEval),
    ), DELAY_MS);
}

function evaluateHandOnline(playerName, playerHand, gameRecordHandlerCallbackFn) {
    const url = `https://stone.sifs0005.infs.ch/play?playerName=${playerName}&playerHand=${playerHand}`;
    fetch(url)
        .then((res) => res.json())
        .then((content) => {
            const systemHand = content.choice;
            const gameEval = winMap[content.win] * -1;
            setTimeout(() => gameRecordHandlerCallbackFn(
                playerHand,
                systemHand,
                chooseResultEmoji(gameEval),
            ), DELAY_MS);
        });
}

export function evaluateHand(playerName, playerHand, gameRecordHandlerCallbackFn) {
    if (isConnected()) {
        evaluateHandOnline(playerName, playerHand, gameRecordHandlerCallbackFn);
    } else {
        evaluateHandOffline(playerName, playerHand, gameRecordHandlerCallbackFn);
    }
}
