define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'text!../tpl/About.html'

	// Library extensions
],
function($, _, Backbone, templateHtml){

	var AboutView = Backbone.View.extend({

		template: _.template(templateHtml),

		render: function(){
			this.$el.html(this.template());
			return this;
		}
	});

	return AboutView;
});
