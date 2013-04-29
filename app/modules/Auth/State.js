define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'AppState',
	'json!rpc.json'

	// Library extensions
],
function($, _, Backbone, AppState, RPC){

	var AuthLog = function(msg){
		console.log('[AUTHSTATE]:'+msg);
	},
	mapModelToRpc = function(model){
		var mapping = {};
		_.each(model.defaults, function(val, key){
			var paramDef = _.find(RPC.auth.params, function(param){
				return param.name == key;
			});
			var param = {};
			param[paramDef.paramName] = model.get(key);
			_.extend(mapping, param);
		});
		return mapping;
	};

	var AuthState = Backbone.Model.extend({
		defaults: {
			authKey: null,
			authResponse: null
		},
		initialize: function(){
			this.on("all", this.defaultEvent);
			this.on("change:authResponse", this.authUpdated);
			this.on("authError", this.authError);
			this.on("logout", this.logout);
			AppState.on('login', this.login, this);
		},
		defaultEvent: function(eventName){
			AuthLog(eventName);
		},
		keepAlive: function(){
			// setTimeout
		},
		isAuthorized: function(){

		},
		login: function(){
			// show login screen
			AuthLog('authentication_required');
		},
		logout: function(){
			AppState.trigger('logout');
		},
		authError: function(){
			this.logout();
		},
		authUpdated: function(model, value, options){
			if(value.error){
				model.trigger('authError');
			}
		},
		authenticate: function(credentials){
			AuthSingleton = this;
			$.ajax({
				url: RPC.auth.url,
				type:'GET',
				// dataType:'json',
				dataType:'jsonp',
				data: mapModelToRpc(credentials),
				success: function(data){
					if(data && !_.contains(_.keys(data), 'error')){
						AuthSingleton.set('authResponse', data);
						AuthSingleton.trigger('authSucceeded');
					}
				},
				error: function(jqXHR, textStatus, errorThrown){
					AuthSingleton.trigger('authFailed');
				},
				complete: function(jqXHR, textStatus){
					AuthSingleton.trigger('authSequenceFinished');
				}
			});
			// this.get('username');
		}
	});

	return new AuthState(); // Singleton
});