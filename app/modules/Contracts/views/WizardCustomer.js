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
		}

	});

	return CustomerView;
});