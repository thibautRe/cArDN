function drawCar(world) {
    ground = world.GetGroundBody();

    car_body = createBox(world, 250, 170, 50, 20, false)
    
    var jointDef = new b2RevoluteJointDef();

    jointDef.anchorPoint.Set(210, 190)
    jointDef.body1 = car_body
    jointDef.body2 = createBall(world, 210, 190)
    jointDef.motorSpeed = 20
    jointDef.motorTorque = 10000000
    jointDef.enableMotor = true

    world.CreateJoint(jointDef);

    jointDef.anchorPoint.Set(290, 190)
    jointDef.body2 = createBall(world, 290, 190)
    world.CreateJoint(jointDef)

}