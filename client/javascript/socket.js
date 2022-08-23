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
                const updateView = new DataView(event.data);
                const { stateView } = this.game;
                stateView.setUint16(0, updateView.getUint16(1));
                stateView.setUint16(2, updateView.getUint16(3));
                stateView.setUint16(4, updateView.getUint16(5));
                stateView.setUint16(6, updateView.getUint16(7));
                stateView.setUint8(8, updateView.getUint8(17));
                stateView.setUint8(9, updateView.getUint8(18));
            } else {
                const parsedData = JSON.parse(event.data);
                if ('gameID' in parsedData) {
                    this.game.gameID = parsedData.gameID;
                    const linkUrl = document.getElementById('LinkUrl');
                    linkUrl.innerText = `${window.location.href}join/${parsedData.gameID}`;
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
