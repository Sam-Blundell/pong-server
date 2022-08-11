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
        this.gameState = {
            score: [0, 0],
        };
    }

    update() {
        if (this.server.connected === true && this.opponentConnected === true) {
            this.server.socket.send(JSON.stringify({ updateState: true }));
            const {
                playerOnePos,
                playerTwoPos,
                ballXPos,
                ballYPos,
            } = this.gameState;
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
