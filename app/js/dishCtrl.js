// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  //设定pending 
  $scope.pendingID = $routeParams.dishId;
  console.log($scope.pendingID);
  
  //得到dish详情
    $scope.getDish=function(){
        $scope.status ="loading";
        Dinner.Dish.get({id:$scope.pendingID},function(data){
            //设定人数
            $scope.getNumberOfGuests=function(){
                return Dinner.getNumberOfGuests();
            }

            console.log($scope.getNumberOfGuests());
            $scope.detailDish=data;
            //得到所有材料
            $scope.dishIngredients = data.Ingredients;
            console.log(data.Ingredients[0].Name);
            $scope.status = "continue";

            //计算总价
            $scope.totalPrice=Dinner.getPriceForDish(data);
            console.log($scope.totalPrice);

        });
    };
    //加入菜单
    $scope.addDishToMenu = function(id){
      Dinner.addDishToMenu(id);
      Dinner.setPendingDish(0);
    }

    
    //pending清零
    $scope.setPendingID = function(id){
      Dinner.setPendingDish(id);
    }

    
    
  



  



  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  
});

//人数，加入菜单，detail id，菜的单价，总价，成分