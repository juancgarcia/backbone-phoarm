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

	var SearchForm = WizardForm.extend({

		serviceUrl: 'http://localhost:8000/data/products.nested1.json',

		schema: {
			vin: 'Text',
			stock: 'Text',
			mileage: 'Number',
			condition: { type: 'Select', options: ['new', 'used'] },
			"saleDate": 'Date'
		}
	});

	return SearchForm;
});