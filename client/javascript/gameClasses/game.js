import InputHandler from '../inputHandler.js';
import Ball from '../ball.js';
import PlayerOnePaddle from '../paddleClasses/playerOnePaddle.js';
import PlayerTwoPaddle from '../paddleClasses/playerTwoPaddle.js';
import UI from '../UI.js';

export default class Game {
    constructor(height, width) {
        this.screenHeight = height;
        this.screenWidth = width;
        this.ui = new UI(this);
        this.input = new InputHandler(this);
        this.playerOnePaddle = new PlayerOnePaddle(this);
        this.playerTwoPaddle = new PlayerTwoPaddle(this);
        this.ball = new Ball(this);
        this.stateBuffer = new ArrayBuffer(10);
        this.stateView = new DataView(this.stateBuffer);
    }

    update() {
        if (this.server.connected === true && this.opponentConnected === true) {
            this.playerOnePaddle.update(this.stateView.getUint16(0));
            this.playerTwoPaddle.update(this.stateView.getUint16(2));
            this.ball.update(this.stateView.getUint16(4), this.stateView.getUint16(6));
        }
    }

    draw(context) {
        this.ui.draw(context);
        this.playerOnePaddle.draw(context);
        this.playerTwoPaddle.draw(context);
        this.ball.draw(context);
    }
}
