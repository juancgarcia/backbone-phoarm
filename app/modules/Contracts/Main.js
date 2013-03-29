define([
	'./routers/Main',
	'./models/Contract'
],

function(ContractRouter, ContractModel){
	
	var ContractModule = ContractModel;

	ContractModule.Router = ContractRouter;

	return ContractModule;
});