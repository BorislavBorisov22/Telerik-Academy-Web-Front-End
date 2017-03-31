function createSprite(options) {
    'use strict';

    function render(drawCoords, clearCoords) {
        const self = this;

        const offset = 20;

        self.context.clearRect(
            clearCoords.x - offset,
            clearCoords.y - offset,
            self.width + offset * 2,
            self.height + offset * 2
        );

        /*
        void ctx.drawImage(image, dx, dy);
        void ctx.drawImage(image, dx, dy, dWidth, dHeight);
        void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        */

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
        spritesheet: options.spritesheet,
        context: options.context,
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