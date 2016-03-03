//DinnerModel Object constructor
var DinnerModel = function() {
 
	//TODO Lab 2 implement the data structure that will hold number of guest
	// and selected dinner options for dinner menu
	var observers=[];
	var numberOfGuests=1;
	var menuID = [{'Category':'Appetizers','id': 0},{'Category':'Main Dish','id': 0},{'Category':'Desserts','id': 0}];
	//any_kw=main+dish
	//any_kw=appetizers
	//any_kw=dessert
	var Type="appetizers";
	var Filter=null;
	var DetailID=0;
	var pendingID=0;
	var apiKey = "3stL5NVP4s6ZkmK5gt4dci8a4zOQRpD4";


//搜索id获得ingredient，每个的数量即为价格


//筛选功能---要改

	this.setSearchType = function(type){
		Type=type;
		
		
		notifyObservers("changeOption");
	}
	this.getSearchType=function(){
		return Type;
	}

	this.setSearchFilter= function(fil){
		Filter=fil;

		
		notifyObservers("changeOption");
	}
	this.getSearchFilter=function(){
		return Filter;
	}

//通过id搜索dish 的 数组，已改
	this.getDish = function (id) {
	var url = "http://api.bigoven.com/recipe/" + id + "?api_key="+apiKey;
	var result='';
	$.ajax({
	         type: "GET",
	         dataType: 'json',
	         async: false,
	         url: url,
	         success: function (data) {
	            
	            //alert('success');
	             result=data;
	            console.log("计数君");
	            }
	         });
	 return result;
	}
	//返回所有菜（0）或是返回根据type和filter筛选过的菜,要改
	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type,filter) {
		if(filter==undefined){
			var url = "http://api.bigoven.com/recipes?pg=1&rpp=10&any_kw="
                  + type 
                  + "&api_key="+apiKey;
                  console.log("jinlaile1= "+url);
        }else{
            var url="http://api.bigoven.com/recipes?pg=1&rpp=10&any_kw="
                  + type+"+"+filter
                  + "&api_key="+apiKey;
                  console.log("jinlaile2 " +url)
        }
        var result='';
        $.ajax({
            type: "GET",
            dataType: 'json',
            async: false,
            url: url,
            success: function (data) {
                //alert('success');
                
                result=data.Results;
                
                
            }
        });
        return result;
	
	}

	this.setSecondPageReady=function(){
		notifyObservers("secondPageReady");
	}
	

//其他的所有dish.XXXX要改, type改成Category

//Observers
	this.addObserver = function(observer) {
		observers.push(observer);
		
	};
	var notifyObservers = function(obj) {
		
		for	(var i = 0; i < observers.length; i++){
			observers[i].update(obj);

		}
	
	} ;
	
	this.setPendingID = function(id){
		
		pendingID=id;
		notifyObservers("pendingChange");
	};

	this.getPendingID = function(){
		return pendingID;
	}




//页面切换
	this.setMenuReady= function(){
		notifyObservers("menuReady");
	}
	this.setPreparationReady=function(){
		notifyObservers("preparationReady");
	}

//给图像获得ID
	this.setDetailID=function(id){
		DetailID=id;
		notifyObservers("detail");
		console.log("收到了set");
	}
	this.getDetailID=function(){
		console.log("收到了get");
		return DetailID;
	}


//通知observer
	this.setNumberOfGuests = function(num) {
		if(num>0){
			numberOfGuests=num;
			notifyObservers("num");
		}
	}

	// should return 
	this.getNumberOfGuests = function() {
	
		return numberOfGuests;
	}








//返回menu上面的特定类型的dish  的 数组
	/*this.getSelectedDish = function(type) {
		for (key in menuID){
			var dishType=menuID[key].type;
			if(dishType == type){
				return dish;
			}
		}

	}*/

//返回所有menu上面的dish 的 数组
	this.getFullMenu = function() {
		var allDishes = [];
		
		for(var i=0; i<menuID.length;i++){
			if(menuID[i].id!=0){
				
				var dish=this.getDish(menuID[i].id);
			
			allDishes.push(dish);
			}
		}
		return allDishes;
	}

//返回所有所有menu上面dish的成分 的 数组, 已改
	this.getAllIngredients = function() {
		var allIngredients = [];

		for(key in menuID){
			var dish = this.getDish(menuID[key].id);
			var ingredients = dish.Ingredients;
			allIngredients.push(ingredients);
		}
		return allIngredients;
	}

//通过菜的id  返回  总价格，已改为根据菜的数组 返回价格
	this.getPriceForDish = function(data) {
        var dishPrice = 0;
		
		
		var dishIngredients = data.Ingredients;
		
		for(key in dishIngredients){
			
			dishPrice += dishIngredients[key].Quantity;
			
		}

		return parseFloat(dishPrice.toFixed(2));

    };


//返回菜单的总价（乘完了人数）
	this.getTotalMenuPrice = function() {
		var totalPrice=0
		var dish=this.getFullMenu();
		
		for (key in dish){
			
			totalPrice += this.getPriceForDish(dish[key]);
			
		}
		totalPrice = totalPrice*this.getNumberOfGuests();
		return totalPrice;
		
	}

//判断id的类型是否已存在，如果未存在增加，如果存在替换
	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		var dish = this.getDish(id);

		for(key in menuID){	
			if(menuID[key].Category==dish.Category){
				
					menuID[key].id=dish.RecipeID;
			}
		}
		
		notifyObservers("dishChange");
	}

//从menu中删除特定dish 的 id
	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		
		for(key in menuID){	
			if( menuID[key].id == id)
			{
				menuID[key].id=0;
			}
		}
		notifyObservers("dishChange");

		//TODO Lab 2 
	}


		
}

	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'starter 1',
		'type':'starter',
		'image':'starter1.jpeg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. ",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'st',
			'price':2
			}]
		},{
		'id':2,
		'name':'starter 2',
		'type':'starter',
		'image':'starter2.jpeg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'starter 3',
		'type':'starter',
		'image':'starter3.jpeg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':4,
		'name':'starter 4',
		'type':'starter',
		'image':'starter4.jpeg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'st',
			'price':2
			}]
		},{
		'id':5,
		'name':'starter 5',
		'type':'starter',
		'image':'starter5.jpeg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'MD 1',
		'type':'main dish',
		'image':'MD 1.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C).  mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'MD 2.jpg',
		'description':"Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce;Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pic',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'MD 3.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pic',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'MD 4.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pic',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':104,
		'name':'MD 5',
		'type':'main dish',
		'image':'MD 5.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pic',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':203,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':204,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':205,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];



