var Car = function(world, adn) {
    this.world = world;
    this.adn = adn;
    this.score = 0;
    this.scoreTimeout;

    this.simObjects = {};

    this.maxReactionForce = 0;
};

Car.prototype.onend = function() {};

Car.prototype.create = function() {
    var height = -100;

    // Create the body
    var boxDef = new b2BoxDef();
    boxDef.density = 6;
    boxDef.extents.Set(50, 20);
    boxDef.friction = 2;
    boxDef.restitution = 0;
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxDef);
    boxBd.position.Set(0,height);
    this.simObjects.body = new SimObject(boxBd);
    this.world.AddSimObject(this.simObjects.body);
    
    // Add the wheels
    var ballDef = new b2CircleDef();
    ballDef.density = 1;
    ballDef.friction = 100;
    var wheel1Def = new b2BodyDef();
    var r1 = this.adn.props["W1R"];
    ballDef.radius = r1;
    wheel1Def.AddShape(ballDef);
    wheel1Def.position.Set(-40, height + 20 + this.adn.props["W1A"]);
    this.simObjects.wheel1 = new Wheel(wheel1Def);
    this.simObjects.wheel1.setImage("wheel1.png", {width: 2*r1, height: 2*r1});
    this.world.AddSimObject(this.simObjects.wheel1);

    var ballDef = new b2CircleDef();
    ballDef.density = 1;
    ballDef.friction = 100;
    var wheel2Def = new b2BodyDef();
    var r2 = this.adn.props["W2R"];
    ballDef.radius = r2;
    wheel2Def.AddShape(ballDef);
    wheel2Def.position.Set(40, height + 20 + this.adn.props["W1A"]);
    this.simObjects.wheel2 = new Wheel(wheel2Def);
    this.simObjects.wheel2.setImage("wheel1.png", {width: 2*r2, height: 2*r2});
    this.world.AddSimObject(this.simObjects.wheel2);

    // Add the joints between the body and the wheels
    var jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(-40, height + 20);
    jointDef.body1 = this.simObjects.body.b2Body;
    jointDef.body2 = this.simObjects.wheel1.b2Body;
    jointDef.motorSpeed = this.adn.props["W1S"];
    jointDef.motorTorque = this.adn.props["W1T"];;
    jointDef.enableMotor = true;
    this.simObjects.wheel1.addJoint(this.world.b2World.CreateJoint(jointDef));

    jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(40, height + 20);
    jointDef.body1 = this.simObjects.body.b2Body;
    jointDef.body2 = this.simObjects.wheel2.b2Body;
    jointDef.motorSpeed = this.adn.props["W2S"];;
    jointDef.motorTorque = this.adn.props["W2T"];;
    jointDef.enableMotor = true;
    this.simObjects.wheel2.addJoint(this.world.b2World.CreateJoint(jointDef));

    var car = this;
    
};

Car.prototype.getPosition = function() {
    if (this.simObjects.body === undefined) return new b2Vec2(0, 0);
    return this.simObjects.body.b2Body.m_position;
};

Car.prototype.updateScore = function() {
    var tempScore = this.getPosition().Length();

    if (tempScore > this.score + 50) {
        this.score = tempScore;
        clearTimeout(this.scoreTimeout);
        this.scoreTimeout = undefined;
    }
    else if (this.scoreTimeout === undefined) {
        var car = this;
        this.scoreTimeout = setTimeout(function() {
            this.scoreTimeout = null;
            car.destroy();
            car.onend();
        }, 2500);
    }
};

Car.prototype.checkForces = function() {
    for (var i in this.simObjects) {
        this.simObjects[i].checkForces(this.world);
    }
};

Car.prototype.destroy = function() {
    // Remove objects
    for (var i in this.simObjects) {
        this.simObjects[i].destroy(this.world);
    }

    delete this.simObjects;
};
