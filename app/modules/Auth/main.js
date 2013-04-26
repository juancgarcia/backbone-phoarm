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

	var defaults = {
		routePath: "auth",
		createTrailingSlashRoutes: true
	};

	var AuthModule = {};
	AuthModule.Models = AuthModels;
	// AuthModule.Router = AuthRouter;
	AuthModule.Views = AuthViews;
	// AuthModule.Init = function(options){
	// 	options = _.extend(defaults, options);
	// 	return new AuthModule.Router( options.routePath, options );
	// };

	return AuthModule;
});