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
			authResponse: new Backbone.Model({error: true})
		},
		assertPermission: function(permission, callback){
			var requested = new Backbone.Model(permission);

			if( this.isAuthorized() &&
				this.permissionMatch(requested, this.get('permission')) )
				callback();
			else {
				this.set('requestedPermission', requested);
				this.once('authSucceeded', function(){
					if(this.permissionMatch(requested, this.get('permision')))
						callback();
					else {
						AuthLog('Need to suspend closing of login window');
						AuthLog('Need to set permission error');
					}
				});
				this.trigger('authentication_request');
			}
		},
		permissionMatch: function(request, current){
			return false;
		},
		isAuthorized: function(){
			return !_.contains(this.get('authResponse').keys(), 'error');
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
		defaultEvent: function(eventName){ AuthLog(eventName); },
		deauthenticate: function(){

			// clean up user state if necessary
			if(this.isAuthorized())
				this.set('authResponse', new Backbone.Model(_.clone(this.defaults.authResponse)));
			this.trigger('logout');
		},
		initialize: function(){
			this
				.on("all", this.defaultEvent)
				.on("change:authResponse", function(model, value, options){
					if(value.get('error')) model.trigger('authError');
				}, this)
				.on("authError", this.deauthenticate, this)
				.on('authentication_request') //override to show login
				.on('deauthentication_request', this.deauthenticate, this)
				.on('authenticate', this.authenticate, this)
				.on('authSucceeded', function(){
					this.trigger('login');
				});
		},
		rpcDone: function(data, jqXHR, textStatus){
			this.set('authResponse', new Backbone.Model(data));
			if(data && this.isAuthorized())
				this.trigger('authSucceeded');
			else
				this.rpcFail();
		},
		rpcFail: function(jqXHR, textStatus, errorThrown){
			// this.trigger('authFailed');
		},
		rpcAlways: function(jqXHR, textStatus){
			// this.trigger('authSequenceFinished');
		}
	});

	return new AuthState(); // Singleton
});