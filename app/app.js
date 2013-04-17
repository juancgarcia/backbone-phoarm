define([
	// Libraries
	'jquery',
	'backbone',

	// Modules
	'views/all',
	'modules/Contracts'

	// Library extensions
],
function($, Backbone, AppViews, ContractsModule) {

	var Routers = {},
		AppRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'list': 'list',
			'about': 'about',
			'contracts/*subroute': 'invokeContractsModule'
		},

		initialize: function(){
			this.appSelector = '.appContainer';
			new AppViews.Header().setElement($('.header')).render();
		},

		swapView: function(view, test){
			if(this.currentView) this.currentView.off();
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