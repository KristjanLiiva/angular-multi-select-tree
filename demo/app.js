/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

var app = angular.module('demoApp', ['multi-select-tree']);

app.controller('demoAppCtrl', function ($scope) {

  var dummy = [
    {
      id: '1',
      name: 'company 1',
      children: [
        {
          id: '1-1',
          name: 'contract 1-1',
          children: [
            {
              id: '1-1-1',
              name: 'license 1-1-1',
            },
            {
              id: '1-1-2',
              name: 'license 1-1-2',
            }
          ]
        },
        {
          id: '1-2',
          name: 'contract 1-2',
          children: [
            {
              id: '1-2-1',
              name: 'license 1-2-1',
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'company 2',
      children: [
        {
          id: '2-1',
          name: 'contract 2-1',
        }
      ]
    }
  ];

  $scope.data = angular.copy(dummy);
  $scope.data1 = angular.copy(dummy);
  $scope.data2 = angular.copy(dummy);

  $scope.selectOnly1Or2 = function(item, selectedItems) {
    if (selectedItems  !== undefined && selectedItems.length >= 20) {
      return false;
    } else {
      return true;
    }
  };
});
