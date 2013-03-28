require.config({
  baseUrl: "./js/",
  paths: {
    jquery: 'vendor/jquery-1.9.1',// //cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js
    underscore: 'vendor/underscore-1.4.4',// //cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js
    backbone: 'vendor/backbone-1.0.0',// //cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js
    'backbone.localStorage': 'vendor/backbone.localStorage'
    // //cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.1.1/bootstrap.min.js
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    }
  }
});

require([ 'jquery', 'backbone', 'views/Header', 'views/Home', 'views/List', 'views/About' /*, 'views/Main'*/],
  function($, Backbone, HeaderView, HomeView, ListView, AboutView/*, MainView*/ ) {

  var Router = Backbone.Router.extend({
    routes: {
      // "": "main",
      '': 'home',
      'list': 'list',
      'about': 'about'
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

  var router = new Router();
  Backbone.history.start();
 
});