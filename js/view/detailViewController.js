//Bug. 跳转

var DetailViewController = function (view,model) {
	//$(document).on('click','#backToSelect',function(){
	//view.backToSelect.on('click',function(){
	view.backToSelect.click(function(){
		
		$("#searchArea").css('display','none');
		$("#detailView").css('display','block');
	});

	view.confirmDish.click(function(){
		
		model.addDishToMenu(model.getDetailID());




		$("#searchArea").css('display','none');
		$("#detailView").css('display','block');
	});





}