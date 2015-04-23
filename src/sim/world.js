var World = function() {
    // Set physics bounding box
    var AABB = new b2AABB();
    AABB.minVertex.Set(-100, -10000);
    AABB.maxVertex.Set(10000, 10000);

    var gravity = new b2Vec2(0,300);
    this.b2World = new b2World(AABB, gravity, true);

    this.simObjects = [];

    // DEFAULT VALUES
    this.groundGenerator = GroundGenerators.random(Math.PI/10);
    this.groundTileSize = 35;
    this.groundTileHeight = 20;
};

World.prototype.generateGround = function (stepNumber) {
    var groundStartHeight = 0;
    var groundStartSize = 300;
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(groundStartSize, this.groundTileHeight/2);
    groundSd.restitution = 0;
    var groundBase = new b2BodyDef();
    groundBase.AddShape(groundSd);
    groundBase.position.Set(0, groundStartHeight);
    this.AddSimObject(new SimObject(groundBase));

    var nextX = groundStartSize, nextY = groundStartHeight - this.groundTileHeight/2;
    var currentX, currentY, oldX, oldY;
    var currentRotation = 0;
    groundSd.extents.Set(this.groundTileSize/2, this.groundTileHeight/2);

    var ground = new b2BodyDef();

    for (var i = 0; i < stepNumber; i++) {
        oldX = nextX;
        oldY = nextY;
        currentRotation = this.groundGenerator(currentRotation, i, oldX, oldY);
        currentX = oldX + this.groundTileSize/2*Math.cos(currentRotation);
        currentY = oldY + this.groundTileSize/2*Math.sin(currentRotation);
        nextX += this.groundTileSize*Math.cos(currentRotation);
        nextY += this.groundTileSize*Math.sin(currentRotation);

        var tile = new b2PolyDef();
        tile.restitution = 0;
        tile.friction = 1;
        tile.vertexCount = 4;
        tile.vertices[0].Set(oldX, oldY);
        tile.vertices[1].Set(nextX, nextY);
        tile.vertices[2].Set(nextX - Math.sin(currentRotation)*this.groundTileHeight, nextY + Math.cos(currentRotation)*this.groundTileHeight);
        tile.vertices[3].Set(oldX - Math.sin(currentRotation)*this.groundTileHeight, oldY + Math.cos(currentRotation)*this.groundTileHeight);
        ground.AddShape(tile);
    }
    ground.position.Set(0,0);

    this.AddSimObject(new SimObject(ground));
};

World.prototype.AddSimObject = function(simObject) {
    this.simObjects.push(simObject);
    simObject.b2Body = this.b2World.CreateBody(simObject.b2BodyDef);
};

World.prototype.DestroySimObject = function(simObject) {
    console.log(simObject.b2Body);
    this.b2World.DestroyBody(simObject.b2Body);
    for (var i = 0; i < this.simObjects.length; i++) {
        if (this.simObjects[i] == simObject) {
            this.simObjects.splice(i, 1);
        }
    }
};