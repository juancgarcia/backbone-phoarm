define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'../State',
	'json!rpc.json'

	// Library extensions
],
function($, _, Backbone, AuthState, RPC){

	var Credential = Backbone.Model.extend({
		// url: RPC.auth.url,
		initialize: function(){
		},
		schema: {
			username: {type: 'Text', validators: ['required']},
			password: {type: 'Password', validators: ['required']}
		},
		defaults: {
			username: '',
			password: ''
		},
		reset: function(){
			this.set(this.defaults);
		},
		verify: function(){
			return AuthState.authenticate(this);
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