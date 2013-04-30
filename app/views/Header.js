define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	// 'AppState',
	'modules/Auth',
	'text!../tpl/Header.html'

	// Library extensions
],
function($, _, Backbone, AuthModule, /*AppState,*/ templateHtml){

	var HeaderView = Backbone.View.extend({

		template: _.template(templateHtml),

		initialize: function(){
			AuthModule.on('logout', this.renderLoginLink, this);
			AuthModule.on('login', this.renderLogoutLink, this);
		},

		events: {
			"click .logLink":"logClick"
		},

		logClick: function(){
			if(AuthModule.isAuthorized())
				AuthModule.trigger('deauthentication_request');
			else
				AuthModule.trigger('authentication_request');
		},

		render: function(){
			this.$el.html(this.template());
			this.renderLogLink();
			return this;
		},

		renderLogLink: function(){
			if(AuthModule.isAuthorized())
				this.renderLogoutLink();
			else
				this.renderLoginLink();
		},

		renderLogoutLink: function(){
			this.$('.logLink').html('Logout');
		},

		renderLoginLink: function(){
			this.$('.logLink').html('Login');
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
