// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('OverviewCtrl', function ($scope,Dinner) {

	$scope.menuDish= Dinner.getFullMenu();

	$scope.getPriceForDish= function(dish){
		Dinner.getPriceForDish(dish);
	}
	$scope.getTotalMenuPrice = function(){
		Dinner.getTotalMenuPrice();
	}
  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});

