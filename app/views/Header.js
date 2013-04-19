define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'text!../tpl/Header.html'

	// Library extensions
],
function($, _, Backbone, templateHtml){

	var HeaderView = Backbone.View.extend({

		template: _.template(templateHtml),

		render: function(){
			this.$el.html(this.template());
			return this;
		},

		selectMenuItem: function (menuItem) {
			$('.nav li').removeClass('active');
			if (menuItem) {
				$('.' + menuItem).addClass('active');
			}
		}
	});

	return HeaderView;
});
