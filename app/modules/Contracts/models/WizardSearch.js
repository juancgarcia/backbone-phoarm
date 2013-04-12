define([
	// Libraries
	'underscore',
	'backbone'

	// Modules

	// Library Extensions
	// 'backbone.localStorage'
],
function(_, Backbone){

	var Contract = Backbone.Model.extend({
		defaults: {
			vin: '',
			title: '',
			timestamp: 0,
			completed: false
		},
		url :'/data/contracts.json',
		parse : function(response){
			// for testing with static JSON
			var obj = _.find(response, function(contract){
				if(!contract || isNaN(parseInt(contract._id, 10)) )
					return false;
				return contract._id == this.get('_id');
			}, this);
			return obj;
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