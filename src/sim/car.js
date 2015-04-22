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
    var body = new SimObject(boxBd);
    this.world.AddSimObject(body);
    this.body = body;
    
    // Add the wheels
    var ballDef = new b2CircleDef();
    ballDef.density = 1;
    ballDef.radius = 20;
    ballDef.restitution = 0.1;
    ballDef.friction = 10;
    wheel = new b2BodyDef();
    wheel.AddShape(ballDef);
    wheel.position.Set(210, height + 20);
    wheel1 = new SimObject(wheel);
    this.world.AddSimObject(wheel1);
    console.log(wheel1.b2Body);
    wheel.position.Set(290, height + 20);
    wheel2 = new SimObject(wheel);
    this.world.AddSimObject(wheel2);

    // Add the joints between the body and the wheels
    var jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(210, height + 20);
    jointDef.body1 = body.b2Body;
    jointDef.body2 = wheel1.b2Body;
    jointDef.motorSpeed = 20;
    jointDef.motorTorque = 50000000;
    jointDef.enableMotor = true;

    this.world.b2World.CreateJoint(jointDef);

    jointDef.anchorPoint.Set(290, height + 20);
    jointDef.body2 = wheel2.b2Body;
    this.world.b2World.CreateJoint(jointDef);
};

Car.prototype.getPosition = function() {
    return this.body.b2Body.m_position;
};