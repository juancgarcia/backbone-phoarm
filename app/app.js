define([
	// Libraries
	'jquery',
	'backbone',

	// Modules
	'AppState',
	'views/all',
	'modules/Auth',
	'modules/Contracts',

	// Library extensions
	'backbone.forms'
],
function($, Backbone, AppState, AppViews, AuthModule, ContractsModule) {

	var Routers = {},
		AppRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'login': 'login',
			'list': 'list',
			'about': 'about',
			'contracts/*subroute': 'invokeContractsModule'
		},

		initialize: function(){
			AppState.trigger('initialize');
			this.appSelector = '.appContainer';
			new AppViews.Header().setElement($('.header')).render();
			this.loginView = new AuthModule.Views.Credentials({
				model: new AuthModule.Models.Credentials.Model()
			});
			this.loginView.render().$el.hide().appendTo($('body'));

			AppState.on('login', function(){
				this.loginView.$el.show();

				this.loginView.$el.lightbox_me({
					centered: true,
					onLoad: function() {
						// $('#sign_up').find('input:first').focus()
						}
					});

			}, this);
		},

		swapView: function(view){
			if(this.currentView) this.currentView.off();
			if(!view){ this.loginView.$el.hide(); return;}
			this.currentView = view.setElement($(this.appSelector)).render();
		},

		invokeContractsModule: function(subroute){
			if(!Routers.Contracts){
				Routers.Contracts = ContractsModule.Init({
					routePath: "contracts",
					containerSelector: this.appSelector
				});
			}
		},

		login: function(){
			// this.swapView(new AuthModule.Views.Credentials({
			// 	model: new AuthModule.Models.Credentials.Model()
			// }));

			this.swapView(null);
			this.loginView.$el.show();
		},

		home: function(){
			this.swapView(new AppViews.Home());
		},

		list: function(){
			this.swapView(new AppViews.List());
		},

		about: function(){
			this.swapView(new AppViews.About());
		}
	});

	// Preload CSS Sprite
	$('<img/>').attr('src', "./css/glyphicons.png");

	var router = new AppRouter();
	Backbone.history.start();
});