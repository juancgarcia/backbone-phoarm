define([
	// Libraries
	'backbone',

	// Modules
	'modules/Base',
	'require'

	// Library extensions
],
function(Backbone, BaseModule, relativeRequire){

	var HomeView = BaseModule.Views.Base.extend({
		
		className: 'ContractHome',

		// _relativeRequire: relativeRequire,

		// _templatePath: '../tpl/'

		template: _.template('<div>Contracts Home</div>')
	    
	});

	return HomeView;
});