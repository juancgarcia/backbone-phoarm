define([
	// Libraries
	'backbone',

	// Modules

	// Library extensions
	'backbone.forms'
],
function(Backbone){

	var SearchForm = Backbone.Form.extend({

		schema: {
			vin: 'Text',
			stock: 'Text',
			mileage: 'Number',
			condition: { type: 'Select', options: ['new', 'used'] },
			"saleDate": 'Date'
		},
		send: function(){
			var form = this;
			$.ajax({
				url: 'http://localhost:8000/data/products.nested1.json'
			}).done(function(data, textStatus, jqXHR){
				form.succeeded(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				form.failed(jqXHR, textStatus, errorThrown);
			});
		},
		// placeholders
		failed: function(){},
		succeeded: function(){}

	});

	return SearchForm;
});