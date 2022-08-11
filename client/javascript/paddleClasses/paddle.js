export default class Paddle {
    constructor(game) {
        this.game = game;
        this.width = 60;
        this.height = 6;
        this.xPos = (this.game.screenWidth / 2) - (this.width / 2);
        this.yPos = this.game.screenHeight - 50;
        this.speed = 5;
    }

    update(serverPosition) {
        this.xPos = serverPosition;
    }

    draw(context) {
        context.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}
