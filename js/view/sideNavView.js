//ExampleView Object constructor  OK
var SideNavView = function (container, model) {
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)

	this.numberOfGuests = container.find("#numberOfGuests");
	this.plusButton = container.find("#plusGuest");
 	this.minusButton = container.find("#minusGuest");
 	this.confirmDinnerButton = container.find("#confirmDinner");

	this.PriceTable = container.find("#PriceTable");

	model.addObserver(this);
	
	//改变人数
 	this.numberOfGuests.html(model.getNumberOfGuests());



	//输出标题
	var html="";
	html+="<div class='col-sm-7'>"+"Name:"+"</div><div class='col-sm-4'>Cost</div>";
	
	
		
		//得出菜单
	var menuDish= model.getFullMenu();
	
	//输出菜单
	menuDish.forEach(function(item,index){
		
	  	var priceForSingle= model.getPriceForDish(item.id);
	  	
	  	var priceForAllPeople=priceForSingle*model.getNumberOfGuests();
	  	html+="<div class='col-sm-7'>"+item.name+"</div><div class='col-sm-3'>"+priceForAllPeople +"</div><div class='col-sm-1'><img id='"+item.id+"'src='remove.png'></div>";
		
	});

	//Bug 总价undefined
	//输出总价 
	var totalPriceForMenu=model.getTotalMenuPrice();
	html+="<div class='col-sm-7'>"+"Total:"+"</div><div class='col-sm-4'> "+totalPriceForMenu+" SEK</div>";

	this.PriceTable.html(html);

	

	this.update= function(obj){
		//改变人数
 		this.numberOfGuests.html(model.getNumberOfGuests());
 		if(obj=="num"||obj=="dishChange"){
			//输出标题
			var html="";
			html+="<div class='col-sm-7'>"+"Name:"+"</div><div class='col-sm-4'>Cost</div>";

	 		
	 		//得出菜单
			var menuDish= model.getFullMenu();
			
			//输出菜单
			menuDish.forEach(function(item,index){
				
			  	var priceForSingle= model.getPriceForDish(item.id);
			  	
			  	var priceForAllPeople=priceForSingle*model.getNumberOfGuests();
			  	html+="<div class='col-sm-7'>"+item.name+"</div><div class='col-sm-3'>"+priceForAllPeople +"</div><div class='col-sm-1'><img id='"+item.id+"'src='remove.png'></div>";
		
			});

			//Bug 总价undefined
			//输出总价 
			var totalPriceForMenu=model.getTotalMenuPrice();
			html+="<div class='col-sm-7'>"+"Total:"+"</div><div class='col-sm-4'> "+totalPriceForMenu+" SEK</div>";

			this.PriceTable.html(html);

 		}


		
 				
		
 	}
 	this.update();
 	
 	
 }




