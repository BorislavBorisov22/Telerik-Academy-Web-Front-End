function createPhysicalBody(options) {

    'use strict';

    function move() {
        const self = this,
            lastCoordinates = { x: self.coordinates.x, y: self.coordinates.y };

        self.coordinates.x += self.speed.x;
        self.coordinates.y += self.speed.y;

        return lastCoordinates;
    }

    function collidesWith(otherPhysicalBody) {
        const self = this,
            x1 = self.coordinates.x + self.width / 2,
            y1 = self.coordinates.y + self.height / 2,
            x2 = otherPhysicalBody.coordinates.x + otherPhysicalBody.width / 2,
            y2 = otherPhysicalBody.coordinates.y + otherPhysicalBody.height / 2,
            distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

        return distance <= self.radius + otherPhysicalBody.radius;
    }

    function acclerate(axis, direction) {
        const self = this;

        let dir = 1;

        if (direction === 'up' || direction === 'left') {
            dir = -1;
        }

        self.speed[axis] = self.defaultAcceleration[axis] * dir;
        return self;
    }

    const physicalBody = {
        coordinates: options.coordinates,
        speed: options.speed || { x: 0, y: 0 },
        defaultAcceleration: options.defaultAcceleration,
        width: options.width,
        height: options.height,
        radius: (options.width + options.height) / 4,
        move: move,
        collidesWith: collidesWith,
        acclerate: acclerate
    };

    return physicalBody;
}