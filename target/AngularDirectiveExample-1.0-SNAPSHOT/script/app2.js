/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('MyApp', []);

app.controller('DirectiveController', ['$scope', function ($scope) {
        $scope.user = {
            companyName: "Coolest Company on Earth",
            companyUrl: "http://www.cool.cooler.com",
            created: new Date()
        };
    }])
        .directive('myCoolSite', function () {
            return{
                restrict: 'AE',
                templateUrl: 'myUser.html',
                controller: 'DirectiveController'
            };
        })
        .directive('myPictures', function () {
            return{
                restrict: 'AE',
                templateUrl: 'myGallery.html',
                link: function($scope, $element, $attrs){
                    $scope.Images = $attrs.test.toString().split(",");
                    for(var i = 0; i !== $scope.Images.length; i++){
                        $scope.Images[i] = "pictures/" + $scope.Images[i];
                    }
                }
            };
        });


