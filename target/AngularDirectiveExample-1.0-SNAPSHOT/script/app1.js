var myApp = angular.module('myApp', []);

//Ex-3
myApp.service('randomFactory', function () {
    var self = this;
    self.getRandomNumber = function (n) {
        n = Math.floor((Math.random() * 36) + 1);
        return n;
    };

    self.getRandomString = function (n) {

        return Array(n + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, 18)).slice(0, n);
    };
});

myApp.controller('Main', ['$scope', 'randomFactory', function ($scope, randomFactory) {
        $scope.RandN = randomFactory.getRandomNumber();
        $scope.RandS = randomFactory.getRandomString(23);
    }]);

//Ex-1a
myApp.controller('MyController', [function () {
    var self = this;
    self.persons = [
        {name: 'Hans', gender: 'male', age: 8}, 
        {name: 'Grethe', gender: 'female', age: 7},
        {name: 'Frederik', gender: 'male', age: 61}, 
        {name: 'Hassan', gender: 'male', age: 13},
        {name: 'Karen', gender: 'female', age: 31}
    ];
}]);

myApp.filter('kidTeen', [function(){
    return function(input, arg){
        console.log(arg);
        var children = [];
        angular.forEach(input, function(person){
            if(person.age >= 6 && person.age <= 15){
                children.push(person);
            }
        });
        return children;
    };
}]);

//Ex-4
myApp.controller("myController", ['$scope', 'myFactory', '$http', function ($scope, myFactory, $http) {
        var self = this;
        self.factoryTest = myFactory.test();
        self.getAllCountries = function() {
            myFactory.getAll()
            .then(function (response) {
                console.log("Response is: " + response);
                self.countries_all = response.data;
                console.log(self.countries_all);
            }, function (error) {
                self.status = 'Unable to load customer data: ' + error.message;
            });
        };
        self.getAllCountriesFromRegion = function(region) {
            myFactory.getAllFromRegion(region)
            .then(function (response) {
                console.log("Response is: " + response.data);
                self.countries_all_from_region = response.data;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
        };
        self.getAllCountriesByCode = function(code) {
            myFactory.getAllFromCode(code)
            .then(function (response) {
                console.log("Response is: " + response.data);
                self.countries_all_by_code = response.data;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
        };
        
        self.getAllCountries();
        self.getAllCountriesFromRegion("europe");
        self.getAllCountriesByCode("gb");
//        self.getAllCountries = myFactory.getAll();
//        self.getAllCountriesFromRegion = myFactory.getAllFromRegion("europe");
//        self.getAllCountriesByCode = myFactory.getAllFromCode("GB");
    }]);

myApp.factory('myFactory', ['$http', function($http){
        var factory = {};
        var baseUrl = "https://restcountries.eu/rest/v1/";
        factory.test = function() { return "Hello from factory.test";};
        factory.getAll = function() {
//            console.log($http.get(baseUrl + "all"));
            return $http.get(baseUrl + "all");
        };
        factory.getAllFromRegion = function(region) {
//            console.log($http.get(baseUrl + "region/" + region));
            return $http.get(baseUrl + "region/" + region);
        };
        factory.getAllFromCode = function(code) {
//            console.log($http.get(baseUrl + "alpha?codes=" + code));
            return $http.get(baseUrl + "alpha?codes=" + code);
        };
        return factory;
}]);