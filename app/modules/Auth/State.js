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
		rpcDone: function(data, jqXHR, textStatus){
			this.set('authResponse', data);
			if(data && !_.contains(_.keys(data), 'error'))
				this.trigger('authSucceeded');
			else
				this.trigger('authFailed');
		},
		rpcFail: function(jqXHR, textStatus, errorThrown){
			this.trigger('authFailed');
		},
		rpcAlways: function(jqXHR, textStatus){
			this.trigger('authSequenceFinished');
		},
		authenticate: function(){
			request = $.ajax({
				context: this,
				url: RPC.auth.url,
				type:'GET',
				dataType:'jsonp',
				data: mapModelToRpc(this.get('credentials'))
			});
			request.done(this.rpcDone);
			request.fail(this.rpcFail);
			request.always(this.rpcAlways);
		},
		initialize: function(){
			this.on("all", this.defaultEvent);
			this.on("change:authResponse", this.authUpdated);
			this.on("authError", this.authError);
			this.on('authentication_request'); //override to show login
			this.on('deauthentication_request', this.deauthenticate, this);
			this.on('authenticate', this.authenticate, this);
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