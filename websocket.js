import { WebSocketServer } from 'ws';
import { nanoid } from 'nanoid/non-secure';
import gameSetup from './gameSetup.js';
import playerSetup from './playerSetup.js';
import { ballUpdate, playerUpdate } from './updateMethods.js';

const setupSocketServer = (server) => {
    const wss = new WebSocketServer({ server, clientTracking: true });

    const games = {};

    wss.on('connection', (socket, request) => {
        if (request.url === '/start') {
            const gameID = nanoid(6);
            games[gameID] = gameSetup(socket, gameID);
            socket.send(JSON.stringify({ gameID })); // here
            playerSetup(games[gameID], 'playerOne');
        } else if (request.url.startsWith('/join')) {
            const gameID = request.url.slice('6');
            if (gameID in games === false) {
                socket.send(JSON.stringify({ ERR: 'NoSuchGame' })); // here
                socket.close();
            } else if (games[gameID].clients.playerTwo !== null) {
                socket.send(JSON.stringify({ ERR: 'Game Full' })); // here
                socket.close();
            } else {
                games[gameID].clients.playerTwo = socket;
                games[gameID].ready = true;
                playerSetup(games[gameID], 'playerTwo');
                games[gameID].ready = true;
                // here
                games[gameID].clients.playerOne.send(JSON.stringify({ opponentConnected: true }));
            }
        }
        // TODO: handle disconnects
    });

    const updateGameState = () => {
        const activeGames = Object.values(games);
        activeGames.forEach((game) => {
            if (game.ready === true) {
                playerUpdate(game.keys.playerOne, game, 'playerOnePos');
                playerUpdate(game.keys.playerTwo, game, 'playerTwoPos');
                ballUpdate(game);
                const { playerOne, playerTwo } = game.clients;
                const { gameState } = game;
                const msg = JSON.stringify({ gameState }); // here
                playerOne.send(msg);
                playerTwo.send(msg);
            }
        });
    };

    setInterval(updateGameState, 17);
};

export default setupSocketServer;
