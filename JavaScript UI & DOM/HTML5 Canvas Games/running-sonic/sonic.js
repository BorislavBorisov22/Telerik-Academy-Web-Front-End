const sonicCanvas = document.getElementById('sonic-canvas'),
    sonicContext = sonicCanvas.getContext('2d'),
    sonicImg = document.getElementById('sonic-sprite');

sonicCanvas.style.border = '1px solid black';


function setSonicCanvasSize(width, height) {
    sonicCanvas.width = width;
    sonicCanvas.height = height;
}

function createSonic(width, height) {

    const sonicSprite = createSprite({
        context: sonicContext,
        spritesheet: sonicImg,
        width: sonicImg.width / 4,
        height: sonicImg.height,
        totalFrames: 4,
        ticksPerDrawing: 3,
    });

    const sonicBody = createPhysicalBody({
        coordinates: { x: 20, y: height - sonicSprite.height },
        speed: { x: 0, y: 0 },
        width: sonicSprite.width,
        height: sonicSprite.height
    });

    return {
        sprite: sonicSprite,
        body: sonicBody
    };

}