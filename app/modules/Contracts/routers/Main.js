define([
	// Libraries
	'backbone',

	// Modules
	'../models/Contract',
	'../views/all',

	// Library extensions
	'backbone.subroute'
],
function(Backbone, Contracts, ContractViews){
	
	var ContractRouter = Backbone.SubRoute.extend({
		routes: {
			''			:'rootPage',
			'search'	:'searchPage',
			'list'		:'list',
			//'product'	:'productPage',
			'detatils'	:'detailsPage'//,
			//'customer'	:'customerPage'
		},

		initialize: function(){
			var that = this;
			that.contract = new Contracts.Model();
			//that.contractView = new ContractViews.Detatil();
			that.contractList = new Contracts.Collection();
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

			// this.contractList.fetch({success: function(){
			// 	that.contractListView.render();
			// }});
		},

		//productPage	:function(){},

		detailsPage: function(id){
			var that = this;

			console.log('contracts details');          
			that.contract.set({_id: id});

			that.contract.fetch({success: function(){
				that.contractView.render();
			}});
		}//,

		//customerPage:function(){}
	});

	return ContractRouter;
});