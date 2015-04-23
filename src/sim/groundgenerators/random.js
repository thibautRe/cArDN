// Random generator
GroundGenerators.random = function(rotationAmplitude, maxRotation) {
    if (rotationAmplitude === undefined) rotationAmplitude = Math.PI/6;
    if (maxRotation === undefined) maxRotation = Math.PI/4;
    return function(currentRotation, step, anchorX, anchorY) {
        var nextRotation = currentRotation + (2*Math.random() - 1)*rotationAmplitude;
        return Math.min(Math.max(nextRotation, -maxRotation), maxRotation);
    };
};