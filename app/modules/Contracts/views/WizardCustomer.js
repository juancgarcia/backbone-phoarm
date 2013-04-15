define([
	// Libraries
	'backbone',

	// Modules

	// Library extensions
	'backbone.forms'
],
function(Backbone){

	var CustomerView = Backbone.Form.extend({

		schema: {
			title: { type: 'Select', options: ['Mr', 'Mrs', 'Ms'] },
			name: 'Text',
			email: { type: 'Text'/*, validators: ['required', 'email']*/ }/*,
			address: { type: 'NestedModel', model: Address }*/
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

	return CustomerView;
});