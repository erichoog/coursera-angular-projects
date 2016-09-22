(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

    toBuy.boughtItem = function(itemIndex) {
        ShoppingListCheckOffService.boughtItem(itemIndex);
    };
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.itemsBought = ShoppingListCheckOffService.getItemsBought();
}

function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = [
        { name: "cookies", quantity: 10 },
        { name: "pizza", quantity: 1 },
        { name: "apples", quantity: 5 },
        { name: "banannas", quantity: 2 },
        { name: "carrots", quantity: 7 },
        { name: "oranges", quantity: 15 }];

    var itemsBought = [];

    service.boughtItem = function(itemIndex) {
        console.log(" bought item service fired!");
        itemsBought.push(itemsToBuy[itemIndex]);
        itemsToBuy.splice(itemIndex, 1);
    };

    service.getItemsToBuy = function () {
        return itemsToBuy;
    };

    service.getItemsBought = function () {
        return itemsBought;
    };
}

})();