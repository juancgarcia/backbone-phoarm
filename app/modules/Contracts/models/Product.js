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
			name: 'unCategory'
		},
		toString: function(){
			return this.get('name');
		}
	});

	var Product = Backbone.Model.extend({
		initialize: function(){
			if(!(this.get('group') instanceof ProductCategory))
				this.set('group', new ProductCategory(this.get('group')));
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
			return this.get('group').toString()+ ' - ' +this.get('name');
		}
	});

	var Products = Backbone.Collection.extend({
		url: '/data/products.json',
		model: Product
	});

	var ProductsSelection = Backbone.Model.extend({
		initialize: function(config){
			this.schema.product.options = config.getOptions || this.getOptions;
		},
		getOptions: function(){}, //placeholder
		schema:{
			product: {
				type: /*'Radio'*/ 'Select',
				options: []
			}
		}
	});

	return {
		Model: Product,
		Collection: Products,
		Select: ProductsSelection
	};
});