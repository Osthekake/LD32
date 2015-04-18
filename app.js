var App = {};

App.template = {
	'ingredients' : Handlebars.compile($("#ingredient_list").html()),
	'details' : Handlebars.compile($("#ingredient_detail").html())
};	 

App.data = {
	ingredient:{
		"banana" : {
			key : 'banana',
			imagePath : "banana.png",
			name : "Banana",
			description : "Fruity banana. Rich in potassium. Spoils easily.",
		},
		"hanger" : {
			key : 'hanger',
			imagePath : "hanger.png",
			name : "Clothes hanger",
			description : "Sturdy clothes hanger made of wood. Could be used to poke someones eye out.",
		},
		"tire" : {
			key : 'tire',
			imagePath : "tire.png",
			name : "Car tire",
			description : "Worn car tire. Heavy, bouncy and made to last.",
		},
	}
};

App.viewIngredient = function(ingredientName){
	var ingredient = App.data.ingredient[ingredientName];
	console.log(ingredient);
	$('#details').html(App.template['details'](ingredient));
};
//App.viewIngredient();

Handlebars.registerHelper('ingredientImage', function(ingredient) {
  return "<img src='images/"+ingredient.imagePath+"' onmouseover='App.viewIngredient(\""+ingredient.key+"\");'></img>";
});

$('#ingredients').append(App.template['ingredients'](App.data));