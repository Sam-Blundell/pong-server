import { playerUpdate, ballUpdate } from './updateMethods.js';

const playerSetup = (game, player) => {
    const { [player]: socket } = game.clients;
    const { [player]: keys } = game.keys;
    const { gameState } = game;

    socket.on('message', (data) => {
        const parsedData = JSON.parse(data);
        if ('inputData' in parsedData) {
            const [input, action] = parsedData.inputData;
            keys[input] = action;
        }
        if ('updateState' in parsedData) {
            playerUpdate(keys, game, `${player}Pos`);
            ballUpdate(game);
            const msg = JSON.stringify({ gameState });
            socket.send(msg);
        }
    });
};

export default playerSetup;
