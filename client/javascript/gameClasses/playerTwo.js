import Game from './game.js';
import ServerConnection from '../socket.js';

export default class PlayerTwo extends Game {
    constructor(height, width, gameID) {
        super(height, width);
        this.gameID = gameID;
        this.url = `ws://localhost:9090/join${this.gameID}`;
        this.server = new ServerConnection(this);
        this.opponentConnected = true;
    }

    update(timeDelta) {
        super.update(timeDelta);
    }

    draw(context) {
        super.draw(context);
    }
}
