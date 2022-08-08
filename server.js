import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import { errorMethodNotAllowed, errorNoRoute } from './errorHandling.js';

const app = express();
const server = http.createServer(app);

const wss = new WebSocketServer({ server, clientTracking: true });

const keys = {
    playerOne: {
        ArrowLeft: false,
        ArrowRight: false,
    },
    playerTwo: {
        ArrowLeft: false,
        ArrowRight: false,
    },
};

const gameState = {
    playerOnePos: 220,
    playerTwoPos: 220,
    ballXPos: null,
    ballYPos: null,
    ballHSpeed: null,
    ballVSpeed: null,
    score: null,
};

const playerUpdate = (userType) => {
    if (keys[userType].ArrowRight === true && gameState[`${userType}Pos`] < 440) {
        gameState[`${userType}Pos`] += 5;
    } else if (keys[userType].ArrowLeft === true && gameState[`${userType}Pos`] > 0) {
        gameState[`${userType}Pos`] -= 5;
    }
};

const connectedClients = {
    playerOne: null,
    playerTwo: null,
};
const clientHandler = (client) => {
    let userType = null;
    client.on('message', (data) => {
        const parsedData = JSON.parse(data);
        if ('userType' in parsedData) {
            userType = parsedData.userType;
            connectedClients[parsedData.userType] = client;
            if (userType === 'playerTwo') {
                const msg = JSON.stringify({ opponentConnected: true });
                client.send(msg);
                connectedClients.playerOne.send(msg);
            }
        } else if ('updateState' in parsedData) {
            playerUpdate(userType);
            const msg = JSON.stringify({ gameState });
            client.send(msg);
        } else if ('inputData' in parsedData) {
            const [, input, action] = parsedData.inputData;
            keys[userType][input] = action;
        }
    });
    client.on('close', () => {
        connectedClients[userType] = null;
        const msg = JSON.stringify({ OpponentDisconnected: true });
        if (userType === 'playerOne') {
            connectedClients.playerTwo.send(msg);
        } else {
            connectedClients.playerOne.send(msg);
        }
    });
};

wss.on('connection', (socket) => {
    console.log('new client connected');
    clientHandler(socket);
});

app.route('/')
    .get((req, res) => {
        res.status(200).send({ msg: 'hello world' });
    })
    .all(errorMethodNotAllowed);

app.use('/*', errorNoRoute);

export { server, app };
