define([
	// Libraries
	'jquery',
	'backbone',

	// Modules
	'views/all',
	'modules/Contracts/Main'

	// Library extensions
],
function($, Backbone, AppViews, ContractsModule) {

	var Routers = {},
		AppRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'list': 'list',
			'about': 'about',
			'contracts/*subroute': 'invokeContractsModule',
			'main': 'main'
		},

		initialize: function(){
			var that = this;
			that.containerSelector = '.appContainer';
			that.headerView = new AppViews.Header({el: $('.header'), loadTemplate:true});

			that.rootView = new AppViews.Wrapper({
				el: $(that.containerSelector) //attach view here (element must exist)
				//,containerSelector: that.containerSelector //append children here
			});
		},

		invokeContractsModule: function(subroute){
			this.rootView.$el.children().hide();
			if(!Routers.Contracts){
				Routers.Contracts = new ContractsModule.Router("contracts", {
					createTrailingSlashRoutes: true,
					containerSelector: this.containerSelector,
					parentView: this.rootView
				});
			}
		},

		home: function(){
			if(!this.homeView){
				this.homeView = new AppViews.Home({
					parentView: this.rootView,
					loadTemplate:true
				});
			}
			this.homeView.$el.siblings().hide();
			this.homeView.trigger('show');
		},

		list: function(){
			if(!this.listView){			
				this.listView = new AppViews.List({
					parentView: this.rootView,
					loadTemplate:true
				});
			}
			this.listView.$el.siblings().hide();
			this.listView.trigger('show');
		},

		about: function(){
			if(!this.aboutView){
				this.aboutView = new AppViews.About({
					parentView: this.rootView,
					loadTemplate:true
				});
			}
			this.aboutView.$el.siblings().hide();
			this.aboutView.trigger('show');
		}
	});

	// Preload CSS Sprite
	$('<img/>').attr('src', "./css/glyphicons.png");

	var router = new AppRouter();
	Backbone.history.start();

});