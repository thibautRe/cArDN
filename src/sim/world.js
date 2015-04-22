var World = function() {
    // Set physics bounding box
    var AABB = new b2AABB();
    AABB.minVertex.Set(0, -10000);
    AABB.maxVertex.Set(10000, 10000);

    var gravity = new b2Vec2(0,300);
    this.b2World = new b2World(AABB, gravity, true);

    // DEFAULT VALUES
    this.groundGenerator = GroundGenerators.random(Math.PI/10);
    this.groundTileSize = 60;
    this.groundTileHeight = 5;
};

World.prototype.generateGround = function (stepNumber) {
    var groundStartHeight = 500;
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(500, this.groundTileHeight/2);
    groundSd.restitution = 0.1;
    var groundBd = new b2BodyDef();
    groundBd.AddShape(groundSd);
    groundBd.position.Set(0, groundStartHeight);
    this.AddSimObject(new SimObject(groundBd));

    var nextJointX = 500, nextJointY = groundStartHeight;
    var currentX, currentY;
    var currentRotation = 0;
    groundSd.extents.Set(this.groundTileSize/2, this.groundTileHeight/2);

    for (var i = 0; i < stepNumber; i++) {
        groundBd = new b2BodyDef();
        groundBd.AddShape(groundSd);
        currentRotation = this.groundGenerator(currentRotation, i, nextJointX, nextJointY);
        currentX = nextJointX + this.groundTileSize/2*Math.cos(currentRotation);
        currentY = nextJointY + this.groundTileSize/2*Math.sin(currentRotation);
        groundBd.position.Set(currentX, currentY);
        groundBd.rotation = currentRotation;

        nextJointX += this.groundTileSize*Math.cos(currentRotation);
        nextJointY += this.groundTileSize*Math.sin(currentRotation);
        this.AddSimObject(new SimObject(groundBd));

    }
};

World.prototype.AddSimObject = function(simObject) {
    return this.b2World.CreateBody(simObject.b2BodyDef);
};