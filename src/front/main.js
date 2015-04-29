var cArDN = angular.module("cArDN", []);

cArDN.controller("simulation", ["$scope", function ($scope) {

    $scope.run = function() {
        var world = new World();
        //world.groundGenerator = GroundGenerators.upupup();
        world.generateGround(200);
        var engine = new Engine(world);
        var referee = new Referee(world, engine);

        referee.tournament();
        engine.run();
    };

    $scope.runBestCar = function() {
        referee.replayBestCar();
    };

    $scope.run();
}]);