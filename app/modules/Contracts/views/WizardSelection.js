define([
	// Libraries
	'backbone',

	// Modules
	'modules/Base',
	'require'

	// Library extensions
],
function(Backbone, BaseModule, relativeRequire){

	var SelectionView = BaseModule.Views.Base.extend({
		
		className: 'WizardSelection',
		
		_relativeRequire: relativeRequire,

		_templatePath: '../tpl/'
	    
	});

	return SelectionView;
});