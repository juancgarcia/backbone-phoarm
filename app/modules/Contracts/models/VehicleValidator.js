define([
	// Libraries
	'underscore',
	'backbone'

	// Modules

	// Library Extensions
],
function(_, Backbone){

	var VehicleValidator = Backbone.Model.extend({
		defaults: {
			vin: '',
			stock: '',
			miles: 0,
			condition: 'used',
			saleDate: 0
		},
		schema: {
			vin: { type:'Text', validators: ['required'] },
			stock: { type:'Text', validators: ['required'] },
			mileage: { type: 'Number', validators: ['required'] },
			condition: { type: 'Select', options: ['new', 'used'], validators: ['required'] },
			"saleDate": { type: 'Date', validators: ['required'] }
		}
	});

	var VehicleValidators = Backbone.Collection.extend({
		defaults: {
			model: VehicleValidator
		},
		url: '/data/contracts.json',
		Model: VehicleValidator
	});

	return {
		Model: VehicleValidator,
		Collection: VehicleValidators
	};
});