define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'json!rpc.json'

	// Library extensions
],
function($, _, Backbone, RPC){

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
			authResponse: {error: true}
		},
		isAuthorized: function(){
			return !_.contains(_.keys(this.get('authResponse') || {}), 'error');
		},
		authenticate: function(credentials){
			AuthSingleton = this;
			$.ajax({
				url: RPC.auth.url,
				type:'GET',
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
		},
		initialize: function(){
			this.on("all", this.defaultEvent);
			this.on("change:authResponse", this.authUpdated);
			this.on("authError", this.authError);
			this.on('authentication_request'); //override to show login
			this.on('deauthentication_request', this.deauthenticate, this);
			// this.on("logout", this.logout);
			// this.on('login', this.login);
			this.on('authSucceeded', this.authSucceeded);
		},
		defaultEvent: function(eventName){ AuthLog(eventName); },
		keepAlive: function(){ /*setTimeout*/ },
		deauthenticate: function(){

			// clean up user state if necessary
			this.set('authResponse', _.clone(this.defaults.authResponse));
			this.trigger('logout');
		},
		authError: function(){
			this.deauthenticate();
		},
		authUpdated: function(model, value, options){
			if(value.error){
				model.trigger('authError');
			}
		},
		authSucceeded: function(){
			this.trigger('login');
		}
	});

	return new AuthState(); // Singleton
});