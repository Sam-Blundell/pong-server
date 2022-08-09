import { WebSocketServer } from 'ws';
import { nanoid } from 'nanoid/non-secure';
import gameSetup from './gameSetup.js';
import playerUpdate from './updateMethods.js';

const setupSocketServer = (server) => {
    const wss = new WebSocketServer({ server, clientTracking: true });

    const games = {};

    const playerOneSetup = (gameID) => {
        const { playerOne: socket } = games[gameID].clients;
        const { playerOne: keys } = games[gameID].keys;
        const { gameState } = games[gameID];

        socket.on('message', (data) => {
            const parsedData = JSON.parse(data);
            if ('inputData' in parsedData) {
                const [input, action] = parsedData.inputData;
                keys[input] = action;
            }
            if ('updateState' in parsedData) {
                playerUpdate(keys, games[gameID], 'playerOnePos');
                const msg = JSON.stringify({ gameState });
                socket.send(msg);
            }
        });
        socket.on('close', (data) => {
            const parsedData = JSON.parse(data);
            console.log(parsedData);
        });
    };
    const playerTwoSetup = (gameID) => {
        const { playerTwo: socket } = games[gameID].clients;
        const { playerTwo: keys } = games[gameID].keys;
        const { gameState } = games[gameID];

        socket.on('message', (data) => {
            const parsedData = JSON.parse(data);
            if ('inputData' in parsedData) {
                const [input, action] = parsedData.inputData;
                keys[input] = action;
            }
            if ('updateState' in parsedData) {
                playerUpdate(keys, games[gameID], 'playerTwoPos');
                const msg = JSON.stringify({ gameState });
                socket.send(msg);
            }
        });
        socket.on('close', (data) => {
            const parsedData = JSON.parse(data);
            console.log(parsedData);
        });
    };

    wss.on('connection', (socket, request) => {
        if (request.url === '/start') {
            const gameID = nanoid(6);
            games[gameID] = gameSetup(socket, gameID);
            socket.send(JSON.stringify({ gameID }));
            playerOneSetup(gameID);
        } else if (request.url.startsWith('/join')) {
            const gameID = request.url.slice('5');
            if (gameID in games === false) {
                socket.send(JSON.stringify({ ERR: 'NoSuchGame' }));
                socket.close();
            } else if (games[gameID].clients.playerTwo !== null) {
                socket.send(JSON.stringify({ ERR: 'Game Full' }));
                socket.close();
            } else {
                games[gameID].clients.playerTwo = socket;
                games[gameID].ready = true;
                playerTwoSetup(gameID);
                games[gameID].clients.playerOne.send(JSON.stringify({ opponentConnected: true }));
            }
        }
    });
};

export default setupSocketServer;
