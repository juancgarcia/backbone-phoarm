define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'text!../tpl/ContractListItem.html'

	// Library extensions
],
function($, _, Backbone, templateHtml){

	var ListItemView = Backbone.View.extend({

		template: _.template(templateHtml),

		render: function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			return this;
		}

	});

	return ListItemView;
});