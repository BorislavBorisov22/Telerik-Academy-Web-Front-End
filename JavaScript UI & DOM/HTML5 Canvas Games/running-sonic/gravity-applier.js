function createGravityApplier(physicalBody, minHeight) {
    'use strict';

    function applyGravityVertical(gravity) {
        const self = this;

        if (physicalBody.coordinates.y === self.minHeight - physicalBody.height) {
            return;
        }

        if (physicalBody.coordinates.y > self.minHeight - physicalBody.height) {
            physicalBody.speed.y = 0;
            physicalBody.coordinates.y = self.minHeight - physicalBody.height;
        }

        physicalBody.speed.y += gravity;
    }

    const gravityApplier = {
        minHeight: minHeight,
        applyGravityVertical: applyGravityVertical
    };

    return gravityApplier;
}