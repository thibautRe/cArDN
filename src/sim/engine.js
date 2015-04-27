var Engine = function(world) {
    this.world = world;
    var canvasElm = document.getElementById("canvas");
    this.context = canvasElm.getContext('2d');
    this.canvasInfos = {
        "width": canvasElm.width,
        "height": canvasElm.height
    };

    this.targetPositionGetter;
    this.debugLines = false;
};

// MUST BE OVERLOADED
Engine.prototype.mainLoop = function() {};

// MAIN LOOP
Engine.prototype.run = function() {
    // Physics step
    this.world.b2World.Step(1/40, 2);
    // Main loop
    this.mainLoop();
    // Draw
    this.drawWorld();

    var engine = this;
    setTimeout(function() {
        engine.run();
    }, 10);
};

Engine.prototype.getCameraPosition = function() {
    return b2Math.SubtractVV(this.targetPositionGetter(), new b2Vec2(this.canvasInfos.width/2, this.canvasInfos.height/2));
};

// Draws the world
Engine.prototype.drawWorld = function() {
    this.context.clearRect(0, 0, this.canvasInfos.width, this.canvasInfos.height);
    for (var j = this.world.b2World.m_jointList; j; j = j.m_next) {
        this.drawJoint(j);
    }
    for (var i in this.world.simObjects) {
        simO = this.world.simObjects[i];
        if (simO.imageSrc === undefined || this.debugLines) {
            if (simO.b2Body === undefined) continue;
            for (var j = simO.b2Body.GetShapeList(); j; j=j.m_next) {
                if (j) {
                    this.drawShape(j);
                }
            }
        }
        simO.draw(this);
    }
}

Engine.prototype.drawShape = function(shape) {
    this.context.strokeStyle = '#5D5959';
    this.context.beginPath();
    switch (shape.m_type) {
    case b2Shape.e_circleShape:
        {
            var circle = shape;
            var pos = b2Math.SubtractVV(circle.m_position, this.getCameraPosition());
            var r = circle.m_radius;
            var segments = 16.0;
            var theta = 0.0;
            var dtheta = 2.0 * Math.PI / segments;
            // draw circle
            this.context.moveTo(pos.x + r, pos.y);
            for (var i = 0; i < segments; i++) {
                var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
                var v = b2Math.AddVV(pos, d);
                this.context.lineTo(v.x, v.y);
                theta += dtheta;
            }
            this.context.lineTo(pos.x + r, pos.y);
    
            // draw radius
            this.context.moveTo(pos.x, pos.y);
            var ax = circle.m_R.col1;
            var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
            this.context.lineTo(pos2.x, pos2.y);
        }
        break;
    case b2Shape.e_polyShape:
        {
            var poly = shape;
            var pos = b2Math.SubtractVV(poly.m_position, this.getCameraPosition());
            var tV = b2Math.AddVV(pos, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
            this.context.moveTo(tV.x, tV.y);
            for (var i = 0; i < poly.m_vertexCount; i++) {
                var v = b2Math.AddVV(pos, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
                this.context.lineTo(v.x, v.y);
            }
            this.context.lineTo(tV.x, tV.y);
        }
        break;
    }
    this.context.stroke();
}

Engine.prototype.drawJoint = function(joint) {
    var b1 = joint.m_body1;
    var b2 = joint.m_body2;
    var x1 = b2Math.SubtractVV(b1.m_position, this.getCameraPosition());
    var x2 = b2Math.SubtractVV(b2.m_position, this.getCameraPosition());
    var p1 = b2Math.SubtractVV(joint.GetAnchor1(), this.getCameraPosition());
    var p2 = b2Math.SubtractVV(joint.GetAnchor2(), this.getCameraPosition());
    this.context.strokeStyle = '#972626';
    this.context.beginPath();
    switch (joint.m_type) {
    case b2Joint.e_distanceJoint:
        this.context.moveTo(p1.x, p1.y);
        this.context.lineTo(p2.x, p2.y);
        break;

    case b2Joint.e_pulleyJoint:
        // TODO
        break;

    default:
        if (b1 == world.m_groundBody) {
            this.context.moveTo(p1.x, p1.y);
            this.context.lineTo(x2.x, x2.y);
        }
        else if (b2 == world.m_groundBody) {
            this.context.moveTo(p1.x, p1.y);
            this.context.lineTo(x1.x, x1.y);
        }
        else {
            this.context.moveTo(x1.x, x1.y);
            this.context.lineTo(p1.x, p1.y);
            this.context.lineTo(x2.x, x2.y);
            this.context.lineTo(p2.x, p2.y);
        }
        break;
    }
    this.context.stroke();
};


Engine.prototype.drawImage = function(pos, rot, size, image) {
    var truePos = b2Math.SubtractVV(pos, this.getCameraPosition());
    this.context.save();
    this.context.translate(truePos.x, truePos.y);
    this.context.rotate(rot);
    this.context.scale(size.width/image.width, size.height/image.height);
    this.context.translate(-image.width/2, -image.height/2);
    this.context.drawImage(image, 0, 0);
    this.context.restore();
};