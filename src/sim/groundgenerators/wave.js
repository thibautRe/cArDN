GroundGenerators.wave = function(lambda) {
    return function(currentRotation, step, anchorX, anchorY) {
        return Math.sin(step/lambda);
    };
};