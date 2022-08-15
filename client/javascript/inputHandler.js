export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.gameScreen = document.getElementById('GameScreen');
        this.screenWidth = this.gameScreen.clientWidth + 10;
        this.lastTouch = null;
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
        this.gameScreen.addEventListener('touchstart', (event) => {
            event.preventDefault();
            if (event.touches[0].clientX > this.screenWidth / 2) {
                this.game.server.sendInput(this.keyVal.ArrowRight, this.actions.down);
                this.lastTouch = this.keyVal.ArrowRight;
            } else {
                this.game.server.sendInput(this.keyVal.ArrowLeft, this.actions.down);
                this.lastTouch = this.keyVal.ArrowLeft;
            }
        });
        this.gameScreen.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.game.server.sendInput(this.lastTouch, this.actions.up);
        });
    }
}
