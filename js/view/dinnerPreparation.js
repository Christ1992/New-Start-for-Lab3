var DinnerPreparation = function (container, model) {
	this.dinnerPre=container.find("#dinnerPre");

	model.addObserver(this);

	this.update=function(obj){
		if(obj=="preparationReady"){
			var html='';
			var newDishes = model.getFullMenu();
			for (i = 0; i < newDishes.length; i++) { 
				html+="<div class='row padding' ><div class='col-md-2'><img class='borderAll' src='"+newDishes[i].ImageURL
						+"' alt='"+newDishes[i].Title+"'></div><div class='col-md-4'><h2>"
						+newDishes[i].Title+"</h2><p>"+newDishes[i].Description+"</p></div><div class='col-md-6'><h4>Preparation</h4><p>"
						+newDishes[i].Instructions+"</p></div></div>";
			}
		this.dinnerPre.html(html);				
		}


	}
   
    
}
