GroundGenerators.wave = function(lambda, maxRotation) {
    if (lambda === undefined) lambda = 200;
    if (maxRotation === undefined) maxRotation = Math.PI/5;
    return function(currentRotation, step, anchorX, anchorY) {
        var nextRotation = Math.cos(anchorX/lambda);
        return Math.min(Math.max(nextRotation, -maxRotation), maxRotation);
    };
};