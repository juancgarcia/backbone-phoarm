define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'../views/all'

	// Library extensions
],
function($, _, Backbone, ContractViews){
	var CreateContractWorkflow = function(){
		if(arguments && arguments.length && arguments.length > 0)
			_.extend(this, arguments[0]);
		this.initialize();
	};

	CreateContractWorkflow.prototype.initialize = function(){
		var that = this;

		var wizardData = new Backbone.Model({});

		var startSearch = function(){
				var search = that.getForm(ContractViews.WizardSearch);
				search
					.on("complete", startProduct)
					.on("complete", function(){
						wizardData.set(this.model.toJSON());
					})
					.on("reset", startSearch);
			},
			startProduct = function(){
				var product = that.getForm(ContractViews.WizardSelection);
				product
					.on("complete", startOption)
					.on("complete", function(){
						wizardData.set(this.model.toJSON());
					})
					.on("reset", startSearch);
			},
			startOption = function(){
				var option = that.getForm(ContractViews.WizardOptions);
				option
					.on("complete", startCustomer)
					.on("complete", function(){
						wizardData.set(this.model.toJSON());
					})
					.on("reset", startSearch);
			},
			startCustomer = function(){
				var customer = that.getForm(ContractViews.WizardCustomer);
				customer
					.on("complete", function(){
						wizardData.set(this.model.toJSON());
						that.submitContract();
					})
					.on("reset", startSearch);
			};

		startSearch.call(that);
	};
	CreateContractWorkflow.prototype.getContainer = function(){
		if(this.wrapper)
			return this.wrapper.getManagedRegion$El();
		else{
			var classname = 'contractWizardContainer';
			$('body').append($('<div class=".'+classname+'"></div>'));
			return $('.'+classname);
		}
		return this.wizardView.get$el();
	};
	CreateContractWorkflow.prototype.getForm = function(classConstructor){
		var form = new classConstructor({
			model: new Backbone.Model({})
		});
		form.on("complete", function(){
			this.off().remove();
		});
		form.render();
		this.getContainer().html(form.el);
		return form;
	};
	CreateContractWorkflow.prototype.submitContract = function(){
	};
	CreateContractWorkflow.prototype.reset = function(){
	};

	return CreateContractWorkflow;
});