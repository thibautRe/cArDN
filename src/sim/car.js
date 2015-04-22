var Car = function(world, adn) {
    this.world = world;
    this.adn = adn;
};

Car.prototype.create = function() {
    var height = 420;

    // Create the body
    var boxDef = new b2BoxDef();
    boxDef.density = 2;
    boxDef.extents.Set(50, 20);
    boxDef.friction = 2;
    boxDef.restitution = 0.1;
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxDef);
    boxBd.position.Set(250,height);
    var body = new SimObject(boxBd);
    this.world.AddSimObject(body);
    this.body = body;
    
    // Add the wheels
    var ballDef = new b2CircleDef();
    ballDef.density = 0.4;
    ballDef.restitution = 0.1;
    ballDef.friction = 10;
    wheel1Def = new b2BodyDef();
    var r1 = this.adn.props["W1R"];
    ballDef.radius = r1;
    wheel1Def.AddShape(ballDef);
    wheel1Def.position.Set(210, height + 20 + this.adn.props["W1A"]);
    wheel1 = new SimObject(wheel1Def);
    wheel1.setImage("wheel1.png", {width: 2*r1, height: 2*r1});
    this.world.AddSimObject(wheel1);
    wheel2Def = new b2BodyDef();
    var r2 = this.adn.props["W2R"];
    ballDef.radius = r2;
    wheel2Def.AddShape(ballDef);
    wheel2Def.position.Set(290, height + 20 + this.adn.props["W2A"]);
    wheel2 = new SimObject(wheel2Def);
    wheel2.setImage("wheel1.png", {width: 2*r2, height: 2*r2});
    this.world.AddSimObject(wheel2);

    // Add the joints between the body and the wheels
    var jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(210, height + 20);
    jointDef.body1 = body.b2Body;
    jointDef.body2 = wheel1.b2Body;
    jointDef.motorSpeed = 10;
    jointDef.motorTorque = 50000000;
    jointDef.enableMotor = true;

    this.world.b2World.CreateJoint(jointDef);

    jointDef.anchorPoint.Set(290, height + 20);
    jointDef.body2 = wheel2.b2Body;
    this.world.b2World.CreateJoint(jointDef);
};

Car.prototype.getPosition = function() {
    if (this.body === undefined) return new b2Vec2(0, 0);
    return this.body.b2Body.m_position;
};