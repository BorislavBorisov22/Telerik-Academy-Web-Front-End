'use strict';

function getSnake(options) {

    function render() {
        const self = this;

        self.context.clearRect(0, 0, self.canvasInfo.width, self.canvasInfo.height);

        self.bodyParts.forEach(bp => {
            bp.render();
        });

        return self;
    }

    function update() {
        const self = this;

        self.currentTicksCount += 1;

        if (self.currentTicksCount >= self.ticksPerDrawing) {
            changeSnakePosition(self);
            self.render();
            self.currentTicksCount = 0;
        }

        return self;
    }

    function appendBodyPart() {
        const self = this,
            lastPart = self.bodyParts[self.bodyParts.length - 1];

        const newBodyPart = getBodyPart({
            coordinates: { x: lastPart.coordinates.x, y: lastPart.coordinates.y },
            width: lastPart.width,
            height: lastPart.height,
            context: lastPart.context
        });

        self.bodyParts.push(newBodyPart);

        return self;
    }


    return {
        bodyParts: options.bodyParts,
        ticksPerDrawing: options.ticksPerDrawing,
        currentTicksCount: 0,
        canvasInfo: options.canvasInfo,
        speed: options.speed,
        context: options.context,
        update: update,
        render: render,
        head: options.bodyParts[0],
        appendBodyPart: appendBodyPart
    };
}

function changeSnakePosition(snake) {

    for (let i = snake.bodyParts.length - 1; i > 0; i -= 1) {
        const currentPart = snake.bodyParts[i],
            nextPart = snake.bodyParts[i - 1];

        currentPart.coordinates = { x: nextPart.coordinates.x, y: nextPart.coordinates.y };
    }

    snake.bodyParts[0].coordinates.x += snake.speed.x;
    snake.bodyParts[0].coordinates.y += snake.speed.y;
}

function getInitialSnakeParts(bodyPartWidth, bodyPartHeight, headCoordinates, context) {

    const snakeParts = [],
        initialLength = 5;

    const snakeHead = getBodyPart({
        coordinates: { x: headCoordinates.x, y: headCoordinates.y },
        width: bodyPartWidth,
        height: bodyPartHeight,
        context
    });

    snakeParts.push(snakeHead);

    for (let i = 1; i < initialLength; i += 1) {
        const prevPart = snakeParts[i - 1];

        const currentPart = getBodyPart({
            coordinates: { x: prevPart.coordinates.x - bodyPartWidth, y: prevPart.coordinates.y },
            width: bodyPartWidth,
            height: bodyPartHeight,
            context: context
        });

        snakeParts.push(currentPart);
    }

    return snakeParts;
}

function isSnakeIsOutsideTheField(snake, snakeCanvas) {
    if (snake.head.coordinates.x <= 0 || snake.head.coordinates.x >= snakeCanvas.width) {
        return true;
    }

    if (snake.head.coordinates.y <= 0 || snake.head.coordinates.y >= snakeCanvas.height) {
        return true;
    }

    return false;

    // if (snake.head.coordinates.x > snakeCanvas.width) {
    //     // snake.head.coordinates.x = 0;
    // } else if (snake.head.coordinates.x < 0) {
    //     // snake.head.coordinates.x = snakeCanvas.width;
    // }

    // if (snake.head.coordinates.y < 0) {
    //    //  snake.head.coordinates.y = snakeCanvas.height;
    // } else if (snake.head.coordinates.y > snakeCanvas.height) {
    //     // snake.head.coordinates.y = 0;
    // }
}