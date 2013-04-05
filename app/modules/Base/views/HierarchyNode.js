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

		this.on('show', function(){
			this.$el.show();
			if(this.parentView)
				this.parentView.trigger('show');
		}, this);

		if(this.parentView) this.parentView.appendChild(this);

		if(typeof this.loadTemplate !== undefined && this.loadTemplate === true) {
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
				$el.html(that.template(data)).show();
				that.renderChildren();
				console.log('rendered: '+that.getInstanceId());
				that.trigger('rendered');
			};

		if(!that.template) that._getTemplate(renderCallback);
		else renderCallback.call(that);

		return that;
	};

	HierarchyNode.prototype.getChildrenEl = function(){
		var $childrenEl;
		if(this.containerSelector) {
			$childrenEl = $(this.containerSelector, this.$el);
			console.log('getChildrenEl ('+this.getClassName()+'): inner container ('+this.containerSelector+') selected');
		}
		else {
			$childrenEl = this.$el;
			console.log('getChildrenEl ('+this.getClassName()+'): this.$el ('+$childrenEl.selector+') selected');
		}
		return $childrenEl;
	};

	HierarchyNode.prototype.hasChild = function(childView){
		return _.contains(this.children, childView);
	};

	HierarchyNode.prototype.appendUniqueChild = function(childView){
		if(!this.hasChild(childView))
			this.appendChild(childView);

		return this
	};

	HierarchyNode.prototype.appendChild = function(childView){
		var that = this;
		that.children = that.children || [];
		that.children.push(childView);
		that.getChildrenEl().append(childView.$el.hide());
		return that;
	};

	HierarchyNode.prototype.renderChildren = function(){
		var that = this;
		_.each(that.children, function(childView){
			that.getChildrenEl().append(childView.$el.hide());
		});
	};

	return HierarchyNode;
});