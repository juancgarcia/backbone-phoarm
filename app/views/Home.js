define([
	// Libraries
	'jquery',
	'backbone',

	// Modules
	'modules/Base'

	// Library extensions
],
function($, Backbone, BaseModule){

	var HomeView = BaseModule.Views.Base.extend({
		className: 'Home'
	});

	return HomeView;
});
