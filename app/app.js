define([
	// Libraries
	'jquery',
	'backbone',

	// Modules
	'views/Header',
	'views/Home',
	'views/List',
	'views/About',
	'modules/Contracts/Main' /*,
	'backbone.subroute'*/

	// Library extensions
],
function($, Backbone, HeaderView, HomeView, ListView, AboutView, ContractsModule/*, Subroute*/) {

	var Routers = {},
		AppRouter = Backbone.Router.extend({
		routes: {
			// "": "main",
			'': 'home',
			'list': 'list',
			'about': 'about',
			'contracts/*subroute': 'invokeContractsModule'
		},

		initialize: function(){
			var that = this;
			that.headerView = new HeaderView({el: $('.header'), loadTemplate:true});
			//that.mainView = new MainView({el: $('.container')});
			that.homeView = new HomeView({el: $('.container')});
			that.aboutView = new AboutView({el: $('.container')});
			that.listView = new ListView({el: $('.container')});
		},

		// main: function(){
		//   this.mainView.$el.show();
		// },

		invokeContractsModule: function(subroute){
			if(!Routers.Contracts){
				Routers.Contracts = new ContractsModule.Router("contracts");
			}
		},

		home: function(){
			this.homeView.render();
		},

		list: function(){
			this.listView.render();
			//var tasks = new Todo.Collection();
			//var view = new MasterView({collection: tasks});
			// tasks.fetch({
			//   success: function(tasks){
			//     $("#container").html(view.render().el).show();
			//   },
			//   error: function(model, error) {
			//     // TODO: handle errors nicer
			//     alert(error);
			//   }
			// });
		},


		about: function(){
			this.aboutView.render();
		}
	});

	// Preload CSS Sprite
	$('<img/>').attr('src', "./css/glyphicons.png");

	var router = new AppRouter();
	Backbone.history.start();

});