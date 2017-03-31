window.addEventListener('load', function() {
    'use strict';

    const snakeCanvas = document.getElementsByTagName('canvas')[0],
        snakeContext = snakeCanvas.getContext('2d');

    const bodyPartWidth = 15,
        bodyPartHeight = 15,
        initialSnakeLength = 5;

    const headCoordinates = { x: snakeCanvas.width / 2, y: snakeCanvas.height / 2 };

    snakeContext.lineWidth = 3;
    snakeContext.fillStyle = 'yellowgreen';

    const snakeInitialParts = getInitialSnakeParts(bodyPartWidth, bodyPartHeight, headCoordinates, snakeContext),
        snakeTicksPerDrawing = 5,
        speed = { x: bodyPartWidth, y: 0 };

    const snake = getSnake({
        bodyParts: snakeInitialParts,
        ticksPerDrawing: snakeTicksPerDrawing,
        canvasInfo: { width: snakeCanvas.width, height: snakeCanvas.height },
        speed: speed,
        context: snakeContext
    });

    const arrowKeyCodes = [37, 38, 39, 40];
    window.addEventListener('keyup', function(ev) {

        if (arrowKeyCodes.indexOf(ev.keyCode) < 0) {
            return;
        }

        const direction = getDirectionBySpeed(snake.speed);
        if (ev.keyCode === 37 && direction !== 'right') {
            snake.speed.x = -bodyPartWidth;
            snake.speed.y = 0;
        } else if (ev.keyCode === 38 && direction !== 'down') {
            snake.speed.x = 0;
            snake.speed.y = -bodyPartHeight;
        } else if (ev.keyCode === 39 && direction !== 'left') {
            snake.speed.y = 0;
            snake.speed.x = bodyPartWidth;
        } else if (ev.keyCode === 40 && direction !== 'up') {
            snake.speed.x = 0;
            snake.speed.y = bodyPartHeight;
        }
    });

    const food = createFood({
        coordinates: { x: 100, y: 100 },
        width: bodyPartWidth,
        height: bodyPartHeight,
        context: snakeContext
    });

    function gameLoop() {

        snake.update();

        //updateIfSnakeIsOutsideTheField(snake, snakeCanvas);

        if (IsGameOver(snake, snakeCanvas) || isSnakeIsOutsideTheField(snake, snakeCanvas)) {
            snakeContext.font = '90px Arial';
            snakeContext.fillText('GAME OVER', snakeCanvas.width / 5, snakeCanvas.height / 2);

            return;
        }

        if (isFoodEaten(snake, food, bodyPartWidth, bodyPartHeight)) {

            snake.appendBodyPart();

            updateScore();

            updateGameSpeed(snake);

            food.coordinates = generateFoodCoordinates(snake, snakeCanvas, bodyPartWidth, bodyPartHeight);

            snake.ticksPerDrawing = updateGameSpeed(snake.bodyParts.length);

            if (snake.ticksPerDrawing < 3) {
                snake.appendBodyPart().appendBodyPart();
            }
        }

        food.render();

        requestAnimationFrame(gameLoop);
    }

    gameLoop();

    function getDirectionBySpeed(speed) {
        if (speed.x > 0) {
            return "right";
        } else if (speed.x < 0) {
            return "left";
        } else if (speed.y > 0) {
            return "down";
        } else if (speed.y < 0) {
            return "up";
        }

        throw Error("snake speed must be always different than zero");
    }

    function IsGameOver(snake) {
        const snakeHead = snake.bodyParts[0];

        for (let i = 1, len = snake.bodyParts.length; i < len; i += 1) {
            const current = snake.bodyParts[i];

            if (snakeHead.collidesWith(current)) {
                return true;
            }
        }

        return false;
    }
});