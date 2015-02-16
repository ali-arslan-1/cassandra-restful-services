var app = angular.module('global-app');

app.controller('base', ['$scope' ,'$http', function($scope,$http) {
	
	/*****************************************************************parameter initializations************************************************************************/
	$scope.init = function() {

    $scope.testModel = "Execute";

	};


    $scope.execute = function(){

        console.log("called");
        //see https://docs.angularjs.org/api/ng/service/$http

        //$http.get('/someUrl').success(successCallback);
        //$http.post('/someUrl', data).success(successCallback);


    $http({method: 'GET', url: '/fetchData', params:{query: $scope.query }}).
        success(function(data, status) {
            $scope.result = data.rows;
        }).
        error(function(data, status) {
            $scope.result = data || "Request failed";
            $scope.status = status;
        });

    }

}]);

