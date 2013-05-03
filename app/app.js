define([
	// Libraries
	'jquery',
	'backbone',

	// Modules
	'AppState',
	'views/all',
	'modules/Contracts',

	// Library extensions
	'backbone.forms',
	'console.log'
],
function($, Backbone, AppState, AppViews, ContractsModule) {

	var Routers = {},
		AppRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'list': 'list',
			'about': 'about',
			'contracts/*subroute': 'invokeContractsModule'
		},

		initialize: function(){
			var router = this;
			AppState.trigger('initialize');
			this.appSelector = '.appContainer';
			new AppViews.Header().setElement($('.header')).render();

			$('.nav a').click(function(e){
				var base = '#',
					hash = e.target.hash;
				if(hash.indexOf(base) === 0){
					e.preventDefault();
					var route = hash.slice(base.length);
					router.navigate("");
					router.navigate(route, {trigger: true});
				}
			});
		},

		swapView: function(view){
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