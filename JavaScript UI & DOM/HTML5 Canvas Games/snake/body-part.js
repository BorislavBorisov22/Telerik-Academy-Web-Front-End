function getBodyPart(options) {
    'use strict';

    function render() {
        const self = this;

        self.context.fillRect(
            self.coordinates.x,
            self.coordinates.y,
            self.width,
            self.height
        );

        self.context.strokeRect(
            self.coordinates.x,
            self.coordinates.y,
            self.width,
            self.height
        );

        return self;
    }

    function collidesWith(anotherPart) {
        const self = this;

        const xDiff = Math.abs(self.coordinates.x - anotherPart.coordinates.x),
            yDiff = Math.abs(self.coordinates.y - anotherPart.coordinates.y);

        return xDiff === 0 && yDiff === 0;
    }

    return {
        coordinates: options.coordinates,
        width: options.width,
        height: options.height,
        context: options.context,
        render: render,
        collidesWith: collidesWith
    };
}