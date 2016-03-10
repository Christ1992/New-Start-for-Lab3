// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource,$cookieStore) {

  //TODO Lab 2 implement the data structure that will hold number of guest
  // and selected dinner options for dinner menu
  var observers=[];
 // var numberOfGuests=1;
  var menuID = [{'Category':'Appetizers','id': 0},{'Category':'Main Dish','id': 0},{'Category':'Desserts','id': 0}];
  //any_kw=main+dish
  //any_kw=appetizers
  //any_kw=dessert
  var Type="appetizers";
  var Filter=null;
  var DetailID=0;
  var pendingID=0;
  var apiKey = "d6Wz1E41ENng5iGi9xAbE6Mc64F4fZj1";
  var allPrice=0;

  this.initialization=function(){
    console.log("hihihi-initialization;");
     $cookieStore.put("fullMenuID",menuID);
     $cookieStore.put("numberOfGuests",1);
     console.log($cookieStore.get('fullMenuID'));
     console.log($cookieStore.get('numberOfGuests'));
  }
 
// 设定人数 OK
  this.setNumberOfGuests = function(num) {
    if(num>0){
      
      $cookieStore.put("numberOfGuests",num);
    }
  }

  // 输出人数 OK
  this.getNumberOfGuests = function() {
    return $cookieStore.get("numberOfGuests");
  }
/*
  this.setKeyword= function(keyword){
    console.log("setkey"+keyword);
    $cookieStore.put("keyword",keyword);
  }
  this.getKeyword= function(){
    console.log("gettype"+$cookieStore.get("type"));
    
    return $cookieStore.get("keyword");
  }
  this.setType= function(Type){
    console.log("settype"+Type);
    
    $cookieStore.put("type",Type);
  }
  this.getType= function(){
    console.log("gettype"+$cookieStore.get("type"));
    return $cookieStore.get("type");
  }
*/
 
 // 关键词搜索 OK
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:10,api_key:'d6Wz1E41ENng5iGi9xAbE6Mc64F4fZj1'});
  // dish详情 OK
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'d6Wz1E41ENng5iGi9xAbE6Mc64F4fZj1'});
  this.getDish=function(inputID){
      var dish;
      this.Dish.get({id:inputID},function(data){
          dish=data;
         

      });
      return dish;
  };
    
  

  
  this.setPendingID = function(id){
    
    pendingID=id;
  };

  this.getPendingID = function(){
    
    return pendingID;
  }
  var backMenuDish="";
  this.getMenuDish=function(){
    return backMenuDish;
  }
//返回所有menu上面的id 的 数组
  this.getFullMenu = function() {
    var allDishesID = [];
    var dishID=$cookieStore.get("fullMenuID");
    
    
    for(var i=0; i<dishID.length;i++){
      if(dishID[i].id!=0){
       
      allDishesID.push(dishID[i].id);
      }
    }
    console.log("allDishesID");
    console.log(allDishesID);
    
    return allDishesID;
  }

//返回dish的成分 的 数组, 已改
  this.getAllIngredients = function(dish) {
    var allIngredients = [];

    var ingredients = dish.Ingredients;
    
    for(ingredient in ingredients){
      allIngredients.push(ingredient);
    }

    return allIngredients;
  }

//通过菜的id  返回  总价格，已改为根据菜的数组 返回价格
  this.getPriceForDish = function(dish) {
    var dishPrice = 0;
    
    var dishIngredients = dish.Ingredients;
    
    for(f in dishIngredients){
      
      dishPrice += dishIngredients[f].Quantity;
      
    }

    return parseFloat(dishPrice.toFixed(2));

    };


//设置菜单的总价（未乘人数）
  this.setTotalMenuPrice = function(price) {
    
    $cookieStore.put("totalMenuPrice",price);
  }
  this.getTotalMenuPrice = function(){
    
    return $cookieStore.get("totalMenuPrice");
  }

//判断id的类型是否已存在，如果未存在增加，如果存在替换
  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(id,type) {
    
    var dishID= $cookieStore.get("fullMenuID");

    for(x in dishID){ 
      if(dishID[x].Category==type){
        
          dishID[x].id=id;
          console.log("dishID["+x+"]="+id);
      }

    }
    menuID=dishID;
    console.log("运行addDishToMenu之后的menuID");
    console.log(menuID);
    $cookieStore.put("fullMenuID",menuID);
    
   
  }

//从menu中删除特定dish 的 id
  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
    
    var dishID= $cookieStore.get("fullMenuID");

    for(key in dishID){ 
      console.log("运行model的delete之前的menuID");
      console.log(dishID);
      if( dishID[key].id == id)
      {
        dishID[key].id=0;
      }
    }
    menuID=dishID;
    console.log("运行model的delete之后的menuID");
    console.log(menuID);
    $cookieStore.put("fullMenuID",menuID);
    console.log($cookieStore.get("fullMenuID"));

    

    //TODO Lab 2 
  }


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details





  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});