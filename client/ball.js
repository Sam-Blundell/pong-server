export default class Ball {
    constructor(game) {
        this.game = game;
        this.size = 7;
        this.ballXPos = 246;
        this.ballYPos = 346;
        this.paddleHeight = 6;
        this.paddleWidth = 60;
    }

    update(ballXPos, ballYPos) {
        this.ballXPos = ballXPos;
        this.ballYPos = ballYPos;
    }

    draw(context) {
        context.fillRect(this.ballXPos, this.ballYPos, this.size, this.size);
    }
}
