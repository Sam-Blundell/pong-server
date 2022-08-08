const mirrorState = (state) => {
    const mirror = { ...state };
    [mirror.playerOnePos, mirror.playerTwoPos] = [mirror.playerTwoPos, mirror.playerOnePos];
    return mirror;
};

export default mirrorState;
