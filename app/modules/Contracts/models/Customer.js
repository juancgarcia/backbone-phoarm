define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'text!/data/states_options.json'

	// Library extensions
],
function($, _, Backbone, StatesJSON){
	var Address = Backbone.Model.extend({
		schema: {
			line1: 'Text',
			line2: 'Text',
			city: { type: 'Text' },
			state: { type: 'Select', options: JSON.parse(StatesJSON) },
			zip: { type: 'Number' }
		}
	}),
	Addresses = Backbone.Collection.extend({
		model: Address
	});

	var Customer = Backbone.Model.extend({
		schema: {
			name: 'Text',
			phone: { type: 'Text'/*, validators: ['required', 'email']*/ },
			address: { type: 'NestedModel', model: Address }
		}
	}),
	Customers = Backbone.Model.extend({
		model: Customer
	});

	return {
		Model: Customer,
		Collection: Customers
	};
});