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
			this.on('reset', this.reset, this);
			this.on('close', this.clickCancel, this);
			this.on('show', this.show, this);
			AuthState.on('authError', this.showErrors, this);
			AuthState.on('change:reason', this.showMessage, this);
			this.form.on('enter', function(){
				view.clickLogin();
			});
		},

		reset: function(){
			this.form.trigger('reset');
			this.$('.errors').hide().html('');
			// this.$('.message').hide().html('');
		},

		show: function(){
			this.reset();
			this.$el.show().lightbox_me({
				centered: true,
				onLoad: function() {
					// $('#sign_up').find('input:first').focus()
					}
				});
		},

		showMessage: function(){
			if(AuthState.has('reason'))
				this.$('.message').html(AuthState.get('reason')).show();
			else
				this.$('.message').html('').hide();
		},

		showErrors: function(){
			this.$('.errors').html(AuthState.get('authResponse').get('error')).show();
		},

		events: {
			'click .login': 'clickLogin',
			'click .cancel': 'clickCancel'//,
			// 'click .close': 'close'
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
			this.$el.trigger('close');
			AuthState.trigger('authentication_cancel');
		},

		// close: function(){
		// },

		template: _.template(templateHtml),

		render: function(){
			this.$el.html(this.template());
			this.form.setElement(this.$('.loginForm')).render();
			return this;
		}
	});

	return CredentialsView;
});