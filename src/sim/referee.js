var Referee = function(world, engine) {
    this.world = world;
    this.engine = engine;
    this.stats = [];
    this.currentCar;
};

Referee.prototype.addCarToStats = function(car) {
    this.stats.push(car);
};

Referee.prototype.getBestCar = function() {
    var bestcar, bestScore = 0;

    for (var i = 0; i < this.stats.length; i++) {
        if (this.stats[i].score > bestScore) {
            bestcar = this.stats[i];
            bestScore = bestcar.score
        }
    }
    return bestcar;
};

Referee.prototype.createNewCar = function(adn) {
    var car = new Car(this.world);
    car.adn = adn;
    return car;
};

Referee.prototype.bindCar = function(car, onend) {
    car.create();
    this.currentCar = car;

    this.engine.targetPositionGetter = function() {
        return car.getPosition();
    };
    this.engine.mainLoop = function() {
        car.updateScore();
        car.checkForces();
    };

    var referee = this;
    car.onend = function() {
        referee.addCarToStats(car);
        onend();
    };
};

Referee.prototype.tournament = function() {
    var referee = this;
    var adn = ADNGenerators.random();
    var newCar = this.createNewCar(adn);
    this.bindCar(newCar, function() {
        referee.tournament();
    });
};

Referee.prototype.replayBestCar = function() {
    var bestcar = this.getBestCar();
    if (bestcar === undefined) return;

    if (this.currentCar) {
        delete this.currentCar.onend;
        this.currentCar.destroy();
    }

    var newBestCar = this.createNewCar(bestcar.adn);
    var referee = this;
    this.bindCar(newBestCar, function() {
        referee.tournament();
    });
};