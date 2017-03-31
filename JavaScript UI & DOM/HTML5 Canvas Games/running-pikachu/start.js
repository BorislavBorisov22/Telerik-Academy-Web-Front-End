window.addEventListener('load', function() {
    'use strict';

    // TODO: extract ground level logic
    function applyGravityVertical(physicalBody, gravity) {

        if (physicalBody.coordinates.y === HEIGHT - physicalBody.height) {
            return;
        }

        if (physicalBody.coordinates.y > (HEIGHT - physicalBody.height)) {
            physicalBody.speed.y = 0;
            physicalBody.coordinates.y = HEIGHT - physicalBody.height;
            return;
        }

        physicalBody.speed.y += gravity;
    }

    function showScore(scoreElement, score) {
        scoreElement.innerHTML = `Highscore: ${score}`;
    }

    const WIDTH = 512,
        HEIGHT = WIDTH / 2;

    const playerCanvas = document.getElementById('player-canvas');
    const playerContext = playerCanvas.getContext('2d');

    playerCanvas.style.border = '1px solid black';
    playerCanvas.width = WIDTH;
    playerCanvas.height = HEIGHT;

    const pikachuImg = document.getElementById('pikachu-sprite');

    // 4 pikachus in total :)
    const pikachuSprite = createSprite({
        context: playerContext,
        spritesheet: pikachuImg,
        width: pikachuImg.width / 4,
        height: pikachuImg.height,
        totalFrames: 4,
        ticksPerDrawing: 5,
    });

    const pikachuBody = createPhysicalBody({
        coordinates: { x: 10, y: HEIGHT - pikachuSprite.height },
        defaultAcceleration: { x: 3, y: 25 },
        width: pikachuSprite.width,
        height: pikachuSprite.height
    });

    const speed = 3;

    window.addEventListener('keydown', function(event) {

        switch (event.keyCode) {
            case 37:
                pikachuBody.acclerate('x', 'left');
                break;
            case 38:
                // jumping
                if (pikachuBody.coordinates.y < HEIGHT - pikachuBody.height) {
                    return;
                }
                pikachuBody.acclerate('y', 'up');
                break;
            case 39:
                pikachuBody.acclerate('x', 'right');
                break;
            default:
                break;
        }
    });

    window.addEventListener('keyup', function(event) {


        if (event.keyCode === 37 || event.keyCode === 39) {
            pikachuBody.speed.x = 0;
        }
    });

    const pokeballImg = document.getElementById('pokeball-sprite'),
        pokeballCanvas = document.getElementById('pokeball-canvas'),
        pokeballContext = pokeballCanvas.getContext('2d');

    pokeballCanvas.width = WIDTH;
    pokeballCanvas.height = HEIGHT;

    // 18 balls in total :)
    function createPokeball(offsetX) {
        const pokeballSprite = createSprite({
            context: pokeballContext,
            spritesheet: pokeballImg,
            width: pokeballImg.width / 18,
            height: pokeballImg.height,
            totalFrames: 18,
            ticksPerDrawing: 5
        });

        const pokeballBody = createPhysicalBody({
            coordinates: { x: offsetX, y: HEIGHT - pokeballSprite.height },
            speed: { x: -5, y: 0 },
            width: pokeballSprite.width,
            height: pokeballSprite.height
        });

        return {
            sprite: pokeballSprite,
            body: pokeballBody
        };
    }

    const pokeballs = [];

    function spawnPokeball() {
        const spawnChance = 0.01,
            spawnOffestX = 300;

        if (Math.random() < spawnChance) {

            if (pokeballs.length > 0) {
                const lastPokeball = pokeballs[pokeballs.length - 1];
                const starting = Math.max(lastPokeball.body.coordinates.x + lastPokeball.body.width + spawnOffestX, WIDTH);

                const newPokeball = createPokeball(starting);
                pokeballs.push(newPokeball);
            } else {
                pokeballs.push(createPokeball(WIDTH));
            }

        }
    }

    const jumpingPikachuImg = document.getElementById('jumping-sprite');

    const jumpingPikachuSprite = createSprite({
        context: playerContext,
        spritesheet: jumpingPikachuImg,
        width: jumpingPikachuImg.width / 2,
        height: jumpingPikachuImg.height,
        totalFrames: 1,
        ticksPerDrawing: 5,
    });

    // setting up highscore field
    const highscore = document.getElementById('highscore');
    let score = 0;

    showScore(highscore, score);

    // setting backgound
    const background = createBackground({ width: WIDTH, height: HEIGHT, speedX: 5 });

    // pokemon theme song
    const pokemonSong = document.getElementById('pokemon-song');
    pokemonSong.play();
    setInterval(pokemonSong.play, 400000);

    function gameLoop() {

        applyGravityVertical(pikachuBody, 2);
        const laskPikachuCoordinates = pikachuBody.move();

        if (pikachuBody.coordinates.y < playerCanvas.height - pikachuBody.height) {
            jumpingPikachuSprite.render(pikachuBody.coordinates, laskPikachuCoordinates)
                .update();
        } else {
            pikachuSprite.render(pikachuBody.coordinates, laskPikachuCoordinates)
                .update();
        }

        // update, draw, move all pokeballs
        for (let i = 0; i < pokeballs.length; i += 1) {
            const pokeball = pokeballs[i];

            // if uout of game field remove pokeball
            if (pokeball.body.coordinates.x < -pokeball.body.width) {
                pokeballs.splice(i, 1);
                i -= 1;
                score += 1;

                continue;
            }

            const lastPokeballCoordinates = pokeball.body.move();
            pokeball.sprite.render(pokeball.body.coordinates, lastPokeballCoordinates)
                .update();

            // endgame logic
            if (pikachuBody.collidesWith(pokeball.body)) {
                const deadPikachu = document.getElementById('dead-player');

                playerContext.drawImage(
                    deadPikachu,
                    0,
                    0
                );

                pokemonSong.src = './audio/GAME OVER Voice Sound Effect.mp3';
                pokemonSong.play();

                return;
            }
        }

        spawnPokeball();
        showScore(highscore, score);

        background.render()
            .update();

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
});