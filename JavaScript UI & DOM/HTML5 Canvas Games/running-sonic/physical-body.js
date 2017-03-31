function createPhysicalBody(options) {

    function move() {
        const self = this;

        const lastCoordinates = self.coordinates;

        self.coordinates.x += self.speed.x;
        self.coordinates.y += self.speed.y;

        return lastCoordinates;
    }

    function collidesWith(otherBody) {
        const self = this;

        const x1 = self.coordinates.x + self.width / 2,
            y1 = self.coordinates.y + self.height / 2,
            x2 = otherBody.coordinates.x + otherBody.width / 2,
            y2 = otherBody.coordinates.y + otherBody.height / 2;

        const distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

        if (self.radius + otherBody.radius >= distance) {
            return true;
        }

        return false;
    }

    function getRadius(width, height) {
        const diagonal = Math.sqrt(width * width + height * height);

        return diagonal / 2;
    }

    const physicalBody = {
        coordinates: options.coordinates,
        speed: options.speed || { x: 0, y: 0 },
        width: options.width,
        height: options.height,
        move: move,
        radius: (options.width + options.height) / 4, //getRadius(options.width, options.height),
        collidesWith: collidesWith
    };

    return physicalBody;
}