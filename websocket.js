import { WebSocketServer } from 'ws';
import { customAlphabet } from 'nanoid/non-secure';
import gameSetup from './gameSetup.js';
import playerSetup from './playerSetup.js';
import { ballUpdate, playerUpdate } from './updateMethods.js';

const nanoid = customAlphabet('1234567890', 6);

const setupSocketServer = (server) => {
    const wss = new WebSocketServer({ server, clientTracking: true });

    const games = {};

    wss.on('connection', (socket, request) => {
        if (request.url === '/start') {
            const gameID = nanoid();
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
                playerUpdate(game.keys.playerOne, game, 1);
                playerUpdate(game.keys.playerTwo, game, 3);
                ballUpdate(game);
                const { playerOne, playerTwo } = game.clients;
                playerOne.binaryType = 'arraybuffer';
                playerTwo.binaryType = 'arraybuffer';
                // TODO: only send needed parts of gamestate, over a third wasted.
                playerOne.send(game.binaryGameState);
                playerTwo.send(game.binaryGameState);
            }
        });
    };

    setInterval(updateGameState, 17);
};

export default setupSocketServer;
