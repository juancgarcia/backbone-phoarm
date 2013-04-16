define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'../views/all'

	// Library extensions
],
function($, _, Backbone, ContractViews){
	states = {
		'startSearch': {
			'action': function(){
				var workflow = this,
					search = workflow.getForm(ContractViews.WizardSearch);
			},
			'prev': void 0,
			'next': 'startProduct'
		},
		'startProduct': {
			'action': function(){
				var workflow = this,
					product = workflow.getForm(
						ContractViews.WizardSelection,
						Backbone.Model.extend({schema:{
							product: {type: /*'Radio'*/ 'Select', options: workflow.serverResponse.toJSON()}
						}}));
			},
			'prev': 'startSearch',
			'next': 'startOption'
		},
		'startOption':{
			'action': function(){
				var workflow = this,
					option = workflow.getForm(ContractViews.WizardOptions);
			},
			'prev': 'startProduct',
			'next': 'startCustomer'
		},
		'startCustomer':{
			'action': function(){
				var workflow = this,
					customer = workflow.getForm(ContractViews.WizardCustomer);
			},
			'prev': 'startOption',
			'next': 'finalState'
		},
		'submitContract': {
			'action': function(){
				var workflow = this,
					finalStep = workflow.getForm(Backbone.View.extend({
						template: _.template('<div><h3>Completed!</h3></div>')
					}));

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