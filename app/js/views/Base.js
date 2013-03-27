define(['jquery', 'backbone'],
    function($, Backbone){
    var BaseView = Backbone.View.extend({
        initialize: function(args){
            if(args && args.autoRender === false) {} else this.render();
        },
        render: function (eventName) {
            //this.$el.html(this.template());
            $(this.el).html(this.template());
            return this;
        },
        putAway: function(){
            this.el;
        }
    });

    return BaseView;
});