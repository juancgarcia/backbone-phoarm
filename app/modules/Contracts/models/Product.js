define([
	// Libraries
	'underscore',
	'backbone'

	// Modules
	// 'text!/data/products.nested.json'

	// Library Extensions
	// 'backbone.localStorage'
],
function(_, Backbone, ProductsJSON){

	var ProductCategory = Backbone.Model.extend({
		defaults: {
			_id: 0,
			name: ''
		}
	});

	var Product = Backbone.Model.extend({
		// idAttribute: "_id",
		initialize: function(){
			// this.set('group', new ProductCategory());
		},
		defaults: {
			id: 0,
			name: 'unProduct',
			group: ProductCategory
		},
		parse: function(attrs, options){
			attrs.group = new ProductCategory(attrs.group || {});
			return attrs;
		},
		toString: function(){
			return this.get('group').get('name')+ ' - ' +this.get('name');
		}
	});

	var Products = Backbone.Collection.extend({
		url: '/data/products.json',
		model: Product
	});

	var ProductsSelection = Backbone.Model.extend({
		schema:{
			product: {
				type: /*'Radio'*/ 'Select',
				options: new Products()
			}
		}
	});

	return {
		Model: Product,
		Collection: Products,
		Select: ProductsSelection
	};
});