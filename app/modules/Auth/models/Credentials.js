define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'../State',
	'json!rpc.json',

	// Library extensions
	'backbone.forms'
],
function($, _, Backbone, AuthState, RPC){

	Backbone.Form.editors.PasswordEnter = Backbone.Form.editors.Password.extend({
		initialize: function(options){
			Backbone.Form.editors.Password.prototype.initialize.call(this, options);
		},
		events: {
			'keypress': function(event) {
				if(event && (event.charCode == 13 || event.keyCode == 13))
					this.form.trigger('enter', this);
			}
		}
	});
	var Credential = Backbone.Model.extend({
		// url: RPC.auth.url,
		initialize: function(){
		},
		schema: {
			username: {type: 'Text', validators: ['required']},
			password: {type: 'PasswordEnter', validators: ['required']}
		},
		defaults: {
			username: '',
			password: ''
		},
		reset: function(){
			this.set(this.defaults);
		},
		verify: function(){
			AuthState.set('credentials', this);
			AuthState.trigger('authenticate');
		}
	});

	var Credentials = Backbone.Collection.extend({
		defaults: {
			model: Credential
		},
		Model: Credential
	});

	return {
		Model: Credential,
		Collection: Credentials
	};
});