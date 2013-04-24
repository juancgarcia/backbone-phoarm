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
			line1: { type: 'Text', validators: ['required'] },
			line2: 'Text',
			city: { type: 'Text', validators: ['required'] },
			state: { type: 'Select', options: JSON.parse(StatesJSON), validators: ['required'] },
			zip: { type: 'Text', validators: [
				'required',
				/^[0-9]{5}([- ]?[0-9]{4})?$/
				] }
		}
	}),
	Addresses = Backbone.Collection.extend({
		model: Address
	});

	var Customer = Backbone.Model.extend({
		schema: {
			name: { type:'Text', validators: ['required'] },
			phone: { type: 'Text', validators: [
				'required',
				/^(\(?[0-9]{3}\)?([. ]?))?[0-9]{3}[-. ]?[0-9]{4}$/
				] },
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