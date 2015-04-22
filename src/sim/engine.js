var Engine = function(world) {
    this.world = world;

    this.car = new Car(this.world);
    this.car.create();
    var canvasElm = document.getElementById("canvas");
    this.context = canvasElm.getContext('2d');
    this.canvasInfos = {
        "width": canvasElm.width,
        "height": canvasElm.height
    }
};

Engine.prototype.run = function() {
    var engine = this;
    var timeStep = 1.0/60;
    var iteration = 1;
    this.world.b2World.Step(timeStep, iteration);
    this.context.clearRect(0, 0, this.canvasInfos.width, this.canvasInfos.height);
    this.drawWorld();
    setTimeout(function() {
        engine.run();
    }, 10);
};

Engine.prototype.getCameraPosition = function() {
    return b2Math.SubtractVV(this.car.getPosition(), new b2Vec2(this.canvasInfos.width/2, this.canvasInfos.height/2));
};

Engine.prototype.drawWorld = function() {
    for (var j = this.world.b2World.m_jointList; j; j = j.m_next) {
        drawJoint(j, this.context, this.getCameraPosition());
    }
    for (var i in this.world.simObjects) {
        console.log(this.world.simObjects[i]);
        b = this.world.simObjects[i].b2Body;
        if (b === undefined) continue;
        for (var j = b.GetShapeList(); j; j=j.m_next) {
            if (j) {
                drawShape(j, this.context, this.getCameraPosition());
                
            }
        }
    }
}

