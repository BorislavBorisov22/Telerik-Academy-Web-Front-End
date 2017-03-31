function createBackground(options) {
    const backgroundCanvas = document.getElementById('background-canvas'),
        context = backgroundCanvas.getContext('2d'),
        backgroundImg = document.getElementById('background-sprite');

    const { height, width } = options;

    backgroundCanvas.height = height;
    backgroundCanvas.width = width;

    function render() {
        const self = this;

        context.drawImage(
            self.image,
            self.coordinates.x,
            0
        );

        context.drawImage(
            self.image,
            self.image.width - Math.abs(self.coordinates.x),
            0
        );

        return self;
    }

    function update() {
        const self = this;

        self.coordinates.x -= self.speedX;

        if (Math.abs(self.coordinates.x) > self.image.width) {
            self.coordinates.x = 0;
        }

        return self;
    }

    const background = {
        image: backgroundImg,
        speedX: options.speedX,
        coordinates: { x: 0, y: 0 },
        render: render,
        update: update
    };

    return background;
}