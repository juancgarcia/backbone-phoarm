define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'../views/all',
	'../models/all'

	// Library extensions
],
function($, _, Backbone, ContractViews, ContractModels){
	states = {
		'startSearch': {
			'action': function(){
				var workflow = this,
					search = new ContractViews.WizardForm({
						model: new ContractModels.VehicleValidator.Model(),
						serviceUrl: '/data/vehicleSearchResponse.json'
					});
				workflow.setForm(search);
			},
			'prev': void 0,
			'next': 'startProduct'
		},
		'startProduct': {
			'action': function(){
				var workflow = this,
					product = new ContractViews.WizardForm({
						model: new ContractModels.Product.Select(),
						serviceUrl: 'http://localhost:8000/data/products.nested1.json'
					});
				workflow.setForm(product);
			},
			'prev': 'startSearch',
			'next': 'startOption'
		},
		'startOption':{
			'action': function(){
				var workflow = this,
					option = new ContractViews.WizardForm({
						model: new Backbone.Model(),
						serviceUrl: 'http://localhost:8000/data/products.nested1.json',
						schema: {
							option: {
								type: 'Select',
								options: ['A', 'B', 'C']
							}
						}
					});
				workflow.setForm(option);
			},
			'prev': 'startProduct',
			'next': 'startCustomer'
		},
		'startCustomer':{
			'action': function(){
				var workflow = this,
					customer = new ContractViews.WizardForm({
						model: new ContractModels.Customer.Model(),
						serviceUrl: 'http://localhost:8000/data/products.nested1.json'
					});
				workflow.setForm(customer);
			},
			'prev': 'startOption',
			'next': 'finalState'
		},
		'submitContract': {
			'action': function(){
				var workflow = this,
					form = Backbone.View.extend({
						template: _.template('<div><h3>Completed!</h3></div>')
					}),
					finalStep = new form({
						model: new Backbone.Model()
					});
				workflow.setForm(finalStep);

				console.log('Contract Submission goes here');
				// auto-submit the details
				// onSuccess show a view with success message
				// onFail ask to reset or go to prev step
			},
			'prev': 'startCustomer',
			'next': void 0
		}
	};
	states.initialState = states.startSearch;
	states.finalState = states.submitContract;

	return states;
});