define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'./ContractListItem',
	'modules/Base/Main'

	// Library extensions
],
function($, _, Backbone, ContractView, BaseModule){
	var ContractListView = Backbone.View.extend({
		tagName: 'ul',
		className: 'ContractListView',
		initialize: function(){
			this.collection.on('reset', this.render, this);
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