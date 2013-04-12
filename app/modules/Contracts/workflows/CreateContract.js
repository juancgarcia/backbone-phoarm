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
		this.reset();
		var workflow = this,
			wizard = this.wrapper,
			wizardData = this.wizardData;

		var startSearch = function(){
				var search = workflow.getForm(ContractViews.WizardSearch)
					.on("complete", startProduct);
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
				var product = workflow.getForm(ContractViews.WizardSelection)
					.on("complete", startOption);
				wizard.setButtonState({'prev':true, 'next': true});
			},
			startOption = function(){
				var option = workflow.getForm(ContractViews.WizardOptions)
					.on("complete", startCustomer);
				wizard.setButtonState({'prev':true, 'next': true});
			},
			startCustomer = function(){
				var customer = workflow.getForm(ContractViews.WizardCustomer)
					.on("complete", function(){
						//workflow.submitContract();
					});
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
				if(_.isEmpty(workflow.currentForm.validate())){
					// optionally extract data out of form
					workflow.currentForm.commit();
					var formData = workflow.currentForm.model.toJSON();
					console.log('step: '+JSON.stringify(formData));
					workflow.currentForm.trigger("complete");
				}
			})
			.on("submit", workflow.submitContract, workflow);

		startSearch.call(workflow);
	};
	CreateContractWorkflow.prototype.getContainer = function(){
		// if(this.wrapper)
			return this.wrapper.getManagedRegion$El();
		// else{
		// 	var classname = 'contractWizardContainer';
		// 	$('body').append($('<div class=".'+classname+'"></div>'));
		// 	return $('.'+classname);
		// }
		// return this.wizardView.get$el();
	};
	CreateContractWorkflow.prototype.getForm = function(classConstructor){
		var form = new classConstructor({
			model: this.wizardData //new Backbone.Model({})
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
		this.wizardData = new Backbone.Model({});
	};

	return CreateContractWorkflow;
});