const rightBound = 440;
const leftBound = 0;
const paddleSpeed = 5;

const playerUpdate = (keys, game, playerPos) => {
    const { gameState } = game;
    if (keys.ArrowRight === true && gameState[playerPos] < rightBound) {
        gameState[playerPos] += paddleSpeed;
    } else if (keys.ArrowLeft === true && gameState[playerPos] > leftBound) {
        gameState[playerPos] -= paddleSpeed;
    }
};

export default playerUpdate;
