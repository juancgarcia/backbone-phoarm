define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'./models/all',
	'./views/all',
	'./State'

	// Library extensions
],
function($, _, Backbone, AuthModels, AuthViews, AuthState){

	$.ajaxSetup({jsonp: 'jsonp'});

	var AuthModule = AuthState;
	AuthModule.Models = AuthModels;
	AuthModule.Views = AuthViews;

	AuthModule.loginView = new AuthViews.Credentials({
		model: new AuthModels.Credentials.Model()
	});
	AuthModule.loginView.render().$el.hide().appendTo($('body'));

	AuthState
		.on( 'authentication_request', function(){
			AuthModule.loginView.trigger('show');
		}, AuthModule)
		.on('login', function(){
			AuthModule.loginView.trigger('close');
		}, AuthModule);

	return AuthModule;
});