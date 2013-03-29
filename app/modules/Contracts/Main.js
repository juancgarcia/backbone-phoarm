define([
	// Libraries

	// Modules
	'./routers/Main',
	'./models/Contract'

	// Library extensions
],
function(ContractRouter, ContractModel){
	
	var ContractModule = ContractModel;

	ContractModule.Router = ContractRouter;

	return ContractModule;
});