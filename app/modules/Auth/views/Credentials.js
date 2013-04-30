define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'text!../tpl/Credentials.html',
	'../State',

	// Library extensions,
	'jquery.lightbox_me',
	'backbone.forms'
],
function($, _, Backbone, templateHtml, AuthState){

	var CredentialsForm = Backbone.Form.extend({

		initialize: function(options){
			var theView = this;
			this.on('reset', function(){
				this.model.reset();
				this.setValue(this.model.toJSON());
			}, this);
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
		className: "credentials",
		initialize: function(options){
			var view = this;
			_.extend(view, options);
			view.model = view.model || new Backbone.Model();
			this.form = new CredentialsForm({
				model: view.model
			});
			this.on('reset', function(){
				this.form.trigger('reset');
			});
		},

		events: {
			'click .login': 'clickLogin',
			'click .cancel': 'clickCancel',
			'click .close': 'close'
		},

		clickLogin: function(){
			var errors = this.form.validate();
			if(_.isEmpty(errors)){
				this.form.commit();
				this.model.verify();
			} else
				console.log('invalid form fields');
		},

		clickCancel: function(){
			this.model.reset();
			this.form.setValue(this.model.toJSON());
			this.close();
		},

		close: function(){
			this.$el.trigger('close');
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