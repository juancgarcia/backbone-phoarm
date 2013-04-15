define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'../views/all',
	'./WorkflowManager'

	// Library extensions
],
function($, _, Backbone, ContractViews, WorkflowManager){
	states = {
		'initialState': function(){
			var workflow = this,
				search = workflow.getForm(ContractViews.WizardSearch);
			workflow.setNextState('startProduct');
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
		'startProduct': function(){
			var workflow = this,
				product = workflow.getForm(
				ContractViews.WizardSelection,
				Backbone.Model.extend({schema:{
					product: {type: /*'Radio'*/ 'Select', options: workflow.serverResponse.toJSON()}
				}}));
			workflow.setNextState('startOption');
			wizard.setButtonState({'prev':true, 'next': true});
		},
		'startOption': function(){
			var workflow = this,
				option = workflow.getForm(ContractViews.WizardOptions);
			workflow.setNextState('startCustomer');
			wizard.setButtonState({'prev':true, 'next': true});
		},
		'startCustomer': function(){
			var workflow = this,
				customer = workflow.getForm(ContractViews.WizardCustomer);
			workflow.setNextState('finalState');
			wizard.setButtonState({'prev':true, 'next': false, 'submit': true});
		}
	};

	var ContractWorkflow = function(){
		this.states = states;
		WorkflowManager.prototype.constructor.apply(this, arguments);
	};
	ContractWorkflow.prototype = WorkflowManager;

	// return _.extend(ContractWorkflow, WorkflowManager);
	return ContractWorkflow;
});