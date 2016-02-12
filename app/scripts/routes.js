'use strict';

angular.module('myApp').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.view.html',
      controller: 'MainCtrl'
    })

    .otherwise({
      redirectTo: '/'
    });
}]);
