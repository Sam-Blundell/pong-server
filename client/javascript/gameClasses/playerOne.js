import Game from './game.js';
import ServerConnection from '../socket.js';

export default class PlayerOne extends Game {
    constructor(height, width) {
        super(height, width);
        this.gameID = null;
        this.url = 'ws://localhost:9090/start';
        this.server = new ServerConnection(this);
        this.opponentConnected = false;
    }

    update(timeDelta) {
        super.update(timeDelta);
    }

    draw(context) {
        super.draw(context);
    }
}
