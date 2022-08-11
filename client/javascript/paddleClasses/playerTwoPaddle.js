import Paddle from './paddle.js';

export default class PlayerTwoPaddle extends Paddle {
    constructor(game) {
        super(game);
        this.yPos = 50;
    }

    update(serverPosition) {
        super.update(serverPosition);
    }

    draw(context) {
        super.draw(context);
    }
}
