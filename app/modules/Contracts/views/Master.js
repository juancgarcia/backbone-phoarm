define([
	// Libraries
	'backbone',

	// Modules
	'modules/Base',
	'require'

	// Library extensions
],
function(Backbone, BaseModule, relativeRequire){

	var MasterView = BaseModule.Views.Base.extend({
		
		className: 'ContractMaster',

		_relativeRequire: relativeRequire,

		_templatePath: '../tpl/'
	    
	});

	return MasterView;
});