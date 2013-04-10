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
			var that = this;
			that.containerSelector = '.appContainer';
			that.headerView = new AppViews.Header({el: $('.header'), loadTemplate:true});

			that.rootView = new AppViews.Wrapper({
				el: $(that.containerSelector) //attach view here (element must exist)
				//,containerSelector: that.containerSelector //append children here
			}).render();
		},

		swapView: function(view){
			if(this.currentView){
				this.currentView.remove();
			}
			this.currentView = view.trigger('show');
		},

		invokeContractsModule: function(subroute){
			this.rootView.$el.children().hide();
			if(!Routers.Contracts){
				Routers.Contracts = ContractsModule.Init({
					routePath: "contracts", 
					createTrailingSlashRoutes: true,
					parentView: this.rootView
				});
			}
		},

		home: function(){
			homeView = new AppViews.Home({
				parentView: this.rootView,
				loadTemplate:true
			});
			this.swapView(homeView);
			homeView.on('rendered', function(){
				homeView.$el.siblings().hide();
			}, this);
		},

		list: function(){
			listView = new AppViews.List({
				parentView: this.rootView,
				loadTemplate:true
			});
			this.swapView(listView);
			listView.on('rendered', function(){
				listView.$el.siblings().hide();
			}, this);
		},

		about: function(){
			aboutView = new AppViews.About({
				parentView: this.rootView,
				loadTemplate:true
			});
			this.swapView(aboutView);
			aboutView.on('rendered', function(){
				aboutView.$el.siblings().hide();
			}, this);
		}
	});

	// Preload CSS Sprite
	$('<img/>').attr('src', "./css/glyphicons.png");

	var router = new AppRouter();
	Backbone.history.start();

});