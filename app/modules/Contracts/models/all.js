define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'./Contract'

	// Library extensions
],
function($, _, Backbone, Contract){
	var Models = {};

	Models.Contract = Contract;

	return Models;
});