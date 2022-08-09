const paddleRightBoundary = 440;
const paddleLeftBoundary = 0;
const paddleSpeed = 5;
const ballRightBoundary = 493;
const ballLeftBoundary = 0;
const ballMaxVSpeed = 10;
const ballMaxHSpeed = 6;
const screenTop = 0;
const screenBottom = 693;
const playerOneBottom = 657;
const playerOneTop = 650;
const playerTwoBottom = 57;
const playerTwoTop = 50;
const ballWidth = 7;
const paddleWidth = 60;

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

    const paddleCollisionCheck = (playerPos, ballPos) => {
        if (ballPos + ballWidth >= playerPos && ballPos <= playerPos + paddleWidth) {
            const speedMod = Math.abs(gameState.ballVSpeed) > ballMaxVSpeed ? -1 : -1.05;
            const offSet = ((ballPos + (ballWidth / 2) - (playerPos + (paddleWidth / 2))) / 10);

            gameState.ballVSpeed *= speedMod;
            gameState.ballHSpeed = Math.min(
                Math.max(gameState.ballHSpeed + offSet, -ballMaxHSpeed),
                ballMaxHSpeed,
            );
        }
    };

    const resetPositions = () => {
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
        resetPositions();
    }
    if (gameState.ballYPos >= screenBottom) {
        gameState.score[1] += 1;
        resetPositions();
    }
    if (gameState.ballXPos >= ballRightBoundary || gameState.ballXPos <= ballLeftBoundary) {
        gameState.ballHSpeed *= -1;
    }
    if ((gameState.ballYPos + ballWidth > playerOneTop) && (gameState.ballYPos < playerOneBottom)) {
        paddleCollisionCheck(gameState.playerOnePos, gameState.ballXPos);
    }
    if ((gameState.ballYPos + ballWidth > playerTwoTop) && (gameState.ballYPos < playerTwoBottom)) {
        paddleCollisionCheck(gameState.playerTwoPos, gameState.ballXPos);
    }
};

export { playerUpdate, ballUpdate };
