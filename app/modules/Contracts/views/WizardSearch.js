define([
	// Libraries
	'backbone',

	// Modules
	'modules/Base',
	'require'

	// Library extensions
],
function(Backbone, BaseModule, relativeRequire){

	var SearchView = BaseModule.Views.Base.extend({

		className: 'WizardSearch',

		_relativeRequire: relativeRequire,

		_templatePath: '../tpl/'

	});

	return SearchView;
});