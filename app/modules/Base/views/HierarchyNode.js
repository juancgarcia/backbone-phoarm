define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'./AmdTemplate'
	//Library

	//  extensions
],
function($, _, Backbone, AmdTemplateView){
	var HierarchyNode = AmdTemplateView.extend({});
	HierarchyNode.prototype.initialize = function(args){
		args = args || {};
		_.extend(this, args);
		// add 'show' event propogation

		// add parentView stuff
		// var renderDelayed = false;

		this.on('show', function(){
			this/*.render()*/.$el.show();
			if(this.parentView)
				this.parentView.trigger('show');
		}, this);

		if(this.parentView){ // delay render 'til parent
			this.parentView.appendChild(this);

			// renderDelayed = true;
			// this.parentView.once('rendered', function(){
			// 	this.render();
			// }, this);
		}

		if(typeof this.loadTemplate !== undefined && this.loadTemplate === true) {
			// if(!renderDelayed)
				this.render();
			// console.log('this.loadTemplate=true for: '+this.getInstanceId());
		} else {
			// console.log('this.loadTemplate=false for: '+this.getInstanceId());
		}

		this.loadTemplate = args.loadTemplate = undefined;
		AmdTemplateView.prototype.initialize.apply(args);
	};

	HierarchyNode.prototype.render = function(eventName){
		var that = this,
			$el = this.$el; /*this.getChildrenEl();*/
			renderCallback = function(){
				var data = (that.model)? that.model.toJSON(): {};
				$el.html(that.template(data));
				$el.show();
				that.renderChildren();
				console.log('rendered template for: '+that.getInstanceId());
				that.trigger('rendered');
			};

		if(!that.template)
			that._getTemplate(renderCallback);
		else
			renderCallback.call(that);

		return that;
	};

	HierarchyNode.prototype.getChildrenEl = function(){
		var $el;
		if(this.containerSelector) {
			$el = $(this.containerSelector, this.$el);
			console.log('getChildrenEl ('+this.getClassName()+'): inner container ('+this.containerSelector+') selected');
		}
		else {
			$el = this.$el;
			console.log('getChildrenEl ('+this.getClassName()+'): this.$el ('+$el.selector+') selected');
		}
		console.log('$el length: '+$el.length);

		if($el.length < 1){
			/*
			return a temporary el
			and upon next 'rendered' event, add them
			*/
			var className = this.getClassName()+'_'+'temp',
				selector = '.'+className;

			if($(selector, 'body').length < 1){
				$('body').append($('<div class="'+className+'"></div>'));
			}
			$el = $(selector, 'body').hide();
			console.log('Temp el: '+$el.el);
			this.once('rendered', function(){
				_.each($el, function(el){
					this.getChildrenEl().prepend($(el).children());
				}, this);
			}, this);
		}

		return $el;
	};

	HierarchyNode.prototype.appendChild = function(childView){
		var that = this;
		that.children = that.children || [];
		that.children.push(childView);
		//that.once('rendered', function(){
			that.getChildrenEl().append(childView.$el.hide());
		//});
		return that;
	};

	HierarchyNode.prototype.renderChildren = function(){
		var that = this;
		_.each(that.children, function(childView){
			that.getChildrenEl().append(childView.$el.hide());
		});
	};

	// add getChildrenEl

	// remember to remove code from Base and extend with this where needed
	return HierarchyNode;
});