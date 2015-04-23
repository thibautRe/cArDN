GroundGenerators.upupup = function(lambda) {
    if (lambda === undefined) lambda = 100;
    return function(currentRotation, step, anchorX, anchorY) {
        return -step/lambda;
    };
};