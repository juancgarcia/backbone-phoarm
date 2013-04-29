define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'text!../tpl/Credentials.html',

	// Library extensions,
	'jquery.lightbox_me',
	'backbone.forms'
],
function($, _, Backbone, templateHtml){

	var CredentialsForm = Backbone.Form.extend({

		initialize: function(options){
			var theView = this;
			// this.on('all', function(eventName){
			// console.log('Credential Form event: '+eventName);
			// });
			Backbone.Form.prototype.initialize.call(this, options);
		},

		render: function(){
			var $prev = this.$el;
			Backbone.Form.prototype.render.apply(this, arguments);
			$prev.empty().append(this.$el);
			return this;
		}

	}),
	CredentialsView = Backbone.View.extend({
		initialize: function(options){
			var view = this;
			_.extend(view, options);
			view.model = view.model || new Backbone.Model();
			this.form = new CredentialsForm({
				model: view.model
			});
		},

		events: {
			'click .login': 'tryLogin',
			'click .cancel': 'tryCancel',
			'click .close': 'hide'
		},

		tryLogin: function(){
			var errors = this.form.validate();
			if(_.isEmpty(errors)){
				this.form.commit();
				this.model.verify();
			} else
				console.log('invalid form fields');
		},

		tryCancel: function(){
			this.model.reset();
			this.form.setValue(this.model.toJSON());
		},

		hide: function(){
			this.$el.hide();
		},

		template: _.template(templateHtml),

		render: function(){
			this.$el.html(this.template());
			this.form.setElement(this.$('.loginForm')).render();
			return this;
		}
	});

	return CredentialsView;
});