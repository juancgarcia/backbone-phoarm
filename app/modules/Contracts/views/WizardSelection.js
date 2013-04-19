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

	var SelectionForm = WizardForm.extend({

		serviveUrl: 'http://localhost:8000/data/products.nested1.json',

		schema: {
		}
	});

	return SelectionForm;
});