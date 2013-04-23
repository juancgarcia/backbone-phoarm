define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules

	// Library extensions
	'backbone.forms'
],
function($, _, Backbone){

	var Form = Backbone.Form.extend({
		serviceUrl: '',
		preFetch: null,
		initialize: function(options){
			this.setExtras(options);
			Backbone.Form.prototype.initialize(options);
		},
		setExtras: function(options){
			_.extend(this, _.pick(options, 'serviceUrl', 'preFetch'));
			return this;
		},
		render: function(){
			var $prev = this.$el;
			Backbone.Form.prototype.render.apply(this, arguments);
			$prev.append(this.$el);
			return this;
		},
		send: function(){
			var form = this;
			$.ajax({
				url: form.serviceUrl
			}).done(function(data, textStatus, jqXHR){
				form.succeeded(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				form.failed(jqXHR, textStatus, errorThrown);
			});
		},
		// placeholders
		failed: function(){},
		succeeded: function(){}
	});

	return Form;
});