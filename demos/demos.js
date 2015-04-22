var initId = 0;
var world;
var ctx;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;
var car;

function step() {
    var timeStep = 1.0/60;
    var iteration = 1;
    world.b2World.Step(timeStep, iteration);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    var cameraPosition = b2Math.SubtractVV(car.getPosition(), new b2Vec2(canvasWidth/2, canvasHeight/2));
    drawWorld(world.b2World, ctx, cameraPosition);
    setTimeout(step, 10);
}

var loadAll = function() {
    world = new World();
    world.generateGround(100);

    car = new Car(world);
    car.create();
    ctx = $('canvas').getContext('2d');
    var canvasElm = $('canvas');
    canvasWidth = canvasElm.width;
    canvasHeight = canvasElm.height;
    canvasTop = parseInt(canvasElm.style.top);
    canvasLeft = parseInt(canvasElm.style.left);
    Event.observe('canvas', 'contextmenu', function(e) {
        if (e.preventDefault) e.preventDefault();
        return false;
    });
    step();
    
};
