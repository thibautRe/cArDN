var Car = function(world, adn) {
    this.world = world;
    this.adn = adn;
    this.score;
};

Car.prototype.create = function() {
    var height = -100;

    // Create the body
    var boxDef = new b2BoxDef();
    boxDef.density = 2;
    boxDef.extents.Set(50, 20);
    boxDef.friction = 2;
    boxDef.restitution = 0.1;
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxDef);
    boxBd.position.Set(0,height);
    var body = new SimObject(boxBd);
    this.world.AddSimObject(body);
    this.body = body;
    
    // Add the wheels
    var ballDef = new b2CircleDef();
    ballDef.density = 1;
    ballDef.restitution = 0;
    ballDef.friction = 1;
    wheel1Def = new b2BodyDef();
    var r1 = this.adn.props["W1R"];
    ballDef.radius = r1;
    wheel1Def.AddShape(ballDef);
    wheel1Def.position.Set(-40, height + 35 + this.adn.props["W1A"]);
    wheel1 = new SimObject(wheel1Def);
    wheel1.setImage("wheel1.png", {width: 2*r1, height: 2*r1});
    this.world.AddSimObject(wheel1);

    var ballDef = new b2CircleDef();
    ballDef.density = 1;
    ballDef.restitution = 0;
    ballDef.friction = 10;
    wheel2Def = new b2BodyDef();
    var r2 = this.adn.props["W2R"];
    ballDef.radius = r2;
    wheel2Def.AddShape(ballDef);
    wheel2Def.position.Set(40, height + 35 + this.adn.props["W1A"]);
    wheel2 = new SimObject(wheel2Def);
    wheel2.setImage("wheel1.png", {width: 2*r2, height: 2*r2});
    this.world.AddSimObject(wheel2);

    // Add the joints between the body and the wheels
    var jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(-40, height + 35);
    jointDef.body1 = body.b2Body;
    jointDef.body2 = wheel1.b2Body;
    jointDef.motorSpeed = 10;
    jointDef.motorTorque = 50000000;
    jointDef.enableMotor = true;
    this.wheel1Joint = this.world.b2World.CreateJoint(jointDef);

    jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(40, height + 35);
    jointDef.body1 = body.b2Body;
    jointDef.body2 = wheel2.b2Body;
    jointDef.motorSpeed = 10;
    jointDef.motorTorque = 50000000;
    jointDef.enableMotor = true;
    this.wheel2Joint = this.world.b2World.CreateJoint(jointDef);
};

Car.prototype.getPosition = function() {
    if (this.body === undefined) return new b2Vec2(0, 0);
    return this.body.b2Body.m_position;
};

Car.prototype.updateScore = function() {
    this.score = this.getPosition();
};