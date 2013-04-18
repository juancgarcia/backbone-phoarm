define([
	// Libraries
	'jquery',
	'backbone',

	// Modules
	'../models/all',
	'../views/all',
	'modules/Base',
	'../workflows/all',

	// Library extensions
	'backbone.subroute'
],
function($, Backbone, ContractModels, ContractViews, BaseModule, Workflows){

	var ContractRouter = Backbone.SubRoute.extend({
		routes: {
			''			:'rootPage',
			'search'	:'searchPage',
			'wizard'	:'wizardPage',
			'list'		:'list',
			'details/:id'	:'detailsPage',
			'*other'	:'rootPage'
		},

		initialize: function(options){
			var that = this;
			that.containerSelector = options.containerSelector || '.contractModuleContainer';
			that.moduleMainSelector = options.moduleMainSelector || '.moduleContractMain';
			that.parentView = options.parentView || undefined;

			that.moduleMainView = new ContractViews.Master({
				containerSelector: that.moduleMainSelector,
				parentView: that.parentView,
				loadTemplate:true
			});

			that.currentView = null;
		},

		swapView: function(view){
			this.moduleMainView.setElement($(this.containerSelector)).render();
			if(this.currentView){
				this.currentView.remove();
			}
			this.currentView = view.trigger('show');
		},

		rootPage: function(other){
			if(other) console.log('Incorrect URL, tried to reach: '+other);
			console.log('contracts root');
			this.moduleMainView.trigger('show');
			// this.moduleMainView.$el.siblings().hide();

			var contractHome = new ContractViews.Home({
				parentView: this.moduleMainView
			});
			this.swapView(contractHome);
		},

		wizardPage: function(){
			var wizardView = new ContractViews.Wizard({
				model: new Backbone.Model(),
				parentView: this.moduleMainView,
				containerSelector: '.ContractWizardContainer'
			});

			new Workflows.Manager({
				wrapper: wizardView,
				states: Workflows.NewContractWorkflowStates
			});

			this.swapView(wizardView);

			console.log('new contract wizard');
		},

		list: function(page){
			var contractList = new ContractModels.Contract.Collection();
			var contractListView = new ContractViews.List({
				collection: contractList,
				parentView: this.moduleMainView
			});
			var that = this;
			console.log('contracts list');


			// var p = page ? parseInt(page, 10) : 1;
			contractList.fetch({
				success: function(contracts, response, options){
					that.swapView(contractListView);
					contractListView.render();
				},
				error: function(contracts, response, options){
					alert('Couldn\' fetch list');
				}
			});
		},

		detailsPage: function(id){
			var contract = new ContractModels.Contract.Model();
			var contractView = new ContractViews.Detail({
				model: contract,
				parentView: this.moduleMainView
			});

			this.swapView(contractView);

			console.log('contracts details');

			contract.set({_id: parseInt(id, 10)});
		}
	});

	return ContractRouter;
});