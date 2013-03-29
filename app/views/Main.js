define([
  // Libraries
  'backbone',

  // Modules
  'views/Home',
  'helpers/Guid'

  // Library extensions
],
function(Backbone, HomeView, Guid) {

  var View = Backbone.View.extend({

    className: 'mainView',

    initialize: function(){
      var that = this;
      that.children = {
        //homeView: new HomeView()
      };

      that.$el.hide();

      // that.children.homeView.on('ready', function(){
      //   that.$el.append(that.children.homeView.render().el);
      // });

      // that.trigger('ready');
    },

    render: function(){
      this.$el.show();
      return this;
    }
  });

  return View.extend(Guid);
});