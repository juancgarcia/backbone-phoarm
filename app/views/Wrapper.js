define([
	// Libraries
	'jquery',
	'backbone',

	// Modules
	'modules/Base'

	// Library extensions
],
function($, Backbone, BaseModule){

	var WrapperView = BaseModule.Views.Base.extend({
		className: 'Wrapper',
		template : function(){}
	});

	return WrapperView;
});
