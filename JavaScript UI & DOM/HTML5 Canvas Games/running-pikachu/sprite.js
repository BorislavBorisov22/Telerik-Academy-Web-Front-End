function createSprite(options) {

    function render(drawCoords, clearCoords) {
        const self = this;

        this.context.clearRect(
            clearCoords.x,
            clearCoords.y,
            self.width,
            self.height
        );

        // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);                
        self.context.drawImage(
            self.spritesheet,
            self.frameIndex * self.width,
            0,
            self.width,
            self.height,
            drawCoords.x,
            drawCoords.y,
            self.width,
            self.height
        );

        return self;
    }

    function update() {

        const self = this;

        self.currentTicks += 1;

        if (self.currentTicks === self.ticksPerDrawing) {
            self.currentTicks = 0;

            self.frameIndex += 1;

            if (self.frameIndex === self.totalFrames) {
                self.frameIndex = 0;
            }
        }

        return self;
    }

    const sprite = {
        context: options.context,
        spritesheet: options.spritesheet,
        width: options.width,
        height: options.height,
        totalFrames: options.totalFrames,
        ticksPerDrawing: options.ticksPerDrawing,
        currentTicks: 0,
        frameIndex: 0,
        render: render,
        update: update
    };

    return sprite;
}