'use strict';

const canvas = document.getElementsByTagName('canvas')[0],
    context = canvas.getContext('2d');

const secondCanvas = document.getElementsByTagName('canvas')[1],
    secondContext = secondCanvas.getContext('2d');

secondContext.fillStyle = 'blue';

const secondBall = {
    x: 200,
    y: 120,
    radius: 40,
    speedX: 0,
    speedY: 0
};

context.fillStyle = 'palegreen';

const ball = {
    x: 60,
    y: 60,
    radius: 40,
    speedX: 0,
    speedY: 0
};

const deltaSpeed = 10;
window.addEventListener('keyup', function(ev) {

    if (ev.keyCode === 37) {
        ball.speedX = -deltaSpeed;
        secondBall.speedX = -deltaSpeed;
    } else if (ev.keyCode === 38) {
        ball.speedY = -deltaSpeed;
        secondBall.speedY = -deltaSpeed;
    } else if (ev.keyCode === 39) {
        ball.speedX = deltaSpeed;
        secondBall.speedX = deltaSpeed;
    } else if (ev.keyCode === 40) {
        secondBall.speedY = deltaSpeed;
        ball.speedY = deltaSpeed;
    }
});

function animationFrame() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    secondContext.clearRect(0, 0, secondCanvas.width, secondCanvas.height);

    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.stroke();
    context.fill();

    secondContext.beginPath();
    secondContext.arc(secondBall.x, secondBall.y, secondBall.radius, 0, Math.PI * 2);
    secondContext.stroke();
    secondContext.fill();

    if (ball.x <= ball.radius || ball.x >= canvas.width - ball.radius) {
        ball.speedX *= -1;
    }

    if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
        ball.speedY *= -1;
    }

    if (secondBall.x <= secondBall.radius || secondBall.x >= canvas.width - secondBall.radius) {
        secondBall.speedX *= -1;
    }

    if (secondBall.y <= secondBall.radius || secondBall.y >= canvas.height - secondBall.radius) {
        secondBall.speedY *= -1;
    }

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    secondBall.x += secondBall.speedX;
    secondBall.y += secondBall.speedY;

    window.requestAnimationFrame(animationFrame);
}

animationFrame();