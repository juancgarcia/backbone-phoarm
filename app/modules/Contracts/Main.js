define([
	// Libraries
	'underscore',

	// Modules
	'./routers/Main',
	'./models/all',
	'./views/all'

	// Library extensions
],
function(_, ContractRouter, ContractModels, ContractViews){

	var defaults = {
		routePath: "contracts",
		createTrailingSlashRoutes: true
	};
	
	var ContractModule = {};
	ContractModule.Models = ContractModels;
	ContractModule.Router = ContractRouter;
	ContractModule.Views = ContractViews;
	ContractModule.Init = function(options){
		options = _.extend(defaults, options);
		return new ContractModule.Router( options.routePath, options );
	};

	return ContractModule;
});