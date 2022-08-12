export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.validKeys = ['ArrowRight', 'ArrowLeft'];
        this.keyVal = {
            ArrowLeft: 0,
            ArrowRight: 1,
        };
        this.actions = {
            down: 1,
            up: 0,
        };
        window.addEventListener('keydown', (event) => {
            if (event.repeat === true) {
                return;
            }
            if (this.validKeys.includes(event.code)) {
                this.game.server.sendInput(this.keyVal[event.code], this.actions.down);
            }
        });
        window.addEventListener('keyup', (event) => {
            if (this.validKeys.includes(event.code)) {
                this.game.server.sendInput(this.keyVal[event.code], this.actions.up);
            }
        });
    }
}
