 const fireballCanvas = document.getElementById('fireball-canvas'),
     fireballContext = fireballCanvas.getContext('2d');

 fireballCanvas.style.border = '1px solid black';

 function setFireballCanvasSize(width, height) {
     fireballCanvas.width = width;
     fireballCanvas.height = height;
 }

 function createFireball(width, height) {

     const fireballImg = document.getElementById('fireball-sprite');

     const fireballSprite = createSprite({
         context: fireballContext,
         spritesheet: fireballImg,
         width: fireballImg.width / 8,
         height: fireballImg.height,
         totalFrames: 8,
         ticksPerDrawing: 4
     });

     const fireballDeltaY = (Math.random() * 25) | 0;

     const fireballBody = createPhysicalBody({
         coordinates: { x: width, y: height - fireballSprite.height - fireballDeltaY },
         speed: { x: -3, y: 0 },
         width: fireballSprite.width,
         height: fireballSprite.height
     });

     return {
         sprite: fireballSprite,
         body: fireballBody
     };
 }