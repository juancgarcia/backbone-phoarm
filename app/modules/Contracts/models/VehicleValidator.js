define([
	// Libraries
	'underscore',
	'backbone'

	// Modules

	// Library Extensions
	// 'backbone.localStorage'
],
function(_, Backbone){

	var VehicleValidator = Backbone.Model.extend({
		schema: {
			vin: 'Text',
			stock: 'Text',
			mileage: 'Number',
			condition: { type: 'Select', options: ['new', 'used'] },
			"saleDate": 'Date'
		}/*,
		defaults: {
			vin: '',
			stock: '',
			miles: 0,
			condition: 'used',
			saleDate: 0
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
		}*/
	});

	var VehicleValidators = Backbone.Collection.extend({
		defaults: {
			model: VehicleValidator
		},
		url: '/data/contracts.json',
		Model: VehicleValidator/*,
		completed: function(){
			return this.where({completed: true});
		},
		remaining: function(){
			return this.where({completed: false});
		},
		comparator: function(model){
			return model.get('timestamp');
		}*/
	});

	return {
		Model: VehicleValidator,
		Collection: VehicleValidators
	};
});