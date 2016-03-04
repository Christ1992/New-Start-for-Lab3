
var SearchArea = function (container, model) {
	this.searchButton = container.find("#searchButton");
	this.inputKeyword = container.find("#inputKeyword")
	this.courseType = container.find("#courseType");
	this.showList= container.find("#showList");

	model.addObserver(this);
	
	var myDishes="";
	this.update=function(obj){
		if(obj=="changeOption" || obj=="secondPageReady"){
			var Filter = model.getSearchFilter();
			var Type= model.getSearchType();
			//console.log("F="+Filter);
			
			model.getAllDishes(Type,Filter);
			model.setLoadingPage();
    	}else if(obj=="loadingPageReady"){

    		html="<div style='text-align:center;'><img src='hex-loader2.gif'></div"
    	
    	}else if(obj=="dataReady"){

			//console.log(myDishes);
			var html = "";
			myDishes= "";
			myDishes=model.getResult();
			for (i = 0; i < myDishes.length; i++) { 

		//是否加description？		
		//	var detailDish=model.getDish(myDishes[i].RecipeID);
			console.log(myDishes[i].RecipeID);

			html += "<div class='floating-box' ><div><img id="+myDishes[i].RecipeID+" class='borderAll' src='"+myDishes[i].ImageURL120
					+"' alt='"+myDishes[i].Title+"'></div><div class='textMiddle'>"+myDishes[i].Title
					+"</div><div style='padding: 5px;overflow: auto;'>"+detailDish.Description+"</div></div>";
    		}
    //console.log("function well");	
		
	
		}
		this.showList.html(html);
	};
	


	
 	
}
