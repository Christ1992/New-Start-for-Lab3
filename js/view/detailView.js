var DetailView = function (container, model) {
	this.backToSelect=container.find("#backToSelect");
	this.confirmDish=container.find("#confirmDish");
	

	model.addObserver(this);
	var dishFix='';
	this.update=function(obj){
		
		if(obj=="detail"){
			var DetailID=model.getDetailID();
			console.log("DetailID+"+DetailID);
			if(DetailID!=0){
				var detailDish= model.getDish(DetailID);
				console.log("detailDish+"+detailDish);
				dishFix=detailDish;
				var dishIngredients=detailDish.Ingredients;
				var totalPrice=model.getPriceForDish(detailDish);
		
				var numberOfGuests=model.getNumberOfGuests();
		
				var ingredientHtml = "";
				var dishHtml="";
				var preHtml="";
		
				for (i = 0; i < dishIngredients.length; i++) { 
				ingredientHtml += "<div class='row'><div class='col-md-1'> </div><div class='col-md-2'>"+dishIngredients[i].Quantity.toFixed(2)*numberOfGuests+" "+dishIngredients[i].Unit
									+"</div><div class='col-md-6'>"+dishIngredients[i].Name
									+"</div><div class='col-md-1'>SEK</div><div class='col-md-2'>"
									+dishIngredients[i].Quantity.toFixed(2)*numberOfGuests+"</div></div>";
		
		   		}
		   		dishHtml="<h2>"+detailDish.Title+"</h2><img src='"
		   			+detailDish.ImageURL+"'><p>"
		   			+detailDish.Description
		   			+"</p><br>";
		   		preHtml="<h1>PREPARATION</h1><p>"+detailDish.Instructions+"</p>"

			    $("#dishPortion").html("INGREDIENTS FOR "+numberOfGuests+"  People");
			    $("#detailDish").html(dishHtml);
				$("#ingredientTable").html(ingredientHtml);
				$("#ingredientTotal").html(totalPrice*numberOfGuests);	
				$("#preparation").html(preHtml);
			}
		}else if(obj=="num"){
			var dishFixIngredients=dishFix.Ingredients;
			var totalPrice=model.getPriceForDish(dishFix);
		
				var numberOfGuests=model.getNumberOfGuests();
		
				var ingredientHtml = "";
				var dishHtml="";
		
				for (i = 0; i < dishFixIngredients.length; i++) { 
				ingredientHtml += "<div class='row'><div class='col-md-1'> </div><div class='col-md-2'>"+dishFixIngredients[i].Quantity.toFixed(2)*numberOfGuests+" "+dishFixIngredients[i].Unit
									+"</div><div class='col-md-6'>"+dishFixIngredients[i].Name
									+"</div><div class='col-md-1'>SEK</div><div class='col-md-2'>"
									+dishFixIngredients[i].Quantity.toFixed(2)*numberOfGuests+"</div></div>";
		
		   		}


			    $("#dishPortion").html("INGREDIENTS FOR "+numberOfGuests+"  People");
				$("#ingredientTable").html(ingredientHtml);
				$("#ingredientTotal").html(totalPrice*numberOfGuests);

		}
	}

	
	
}
