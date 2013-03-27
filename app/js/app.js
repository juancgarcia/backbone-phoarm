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

require([
    'jquery',
    'backbone',
    //'models/Todo',
    'views/Header'
  ], function($, Backbone, /*Todo,*/ HeaderView ) {

  var Router = Backbone.Router.extend({
    routes: {
      "": "main"
    },

    initialize: function(){
      this.headerView = new HeaderView({el: $('.header')});/*auto-renders*/
      //this.headerView.render();
      //this.mainView = new MainView()
    },

    main: function(){
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
    }
  });

  // Preload CSS Sprite
  $('<img/>').attr('src', "./css/glyphicons.png");

  var router = new Router();
  Backbone.history.start();

  // wardrobeMe.kickstart = _.after(_.size(wardrobeMe.views), _.once( function(){
  //     wardrobeMe.router = new AppRouter();
  //     Backbone.history.start();
  //     //console.log('kickstarted');
  // }));

// //Load Templates
// _.each(wardrobeMe.views, function(classDef, className, list){
//     $.get('tpl/' + className + '.html', function(data) {
//         classDef.prototype.template = _.template(data);
//         //console.log('kickstart attempted');
//         wardrobeMe.kickstart();
//     }).fail(function() {
//         //increment the load counter
//         console.log('could not load '+className);
//         wardrobeMe.kickstart();
//     });
// }); 
 
});