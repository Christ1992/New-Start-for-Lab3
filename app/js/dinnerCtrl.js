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
  $scope.totalPrice=0;

  $scope.menuDish = new Array();
  $scope.priceForDish  = new Array();
	//menu菜ID设定
  $scope.dishID = Dinner.getFullMenu();
 // console.log("menu的ID："+$scope.dishID);

  //获取菜的详情
  for(item in $scope.dishID){
    //console.log($scope.dishID[item]);
    Dinner.Dish.get({id:$scope.dishID[item]},function(data){
            $scope.menuDish.push(data);
            var price = Dinner.getPriceForDish(data);
            $scope.priceForDish.push(price);
            $scope.totalPrice+=price;
            
        });
    };
  
  
  $scope.priceForAllPeople = function(dish) {
                for(key in $scope.menuDish){
                  if(dish==$scope.menuDish[key]){
                    return $scope.priceForDish[key]*Dinner.getNumberOfGuests();
                  }
                }
            }
  
	//价格返回  
  

  //remove菜
  $scope.removeItem = function(ID) {
    console.log("快调用我");
    Dinner.Dish.get({id:ID},function(data){
            for(n in $scope.menuDish){
              if(ID==$scope.menuDish[n].RecipeID){
                console.log("$scope.menuDish[n]");
                console.log($scope.menuDish[n]);
                $scope.menuDish.splice(n,1);
                $scope.priceForDish.splice(n,1);
                $scope.totalPrice=$scope.totalPrice-Dinner.getPriceForDish(data);
                console.log("$scope.menuDish"+n);
                console.log($scope.menuDish);
                
              }
            }Dinner.removeDishFromMenu(ID);
        });
  	
  }

  

  //加pending
  $scope.pendingID=Dinner.getPendingID();
  
  if($scope.pendingID!=0){

        Dinner.Dish.get({id:$scope.pendingID},function(data){
            
            $scope.pendingPrice=Dinner.getPriceForDish(data);
        });
  }else{
      $scope.pendingPrice=0;
  }
    
 //返回menu总价
  $scope.getTotalMenuPrice= function(){
    Dinner.setTotalMenuPrice($scope.totalPrice+$scope.pendingPrice);
    return ($scope.totalPrice+$scope.pendingPrice)*$scope.getNumberOfGuests();
  }  
  
  
  



  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});


//控制人数，选的菜，价钱，remove，total, pending