define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'text!../tpl/List.html'

	// Library extensions
],
function($, _, Backbone, templateHtml){

	var ListView = Backbone.View.extend({

		template: _.template(templateHtml),

		render: function(){
			this.$el.html(this.template());
			return this;
		}
	});

	return ListView;
});
