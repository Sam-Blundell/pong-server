import {
    getPlayerOnePos,
    getPlayerTwoPos,
    getBallXPos,
    getBallYPos,
    getBallHSpeed,
    getBallVSpeed,
    getPlayerOneScore,
    getPlayerTwoScore,
    setPlayerOnePos,
    setPlayerTwoPos,
    setBallXPos,
    setBallYPos,
    setBallHSpeed,
    setBallVSpeed,
    setPlayerOneScore,
    setPlayerTwoScore,
} from './gameStateManager.js';

const paddleRightBoundary = 440;
const paddleLeftBoundary = 0;
const paddleSpeed = 5;
const ballRightBoundary = 493;
const ballLeftBoundary = 0;
const ballMaxVSpeed = 10;
const ballMaxHSpeed = 6;
const screenTop = 1;
const screenBottom = 693;
const playerOneBottom = 657;
const playerOneTop = 650;
const playerTwoBottom = 57;
const playerTwoTop = 50;
const ballWidth = 7;
const paddleWidth = 60;

const playerUpdate = (keys, game, playerIndex) => {
    const stateView = new DataView(game.binaryGameState);
    const inputView = new DataView(keys);
    if (inputView.getUint8(1) === 1 && stateView.getUint16(playerIndex) < paddleRightBoundary) {
        stateView.setUint16(playerIndex, stateView.getUint16(playerIndex) + paddleSpeed);
    } else if (
        inputView.getUint8(0) === 1
        && stateView.getUint16(playerIndex) > paddleLeftBoundary
    ) {
        stateView.setUint16(playerIndex, stateView.getUint16(playerIndex) - paddleSpeed);
    }
};

const ballUpdate = (game) => {
    const { binaryGameState: buffer } = game;

    const paddleCollisionCheck = (playerPos, ballPos) => {
        if (
            (ballPos + ballWidth) >= playerPos
            && ballPos <= (playerPos + paddleWidth)
        ) {
            const speedMod = Math.abs(getBallVSpeed(buffer)) > ballMaxVSpeed ? -1 : -1.05;
            const offSet = ((ballPos + (ballWidth / 2) - (playerPos + (paddleWidth / 2))) / 15);

            setBallHSpeed(
                buffer,
                Math.min(
                    Math.max(getBallHSpeed(buffer) + offSet, -ballMaxHSpeed),
                    ballMaxHSpeed,
                ),
            );
            setBallVSpeed(buffer, getBallVSpeed(buffer) * speedMod);
        }
    };

    const resetPositions = () => {
        setPlayerOnePos(buffer, 220);
        setPlayerTwoPos(buffer, 220);
        setBallXPos(buffer, 246);
        setBallYPos(buffer, 346);
        setBallHSpeed(buffer, 1);
        setBallVSpeed(buffer, 3);
    };

    setBallXPos(buffer, getBallXPos(buffer) + Math.round(getBallHSpeed(buffer)));
    setBallYPos(buffer, getBallYPos(buffer) + Math.round(getBallVSpeed(buffer)));

    if (getBallYPos(buffer) <= screenTop) {
        setPlayerOneScore(buffer, getPlayerOneScore(buffer) + 1);
        resetPositions();
    } else if (getBallYPos(buffer) >= screenBottom) {
        setPlayerTwoScore(buffer, getPlayerTwoScore(buffer) + 1);
        resetPositions();
    } else if (
        getBallXPos(buffer) >= ballRightBoundary
        || getBallXPos(buffer) <= ballLeftBoundary
    ) {
        setBallHSpeed(buffer, getBallHSpeed(buffer) * -1);
    } else if (
        (getBallYPos(buffer) + ballWidth) > playerOneTop
        && getBallYPos(buffer) < playerOneBottom
    ) {
        paddleCollisionCheck(getPlayerOnePos(buffer), getBallXPos(buffer));
    } else if (
        (getBallYPos(buffer) + ballWidth) > playerTwoTop
        && getBallYPos(buffer) < playerTwoBottom
    ) {
        paddleCollisionCheck(getPlayerTwoPos(buffer), getBallXPos(buffer));
    }
};

export { playerUpdate, ballUpdate };
