var cArDN = angular.module("cArDN", []);

cArDN.controller("simulation", ["$scope", function ($scope) {

    $scope.run = function() {
        $scope.world = new World();
        //world.groundGenerator = GroundGenerators.upupup();
        $scope.world.generateGround(200);
        $scope.engine = new Engine($scope.world);
        $scope.referee = new Referee($scope.world, $scope.engine);

        $scope.referee.tournament();
        $scope.engine.run();
    };

    $scope.runBestCar = function() {
        $scope.referee.replayBestCar();
    };

    $scope.run();
}]);