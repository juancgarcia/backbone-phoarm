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

			that.moduleMainView = new ContractViews.Master().render();

			that.currentView = null;
		},

		swapView: function(view){
			if(this.currentView) this.currentView.off();
			this.currentView = view.trigger('show');
			this.moduleMainView.setElement($(this.containerSelector)).render();
			view.setElement($(this.moduleMainSelector)).render();
		},

		rootPage: function(other){
			if(other) console.log('Incorrect URL, tried to reach: '+other);
			this.swapView(new ContractViews.Home());
		},

		wizardPage: function(){
			var wizardView = new ContractViews.Wizard({
				model: new Backbone.Model(),
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
				collection: contractList
			});
			this.swapView(contractListView);

			// var p = page ? parseInt(page, 10) : 1;
			contractList.fetch({
				success: function(contracts, response, options){
					contractListView.render();
				},
				error: function(contracts, response, options){
					alert('Couldn\' fetch list');
				}
			});
		},

		detailsPage: function(id){
			var contract = new ContractModels.Contract.Model();
			this.swapView(new ContractViews.Detail({ model: contract }));
			contract.set({_id: parseInt(id, 10)});
		}
	});

	return ContractRouter;
});