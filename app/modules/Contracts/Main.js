define([
	// Libraries

	// Modules
	'./routers/Main',
	'./models/all',
	'./views/all'

	// Library extensions
],
function(ContractRouter, ContractModels, ContractViews){
	
	var ContractModule = {};

	ContractModule.Models = ContractModels;
	ContractModule.Router = ContractRouter;
	ContractModule.Views = ContractViews;

	return ContractModule;
});