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
			// that.moduleHeaderSelector = options.moduleHeaderSelector || '.moduleContractHeader';
			that.moduleMainSelector = options.moduleMainSelector || '.moduleContractMain';
			// that.moduleFooterSelector = options.moduleFooterSelector || '.moduleContractFooter';
			that.parentView = options.parentView || undefined;

			that.moduleMainView = new ContractViews.Master({				
				containerSelector: that.moduleMainSelector,
				parentView: that.parentView,
				loadTemplate:true
			});
		},

		rootPage: function(other){
			if(other) console.log('Incorrect URL, tried to reach: '+other);
			console.log('contracts root');
			this.moduleMainView.trigger('show');
			this.moduleMainView.$el.siblings().hide();
		},

		searchPage: function(){
			if(!this.contractSearchView){
				this.contractSearchView = new ContractViews.Search({
					parentView: this.moduleMainView,
					loadTemplate:true
				});
			}			

			console.log('contracts search');
			this.contractSearchView.trigger('show').$el.siblings().hide();
			this.moduleMainView.$el.siblings().hide();
		},

		wizardPage: function(){
			if(!this.wizardView){
				this.wizardView = new ContractViews.Wizard({
					className: 'WizardWrapper',
					parentView: this.moduleMainView,
					template: function(){}
					// loadTemplate:true
				});

				new ContractViews.WizardSearch({
					parentView: this.wizardView,
					loadTemplate:true
				});
				new ContractViews.WizardSelection({
					parentView: this.wizardView,
					loadTemplate:true
				})
			}
			this.wizardView.reset();

			console.log('new contract wizard');
			this.wizardView.trigger('show').$el.siblings().hide();
			this.moduleMainView.$el.siblings().hide();
		},

		list: function(page){
			if(!this.contractList)
				this.contractList = new Contracts.Collection();
			if(!this.contractListView){
				this.contractListView = new ContractViews.List({
					collection: this.contractList,
					parentView: this.moduleMainView,
					loadTemplate:true
				});
			}
			var that = this;
			console.log('contracts list');
			this.contractListView.$el.siblings().hide();

			// var p = page ? parseInt(page, 10) : 1;
			that.contractList.fetch({
				success: function(contracts, response, options){
					that.contractListView.render().trigger('show');
				},
				error: function(contracts, response, options){
					alert('Couldn\' fetch list');
				}
			});
			this.moduleMainView.$el.siblings().hide();
		},

		detailsPage: function(id){
			if(!this.contract)
				this.contract = new Contracts.Model();
			if(!this.contractView){
				this.contractView = new ContractViews.Detail({
					model: this.contract,
					parentView: this.moduleMainView
				});
			}

			console.log('contracts details');
			this.contractView.$el.siblings().hide();
          
			this.contract.set({_id: parseInt(id)});
			this.moduleMainView.$el.siblings().hide();
		}
	});

	return ContractRouter;
});