define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'./Contract',
	'./Customer',
	'./VehicleValidator',
	'./Product'

	// Library extensions
],
function($, _, Backbone, Contract, Customer, VehicleValidator, Product){
	var Models = {};

	Models.Contract = Contract;
	Models.Customer = Customer;
	Models.VehicleValidator = VehicleValidator;
	Models.Product = Product;

	return Models;
});