var Car = function(world) {
    this.world = world;
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
    this.body = this.world.AddSimObject(new SimObject(boxBd));
    
    // Add the wheels
    var ballDef = new b2CircleDef();
    ballDef.density = 1;
    ballDef.radius = 20;
    ballDef.restitution = 0.1;
    ballDef.friction = 10;
    wheel1 = new b2BodyDef();
    wheel1.AddShape(ballDef);
    wheel1.position.Set(210, height + 20);
    _w1 = this.world.AddSimObject(new SimObject(wheel1));
    wheel1.position.Set(290, height + 20);
    _w2 = this.world.AddSimObject(new SimObject(wheel1));

    // Add the joints between the body and the wheels
    var jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(210, height + 20);
    jointDef.body1 = this.body;
    jointDef.body2 = _w1
    jointDef.motorSpeed = 20;
    jointDef.motorTorque = 50000000;
    jointDef.enableMotor = true;

    this.world.b2World.CreateJoint(jointDef);

    jointDef.anchorPoint.Set(290, height + 20);
    jointDef.body2 = _w2
    this.world.b2World.CreateJoint(jointDef);
};

Car.prototype.getPosition = function() {
    return this.body.m_position;
};