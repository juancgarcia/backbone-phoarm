define([
	'./Router',
	'./Model'
],

function(ContractRouter, ContractModel){
	
	var ContractModule = ContractModel;

	ContractModule.Router = ContractRouter;

	return ContractModule;
});