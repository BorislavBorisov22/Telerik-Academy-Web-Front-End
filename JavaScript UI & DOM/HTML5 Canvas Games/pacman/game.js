'use strict';

const maze = [
    "**** ***********************",
    "**** ***************** *****",
    "**** ***************** *****",
    "      **   ***********      ",
    "**** *** ************* *****",
    "****                   *****",
    "****** ** ******************",
    "****** ** ******************",
    "******    ******************",
    "****************************",
];

const ballChar = " ",
    wallChar = "*";

function createGame(pacmanSelector, mazeSelector) {
    const pacmanCanvas = document.querySelector(pacmanSelector),
        ctxPacman = pacmanCanvas.getContext("2d"),
        mazeCanvas = document.querySelector(mazeSelector),
        ctxMaze = mazeCanvas.getContext('2d');

    let isMouthOpen = true;
    let x = 100;

    const pacman = {
        x: 0,
        y: 90,
        size: 30,
        speed: 3,
    };

    let balls = [],
        walls = [];

    /*
     0 -> right
     1 -> down
     2 -> left
     3 -> up
    */

    let dir = 0;

    const keyCodeToDir = {
        "37": 2,
        "38": 3,
        "39": 0,
        "40": 1
    };

    const dirDeltas = [{
        x: pacman.speed,
        y: 0
    }, {
        x: 0,
        y: pacman.speed,
    }, {
        x: -pacman.speed,
        y: 0
    }, {
        x: 0,
        y: -pacman.speed
    }];

    const rows = maze.length * pacman.size,
        cols = maze[0].length * pacman.size;

    mazeCanvas.width = cols;
    mazeCanvas.height = rows;

    pacmanCanvas.width = cols;
    pacmanCanvas.height = rows;

    let steps = 0,
        stepsToChangeMouth = 7;

    const offSet = 10,
        deltaPacmanSize = 1;

    function gameLoop() {

        let isGettingIntoAWall = false;
        walls.forEach(function(wall) {

            const futurePosition = {
                x: dirDeltas[dir].x + pacman.x,
                y: dirDeltas[dir].y + pacman.y,
                size: pacman.size
            };

            pacman.size -= deltaPacmanSize;
            if (areColliding(pacman, wall)) {
                isGettingIntoAWall = true;
            }
            pacman.size += deltaPacmanSize;
        });

        let lastCoordinates;
        if (isGettingIntoAWall) {
            lastCoordinates = { x: pacman.x, y: pacman.y }
        } else {
            lastCoordinates = updatePacmanPosition();
        }

        ctxPacman.clearRect(lastCoordinates.x - offSet, lastCoordinates.y - offSet, pacman.size + offSet * 2, pacman.size + offSet * 2);

        drawPacman();

        steps += 1;

        if (steps > stepsToChangeMouth) {
            isMouthOpen = !isMouthOpen;
            steps = 0;
        }

        // drawBall(ball, ctxMaze);

        balls.forEach((ball, index) => {
            if (areColliding(pacman, ball)) {

                const ballsOffset = 0;
                ctxMaze.clearRect(ball.x - ballsOffset, ball.y - ballsOffset, ball.size + ballsOffset * 2, ball.size + ballsOffset * 2);

                balls.splice(index, 1);
            }
        });

        window.requestAnimationFrame(gameLoop);
    }

    function isBetween(value, min, max) {
        return min < value && value < max;
    }

    function areColliding(firstObj, secondObj) {
        const sizes1 = positionToBounds(firstObj),
            sizes2 = positionToBounds(secondObj);

        return (isBetween(sizes2.left, sizes1.left, sizes1.right) || isBetween(sizes2.right, sizes1.left, sizes1.right)) &&
            (isBetween(sizes2.top, sizes1.top, sizes1.bottom) || isBetween(sizes2.bottom, sizes1.top, sizes1.bottom));

    }

    function positionToBounds(object) {
        const sizes = {
            top: object.y,
            left: object.x,
            bottom: object.y + object.size,
            right: object.x + object.size
        };

        return sizes;
    }

    function drawBall(ball, ctx) {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        const x = ball.x + ball.size / 2,
            y = ball.y + ball.size / 2,
            r = ball.size / 2;
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
    }

    function drawPacman(ball) {

        ctxPacman.fillStyle = "yellow";
        const deltaRadians = dir * Math.PI / 2;

        ctxPacman.beginPath();
        if (isMouthOpen) {
            const x = pacman.x + pacman.size / 2,
                y = pacman.y + pacman.size / 2,
                r = pacman.size / 2;

            ctxPacman.arc(x, y, r, Math.PI / 4 + deltaRadians, 7 * Math.PI / 4 + deltaRadians);
            ctxPacman.lineTo(x, y);
            ctxPacman.closePath();

        } else {
            drawBall(pacman, ctxPacman);
        }

        ctxPacman.fill();
    }

    function updatePacmanPosition() {
        const lastCoordinates = { x: pacman.x, y: pacman.y };

        pacman.x += dirDeltas[dir].x;
        pacman.y += dirDeltas[dir].y;

        if (pacman.x >= pacmanCanvas.width) {
            pacman.x = 0;
        } else if (pacman.x <= 0) {
            pacman.x = pacmanCanvas.width;
        }

        if (pacman.y >= pacmanCanvas.height) {
            pacman.y = 0;
        } else if (pacman.y <= 0) {
            pacman.y = pacmanCanvas.height;
        }

        return lastCoordinates;
    }

    window.addEventListener('keydown', function(event) {
        if (!keyCodeToDir.hasOwnProperty(event.keyCode)) {
            return;
        }

        dir = keyCodeToDir[event.keyCode];
    });

    function drawMazeAndGetBallsAndWalls(ctx, maze) {
        const cellSize = pacman.size,
            ballSize = 15,
            balls = [],
            walls = [];

        const wallImage = document.getElementById('wall');


        for (let row = 0; row < maze.length; row += 1) {
            for (let col = 0; col < maze[row].length; col += 1) {
                const currentCell = maze[row][col];

                if (currentCell === ballChar) {
                    const obj = {
                        x: col * cellSize + ballSize / 2,
                        y: row * pacman.size + ballSize / 2,
                        size: ballSize / 2
                    };

                    balls.push(obj);

                    drawBall(obj, ctx);
                } else if (currentCell === wallChar) {
                    const obj = {
                        x: col * cellSize,
                        y: row * cellSize,
                        size: cellSize
                    };

                    ctx.drawImage(wallImage, obj.x, obj.y);

                    walls.push(obj);
                }
            }
        }

        return {
            balls: balls,
            walls: walls
        };
    }
    return {
        start: function() {
            const result = drawMazeAndGetBallsAndWalls(ctxMaze, maze);
            balls = result.balls;
            walls = result.walls;
            gameLoop();
        }
    };
}