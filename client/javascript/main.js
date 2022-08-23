import PlayerOne from './gameClasses/playerOne.js';
import PlayerTwo from './gameClasses/playerTwo.js';

let urlID = '';
if (window.location.href.indexOf('/join/') !== -1) {
    urlID = window.location.href.slice(-7, -1);
}

window.addEventListener('load', () => {
    const newGameButton = document.getElementById('StartNewGameButton');
    const joinButton = document.getElementById('JoinGameButton');
    const idBox = document.getElementById('IDBox');
    const idForm = document.getElementById('IDForm');
    const menu = document.getElementById('Menu');
    const joinLink = document.getElementById('JoinLink');
    const linkButton = document.getElementById('LinkButton');
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
        gameScreen.style.display = 'inline-block';
        game = new PlayerTwo(gameScreen.height, gameScreen.width, urlID);
        menu.remove();
        animate(0);
    }

    const initGame = (user, gameID) => {
        gameScreen.style.display = 'inline-block';
        if (user === 'playerOne') {
            game = new PlayerOne(gameScreen.height, gameScreen.width);
            joinLink.style.display = 'flex';
        } else if (user === 'playerTwo') {
            game = new PlayerTwo(gameScreen.height, gameScreen.width, gameID);
        }
        menu.remove();
        animate(0);
    };

    const showIDBox = () => {
        menu.remove();
        idForm.style.display = 'flex';
        const joinStart = document.getElementById('JoinWithID');
        joinStart.onclick = () => {
            initGame('playerTwo', idBox.value);
            idForm.remove();
        };
    };

    newGameButton.onclick = () => { initGame('playerOne'); };
    joinButton.onclick = () => { showIDBox(); };
    linkButton.onclick = () => {
        const joinUrl = document.getElementById('LinkUrl').innerText;
        navigator.clipboard.writeText(joinUrl);
        linkButton.innerText = 'Copied!';
        setTimeout(() => {
            linkButton.innerText = 'Copy URL';
        }, 500);
    };
});
