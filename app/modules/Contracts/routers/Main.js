define([
	// Libraries
	'jquery',
	'backbone',

	// Modules
	'../models/Contract',
	'../views/all',
	'modules/Base',

	// Library extensions
	'backbone.subroute'
],
function($, Backbone, Contracts, ContractViews, BaseModule){

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
			if(this.currentView){
				this.currentView.remove();
			}
			this.currentView = view.trigger('show');
		},

		rootPage: function(other){
			if(other) console.log('Incorrect URL, tried to reach: '+other);
			console.log('contracts root');
			this.moduleMainView.trigger('show');
			this.moduleMainView.$el.siblings().hide();

			var contractHome = new ContractViews.Home({
				parentView: this.moduleMainView
			});
			this.swapView(contractHome);
		},

		searchPage: function(){
			var contractSearchView = new ContractViews.Search({
				parentView: this.moduleMainView
			});

			this.swapView(contractSearchView);

			console.log('contracts search');
		},

		wizardPage: function(){
			var steps = [
				new ContractViews.WizardSearch({
					model: new Backbone.Model()
				}),
				new ContractViews.WizardSelection({
					model: new Backbone.Model()
				}),
				new ContractViews.WizardOptions({
					model: new Backbone.Model()
				}),
				new ContractViews.WizardCustomer({
					model: new Backbone.Model()
				})
			];

			wizardView = new ContractViews.Wizard({
				model: new Backbone.Model(),
				parentView: this.moduleMainView,
				containerSelector: '.ContractWizardContainer',
				steps: steps
			});

			this.swapView(wizardView);

			console.log('new contract wizard');
		},

		list: function(page){
			var contractList = new Contracts.Collection();
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
			var contract = new Contracts.Model();
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