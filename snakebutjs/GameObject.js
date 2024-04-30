class GameObject {

    static instances = [];

    constructor() {

        this.id = GameObject.instances.push(this);

    }

    remove() {

        GameObject.instances.splice(this.id);

    }

    render(ctx) {

        console.log(this.constructor.name, "does not implement the render function. Contact dev.");

    }

}