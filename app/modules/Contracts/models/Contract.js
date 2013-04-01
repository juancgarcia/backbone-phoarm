define([
	// Libraries
	'backbone',

	// Modules

	// Library Extensions
	// 'backbone.localStorage'
],
function(Backbone){

	var Contract = Backbone.Model.extend({
		defaults: {
			vin: '',
			timestamp: 0,
			completed: false
		},
		validate: function(attrs){
			if( _.isEmpty(attrs.title)){
				return "Missing Title";
			}
		}
	});

	var Contracts = Backbone.Collection.extend({
		defaults: {
			model: Contract
		},
		url: '/data/contracts.json',
		Model: Contract,
		completed: function(){
			return this.where({completed: true});
		},
		remaining: function(){
			return this.where({completed: false});
		},
		comparator: function(model){
			return model.get('timestamp');
		}
	});

	return {
		Model: Contract,
		Collection: Contracts
	};
});