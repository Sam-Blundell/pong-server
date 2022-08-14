const byteLength = 19;
const bufferVal = {
    identifier: 0,
    playerOnePos: 1,
    playerTwoPos: 3,
    ballXPos: 5,
    ballYPos: 7,
    ballHSpeed: 9,
    ballVSpeed: 13,
    playerOneScore: 17,
    playerTwoScore: 18,
};

const createGameStateBuffer = () => {
    const buffer = new ArrayBuffer(byteLength);
    const view = new DataView(buffer);
    view.setUint8(bufferVal.identifier, 20);
    view.setUint16(bufferVal.playerOnePos, 220);
    view.setUint16(bufferVal.playerTwoPos, 220);
    view.setUint16(bufferVal.ballXPos, 246);
    view.setUint16(bufferVal.ballYPos, 346);
    view.setFloat32(bufferVal.ballHSpeed, 1);
    view.setFloat32(bufferVal.ballVSpeed, 3);
    view.setUint8(bufferVal.playerOneScore, 0);
    view.setUint8(bufferVal.playerTwoScore, 0);

    return buffer;
};

export { createGameStateBuffer };
