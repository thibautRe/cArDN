// Random generator
GroundGenerators.random = function(rotationAmplitude) {
    return function(currentRotation, step, anchorX, anchorY) {
        return currentRotation + (2*Math.random() - 1)*rotationAmplitude;
    };
};