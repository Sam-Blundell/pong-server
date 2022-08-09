const paddleRightBoundary = 440;
const paddleLeftBoundary = 0;
const paddleSpeed = 5;
const ballRightBoundary = 493;
const ballLeftBoundary = 0;
// const ballMinVSpeed = 3;
// const ballMaxVSpeed = 12;
// const ballMaxHSpeed = 6;
const screenTop = 0;
const screenBottom = 693;

const playerUpdate = (keys, game, playerPos) => {
    const { gameState } = game;
    if (keys.ArrowRight === true && gameState[playerPos] < paddleRightBoundary) {
        gameState[playerPos] += paddleSpeed;
    } else if (keys.ArrowLeft === true && gameState[playerPos] > paddleLeftBoundary) {
        gameState[playerPos] -= paddleSpeed;
    }
};

const ballUpdate = (game) => {
    const { gameState } = game;
    const paddleCheck = (playerPos, ballPos) => {
        if (ballPos + 7 >= playerPos && ballPos <= playerPos + 60) {
            const speedMod = Math.abs(gameState.ballVSpeed) > 8 ? -1 : -1.1;
            gameState.ballVSpeed *= speedMod;
        }
    };
    const ballServe = () => {
        gameState.playerOnePos = 220;
        gameState.playerTwoPos = 220;
        gameState.ballHSpeed = 1;
        gameState.ballVSpeed = 3;
        gameState.ballXPos = 246;
        gameState.ballYPos = 346;
    };
    gameState.ballYPos += gameState.ballVSpeed;
    gameState.ballXPos += gameState.ballHSpeed;
    if (gameState.ballYPos <= screenTop) {
        gameState.score[0] += 1;
        ballServe();
    }
    if (gameState.ballYPos >= screenBottom) {
        gameState.score[1] += 1;
        ballServe();
    }
    if (gameState.ballXPos >= ballRightBoundary || gameState.ballXPos <= ballLeftBoundary) {
        gameState.ballHSpeed *= -1;
    }
    if ((gameState.ballYPos + 7 > 650) && (gameState.ballYPos < 657)) {
        paddleCheck(gameState.playerOnePos, gameState.ballXPos);
    }
    if ((gameState.ballYPos + 7 > 50) && (gameState.ballYPos < 57)) {
        paddleCheck(gameState.playerTwoPos, gameState.ballXPos);
    }
};

export { playerUpdate, ballUpdate };
