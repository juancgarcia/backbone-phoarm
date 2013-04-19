define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'text!../tpl/ContractMaster.html'

	// Library extensions
],
function($, _, Backbone, templateHtml){

	var MasterView = Backbone.View.extend({

		template: _.template(templateHtml),

		render: function(){
			this.$el.html(this.template());
			return this;
		}

	});

	return MasterView;
});