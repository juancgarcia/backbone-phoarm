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
			'/'			:'rootPage',
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
			that.moduleHeaderSelector = options.moduleHeaderSelector || '.moduleContractHeader';
			that.moduleMainSelector = options.moduleMainSelector || '.moduleContractMain';
			that.moduleFooterSelector = options.moduleFooterSelector || '.moduleContractFooter';

			//that.contract = new Contracts.Model();

			that.moduleMainView = new ContractViews.Master({ el: $(that.containerSelector) });

			//that.contractView = new ContractViews.Detatil();

			that.contractSearchView = new ContractViews.Search();

			that.contractList = new Contracts.Collection();

			that.contractListView = new ContractViews.List({collection: that.contractList});
		},

		rootPage: function(){
			var that = this;
			console.log('contracts root');
			that.moduleMainView.once('rendered', function(){
				$(that.moduleMainSelector).html('<h3>Contracts Main Page</h3>').show();
			});
			that.moduleMainView.render();
		},

		searchPage: function(){
			console.log('contracts search');

			var that = this;

			that.moduleMainView.once('rendered', function(){
				$(that.moduleMainSelector).html(that.contractSearchView.render().el).show();
			}, that);
			that.moduleMainView.render();
		},

		list: function(page){
			console.log('contracts list');

			// var p = page ? parseInt(page, 10) : 1;
			var that = this;

			that.moduleMainView.once('rendered', function(){
				that.contractList.fetch({
					success: function(contracts, response, options){
						$(that.moduleMainSelector).html(that.contractListView.render().el).show();
					//that.contractListView.render();
					},
					error: function(contracts, response, options){
						alert('Couldn\' fetch list');
						console.log('Err-Contracts: '+JSON.stringify(contracts));
						console.log('Err-Response: '+JSON.stringify(response));
						console.log('Err-Options: '+JSON.stringify(options));
					}
				});
			});
			that.moduleMainView.render();
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