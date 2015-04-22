function drawCar(world) {
    ground = world.GetGroundBody();

    var height = 420

    car_body = createBox(world, 250, height, 50, 20, false)
    
    var jointDef = new b2RevoluteJointDef();

    var alea = [1.4, 2]
    jointDef.anchorPoint.Set(210, height + 20)
    jointDef.body1 = car_body
    jointDef.body2 = createBall(world, 210, height + 20 + alea[0])
    jointDef.motorSpeed = 200
    jointDef.motorTorque = 10000000
    jointDef.enableMotor = true

    world.CreateJoint(jointDef);

    jointDef.anchorPoint.Set(290, height + 20)
    jointDef.body2 = createBall(world, 290, height + 20 + alea[1])
    world.CreateJoint(jointDef)

}