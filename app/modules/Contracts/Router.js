define([
	'backbone',
	'./Model',
	'backbone.subroute'
	],
function(Backbone, ContractsModels){
	
	var ContractRouter = Backbone.SubRoute.extend({
		routes: {
			''			:'rootPage',
			'search'	:'searchPage',
			'list'		:'list',
			//'product'	:'productPage',
			'detatils'	:'detailsPage'//,
			//'customer'	:'customerPage'
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
			console.log('contracts details');          
			// this.contract.set({_id: id});

			// this.contract.fetch({success: function(){
			// 	this.contractView.render();
			// }});
		}//,

		//customerPage:function(){}
	});

	return ContractRouter;
});