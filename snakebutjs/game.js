const canvas = document.getElementById("game");
const width = canvas.clientWidth;
const height = canvas.clientHeight;
const ctx = canvas.getContext("2d");

const score = document.getElementById("score");
const bestEl = document.getElementById("best-score");
let best = 1;

const bgColor = "#252550";

const tiles = 16;

const framerate = 60;
const movesPerSecond = 10;

let frameSinceMove = 0;

const grid = new Grid(width, height, tiles);
const apple = new Apple(grid, 7, 3);
const snake = new Snake(grid, 8, 8);


function handleInput(event) {

    const directions = {

        "z": new Vector2(0,-1),
        "q": new Vector2(-1, 0),
        "s": new Vector2(0,1),
        "d": new Vector2(1,0),

    }

    snake.changeDir(directions[event.key]);

}

function loop() {

    // drawing background
    ctx.fillStyle = bgColor;
    ctx.fillRect(
        0, 0,
        visualViewport.width, 
        visualViewport.height
    );

    for (let el of GameObject.instances) {
        el.render(ctx);
    }

    if (frameSinceMove >= framerate / movesPerSecond) {
        snake.move();
        frameSinceMove = 0;
    }

    if (snake.collideWith(apple)) {

        snake.changeLen(snake.getLen() + 1);
        apple.respawn();

    }

    score.textContent = `Score: ${snake.getLen()}`

    if (best < snake.getLen()) {

        best = snake.getLen();
        bestEl.textContent = `Best Score: ${best}`

    }

    frameSinceMove++;
    

    return;

}

const gameLoop = setInterval(loop, 1/framerate * 1000);

document.addEventListener("keydown", handleInput);