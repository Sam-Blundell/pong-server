import { PlayerOne, PlayerTwo } from './game.js';

let urlID = '';
if (window.location.href.indexOf('/join/') !== -1) {
    urlID = window.location.href.slice(-7, -1);
}

window.addEventListener('load', () => {
    const player1Button = document.getElementById('Player1Button');
    const joinButton = document.getElementById('JoinButton');
    const idBox = document.getElementById('IDBox');
    const mainForm = document.getElementById('MainForm');
    const gameScreen = document.getElementById('GameScreen');
    const context = gameScreen.getContext('2d');
    gameScreen.height = 700;
    gameScreen.width = 500;
    let game;

    let lastTimeStamp = 0;
    const animate = (timeStamp) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, game.screenWidth, game.screenHeight);
        context.fillStyle = 'white';
        const timeDelta = timeStamp - lastTimeStamp;
        lastTimeStamp = timeStamp;
        game.update(timeDelta);
        game.draw(context);
        requestAnimationFrame(animate);
    };

    if (urlID !== '') {
        game = new PlayerTwo(gameScreen.height, gameScreen.width, urlID);
        player1Button.remove();
        mainForm.remove();
        animate(0);
    }
    // this is a mess.

    const initGame = (user, gameID) => {
        if (user === 'playerOne') {
            game = new PlayerOne(gameScreen.height, gameScreen.width);
        } else if (user === 'playerTwo') {
            game = new PlayerTwo(gameScreen.height, gameScreen.width, gameID);
        }
        player1Button.remove();
        mainForm.remove();
        animate(0);
    };

    player1Button.onclick = () => { initGame('playerOne'); };
    joinButton.onclick = () => { initGame('playerTwo', idBox.value); };
});
