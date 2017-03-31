'use strict';

const highScoreElement = document.getElementById('score-board');
let score = 0;

function updateScore() {
    score += 1;
    highScoreElement.innerHTML = `Highscore: ${score}`;
}

const levels = [
    { minLength: 5, ticks: 5 },
    { minLength: 10, ticks: 4 },
    { minLength: 20, ticks: 3 },
    { minLength: 35, ticks: 2 },
    { minLength: 50, ticks: 1 }
];

function updateGameSpeed(snakeLength) {

    if (snakeLength > levels[levels.length - 1].minLength) {
        return levels[levels.length - 1].ticks;
    }

    let newTicksPerDrawing;
    levels.forEach(level => {
        if (snakeLength >= level.minLength) {
            newTicksPerDrawing = level.ticks;
        }
    });

    return newTicksPerDrawing;
}