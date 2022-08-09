const validKeys = {
    playerOne: {
        ArrowLeft: false,
        ArrowRight: false,
    },
    playerTwo: {
        ArrowLeft: false,
        ArrowRight: false,
    },
};

const initialGameState = {
    playerOnePos: 220,
    playerTwoPos: 220,
    ballXPos: 246,
    ballYPos: 346,
    ballHSpeed: 1,
    ballVSpeed: 3,
    score: [0, 0],
};

const initialClients = {
    playerOne: null,
    playerTwo: null,
};

const gameSetup = (player) => {
    const game = {
        clients: { ...initialClients },
        keys: { ...validKeys },
        gameState: { ...initialGameState },
        ready: false,
    };
    game.clients.playerOne = player;
    return game;
};

export default gameSetup;
