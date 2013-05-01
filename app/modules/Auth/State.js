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

	// helper method to tag log messages to the AuthState module
	var AuthLog = function(msg){
		console.log('[AUTHSTATE]:'+msg);
	},
	// data transformation method to assist in decoupling from minor changes to RPC API
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
			authResponse: new Backbone.Model({error: true}),
			permission: new Backbone.Model({}),
			requestedPermission: new Backbone.Model({}),
			requestedAction: new Backbone.Model({}),
			reason: ""
		},

		initialize: function(){
			this
				.on("all", this.defaultEvent)
				.on("change:authResponse", function(model, value, options){
					if(value.get('error')) model.trigger('authError');
				}, this)
				.on("authError", this.deauthenticate, this)
				.on('authentication_request') //override to show login
				.on('authentication_cancel', this.authCompleteCancel)
				.on('login', this.authCompleteCancel)
				.on('deauthentication_request', this.deauthenticate, this)
				.on('authenticate', this.authenticate, this)
				.on('authSucceeded', function(){
					if(this.permissionMatch(this.get('requestedPermission'), this.get('permission')))
						this.trigger('login');
					else{
						this.get('authResponse').set('error', 'This action requires an account with higher permissions');
						this.trigger('authError');
					}
				});
		},

		/*
		when authentication completes succesfully or it cancelled by user interaction,
		clear any pending actions
		*/
		authCompleteCancel: function(){
			this.get('requestedAction').stopListening();
			this.set('requestedAction', _.clone(this.defaults.requestedAction));
			this.set('requestedPermission', _.clone(this.defaults.requestedPermission));
			this.unset('reason');
		},

		/*
		wrap all protected operations in this assertion call
		Ex:
			AuthModule.assertPermission({"admin": true}, function(){}, someContext);

		if the user is logged in and has the requisite permissions, the
		complete callback is immediately called, else they are asked to
		reauthenticate
		*/
		assertPermission: function(permission, complete, context){
			var Auth = this,
				requestedPermission = new Backbone.Model(permission),
				requestedAction = new Backbone.Model();
				context = context || this;

			if( this.isAuthorized() &&
				this.permissionMatch(requestedPermission, this.get('permission')) )
				complete.call(context);
			else {
				if(!this.isAuthorized())
					this.set('reason', "Please Log In");
				else
					this.set('reason', "Elevated permissions requested");
				this.set('requestedPermission', requestedPermission);
				this.set('requestedAction', requestedAction);
				requestedAction.listenTo(Auth, 'login', function(){
					// if(this.permissionMatch(requestedPermission, this.get('permission')))
						complete.call(context);
					// else {
					// 	AuthLog('Need to suspend closing of login window');
					// 	AuthLog('Need to set permission error');
					// 	this.get('authResponse').set('error', 'This action requires elevated permissions');
					// }
				});
				this.trigger('authentication_request');
			}
		},

		/*
		returns true for the requested permission object keys matching the current
		user permission's object keys
		*/
		permissionMatch: function(request, current){
			var matchedKeys = _.intersection(request.keys(), current.keys());
			return matchedKeys.length == request.keys().length;
		},

		isAuthorized: function(){
			return !_.contains(this.get('authResponse').keys(), 'error');
		},

		/*
		test credentials against the server
		*/
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

		/*
			expire the current user's credentials
		*/
		deauthenticate: function(){

			// clean up user state if necessary
			if(this.isAuthorized())
				this.set('authResponse', _.clone(this.defaults.authResponse));
			this.trigger('logout');
		},

		defaultEvent: function(eventName){ AuthLog(eventName); },

		// Event methods which respond to the ajax credentials check
		rpcDone: function(data, jqXHR, textStatus){
			this.set('authResponse', new Backbone.Model(data));
			if(data && this.isAuthorized()){
				this.set('permission', new Backbone.Model(data));
				this.trigger('authSucceeded');
			}
			else
				this.rpcFail();
		},
		rpcFail: function(jqXHR, textStatus, errorThrown){
			// this.trigger('authFailed');
			this.set('permission', new Backbone.Model({}));
		},
		rpcAlways: function(jqXHR, textStatus){
			// this.trigger('authSequenceFinished');
		}
	});

	return new AuthState(); // Singleton
});