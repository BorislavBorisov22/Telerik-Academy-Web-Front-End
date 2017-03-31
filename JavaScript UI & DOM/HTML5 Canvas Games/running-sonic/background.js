const backgroundCanvas = document.getElementById('background-canvas'),
    backgroundContext = backgroundCanvas.getContext('2d');

const backgroundImg = document.getElementById('background-sprite');

function setBackgroundCanvasSize(width, height) {
    backgroundCanvas.width = width;
    backgroundCanvas.height = height;
}


function createBackground(options) {

    function render(drawCoordinates) {
        const self = this;

        // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        backgroundContext.drawImage(
            backgroundImg,
            0,
            0,
            self.width,
            self.height,
            self.coordinates.x,
            self.coordinates.y,
            backgroundCanvas.width,
            backgroundCanvas.height
        );

        backgroundContext.drawImage(
            backgroundImg,
            0,
            0,
            self.width,
            self.height,
            self.coordinates.x + backgroundCanvas.width,
            self.coordinates.y,
            backgroundCanvas.width,
            backgroundCanvas.height
        );

        return self;
    }

    function update() {
        const self = this;

        self.coordinates.x += self.speedX;

        if (self.coordinates.x < -backgroundCanvas.width) {
            self.coordinates.x = 0;
        }

        return self;
    }

    const background = {
        width: options.width,
        height: options.height,
        speedX: options.speedX || 0,
        coordinates: { x: 0, y: 0 },
        render: render,
        update: update
    };

    return background;
}