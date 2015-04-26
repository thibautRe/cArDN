var SimObject = function(b2BodyDef) {
    this.b2BodyDef = b2BodyDef;
    this.b2Body;
    this.imageSrc;
};

SimObject.prototype.setImage = function(imageSrc, imageSize) {
    this.imageSrc = "assets/img/" + imageSrc;
    this.imageSize = imageSize;
    this.image = new Image();
    this.image.src = this.imageSrc;
    var simO = this;
    this.image.onload = function() {
        simO.image_loaded = true;
    };
};

SimObject.prototype.checkForces = function(world) {
    return false;
};

SimObject.prototype.destroy = function(world) {
    world.DestroySimObject(this);
};

SimObject.prototype.draw = function(engine) {
    // draw outline shapes
    if (this.imageSrc === undefined || engine.debugLines) {
        if (this.b2Body === undefined) return;
        for (var j = this.b2Body.GetShapeList(); j; j=j.m_next) {
            if (j) {
                engine.drawShape(j);
            }
        }
    }

    // draw image
    if (!simO.image_loaded) return;
    var pos = this.b2Body.GetCenterPosition();
    var rot = this.b2Body.GetRotation();
    var size = this.imageSize;
    engine.drawImage(pos, rot, size, this.image);


};