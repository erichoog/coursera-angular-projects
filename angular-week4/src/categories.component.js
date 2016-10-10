// Create categories.component.js file and create component called categories that shows 
// all available categories in the menu to the user.

// The categories and the items components should NOT directly use the MenuDataService to fetch their own data. 
// Instead, the proper data should be simply passed into the component. (Hint: use the one-way < binding).

(function () {
'use strict';

angular.module('MenuApp')
    .component('categories', {
        templateUrl: 'src/categories.component.html',
        bindings : {
            data: '<'
        }
    });

})();