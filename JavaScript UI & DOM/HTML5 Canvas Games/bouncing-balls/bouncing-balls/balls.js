'use strict';

const stage = new Kinetic.Stage({
    container: 'kinetic-container',
    width: 600,
    height: 400
});

const layer = new Kinetic.Layer();

stage.add(layer);

const balls = [],
    generalRadius = 20,
    count = 5;

for (let i = 0; i < count; i += 1) {
    const currentBall = new Kinetic.Circle({
        x: Math.random() * (stage.getWidth() - generalRadius * 2) + generalRadius,
        y: Math.random() * (stage.getHeight() - generalRadius * 2) + generalRadius,
        radius: generalRadius,
        fill: 'pink',
        stroke: 'blue'
    });

    layer.add(currentBall);
}

const deltaX = 2,
    deltaY = 5;

const deltaxs = Array.from({ length: 15 }).map(x => {
        return Math.random() * deltaX + 10;
    }),
    deltays = Array.from({ length: 15 }).map(y => {
        return Math.random() * deltaY + 10;
    });

function animFrame() {
    const balls = layer.find('Circle');

    balls.forEach(function(ball, index) {
        let updateX = deltaxs[index];
        let updateY = deltays[index];

        const r = ball.getRadius();

        const x = ball.getX(),
            y = ball.getY();

        if (x < 0 + r || x > stage.getWidth() - r) {
            updateX *= -1;
        }

        if (y < 0 + r || y > stage.getHeight() - r) {
            updateY *= -1;
        }

        balls.forEach(function(ball) {
            if (balls.some(function(otherBall) {
                    if (ball === otherBall) {
                        return false;
                    }

                    return areColliding(ball, otherBall);
                })) {
                updateX *= -1;
                updateY *= -1;
            }
        });

        ball.setX(x + updateX);
        ball.setY(y + updateY);

        deltaxs[index] = updateX;
        deltays[index] = updateY;

    });

    layer.draw();

    requestAnimationFrame(animFrame);
}

animFrame();

function areColliding(firstBall, secondBall) {
    const diffX = Math.abs(firstBall.getX() - secondBall.getX());
    const diffY = Math.abs(firstBall.getY() - secondBall.getY());

    const distance = Math.sqrt(diffX * diffX + diffY * diffY);

    const radiusesSum = firstBall.getRadius() + secondBall.getRadius();

    if (distance <= radiusesSum) {
        return true;
    }

    return false;
}