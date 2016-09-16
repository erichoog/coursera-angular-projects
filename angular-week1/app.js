(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {
    
    $scope.checkLunch = function() {
        var userInput = $scope.userInput;
        
        if (!userInput) {
            $scope.message = "Empty";
            return;
        }
        
        var lunch = userInput.split(',');
        if (lunch.length <= 3)
            $scope.message = "Enjoy!";
        else
            $scope.message = "Too much!";       
    };

});

})();