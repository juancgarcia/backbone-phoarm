define(['backbone', 'backbone.localStorage'],
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
		localStorage: new Backbone.LocalStorage(window.store || "Contracts"),
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