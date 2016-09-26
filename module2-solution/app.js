(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

//Define controller to buy items - inject service
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){

  var toBuy = this;
  toBuy.shoppingList = ShoppingListCheckOffService.getBuyList();
  toBuy.isListEmpty = ShoppingListCheckOffService.isToBuyListEmpty();

  toBuy.buyItem = function(itemIndex){
    ShoppingListCheckOffService.removeItemFromToBuyList(itemIndex);
    //We need to re-evaluate the lists
    toBuy.isListEmpty = ShoppingListCheckOffService.isToBuyListEmpty();
  }
};

//Define controller to bought items - inject service
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){

  var bought = this;
  bought.shoppingList = ShoppingListCheckOffService.getBoughtList();
};

//Define service to handle buying, remove from list and the in-between controllers
function ShoppingListCheckOffService(){
  var service = this;

  var toBuyList = [];
  var boughtList = [];

  //Shopping list
  toBuyList = [
    {
      name : "Chocolate Bars",
      quantity : "2"
    },
    {
      name : "Cookies",
      quantity : "3"
    },
    {
      name : "Candies",
      quantity : "5"
    },
    {
      name : "Ice Cream Cone",
      quantity : "1"
    },
    {
      name : "Biscuits",
      quantity : "3"
    }
  ];

  //get the list to buy
  service.getBuyList = function(){
    return toBuyList;
  };

  //check if the buy list empty
  service.isToBuyListEmpty = function(){
    return toBuyList.length === 0;
  }

  //get the bought list
  service.getBoughtList = function(){
    return boughtList;
  };

  //remove bought item from the buy list and add it to the bought list
  service.removeItemFromToBuyList = function(itemIndex){
    //Let get the bought item and push it to the boughtList array
    var boughtItem = [];
    var selectedItem = toBuyList.splice(itemIndex, 1);
    boughtItem.name = selectedItem[0].name;
    boughtItem.quantity = selectedItem[0].quantity;
    //Save bought item
    boughtList.push(boughtItem);
  }

}

})();
