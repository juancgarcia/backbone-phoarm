define([
	// Libraries
	'backbone',

	// Modules
	'modules/Base',
	'require'

	// Library extensions
],
function(Backbone, BaseModule, relativeRequire){

	var CustomerView = BaseModule.Views.Base.extend({

		className: 'WizardCustomer',

		_relativeRequire: relativeRequire,

		_templatePath: '../tpl/'

	});

	return CustomerView;
});