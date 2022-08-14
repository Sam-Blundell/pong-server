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

// this is a mess and needs either commenting or refactoring.

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
    const stateView = new DataView(game.binaryGameState);

    const paddleCollisionCheck = (playerPos, ballPos) => {
        if (ballPos + ballWidth >= playerPos && ballPos <= playerPos + paddleWidth) {
            const speedMod = Math.abs(stateView.getFloat32(13)) > ballMaxVSpeed ? -1 : -1.05;
            const offSet = ((ballPos + (ballWidth / 2) - (playerPos + (paddleWidth / 2))) / 15);

            stateView.setFloat32(
                9,
                Math.min(Math.max(stateView.getFloat32(9) + offSet, -ballMaxHSpeed), ballMaxHSpeed),
            );
            stateView.setFloat32(13, stateView.getFloat32(13) * speedMod);
        }
    };

    const resetPositions = () => {
        stateView.setUint16(1, 220);
        stateView.setUint16(3, 220);
        stateView.setUint16(5, 246);
        stateView.setUint16(7, 346);
        stateView.setFloat32(9, 1);
        stateView.setFloat32(13, 3);
    };

    stateView.setUint16(5, stateView.getUint16(5) + Math.round(stateView.getFloat32(9)));
    stateView.setUint16(7, stateView.getUint16(7) + Math.round(stateView.getFloat32(13)));

    if (stateView.getUint16(7) <= screenTop) {
        stateView.setUint8(17, stateView.getUint8(17) + 1);
        resetPositions();
    } else if (stateView.getUint16(7) >= screenBottom) {
        stateView.setUint8(18, stateView.getUint8(18) + 1);
        resetPositions();
    } else if (
        stateView.getUint16(5) >= ballRightBoundary
        || stateView.getUint16(5) <= ballLeftBoundary
    ) {
        stateView.setFloat32(9, stateView.getFloat32(9) * -1);
    } else if (
        (stateView.getUint16(7) + ballWidth > playerOneTop)
        && (stateView.getUint16(7) < playerOneBottom)
    ) {
        paddleCollisionCheck(stateView.getUint16(1), stateView.getUint16(5));
    } else if (
        (stateView.getUint16(7) + ballWidth > playerTwoTop)
        && (stateView.getUint16(7) < playerTwoBottom)
    ) {
        paddleCollisionCheck(stateView.getUint16(3), stateView.getUint16(5));
    }
};

export { playerUpdate, ballUpdate };
