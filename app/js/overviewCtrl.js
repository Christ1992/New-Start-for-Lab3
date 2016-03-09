// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('OverviewCtrl', function ($scope,Dinner) {

	//menu菜ID设定
  $scope.dishID = Dinner.getFullMenu();
  console.log("aaa"+$scope.dishID);
	$scope.menuDish = new Array();
  //获取菜的详情
  for(item in $scope.dishID){

    Dinner.Dish.get({id:$scope.dishID[item]},function(data){
            $scope.menuDish.push(data);

        });
    };
	

	 $scope.getPriceForDish= function(dish){
		return Dinner.getPriceForDish(dish)*Dinner.getNumberOfGuests();
		}
	$scope.getTotalMenuPrice = function(){

		return Dinner.getTotalMenuPrice()*Dinner.getNumberOfGuests();
	}
  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});

