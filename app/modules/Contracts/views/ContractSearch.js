define([
	// Libraries
	'backbone',

	// Modules
	'modules/Base/Main',
	'require'

	// Library extensions
],
function(Backbone, BaseModule, relativeRequire){

	var SearchView = BaseModule.Views.Base.extend({
		
		className: 'ContractSearch',
		
		_relativeRequire: relativeRequire,

		_templatePath: '../tpl/'
	    
	});

	return SearchView;
});