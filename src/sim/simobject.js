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