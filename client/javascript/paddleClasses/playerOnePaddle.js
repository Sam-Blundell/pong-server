import Paddle from './paddle.js';

export default class PlayerOnePaddle extends Paddle {
    constructor(game) {
        super(game);
        this.yPos = this.game.screenHeight - 50;
    }

    update(serverPosition) {
        super.update(serverPosition);
    }

    draw(context) {
        super.draw(context);
    }
}
