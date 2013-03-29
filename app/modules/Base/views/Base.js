define([
    'jquery',
    'backbone',
    'underscore',
    'helpers/Guid'
],
function($, Backbone, _, Guid){

    var BaseView = Backbone.View.extend({

        ready: false,

        initialize: function(args){ /*auto-load disabled*/
            if(args && typeof args.loadTemplate !== undefined && args.loadTemplate === true) {
                this.render();
                // console.log('loadTemplate=true for: '+this.getInstanceId());
            } else {
                // console.log('loadTemplate=false for: '+this.getInstanceId());
            }
        },

        render: function (eventName) {
            var that = this,
                renderCallback = function(){
                    $(that.el).html(that.template());
                    console.log('rendered template for: '+that.getInstanceId());
                };

            if(!that.template)
                that.getTemplate(renderCallback);
            else
                renderCallback.call(that);

            return that;
        },

        putAway: function(){
            this.el;
        },

        getTemplate: function(callback){
            callback = (typeof callback === 'function')? callback: function(){};
            var that = this;
            if(!that.template){
                require(['text!/tpl/'+that.getClassName()+'.html'], function(tpl){
                    that.template = _.template(tpl);
                    if(!that.ready){
                        ready = true;
                        that.trigger('ready');
                    }
                    callback.call(that);
                })
            }
        },

        getClassName: function(){
            return this.className || 'Base';
        },

        getInstanceId: function(){
            return this.getClassName()+' ('+this.getUniqueId()+')'
        }
    });

    return BaseView.extend(Guid);
});