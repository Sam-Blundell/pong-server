import { WebSocketServer } from 'ws';
import { nanoid } from 'nanoid/non-secure';
import gameSetup from './gameSetup.js';
import { playerUpdate, ballUpdate } from './updateMethods.js';

const setupSocketServer = (server) => {
    const wss = new WebSocketServer({ server, clientTracking: true });

    const games = {};

    const playerSetup = (gameID, player) => {
        const { [player]: socket } = games[gameID].clients;
        const { [player]: keys } = games[gameID].keys;
        const { gameState } = games[gameID];

        socket.on('message', (data) => {
            const parsedData = JSON.parse(data);
            if ('inputData' in parsedData) {
                const [input, action] = parsedData.inputData;
                keys[input] = action;
            }
            if ('updateState' in parsedData) {
                playerUpdate(keys, games[gameID], `${player}Pos`);
                ballUpdate(games[gameID]);
                const msg = JSON.stringify({ gameState });
                socket.send(msg);
            }
        });
    };

    wss.on('connection', (socket, request) => {
        if (request.url === '/start') {
            const gameID = nanoid(6);
            games[gameID] = gameSetup(socket, gameID);
            socket.send(JSON.stringify({ gameID }));
            playerSetup(gameID, 'playerOne');
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
                playerSetup(gameID, 'playerTwo');
                games[gameID].clients.playerOne.send(JSON.stringify({ opponentConnected: true }));
            }
        }
    });
};

export default setupSocketServer;
