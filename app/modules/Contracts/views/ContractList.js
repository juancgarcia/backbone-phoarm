define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'./ContractListItem',
	'modules/Base',
	'require'

	// Library extensions
],
function($, _, Backbone, ContractView, BaseModule, relativeRequire){

	var ContractListView = BaseModule.Views.Base.extend({
		tagName: 'ul',
		
		className: 'ContractList',
		_relativeRequire: relativeRequire,
		template: function(){},
		_templatePath: '../tpl/',

		initialize: function(){
			this.collection.on('reset', this.render, this);
			BaseModule.Views.Base.prototype.initialize.apply(this, arguments);
		},
		_renderCallback: function(){
			this.$el.empty().hide();
			this.collection.each(this.add, this);

			if(this.parentView)
				this.parentView.getManagedRegion$El(this.regionSelector || undefined).append(this.$el);

			this.rendered = true;
			this.trigger('rendered');
			this.rendering = false;
			//return this;
		},
		add: function(model){
			var child = new ContractView({model: model});
			this.$el.append(child.render().$el).show();
		}
	});
	return ContractListView;
});