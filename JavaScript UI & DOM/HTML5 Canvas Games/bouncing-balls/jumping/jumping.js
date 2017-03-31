'use strict';

const stage = new Kinetic.Stage({
    container: 'container',
    width: 800,
    height: 500
});

const layer = new Kinetic.Layer();

const player = new Kinetic.Rect({
    x: 0,
    y: 400,
    width: 30,
    height: 50,
    fill: 'blue',
    stroke: 'yellow'
});

const bgLayer = new Kinetic.Layer();

const grass = new Kinetic.Rect({
    x: 0,
    y: player.getY() + 10,
    height: stage.getHeight() - (player.getY() + 10),
    width: stage.getWidth(),
    fill: 'green',
});

const sunLayer = new Kinetic.Layer();

const sun = new Kinetic.Circle({
    x: stage.getWidth() + 30,
    y: 50,
    radius: 30,
    fill: 'yellow',
    stroke: 'black'
});

sunLayer.add(sun);
bgLayer.add(grass);

layer.add(player);
bgLayer.add(grass);

stage.add(bgLayer);
stage.add(layer);
stage.add(sunLayer);

(function() {
    // jumping logic
    const jumpingPlayers = [];

    window.addEventListener('keydown', function(ev) {
        if (ev.keyCode === 32) {
            if (jumpingPlayers.indexOf(player) >= 0) {
                return;
            } else {
                jumpingPlayers.push(player);
            }
            makePlayerJump(player);
        }
    });


    function makePlayerJump(player) {
        let updateY = -4,
            updateX = 5;

        const JUMP_HEIGHT = 100;

        const initialX = player.getX(),
            initialY = player.getY();

        performJump();

        function performJump() {
            const newY = player.getY() + updateY;

            if (initialY - newY > JUMP_HEIGHT) {
                updateY *= -1;
            }

            if (newY > initialY) {
                updateY *= -1;
            }

            if (player.getX() < 0 || player.getX() > stage.getWidth() - player.getWidth()) {
                updateX *= -1;
            }

            player.setY(newY);
            player.setX(player.getX() + updateX);

            moveSun();

            sunLayer.draw();
            layer.draw();


            window.requestAnimationFrame(performJump);
        }

        function moveSun() {
            sun.setX(sun.getX() - 2);

            if (sun.getX() < 0) {
                sun.setX(stage.getWidth());
            }
        }
    }
})();