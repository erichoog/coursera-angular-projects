// Create routes.js file and configure your routes and view states in it. These routes should be defined in the MenuApp module.

//     Hint: don't try to define the states all at once. Define one state, 
//          including whatever it needs and make sure it works all the way to the point when you can see the results on the screen. 
//          Then, move on to the next view state. That does mean that you will have to leave routes.js and define all the other artifacts 
//          listed below and then come back to it, etc.

//     Hint: The home state will not need a controller. Just a template.

//     Hint: The categories state can have a controller as well as a resolve. 
//          The resolve will use the MenuDataService to retrieve categories and inject them into the controller. 
//          The controller can then expose the retrieved categories object such that it can be simply passed into the categories component.

//     Hint: The items state can have the same type of setup as the categories state.

(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/home.html'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/categories.html',
      resolve: {
          categoriesdata : ['MenuDataService', function(MenuDataService){
            return MenuDataService.getAllCategories();
            }]
        },
        controller: 'CategoriesController as list',
    })

    .state('items', {
      url: '/items/{categoryShortName}',
      templateUrl: 'src/items.html',
      resolve: {
          categoryItems : ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams){
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
            }]
        },
      controller: 'CategoryItemsController as catItemsCtrl'
    });
}

})();
