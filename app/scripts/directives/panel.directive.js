'use strict';

angular.module('myApp').directive('productPanel', function(){
  return {
    restrict: 'E',
    scope: {
      header: '=',
      imageUrl: '=',
      info: '=',
      ulMessage: '=',
      listItems: '='
    },
    templateUrl: 'views/partials/product-panel.directive.html',
    controller: 'productPanelCtrl',
    controllerAs: 'ctrl',
    bindToController: true
  };
});
