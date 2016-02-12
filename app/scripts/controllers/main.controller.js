'use strict';

angular.module('myApp')
  .controller('MainCtrl', ['$scope', function($scope){
    $scope.data = [
      {
        header: 'What is a Card Module?',
        imageUrl: 'images/samsung.jpg',
        info: [
          'A card is a HTML component which allows us to wrap HTML content around a prefefined template.',
          'This allows us to mantain a degree of control around the presentation of content, without completely restricting the development team.'
        ],
        ulMessage: 'Things we\'re looking at:',
        listItems: [
          'Visual attention to detail.',
          'Cleanliness of code.',
          'Reusability of code.',
          'Maintainability of code.'
        ]
      },
      {
        header: 'Alternating Code',
        imageUrl: 'images/htc.jpg',
        info: [
          'One of the most important things when building for the presentation layer is ensuring that your code is protected agains breakages from BAU activities.',
          'This could be simple mistakes made via a CMS or slight changes in any visual assets you may have been provided.'
        ],
        ulMessage: 'More things we\'re looking at:',
        listItems: [
          'Use of BEM Methodology.',
          'Use of directives.',
          'DRY.',
          'Use of dependency inversion principle.'
        ]
      }
    ];
  }

]);
