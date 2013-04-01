define([
	// Libraries
	'backbone',

	// Modules
	'modules/Base/Main',
	'require'

	// Library extensions
],
function(Backbone, BaseModule, relativeRequire){

	var DetailView = BaseModule.Views.Base.extend({
		
		className: 'ContractDetail',

		_relativeRequire: relativeRequire,

		_templatePath: '../tpl/'
	    
	});

	return DetailView;
});