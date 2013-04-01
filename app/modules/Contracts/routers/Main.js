define([
	// Libraries
	'jquery',
	'backbone',

	// Modules
	'../models/Contract',
	'../views/all',

	// Library extensions
	'backbone.subroute'
],
function($, Backbone, Contracts, ContractViews){
	
	var ContractRouter = Backbone.SubRoute.extend({
		routes: {
			''			:'rootPage',
			'search'	:'searchPage',
			'list'		:'list',
			//'product'	:'productPage',
			'detatils'	:'detailsPage'//,
			//'customer'	:'customerPage'
		},

		initialize: function(options){
			var that = this;
			that.containerSelector = options.containerSelector || '.contractModuleContainer';
			that.contract = new Contracts.Model();
			//that.contractView = new ContractViews.Detatil();

			that.contractList = new Contracts.Collection();

			that.contractListView = new ContractViews.List({collection: that.contractList});
		},

		rootPage: function(){
			console.log('contracts root');
		},

		searchPage: function(){
			console.log('contracts search');
		},

		list: function(page){
			console.log('contracts list');

			// var p = page ? parseInt(page, 10) : 1;
			var that = this;

			this.contractList.fetch({
				success: function(contracts, response, options){
					$(that.containerSelector).html(that.contractListView.render().el).show();
				//that.contractListView.render();
				},
				error: function(contracts, response, options){
					console.log('Err-Contracts: '+JSON.stringify(contracts));
					console.log('Err-Response: '+JSON.stringify(response));
					console.log('Err-Options: '+JSON.stringify(options));
				}
			});
		},

		//productPage	:function(){},

		detailsPage: function(id){
			var that = this;

			console.log('contracts details');          
			// that.contract.set({_id: id});

			// that.contract.fetch({success: function(){
			// 	that.contractView.render();
			// }});
		}//,

		//customerPage:function(){}
	});

	return ContractRouter;
});