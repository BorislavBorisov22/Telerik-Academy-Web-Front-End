window.addEventListener('load', function() {
    'use strict';

    function isJumping(physicalBody, minHeight) {
        return physicalBody.coordinates.y < minHeight - physicalBody.height;
    }

    function drawDeadSonic() {
        const deadSonicImg = document.getElementById('dead-sonic');

        // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        sonic.sprite.context.drawImage(
            deadSonicImg,
            0,
            0,
            deadSonicImg.width,
            deadSonicImg.height,
            0,
            0,
            sonicCanvas.width,
            sonicCanvas.height
        );
    }

    const WIDTH = 1024,
        HEIGHT = WIDTH / 2;

    setFireballCanvasSize(WIDTH, HEIGHT);
    setSonicCanvasSize(WIDTH, HEIGHT);
    setBackgroundCanvasSize(WIDTH, HEIGHT);

    const sonic = createSonic(WIDTH, HEIGHT);

    const deltaSpeed = { x: 5, y: 20 };

    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 37:
                sonic.body.speed.x = -deltaSpeed.x;
                break;
            case 38:
                if (isJumping(sonic.body, HEIGHT)) {
                    return;
                }

                sonic.body.speed.y = -deltaSpeed.y;
                break;
            case 39:
                sonic.body.speed.x = deltaSpeed.x;
                break;
            case 40:
                sonic.body.speed.y = deltaSpeed.y;
                break;
            default:
                break;
        }
    });

    window.addEventListener('keyup', function(event) {
        if (event.keyCode === 37 || event.keyCode === 39) {
            sonic.body.speed.x = 0;
        }
    });

    const sonicGravityApplier = createGravityApplier(sonic.body, HEIGHT);

    const fireballs = [];
    const spawnOffset = 200;

    function spawnFireball() {
        if (fireballs.length > 0) {
            const lastFireball = fireballs[fireballs.length - 1];

            if (lastFireball.body.coordinates.x >= WIDTH - spawnOffset) {
                console.log('ebanie brat');
                return;
            }
        }

        fireballs.push(createFireball(WIDTH, HEIGHT));
    }

    const background = createBackground({
        width: backgroundImg.width,
        height: backgroundImg.height,
        speedX: -5,
    });

    function gameLoop() {

        // sonic updates and logic
        const lastSonicCoordinates = sonic.body.move();
        sonic.sprite.render(sonic.body.coordinates, lastSonicCoordinates)
            .update();

        sonicGravityApplier.applyGravityVertical(2);

        // fireballs updates and logic
        for (let i = 0; i < fireballs.length; i += 1) {
            const fireball = fireballs[i];

            if (fireball.body.coordinates.x < -fireball.body.width) {

                fireballs.splice(i, 1);
                i += 1;
                continue;
            }

            const lastFireballCoordinates = fireball.body.move();
            fireball.sprite.render(fireball.body.coordinates, lastFireballCoordinates)
                .update();

            if (sonic.body.collidesWith(fireball.body)) {

                drawDeadSonic();
                return;
            }
        }

        // spawning fireballs
        if (Math.random() < 0.01) {
            spawnFireball();
        }

        background.render().update();

        // const lastFireballCoordinates = fireballBody.move();
        // fireballSprite.render(fireballBody.coordinates, lastFireballCoordinates)
        //     .update();

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
});