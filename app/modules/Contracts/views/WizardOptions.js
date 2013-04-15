define([
	// Libraries
	'backbone',

	// Modules

	// Library extensions
	'backbone.forms'
],
function(Backbone){

	var OptionsView = Backbone.Form.extend({

		schema: {
			option: {
				type: 'Select',
				options: ['A', 'B', 'C']
			}
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

	return OptionsView;
});