define([
	// Libraries
	'backbone',

	// Modules
	'modules/Base',
	'require'

	// Library extensions
],
function(Backbone, BaseModule, relativeRequire){

	var OptionsView = BaseModule.Views.Base.extend({
		
		className: 'WizardOptions',
		
		_relativeRequire: relativeRequire,

		_templatePath: '../tpl/'
	    
	});

	return OptionsView;
});