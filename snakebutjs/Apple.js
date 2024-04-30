class Apple extends GameObject {

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

        ctx.fillStyle = "#b54040";
        ctx.fillRect(
            this.pos.x * this.grid.tW,
            this.pos.y * this.grid.tH,
            this.grid.tW + 1,
            this.grid.tH + 1
        );

    }

}