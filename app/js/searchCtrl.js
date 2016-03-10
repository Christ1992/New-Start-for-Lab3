// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.
  $scope.createNew=function(){
      Dinner.initialization();
      console.log("initialization");
    }
 
  $scope.getKeyword=function(){
    return Dinner.getKeyword();
  }
  $scope.getType=function(){
    return Dinner.getType();
  }
  
  $scope.mix=function(keyword,type){
    Dinner.setKeyword(keyword);
    Dinner.setType(type);
    $scope.search(keyword+'+'+type);
  }

  $scope.search = function(query) {
   $scope.status = "Searching...";
   
   Dinner.DishSearch.get({any_kw:query},function(data){
     //Dinner.setKeyword(query);
         $scope.dishes=data.Results;
         $scope.status = "Showing " + data.Results.length + " results";
       },function(data){
         $scope.status = "There was an error";
       });
   
  }

  $scope.setPendingDish=function(data){
    $scope.pendingID=data.RecipeID;
    Dinner.setPendingID($scope.pendingID);  
  }


  


});
//控制搜索结果