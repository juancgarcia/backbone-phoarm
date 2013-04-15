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
		if(!this.wrapper)
			throw new Error("This workflow required a wrapper view which publishes 'prev', 'next', 'reset', and 'submit' events'");
		this.initialize();
	};

	CreateContractWorkflow.prototype.initialize = function(){
		this.wizardData = new Backbone.Model();
		this.nextData = new (Backbone.Collection.extend({ model: Backbone.Model }))()/*new Backbone.Model()*/;

		var workflow = this,
			wizard = this.wrapper,
			wizardData = this.wizardData;
		this.reset();

		var startSearch = function(){
				var search = workflow.getForm(ContractViews.WizardSearch);
					//.on("complete", startProduct);
					workflow.nextStep = startProduct;
				var resetButtons = function() {
					wizard.setButtonState({
						'prev': false,
						'next': true,
						'reset': true,
						'submit': false
					});
				};
				if(!wizard.rendered)
					wizard.on('rendered', resetButtons);
				else
					resetButtons();
			},
			startProduct = function(){
				var product = workflow.getForm(
						ContractViews.WizardSelection,
						Backbone.Model.extend({schema:{
							product: {type: /*'Radio'*/ 'Select', options: workflow.nextData.toJSON()}
						}}));
					// .on("complete", startOption);
					workflow.nextStep = startOption;
				wizard.setButtonState({'prev':true, 'next': true});
				// product.
			},
			startOption = function(){
				var option = workflow.getForm(ContractViews.WizardOptions);
					// .on("complete", startCustomer);
					workflow.nextStep = startCustomer;
				wizard.setButtonState({'prev':true, 'next': true});
			},
			startCustomer = function(){
				var customer = workflow.getForm(ContractViews.WizardCustomer);
					//.on("complete", function(){ workflow.submitContract(); });
					workflow.nextStep = workflow.submitContract();
				wizard.setButtonState({'prev':true, 'next': false, 'submit': true});
			};

		wizard
			.on("reset", function(){
				workflow.reset();
				startSearch.call(workflow);
			})
			.on("prev", function(){
				// need to figure out a simple way to back up
				console.log("'prev' workflow button not implemented");
			})
			.on("next", function(){
				// validates locally
				if(_.isEmpty(workflow.currentForm.validate())){

					workflow.currentForm.on('complete', function(){
						// optionally extract data out of form
						workflow.currentForm.commit();
						var formData = workflow.currentForm.model.toJSON();
						console.log('step: '+JSON.stringify(formData));

						// save step data to wizard
						workflow.wizardData.set(formData);
						console.log('Wizard Data: '+JSON.stringify(workflow.wizardData.toJSON()));

						// workflow.currentForm.trigger("complete");
						workflow.nextStep();
					});

					// trigger server validation/submission
					workflow.currentForm.succeeded = function(data){
						workflow.nextData.reset(data)/*.clear()*/;
						//workflow.nextData.set(data);
						// console.log('Incoming Data: '+JSON.stringify(data));
						// console.log('Nexted Data: '+JSON.stringify(workflow.nextData.toJSON()));

						this.trigger('complete');
					};

					workflow.currentForm.failed = function(){
						this.trigger('incomplete');
					};

					workflow.currentForm.send();
				}
			})
			.on("submit", workflow.submitContract, workflow);

		startSearch.call(workflow);
	};
	CreateContractWorkflow.prototype.getContainer = function(){
		return this.wrapper.getManagedRegion$El();
	};
	CreateContractWorkflow.prototype.getForm = function(classConstructor, modelConstructor){
		var model, data = this.nextData.toJSON() || {};

		if(modelConstructor)
			model = new modelConstructor(/*data*/);
		else
			model = new Backbone.Model(/*data*/);

		var form = new classConstructor({
			model: model
		});
		form.on("complete", function(){
			this.off().remove();
		});
		form.render();
		this.getContainer().html(form.el);
		this.currentForm = form;
		return form;
	};
	CreateContractWorkflow.prototype.submitContract = function(){
	};
	CreateContractWorkflow.prototype.reset = function(){
		this.wizardData.clear();
		this.nextData.reset()/*.clear()*/;
		this.nextStep = function(){};
	};

	return CreateContractWorkflow;
});