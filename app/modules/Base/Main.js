define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'./views/all',
	'./models/all'

	// Library extensions
],
function($, _, Backbone, Views, Models){
	var Base = {};

	Base.Views = Views;
	Base.Models = Models;

	return Base;
});