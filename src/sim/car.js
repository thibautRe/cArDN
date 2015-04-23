var Car = function(world, adn) {
    this.world = world;
    this.adn = adn;
    this.score = 0;
    this.scoreTimeout;

    this.simObjects = [];
    this.joints = [];
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
    this.body = new SimObject(boxBd);
    this.world.AddSimObject(this.body);
    this.simObjects.push(this.body);
    
    // Add the wheels
    var ballDef = new b2CircleDef();
    ballDef.density = 1;
    ballDef.friction = 100;
    var wheel1Def = new b2BodyDef();
    var r1 = this.adn.props["W1R"];
    ballDef.radius = r1;
    wheel1Def.AddShape(ballDef);
    wheel1Def.position.Set(-40, height + 20 + this.adn.props["W1A"]);
    this.wheel1 = new SimObject(wheel1Def);
    this.wheel1.setImage("wheel1.png", {width: 2*r1, height: 2*r1});
    this.world.AddSimObject(this.wheel1);
    this.simObjects.push(this.wheel1);

    var ballDef = new b2CircleDef();
    ballDef.density = 1;
    ballDef.friction = 100;
    var wheel2Def = new b2BodyDef();
    var r2 = this.adn.props["W2R"];
    ballDef.radius = r2;
    wheel2Def.AddShape(ballDef);
    wheel2Def.position.Set(40, height + 20 + this.adn.props["W1A"]);
    this.wheel2 = new SimObject(wheel2Def);
    this.wheel2.setImage("wheel1.png", {width: 2*r2, height: 2*r2});
    this.world.AddSimObject(this.wheel2);
    this.simObjects.push(this.wheel2);

    // Add the joints between the body and the wheels
    var jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(-40, height + 20);
    jointDef.body1 = this.body.b2Body;
    jointDef.body2 = this.wheel1.b2Body;
    jointDef.motorSpeed = this.adn.props["W1S"];
    jointDef.motorTorque = this.adn.props["W1T"];;
    jointDef.enableMotor = true;
    this.wheel1Joint = this.world.b2World.CreateJoint(jointDef);
    this.joints.push(this.wheel1Joint);

    jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(40, height + 20);
    jointDef.body1 = this.body.b2Body;
    jointDef.body2 = this.wheel2.b2Body;
    jointDef.motorSpeed = this.adn.props["W2S"];;
    jointDef.motorTorque = this.adn.props["W2T"];;
    jointDef.enableMotor = true;
    this.wheel2Joint = this.world.b2World.CreateJoint(jointDef);
    this.joints.push(this.wheel2Joint);
};

Car.prototype.getPosition = function() {
    if (this.body === undefined) return new b2Vec2(0, 0);
    return this.body.b2Body.m_position;
};

Car.prototype.updateScore = function() {
    var tempScore = this.getPosition().Length();

    if (tempScore > this.score + 20) {
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

Car.prototype.destroy = function() {
    for (var i = 0; i < this.simObjects.length; i++) {
        this.world.DestroySimObject(this.simObjects[i]);
    }
    delete this.simObjects;
};
