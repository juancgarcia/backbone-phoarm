define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'./WorkflowManager',
	'./CreateContract.WorkflowStates'


	// Library extensions
],
function($, _, Backbone, WFManager, NewContractStates){
	var Workflows = {};
	Workflows.Manager = WFManager;
	Workflows.NewContractWorkflowStates = NewContractStates;

	return Workflows;
});