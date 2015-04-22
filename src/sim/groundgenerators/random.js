// Random generator
GroundGenerators.random = function(rotationAmplitude) {
    return function(currentRotation, step) {
        return currentRotation + (2*Math.random() - 1)*rotationAmplitude;
    };
};