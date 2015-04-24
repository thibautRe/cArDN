var Referee = function(world) {
    this.world = world;
    this.stats = [];
};

Referee.prototype.addCarToStats = function(car) {
    this.stats.push(car);
};

Referee.prototype.getBestCar = function() {
    var bestcar, bestScore = 0;

    for (var i = 0; i < this.stats.length; i++) {
        if (this.stats[i].score > bestScore) {
            bestcar = this.stats[i];
        }
    }
    return bestcar;
};