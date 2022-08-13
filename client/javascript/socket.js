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
            const parsedData = JSON.parse(event.data);
            if ('gameID' in parsedData) {
                this.game.gameID = parsedData.gameID;
            }
            if ('gameState' in parsedData) { // here
                this.game.gameState = parsedData.gameState;
            }
            if ('opponentConnected' in parsedData) {
                this.game.opponentConnected = true;
            }
            if ('opponentDisconnected' in parsedData) {
                this.game.opponentConnected = false;
            }
        });
    }

    disconnectListener() {
        this.socket.addEventListener('close', () => {
            this.connected = false;
        });
    }
}
