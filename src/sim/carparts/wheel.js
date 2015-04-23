var Wheel = function(b2BodyDef) {
    SimObject.call(this, b2BodyDef);
};

Wheel.prototype = Object.create(SimObject.prototype);

Wheel.prototype.addJoint = function(b2Joint) {
    this.b2Joint = b2Joint;
};

Wheel.prototype.checkForces = function(world) {
    if (this.b2Joint && this.b2Joint.GetReactionForce(1).Length() > 1000000) {
        this.destroyJoint(world);
    }
};

Wheel.prototype.destroy = function(world) {
    this.destroyJoint(world);
    SimObject.prototype.destroy.call(this, world);
};

Wheel.prototype.destroyJoint = function(world) {
    if (this.b2Joint === undefined) return;
    world.b2World.DestroyJoint(this.b2Joint);
    delete this.b2Joint;
};