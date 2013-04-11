define([
	// Libraries
	'backbone',

	// Modules
	'modules/Base',
	'require'

	// Library extensions
],
function(Backbone, BaseModule, relativeRequire){

	var ListItemView = BaseModule.Views.Base.extend({

		className: 'ContractListItem',

		_relativeRequire: relativeRequire,

		_templatePath: '../tpl/'

	});

	return ListItemView;
});