(function () {
'use strict';

angular.module('NarrowItDownApp', [])
 .controller('NarrowItDownController', NarrowItDownController)
 .service('MenuSearchService', MenuSearchService)
 .directive('foundItems', FoundItemsDirective)
 .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

 function FoundItemsDirective()
 {
     var ddo = {
         templateUrl: 'foundItemsTemplate.html',
         scope: {
             items: '<',
             onRemove: '&'
         },
         controller: FoundItemsDirectiveController,
         controllerAs: 'list',
         bindToController: true
     }

     return ddo;
 }

 function FoundItemsDirectiveController() {
  var list = this;
 }

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    ctrl.getMenuItems = function(searchTerm){
        MenuSearchService.getMatchedMenuItems(searchTerm)
            .then(function(result){
                ctrl.found = result;
            });   
    }

    ctrl.removeItem = function(index) {
        ctrl.found.splice(index, 1);
    }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        return $http({
            method: 'GET',
            url: ( ApiBasePath + '/menu_items.json')
        })
        .then(function(result) {
            var items = result.data.menu_items;
            var foundItems = [];

            if (!searchTerm)
                return foundItems;

            for (var i=0; i < items.length; i++)
            {
                if (items[i].description.toLowerCase().indexOf(searchTerm) !== -1)
                {
                    foundItems.push(items[i]);
                }
            }
            return foundItems;
        })
        .catch(function(error) {
            return error.data;
        });
    };
}

})();