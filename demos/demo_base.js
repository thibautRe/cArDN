function createWorld() {
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-1000, -1000);
    worldAABB.maxVertex.Set(1000, 1000);
    var gravity = new b2Vec2(0,200);
    var doSleep = true;
    var world = new b2World(worldAABB, gravity, doSleep);
    createRandomGround(world, 20);
    return world;
}

function createRandomGround(world, size) {
    var groundHeight = 5, groundWidth = 30;
    var groundStartHeight = 500;
    var rotationAmplitude = Math.PI/10;
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(500, groundHeight/2);
    groundSd.restitution = 0.1;
    var groundBd = new b2BodyDef();
    groundBd.AddShape(groundSd);
    groundBd.position.Set(0, groundStartHeight);
    world.CreateBody(groundBd)

    var nextJointX = 500, nextJointY = groundStartHeight;
    var currentX, currentY;
    var currentRotation = 0;
    groundSd.extents.Set(groundWidth/2, groundHeight/2);

    for (var i = 0; i < size; i++) {
        groundBd = new b2BodyDef();
        groundBd.AddShape(groundSd);
        currentRotation += (2*Math.random() - 1)*rotationAmplitude;
        currentX = nextJointX + groundWidth/2*Math.cos(currentRotation);
        currentY = nextJointY + groundWidth/2*Math.sin(currentRotation);
        groundBd.position.Set(currentX, currentY);
        groundBd.rotation = currentRotation;

        nextJointX += groundWidth*Math.cos(currentRotation);
        nextJointY += groundWidth*Math.sin(currentRotation);
        world.CreateBody(groundBd);

    }
}

function createBall(world, x, y) {
    var ballSd = new b2CircleDef();
    ballSd.density = 1.0;
    ballSd.radius = 20;
    ballSd.restitution = 0.1;
    ballSd.friction = 1;
    var ballBd = new b2BodyDef();
    ballBd.AddShape(ballSd);
    ballBd.position.Set(x,y);
    return world.CreateBody(ballBd);
}

function createBox(world, x, y, width, height, fixed) {
    if (typeof(fixed) == 'undefined') fixed = true;
    var boxSd = new b2BoxDef();
    if (!fixed) boxSd.density = 2;
    boxSd.extents.Set(width, height);
    boxSd.friction = 2;
    boxSd.restitution = 0.1;
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y);
    return world.CreateBody(boxBd)
}

var demos = {};
demos.InitWorlds = [];
