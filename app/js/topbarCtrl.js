// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('TopbarCtrl', function ($scope,$routeParams,Dinner) {
  
  //设定人数
  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  
});

//人数，加入菜单，detail id，菜的单价，总价，成分