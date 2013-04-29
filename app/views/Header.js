define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'AppState',
	'text!../tpl/Header.html'

	// Library extensions
],
function($, _, Backbone, AppState, templateHtml){

	var HeaderView = Backbone.View.extend({

		template: _.template(templateHtml),

		render: function(){
			this.$el.html(this.template());
			return this;
		},

		events: {
			"click.login":"login"
		},

		login: function(){
			AppState.trigger('login');
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
