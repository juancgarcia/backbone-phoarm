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
		
		className: 'ContractListView',
		_relativeRequire: relativeRequire,
		_templatePath: '../tpl/',

		initialize: function(){
			this.collection.on('reset', this.render, this);
			BaseModule.Views.Base.prototype.initialize.apply(this, arguments);
		},
		render: function(){
			this.$el.empty().hide();
			this.collection.each(this.add, this);
			return this;
		},
		add: function(model){
			var child = new ContractView({model: model});
			this.$el.append(child.render().$el).show();
		}
	});
	return ContractListView;
});