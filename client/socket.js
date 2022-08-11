export default class ServerConnection {
    constructor(game) {
        this.game = game;
        this.connected = false;
        this.socket = new WebSocket(this.game.url);
        this.handShake();
        this.gameStateListener();
        this.disconnectListener();
    }

    sendInput(input, action) {
        const data = JSON.stringify({
            inputData: [input, action],
        });
        this.socket.send(data);
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
            if ('gameState' in parsedData) {
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
