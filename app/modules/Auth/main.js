define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'./models/all',
	'./views/all'

	// Library extensions
],
function($, _, Backbone, AuthModels, AuthViews){

	var AuthModule = {};
	AuthModule.Models = AuthModels;
	AuthModule.Views = AuthViews;

	return AuthModule;
});