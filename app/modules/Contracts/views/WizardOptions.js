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

	var OptionsView = WizardForm.extend({

		serviceUrl: 'http://localhost:8000/data/products.nested1.json',

		schema: {
			option: {
				type: 'Select',
				options: ['A', 'B', 'C']
			}
		}
	});

	return OptionsView;
});