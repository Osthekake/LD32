var App = {};

App.template = {
	'ingredients' : Handlebars.compile($("#ingredient_list").html()),
	'image' : Handlebars.compile($("#ingredient_image").html()),
	'details' : Handlebars.compile($("#ingredient_detail").html()),
	'schematic' : Handlebars.compile($("#view_schematic").html()),
	'bars' : Handlebars.compile($("#forge_result").html())
};	 

Handlebars.registerHelper('ingredientImage', function(ingredient) {
	var context = ingredient;
	context.id = context.key;
	return App.template['image'](context);
});

App.data = {
	properties:["sharp", "pointy", "reach", "hard", "heavy", "grip", "string", "absorbing", "sticky", "poison", "cold", "radioactive", "flammable"],
	ingredient:{
		undefined : {
			name : "Select ingredients.",
			description : "Hover over an ingredient to see a description. Drag it into the schematic to use it.",
		},
		"banana" : {
			key : 'banana',
			imagePath : "banana.png",
			name : "Banana",
			description : "Fruity banana. Rich in potassium. Spoils easily.",
			properties: {
				"grip" : 5,
				"heavy": 1,
				"absorbing": 2,
				"sticky": 1
			}
		},
		"hanger" : {
			key : 'hanger',
			imagePath : "hanger.png",
			name : "Clothes hanger",
			description : "Sturdy clothes hanger made of wood. Could be used to poke someones eye out.",
			properties: {
				"reach" : 3,
				"hard": 3,
				"pointy": 1,
				"flammable":2
			}
		},
		"tire" : {
			key : 'tire',
			imagePath : "tire.png",
			name : "Car tire",
			description : "Worn car tire. Heavy, bouncy and made to last.",
			properties: {
				"heavy" : 4,
				"hard": 3,
				"absorbing": 4,
				"flammable": 3
			}
		},
		"knitting" : {
			key : 'knitting',
			imagePath : "knitting.png",
			name : "Knitting needle",
			description : "Long knitting needle. Pointy",
			properties: {
				"pointy" : 4,
				"reach": 1
			}
		},
		"boot" : {
			key : 'boot',
			imagePath : "boot.png",
			name : "Boot",
			description : "Old boot.",
			properties: {
				"heavy" : 2,
				"string": 4,
				"absorbing": 3
			}
		},
		"broom" : {
			key : 'broom',
			imagePath : "broom.png",
			name : "Broom",
			description : "Long wooden shaft with red broom on the end.",
			properties: {
				"reach" : 5,
				"hard": 3,
				"flammable": 3
			}
		},
		"flashlight" : {
			key : 'flashlight',
			imagePath : "flashlight.png",
			name : "Flashlight",
			description : "Steel flashlight. No batteries. Nice grip pattern.",
			properties: {
				"grip" : 5,
				"hard": 4,
				"heavy": 3
			}
		},
	},
	schematic: {
		"club":{
			key:'club',
			name: "Forge Club",
			slot: {
				"head": {
					key : 'head',
					name : "Head",
					"lethality" : ["heavy", "hard"],
				},
				"shaft":{
					key : 'shaft',
					name : "Shaft",
					"lethality" : ["reach", "grip"],
				}
			}
		},
		"spear":{
			key:'spear',
			name: "Forge Spear",
			slot: {
				"head": {
					key : 'head',
					name : "Head",
					"lethality" : ["pointy"],
				},
				"shaft":{
					key : 'shaft',
					name : "Shaft",
					"lethality" : ["reach", "grip"],
				}
			}
		},
		"shiv":{
			key:"shiv",
			name:"Forge Shiv",
			slot: {
				"blade": {
					key : 'blade',
					name : "Blade",
					"lethality" : ["sharp", "pointy", "poison"],
				},
				"grip":{
					key : 'grip',
					name : "Grip",
					"lethality" : ["grip"],
				}
			}
		},
		"sword":{
			key:"sword",
			name: "Forge Sword",
			slot: {
				"blade": {
					key : 'blade',
					name : "Blade",
					"lethality" : ["sharp", "pointy", "reach"],
				},
				"guard":{
					key : 'guard',
					name : "Guard",
					"lethality" : ["hard"],
				},
				"grip":{
					key : 'grip',
					name : "Grip",
					"lethality" : ["grip", "heavy"],
				}
			}
		},
		"mace":{
			key:"mace",
			name: "Forge Mace",
			slot: {
				"head": {
					key : 'head',
					name : "Head",
					"lethality" : ["heavy", "hard"],
				},
				"shaft":{
					key : 'shaft',
					name : "Shaft",
					"lethality" : ["hard", "reach"],
				},
				"grip":{
					key : 'grip',
					name : "Grip",
					"lethality" : ["grip"],
				}
			}
		},
	}
};

App.allowDrop = function(ev) {
    ev.preventDefault();
};

App.drag = function(ev) {
    ev.dataTransfer.setData("ingredient", ev.target.id);
    ev.dataTransfer.setData("img", ev.target.outerHTML);
};

App.drop = function(ev, slot) {
    ev.preventDefault();
    
    var ingredientName = ev.dataTransfer.getData("ingredient");
    var ingredient = App.data.ingredient[ingredientName];
    //console.log(App.data.ingredient[ingredientName]);
    var image = ev.dataTransfer.getData("img");
    
    console.log("slot: " + slot + ", ingredient: " + ingredientName);
    //App.weapon[slot] = App.data.ingredient[ingredient];
    //App.Schematic.weapon[slot] = ingredientName;
    Schematic.useIngredient(slot, ingredient);
    //console.log(Schematic.weapon);
};
var Ingredients = {
	useIngredient: function(ingredient){
		console.log("use ingredient " + ingredient);
		var $ingredient = $('#ingredient-'+ingredient);
	    $ingredient.addClass("ingredient-used");
	    $ingredient.removeClass("ingredient-free");
	    $('#'+ingredient).attr('draggable', false);
	},
	freeIngredient: function(ingredient){
		console.log("free ingredient " + ingredient);
		var $ingredient = $('#ingredient-'+ingredient);
	    $ingredient.removeClass("ingredient-used");
	    $ingredient.addClass("ingredient-free");
	    $('#'+ingredient).attr('draggable', true);
	}
}

App.viewIngredient = function(ingredientName){
	var ingredient = App.data.ingredient[ingredientName];
	//console.log(ingredient);
	$('#details').html(App.template['details'](ingredient));
};

App.renderIngredients = function(){
	$('#ingredients').append(App.template['ingredients'](App.data));	
}

App.render = function(){
	App.renderIngredients();
	Schematic.render();
}
var Schematic = {
	forge: function(){
		console.log("forging");
		var stats = {};
		var blueprint = App.data.schematic[Schematic.schematic].slot;
		for(slot in Schematic.weapon){
			var ingredientName = Schematic.weapon[slot];
			var ingredient = App.data.ingredient[ingredientName].properties;
			var schematicSlot = blueprint[slot].lethality;
			for(i in schematicSlot){
				var attribute = schematicSlot[i];
				var value = ingredient[attribute];
				//console.log(attribute +" of slot " + slot + " is " + value);
				if(value){
					if(stats[attribute]){
						stats[attribute] += value * 10;
					} else {
						stats[attribute] = value * 10;
					}
				}
			}
		}
		
		console.log(stats);
		var context = {stats:stats};
		$("#result").empty();
		$("#result").append(App.template['bars'](context));
	},
	useIngredient: function(slot, ingredient){
		if(Schematic.weapon[slot]){
			Schematic.freeSlot(slot);
		}
		//console.log(ingredient);
		Schematic.weapon[slot] = ingredient.key;
		ingredient.id = "used-"+ingredient.key;
		$('#slot-'+slot).addClass("slot-taken");
		$('#slot-'+slot).prepend(App.template['image'](ingredient));
		Ingredients.useIngredient(ingredient.key);
		Schematic.forge();
	},
	freeSlot: function(slot){
		var ingredient = Schematic.weapon[slot];
		console.log(ingredient);
		Ingredients.freeIngredient(ingredient);
		delete Schematic.weapon[slot];
		$('#slot-'+slot).removeClass("slot-taken");
		$("#used-"+ingredient).remove();
		Schematic.forge();
	},
	load: function(schematicName){
		console.log("Loading schematic " + schematicName);
		Schematic.schematic = schematicName;
		Schematic.data = App.data.schematic[schematicName];
		Schematic.weapon = {};
		Schematic.render();
	},
	render: function(){
		console.log("rendering Schematic")
		$('#schematic').empty();
		$('#schematic').append(App.template['schematic'](Schematic.data));
	}
}
Schematic.load('sword');
App.render();
App.viewIngredient();