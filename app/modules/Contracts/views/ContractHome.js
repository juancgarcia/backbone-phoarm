define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'text!../tpl/Home.html'

	// Library extensions
],
function($, _, Backbone, templateHtml){

	var HomeView = Backbone.View.extend({

		template: _.template(templateHtml),

		render: function(){
			this.$el.html(this.template());
			return this;
		}

	});

	return HomeView;
});