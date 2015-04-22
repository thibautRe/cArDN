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
    drawWorld(this.world.b2World, this.context, this.getCameraPosition());
    setTimeout(function() {
        engine.run();
    }, 10);
};

Engine.prototype.getCameraPosition = function() {
    return b2Math.SubtractVV(this.car.getPosition(), new b2Vec2(this.canvasInfos.width/2, this.canvasInfos.height/2));
};