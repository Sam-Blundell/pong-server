const validKeys = {
    // first byte is ArrowLeft, second is ArrowRight.
    playerOne: new ArrayBuffer(2),
    playerTwo: new ArrayBuffer(2),
};

const gameStateBuffer = new ArrayBuffer(19);
const stateView = new DataView(gameStateBuffer);
stateView.setUint8(0, 20); // identifier
stateView.setUint16(1, 220); // playerOnePos
stateView.setUint16(3, 220); // playerTwoPos
stateView.setUint16(5, 246); // ballXPos
stateView.setUint16(7, 346); // ballYPos
stateView.setFloat32(9, 1); // ballHSpeed
stateView.setFloat32(13, 3); // ballVSpeed
stateView.setUint8(17, 0); // playerOneScore
stateView.setUint8(18, 0); // playerTwoScore

const initialClients = {
    playerOne: null,
    playerTwo: null,
};

const gameSetup = (player) => {
    const game = {
        clients: { ...initialClients },
        keys: { ...validKeys },
        binaryGameState: gameStateBuffer,
        ready: false,
    };
    game.clients.playerOne = player;
    return game;
};

export default gameSetup;
