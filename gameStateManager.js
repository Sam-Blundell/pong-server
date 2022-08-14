const totalBytes = 19;
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
    const buffer = new ArrayBuffer(totalBytes);
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

const getPlayerOnePos = (buffer) => {
    const view = new DataView(buffer);
    return view.getUint16(bufferVal.playerOnePos);
};

const getPlayerTwoPos = (buffer) => {
    const view = new DataView(buffer);
    return view.getUint16(bufferVal.playerTwoPos);
};

const getBallXPos = (buffer) => {
    const view = new DataView(buffer);
    return view.getUint16(bufferVal.ballXPos);
};

const getBallYPos = (buffer) => {
    const view = new DataView(buffer);
    return view.getUint16(bufferVal.ballYPos);
};

const getBallHSpeed = (buffer) => {
    const view = new DataView(buffer);
    return view.getFloat32(bufferVal.ballHSpeed);
};

const getBallVSpeed = (buffer) => {
    const view = new DataView(buffer);
    return view.getFloat32(bufferVal.ballVSpeed);
};

const getPlayerOneScore = (buffer) => {
    const view = new DataView(buffer);
    return view.getUint8(bufferVal.playerOneScore);
};

const getPlayerTwoScore = (buffer) => {
    const view = new DataView(buffer);
    return view.getUint8(bufferVal.playerTwoScore);
};

const setPlayerOnePos = (buffer, newVal) => {
    const view = new DataView(buffer);
    view.setUint16(bufferVal.playerOnePos, newVal);
};

const setPlayerTwoPos = (buffer, newVal) => {
    const view = new DataView(buffer);
    view.setUint16(bufferVal.playerTwoPos, newVal);
};

const setBallXPos = (buffer, newVal) => {
    const view = new DataView(buffer);
    view.setUint16(bufferVal.ballXPos, newVal);
};

const setBallYPos = (buffer, newVal) => {
    const view = new DataView(buffer);
    view.setUint16(bufferVal.ballYPos, newVal);
};

const setBallHSpeed = (buffer, newVal) => {
    const view = new DataView(buffer);
    view.setFloat32(bufferVal.ballHSpeed, newVal);
};

const setBallVSpeed = (buffer, newVal) => {
    const view = new DataView(buffer);
    view.setFloat32(bufferVal.ballVSpeed, newVal);
};

const setPlayerOneScore = (buffer, newVal) => {
    const view = new DataView(buffer);
    view.setUint8(bufferVal.playerOneScore, newVal);
};

const setPlayerTwoScore = (buffer, newVal) => {
    const view = new DataView(buffer);
    view.setUint8(bufferVal.playerTwoScore, newVal);
};

export {
    createGameStateBuffer,
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
};
