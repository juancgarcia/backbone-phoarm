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
					wizard = this.wrapper,
					search = workflow.getForm(ContractViews.WizardSearch);
				// workflow.setNextState('startProduct');
				var resetButtons = function() {
					wizard.setButtonState({
						'prev': false,
						'next': true,
						'reset': true,
						'submit': false
					});
				};
				if(!wizard.rendered)
					wizard.on('rendered', resetButtons);
				else
					resetButtons();
			},
			'prev': void 0,
			'next': 'startProduct'
		},
		'startProduct': {
			'action': function(){
				var workflow = this,
					wizard = this.wrapper,
					product = workflow.getForm(
						ContractViews.WizardSelection,
						Backbone.Model.extend({schema:{
							product: {type: /*'Radio'*/ 'Select', options: workflow.serverResponse.toJSON()}
						}}));
				// workflow.setNextState('startOption');
				wizard.setButtonState({'prev':true, 'next': true});
			},
			'prev': 'startSearch',
			'next': 'startOption'
		},
		'startOption':{
			'action': function(){
				var workflow = this,
					wizard = this.wrapper,
					option = workflow.getForm(ContractViews.WizardOptions);
				// workflow.setNextState('startCustomer');
				wizard.setButtonState({'prev':true, 'next': true});
			},
			'prev': 'startProduct',
			'next': 'startCustomer'
		},
		'startCustomer':{
			'action': function(){
				var workflow = this,
					wizard = this.wrapper,
					customer = workflow.getForm(ContractViews.WizardCustomer);
				// workflow.setNextState('finalState');
				wizard.setButtonState({'prev':true, 'next': false, 'submit': true});
			},
			'prev': 'startOption',
			'next': 'submitContract'
		},
		'submitContract': {
			'action': function(){
				var workflow = this,
					wizard = this.wrapper,
					finalStep = workflow.getForm(Backbone.View.extend({
						template: _.template('<div><h3>Completed!</h3></div>')
					}));
				// workflow.setNextState('finalState');
				wizard.setButtonState({'prev':true, 'next': false, 'submit': false});

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