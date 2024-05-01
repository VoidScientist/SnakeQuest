class Apple extends GameObject {

    static appleSprite = document.getElementById("applesprite");

    constructor(grid, x, y) {

        super();
        this.grid = grid;
        this.pos = new Vector2(x, y);

    }

    respawn() {

        this.pos = new Vector2(
            Math.floor(Math.random() * this.grid.tiles),
            Math.floor(Math.random() * this.grid.tiles)
        )

    }

    render(ctx) {

        ctx.drawImage(
            Apple.appleSprite,
            this.pos.x * this.grid.tW,
            this.pos.y * this.grid.tH
        );
    }

}