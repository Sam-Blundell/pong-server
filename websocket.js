import { WebSocketServer } from 'ws';
import { nanoid } from 'nanoid/non-secure';
import gameSetup from './gameSetup.js';
import playerSetup from './playerSetup.js';

const setupSocketServer = (server) => {
    const wss = new WebSocketServer({ server, clientTracking: true });

    const games = {};

    wss.on('connection', (socket, request) => {
        if (request.url === '/start') {
            const gameID = nanoid(6);
            games[gameID] = gameSetup(socket, gameID);
            socket.send(JSON.stringify({ gameID }));
            playerSetup(games[gameID], 'playerOne');
        } else if (request.url.startsWith('/join')) {
            const gameID = request.url.slice('6');
            if (gameID in games === false) {
                socket.send(JSON.stringify({ ERR: 'NoSuchGame' }));
                socket.close();
            } else if (games[gameID].clients.playerTwo !== null) {
                socket.send(JSON.stringify({ ERR: 'Game Full' }));
                socket.close();
            } else {
                games[gameID].clients.playerTwo = socket;
                games[gameID].ready = true;
                playerSetup(games[gameID], 'playerTwo');
                games[gameID].clients.playerOne.send(JSON.stringify({ opponentConnected: true }));
            }
        }
    });
};

export default setupSocketServer;
