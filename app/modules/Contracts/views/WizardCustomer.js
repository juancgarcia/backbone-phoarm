define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'../views/WizardForm'

	// Library extensions
],
function($, _, Backbone, WizardForm){

	var CustomerView = WizardForm.extend({

		serviceUrl: 'http://localhost:8000/data/products.nested1.json',

		schema: {
			title: { type: 'Select', options: ['Mr', 'Mrs', 'Ms'] },
			name: 'Text',
			email: { type: 'Text'/*, validators: ['required', 'email']*/ }/*,
			address: { type: 'NestedModel', model: Address }*/
		}
	});

	return CustomerView;
});