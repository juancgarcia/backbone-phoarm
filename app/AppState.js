define([
	// Libraries
	'jquery',
	'underscore',
	'backbone'

	// Modules

	// Library extensions
],
function($, _, Backbone){
	var AppState = Backbone.Model.extend({
		initialize: function(){
			this.on("all", this.defaultEvent);
		},
		defaults: {
		},
		defaultEvent: function(eventName){
			console.log('[APPSTATE]:'+eventName);
		}
	});

	return new AppState();
});