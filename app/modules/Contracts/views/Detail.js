define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'text!../tpl/ContractDetail.html'

	// Library extensions
],
function($, _, Backbone, templateHtml){

	var DetailView = Backbone.View.extend({

		initialize: function(){
			var theView = this;
			this.model.on('change:_id', function(){
				this.model.fetch({
					success: function(){
						theView.render().trigger('show');
					}
				});
			}, this);
		},

		template: _.template(templateHtml),

		render: function(){
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			return this;
		}

	});

	return DetailView;
});