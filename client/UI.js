export default class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 20;
        this.fontFamily = 'Helvetica';
    }

    draw(context) {
        context.strokeStyle = 'white';
        context.beginPath();
        context.moveTo(0, 350);
        context.lineTo(500, 350);
        context.stroke();
        context.beginPath();
        context.arc(250, 350, 75, 0, 2 * Math.PI);
        context.stroke();
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        context.fillText(`${this.game.gameID}`, 420, 20);
        context.fillText(`${this.game.gameState.score[1]}`, 5, 20);
        context.fillText(`${this.game.gameState.score[0]}`, 5, 690);
    }
}
