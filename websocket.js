import { WebSocketServer } from 'ws';
import gameSetup from './gameSetup.js';

const setupSocketServer = (server) => {
    const wss = new WebSocketServer({ server, clientTracking: true });

    const game = gameSetup();

    const playerUpdate = (userType) => {
        const { keys, gameState } = game;
        if (keys[userType].ArrowRight === true && gameState[`${userType}Pos`] < 440) {
            gameState[`${userType}Pos`] += 5;
        } else if (keys[userType].ArrowLeft === true && gameState[`${userType}Pos`] > 0) {
            gameState[`${userType}Pos`] -= 5;
        }
    };

    const socketHandler = (socket) => {
        let userType = null;
        const { keys, clients, gameState } = game;
        socket.on('message', (data) => {
            const parsedData = JSON.parse(data);
            if ('userType' in parsedData) {
                userType = parsedData.userType;
                clients[parsedData.userType] = socket;
                if (userType === 'playerTwo') {
                    const msg = JSON.stringify({ opponentConnected: true });
                    socket.send(msg);
                    clients.playerOne.send(msg);
                }
            } else if ('updateState' in parsedData) {
                playerUpdate(userType);
                const msg = JSON.stringify({ gameState });
                socket.send(msg);
            } else if ('inputData' in parsedData) {
                const [, input, action] = parsedData.inputData;
                keys[userType][input] = action;
            }
        });
        socket.on('close', () => {
            clients[userType] = null;
            const msg = JSON.stringify({ opponentDisconnected: true });
            if (userType === 'playerOne' && clients.playerTwo !== null) {
                clients.playerTwo.send(msg);
            } else if (userType === 'playerTwo' && clients.playerOne !== null) {
                clients.playerOne.send(msg);
            }
        });
    };

    wss.on('connection', (socket) => {
        console.log('New client connected.');
        socketHandler(socket);
    });
};

export default setupSocketServer;
