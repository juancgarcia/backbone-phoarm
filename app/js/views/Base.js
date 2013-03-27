define(['jquery', 'backbone'],
    function($, Backbone){
    var BaseView = Backbone.View.extend({
        initialize: function(args){
            var template = this.getTemplate(function(){
                if(args && args.autoRender === false) {} else this.render();
            });
        },
        render: function (eventName) {
            $(this.el).html(this.template());
            //this.$el.html(this.template());
            
            return this;
        },
        putAway: function(){
            this.el;
        },
        getTemplate: function(callback){
            var that = this;
            if(!that.template){
                require(['text!/tpl/'+that.getClassName()+'.html'], function(tpl){
                    that.template = _.template(tpl);
                    console.log('Loaded template for: '+that.className);
                    callback.call(that);
                })
            }
        },
        getClassName: function(){
            return this.className || 'Base';
        }
    });

    return BaseView;
});