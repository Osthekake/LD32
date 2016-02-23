var App = {};

App.template = {
	'ingredients' : Handlebars.compile($("#ingredient_list").html()),
	'details' : Handlebars.compile($("#ingredient_detail").html()),
	'schematic' : Handlebars.compile($("#view_schematic").html()),
};	 

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

App.weapon = {};

App.drop = function(ev, slot) {
    ev.preventDefault();
    if(App.weapon[slot]){
    	console.log("slot already filled");
    	return;
    }
    var ingredient = ev.dataTransfer.getData("ingredient");
    var image = ev.dataTransfer.getData("img");
    ev.target.innerHTML = image;
    console.log("slot: " + slot + ", ingredient: " + ingredient);
    //App.weapon[slot] = App.data.ingredient[ingredient];
    App.weapon[slot] = ingredient;
    console.log(App.weapon);
};


App.viewIngredient = function(ingredientName){
	var ingredient = App.data.ingredient[ingredientName];
	//console.log(ingredient);
	$('#details').html(App.template['details'](ingredient));
};
App.viewIngredient();

Handlebars.registerHelper('ingredientImage', function(ingredient) {
  return "<img id='"+ingredient.key+"' src='images/"+ingredient.imagePath+"' onmouseover='App.viewIngredient(\""+ingredient.key+"\");' onmouseleave='App.viewIngredient();' ondragstart='App.drag(event)' draggable='true'></img>";
});

$('#ingredients').append(App.template['ingredients'](App.data));
$('#schematic').append(App.template['schematic'](App.data.schematic['sword']));