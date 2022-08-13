const playerSetup = (game, player) => {
    const { [player]: socket } = game.clients;

    socket.binaryType = 'arraybuffer';

    socket.on('message', (data) => {
        if (data instanceof ArrayBuffer) {
            // 3 bytes. 1 identifies inputData, 2 specifies key, 3 specifies condition.
            const inputView = new DataView(data);
            const keysView = new DataView(game.keys[player]);
            keysView.setUint8(inputView.getUint8(1), inputView.getUint8(2));
        }
    });
};

export default playerSetup;
