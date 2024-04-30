class Snake extends GameObject {

    static baseDir = new Vector2(0,0);

    constructor(grid, x, y) {

        super();

        this.snakeLen = 1;
        this.snakeDir = Snake.baseDir;
        this.spawnPos = new Vector2(x, y);
        this.snake = [this.spawnPos];
        this.grid = grid;

    }

    collideWith(other) {

        if (!other.pos) {return;}

        return this.getHead().overlaps(other.pos);

    }

    getHead() {

        return this.snake[this.snake.length - 1];

    }

    changeDir(newDir) {

        let dieIfChange = (
            newDir.x == -this.snakeDir.x &&
            newDir.y == -this.snakeDir.y &&
            this.snakeLen > 2
        );

        if (dieIfChange) {return;}

        this.snakeDir = newDir || this.snakeDir;

    }

    changeLen(newLen) {

        this.snakeLen = newLen;

    }

    getLen() {

        return this.snakeLen;

    }

    move() {

        const head = this.getHead()

        // moving the snake
        this.snake.push(
            head
            .translateBy(this.snakeDir)
        );

        // removing extra snake
        if (this.snakeLen < this.snake.length) {
            this.snake.splice(0, this.snake.length - this.snakeLen);
        }

        // checks if the snake is dead
        const isDead = (
            head.x >= this.grid.tiles ||
            head.x < 0 ||
            head.y >= this.grid.tiles ||
            head.y < 0 ||
            this.collidingWithTail()
        );

        // if dead, respawn
        if (isDead) {
            this.changeLen(1);
            this.snake = [this.spawnPos];
            this.snakeDir = Snake.baseDir;
        }

    }

    collidingWithTail() {

        const head = this.getHead();

        for (let tile of this.snake) {
    
            if (head.overlaps(tile) && head !== tile) {
    
                return true;
    
            }
    
        }
    
        return false;
    
    }

    render(ctx) {

    // drawing the snake
        for (let tile of this.snake) {

            ctx.fillStyle = (
                tile === this.getHead() 
                ? "#40e040" : "#40a040"
            );

            ctx.fillRect(
                tile.x * this.grid.tW,
                tile.y * this.grid.tH,
                this.grid.tW + 1,
                this.grid.tH + 1
            );

        }

    }

}