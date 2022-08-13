export default class ServerConnection {
    constructor(game) {
        this.game = game;
        this.connected = false;
        this.socket = new WebSocket(this.game.url);
        this.socket.binaryType = 'arraybuffer';
        this.handShake();
        this.gameStateListener();
        this.disconnectListener();
    }

    sendInput(key, action) {
        const inputBuffer = new ArrayBuffer(3);
        // first byte: identifier, second byte: key, third byte: action.
        const inputView = new DataView(inputBuffer);
        inputView.setUint8(0, 10);
        inputView.setUint8(1, key);
        inputView.setUint8(2, action);
        this.socket.send(inputBuffer);
    }

    handShake() {
        this.socket.addEventListener('open', () => {
            this.connected = true;
        });
    }

    gameStateListener() {
        this.socket.addEventListener('message', (event) => {
            if (event.data instanceof ArrayBuffer) {
                const stateView = new DataView(event.data);
                this.game.gameState.playerOnePos = stateView.getUint16(1);
                this.game.gameState.playerTwoPos = stateView.getUint16(3);
                this.game.gameState.ballXPos = stateView.getUint16(5);
                this.game.gameState.ballYPos = stateView.getUint16(7);
                this.game.gameState.score[0] = stateView.getUint8(17);
                this.game.gameState.score[1] = stateView.getUint8(18);
            } else {
                const parsedData = JSON.parse(event.data);
                if ('gameID' in parsedData) {
                    this.game.gameID = parsedData.gameID;
                }
                if ('opponentConnected' in parsedData) {
                    this.game.opponentConnected = true;
                }
                if ('opponentDisconnected' in parsedData) {
                    this.game.opponentConnected = false;
                }
            }
        });
    }

    disconnectListener() {
        this.socket.addEventListener('close', () => {
            this.connected = false;
        });
    }
}
