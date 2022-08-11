import InputHandler from './inputHandler.js';
import ServerConnection from './socket.js';
import Ball from './ball.js';
import { PlayerOnePaddle, PlayerTwoPaddle } from './paddle.js';
import UI from './UI.js';

class Game {
    constructor(height, width) {
        this.screenHeight = height;
        this.screenWidth = width;
        this.ui = new UI(this);
        this.input = new InputHandler(this);
        this.playerOnePaddle = new PlayerOnePaddle(this);
        this.playerTwoPaddle = new PlayerTwoPaddle(this);
        this.ball = new Ball(this);
        this.gameState = {
            score: [0, 0],
        };
    }
    update(timeDelta) {
        if (this.server.connected === true && this.opponentConnected === true) {
            this.server.socket.send(JSON.stringify({ updateState: true }));
            const { playerOnePos, playerTwoPos, ballXPos, ballYPos } = this.gameState;
            this.playerOnePaddle.update(playerOnePos);
            this.playerTwoPaddle.update(playerTwoPos);
            this.ball.update(ballXPos, ballYPos);
        }
    }
    draw(context) {
        this.ui.draw(context);
        this.playerOnePaddle.draw(context);
        this.playerTwoPaddle.draw(context);
        this.ball.draw(context);
    }
}

export class PlayerOne extends Game {
    constructor(height, width) {
        super(height, width);
        this.gameID = null;
        this.url = 'ws://localhost:9090/start';
        this.server = new ServerConnection(this)
        this.opponentConnected = false;
    }
    update(timeDelta) {
        super.update(timeDelta);
    }
    draw(context) {
        super.draw(context);
    }
}

export class PlayerTwo extends Game {
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