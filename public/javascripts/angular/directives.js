var directives = angular.module('global-directives',[]);

directives.directive('ngBlur', ['$parse', function($parse) {
    return function(scope, element, attr) {
        var fn = $parse(attr['ngBlur']);
        element.bind('blur', function(event) {
            scope.$apply(function() {
                fn(scope, {$event:event});
            });
        });
    };
}]);

directives.directive('eatClick', function() {
    return function(scope, element, attrs) {
        element.bind('click', function(event) {
            event.preventDefault();
        });
    };
});