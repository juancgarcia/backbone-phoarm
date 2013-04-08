define([
	// Libraries
	'jquery',
	'backbone',

	// Modules
	'modules/Base'

	// Library extensions
],
function($, Backbone, BaseModule){

	var HeaderView = BaseModule.Views.Base.extend({
		
		className: 'Header',

	    selectMenuItem: function (menuItem) {
	        $('.nav li').removeClass('active');
	        if (menuItem) {
	            $('.' + menuItem).addClass('active');
	        }
	    }
	});

	return HeaderView;
});
