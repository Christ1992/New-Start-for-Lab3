// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  //设定pending 
  $scope.pendingID = $routeParams.dishId;
  console.log($scope.pendingID);
  
  $scope.setPendingID = function(){
      Dinner.setPendingID($scope.pendingID);
      console.log("pendingID:"+$scope.pendingID);
    }
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
            console.log(data);
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
    $scope.addDishToMenu = function(id,type){
      Dinner.addDishToMenu(id,type);
      Dinner.setPendingID(0);
      console.log("pending=0");
    }

    
    //pending清零
    
    $scope.removeID = function(){
      Dinner.setPendingID(0);
    }

    
    
  



  



  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  
});

//人数，加入菜单，detail id，菜的单价，总价，成分