import { createGameStateBuffer } from './gameStateManager.js';

const validKeys = {
    // first byte is ArrowLeft, second is ArrowRight.
    playerOne: new ArrayBuffer(2),
    playerTwo: new ArrayBuffer(2),
};

const gameStateBuffer = createGameStateBuffer();

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
