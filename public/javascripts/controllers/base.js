var app = angular.module('global-app');

app.controller('base', ['$scope' , function($scope) {
	
	/*****************************************************************parameter initializations************************************************************************/
	$scope.init = function() {

    $scope.testModel = "My model Value";

	};


    $scope.execute = function(){

        console.log("called");
        //see https://docs.angularjs.org/api/ng/service/$http

        //$http.get('/someUrl').success(successCallback);
        //$http.post('/someUrl', data).success(successCallback);
    }




}]);

