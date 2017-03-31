function createFood(options) {

    function render() {
        const self = this;

        self.context.fillStyle = 'red';

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

        self.context.fillStyle = 'yellowgreen';

        return self;
    }

    return {
        coordinates: options.coordinates,
        width: options.width,
        height: options.height,
        context: options.context,
        render: render
    };
}

function isFoodEaten(snake, food, bodyPartWidth, bodyPartHeight) {
    const snakeHead = snake.bodyParts[0];

    const diffX = Math.abs(snakeHead.coordinates.x - food.coordinates.x),
        diffY = Math.abs(snakeHead.coordinates.y - food.coordinates.y);

    if (diffX < bodyPartWidth && diffY < bodyPartHeight) {
        return true;
    }

    return false;
}


function generateFoodCoordinates(snake, snakeCanvas, bodyPartWidth, bodyPartHeight) {
    const snakeXCoordinates = snake.bodyParts.map(x => x.coordinates.x),
        snakeYCoordinates = snake.bodyParts.map(y => y.coordinates.y);

    let x, y;
    while (true) {
        x = (Math.random() * (snakeCanvas.width - bodyPartWidth)) | 0;
        y = (Math.random() * (snakeCanvas.height - bodyPartHeight)) | 0;

        if (snakeXCoordinates.indexOf(x) < 0 || snakeYCoordinates.indexOf(x) < 0) {
            break;
        }
    }

    return { x: x, y: y };
}