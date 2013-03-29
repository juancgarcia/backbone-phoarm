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
                that._getTemplate(renderCallback);
            else
                renderCallback.call(that);

            return that;
        },

        _relativeRequire: null,

        _baseRelativeRequire: function(dependency, callback){
            if(_.isFunction(this._relativeRequire))
                this._relativeRequire(dependency, callback);
            else
                require(dependency, callback);

        },

        _templatePath: null,

        _getTemplatePath: function(){
            if(!this._templatePath)
                this._templatePath = '/tpl/';

            console.log('Template Path ('+this._templatePath+') for: '+this.getClassName());
            return this._templatePath;
        },

        _getTemplate: function(callback){
            callback = (typeof callback === 'function')? callback: function(){};
            var that = this;
            if(!that.template){
                that._baseRelativeRequire(['text!'+that._getTemplatePath()+that.getClassName()+'.html'], function(tpl){
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