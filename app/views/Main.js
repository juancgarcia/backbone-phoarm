define(['backbone', 'views/Home', 'helpers/PubSub'],
  function(Backbone, HomeView, PubSub) {

  var View = Backbone.View.extend({

    className: 'mainView',

    initialize: function(){
      var that = this;
      that.children = {
        //homeView: new HomeView()
      };

      that.$el.hide();

      // that.children.homeView.sub("ready", function(){
      //   that.$el.append(that.children.homeView.render().el);
      // });

      that.pub("ready", 'MainView finished initialize')
    },

    render: function(){
      this.$el.show();
      return this;
    }
  });

  return View.extend(PubSub);
});