define([
	// Libraries
	'backbone',

	// Modules

	// Library extensions
	'backbone.forms'
],
function(Backbone){

	var SearchView = Backbone.Form.extend({

		schema: {
			vin: 'Text',
			stock: 'Text',
			mileage: 'Number',
			condition: { type: 'Select', options: ['new', 'used'] }/*,
			"saleDate": 'Date'*/
		}

	});

	return SearchView;
});