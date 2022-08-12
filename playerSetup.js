import { playerUpdate, ballUpdate } from './updateMethods.js';

const playerSetup = (game, player) => {
    const { [player]: socket } = game.clients;
    const { gameState, keys } = game;

    socket.binaryType = 'arraybuffer';

    socket.on('message', (data) => {
        if (data instanceof ArrayBuffer) {
            // 3 bytes. 1 identifies inputData, 2 specifies key, 3 specifies condition.
            const inputView = new DataView(data);
            const keysView = new DataView(keys[player]);
            keysView.setUint8(inputView.getUint8(1), inputView.getUint8(2));
        } else {
            const parsedData = JSON.parse(data);
            if ('updateState' in parsedData) {
                playerUpdate(keys[player], game, `${player}Pos`);
                ballUpdate(game);
                const msg = JSON.stringify({ gameState });
                socket.send(msg);
            }
        }
    });
};

export default playerSetup;
