class Vector2 {

    constructor(x, y) {

        this.x = x;
        this.y = y;

    }

    overlaps(other) {

        return this.x == other.x && this.y == other.y;

    }

    translateBy(other) {

        return new Vector2(this.x + other.x, this.y + other.y);

    }


}