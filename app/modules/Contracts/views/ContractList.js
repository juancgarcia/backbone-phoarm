define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'./ContractListItem'

	// Library extensions
],
function($, _, Backbone, ContractView, templateHtml){

	var ContractListView = Backbone.View.extend({
		tagName: 'ul',

		initialize: function(){
			this.collection.on('reset', this.render, this);
		},
		add: function(model){
			var child = new ContractView({model: model});
			this.$el.append(child.render().$el).show();
		},
		render: function(){
			this.$el.empty().hide();
			this.collection.each(this.add, this);
			return this;
		}
	});
	return ContractListView;
});