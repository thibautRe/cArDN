var initId = 0;
var world = createWorld();
var ctx;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;
var car;

function step() {
    var timeStep = 1.0/60;
    var iteration = 1;
    world.Step(timeStep, iteration);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    var cameraPosition = b2Math.SubtractVV(car.m_position, new b2Vec2(canvasWidth/2, canvasHeight/2));
    drawWorld(world, ctx, cameraPosition);
    setTimeout(step, 10);
}
Event.observe(window, 'load', function() {
    car = drawCar(world);
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
});
