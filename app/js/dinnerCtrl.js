// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

//人数设定
  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }
  
//menu相关
	//menu菜设定
  $scope.dish = Dinner.getFullMenu();
  
	//价格返回  
  $scope.priceForAllPeople = function(dish) {
  	return Dinner.getPriceForDish(dish)*$scope.numberOfGuests;
  }

  //remove菜
  $scope.removeItem = function(id) {
  	return Dinner.removeDishFromMenu(id);
  }

  

  //加pending
  $scope.pendingID=Dinner.getPendingID();
  if($scope.pendingID!=0){
    $scope.pendingDish=Dinner.getDish($scope.pendingID);

  $scope.pendingPrice=Dinner.getPriceForDish($scope.pendingDish)*$scope.numberOfGuests;

  }else{
    $scope.pendingPrice=0;
  }
  
  //显示总价
  $scope.totalPrice =  Dinner.getTotalMenuPrice()+$scope.pendingPrice;
  



  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});


//控制人数，选的菜，价钱，remove，total, pending