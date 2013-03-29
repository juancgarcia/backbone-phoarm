define([
	// Libraries
	'jquery',
	'backbone',

	// Modules
	'modules/Base/Main'

	// Library extensions
],
function($, Backbone, BaseModule){

	var AboutView = BaseModule.Views.Base.extend({
		className: 'About'
	});

	return AboutView;
});
