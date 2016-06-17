
angular.module('elasticInputApp', ['puElasticInput']).controller('AppController', ['$scope', function($scope) {

    $scope.model = 'Lorem ipsum';

    $scope.updateModel = function() {
        $scope.model = $scope.model != 'Lorem ipsum' ? 'Lorem ipsum' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
    };

}]);

