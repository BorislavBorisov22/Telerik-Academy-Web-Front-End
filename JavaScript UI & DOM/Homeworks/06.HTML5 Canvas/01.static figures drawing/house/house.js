'use strict';

const canvas = document.getElementsByTagName('canvas')[0],
    context = canvas.getContext('2d');

canvas.style.border = '1px solid black';
context.fillStyle = 'rgb(151, 91, 91)';
context.lineWidth = 3;

const houseSize = { width: 250, height: 200 };

// drawing the body of the house
context.beginPath();
context.rect(100, canvas.height - houseSize.height, houseSize.width, houseSize.height);
context.lineTo(100 + houseSize.width / 2, canvas.height - houseSize.height - 130);
context.lineTo(100 + houseSize.width, canvas.height - houseSize.height);
context.fill();
context.stroke();

// drawing the chimney of the house
context.beginPath();
context.moveTo(100 + houseSize.width - 28, canvas.height - houseSize.height - 10);
context.lineTo(100 + houseSize.width - 28, canvas.height - houseSize.height - 60);
context.stroke();

context.lineTo(100 + houseSize.width - 52, canvas.height - houseSize.height - 60);
context.lineTo(100 + houseSize.width - 52, canvas.height - houseSize.height - 10);

context.fill();
context.stroke();

context.beginPath();
context.ellipse(
    100 + houseSize.width - 40,
    canvas.height - houseSize.height - 60,
    12, 6, 0, 0, Math.PI * 2
);
context.fill();
context.stroke();

// drawing the door of the house
const curveControlPoint = { x: 160, y: canvas.height - 100 },
    doorStartCoordinates = { x: 130, y: canvas.height },
    doorEndCoordinates = { x: 190, y: canvas.height - 70 };

// countours of the door
context.beginPath();
context.moveTo(doorStartCoordinates.x, doorStartCoordinates.y);
context.lineTo(doorStartCoordinates.x, doorStartCoordinates.y - 70);
context.quadraticCurveTo(curveControlPoint.x, curveControlPoint.y, doorEndCoordinates.x, doorEndCoordinates.y);
context.lineTo(doorEndCoordinates.x, canvas.height);
context.stroke();

// middle vertical line of the door
const verticalLineCooridanates = { x: curveControlPoint.x, y: curveControlPoint.y + 15 };

context.beginPath();
context.moveTo(verticalLineCooridanates.x, verticalLineCooridanates.y);
context.lineTo(curveControlPoint.x, canvas.height);
context.stroke();

// drawing the locks of the door
const leftLockCoordinates = { x: 150, y: canvas.height - 30 },
    rightLockCoordinates = { x: 170, y: canvas.height - 30 };

context.beginPath();
context.arc(leftLockCoordinates.x, leftLockCoordinates.y, 4, 0, 2 * Math.PI);
context.stroke();

context.beginPath();
context.arc(rightLockCoordinates.x, rightLockCoordinates.y, 4, 0, 2 * Math.PI);
context.stroke();

// drawing the windows of the house
drawWindows({ x: 120, y: canvas.height - houseSize.height + 30 }, 40, 30);
drawWindows({ x: 230, y: canvas.height - houseSize.height + 30 }, 40, 30);
drawWindows({ x: 230, y: canvas.height - 90 }, 40, 30);

function drawWindows(upLeftRectCoordinates, width, height) {

    context.lineWidth = 1;
    context.fillStyle = 'black';
    const offSetWindows = 2;

    // up left window
    context.beginPath();
    context.rect(upLeftRectCoordinates.x, upLeftRectCoordinates.y, width, height);
    context.fill();

    // up right window
    context.beginPath();
    context.rect(upLeftRectCoordinates.x + width + offSetWindows, upLeftRectCoordinates.y, width, height);
    context.fill();

    // down left window
    context.beginPath();
    context.rect(upLeftRectCoordinates.x, upLeftRectCoordinates.y + height + offSetWindows, width, height);
    context.fill();

    // down right window
    context.beginPath();
    context.rect(upLeftRectCoordinates.x + width + offSetWindows, upLeftRectCoordinates.y + height + offSetWindows, width, height);
    context.fill();
}