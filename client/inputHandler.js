export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.validKeys = ['ArrowRight', 'ArrowLeft'];
        window.addEventListener('keydown', (event) => {
            if (event.repeat === true) {
                return;
            }
            if (this.validKeys.includes(event.code)) {
                this.game.server.sendInput(event.code, true);
            }
        });
        window.addEventListener('keyup', (event) => {
            if (this.validKeys.includes(event.code)) {
                this.game.server.sendInput(event.code, false);
            }
        });
    }
}
