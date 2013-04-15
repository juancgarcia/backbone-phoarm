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
	var WorkflowManager = function(){
		if(arguments && arguments.length && arguments.length > 0)
			_.extend(this, arguments[0]);
		if(!this.wrapper)
			throw new Error("This workflow required a wrapper view which publishes 'prev', 'next', 'reset', and 'submit' events'");
		this.initialize();
	};

	WorkflowManager.prototype.initialize = function(){
		this.wizardData = new Backbone.Model();
		this.serverResponse = new (Backbone.Collection.extend({ model: Backbone.Model }))()/*new Backbone.Model()*/;

		var workflow = this,
		wizard = this.wrapper,
		wizardData = this.wizardData;
		this.reset();

		wizard
		.on("reset", function(){
			workflow.reset();
			workflow.initialState.call(workflow);
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
					workflow.triggerState(workflow.nextState);
				});

				// trigger server validation/submission
				workflow.currentForm.succeeded = function(data){
					workflow.serverResponse.reset(data)/*.clear()*/;
					//workflow.serverResponse.set(data);
					// console.log('Incoming Data: '+JSON.stringify(data));
					// console.log('Nexted Data: '+JSON.stringify(workflow.serverResponse.toJSON()));

					this.trigger('complete');
				};

				workflow.currentForm.failed = function(){
					this.trigger('incomplete');
				};

				workflow.currentForm.send();
			}
		})
		.on("submit", workflow.getState('finalState'), workflow);

		workflow.getState('initialState').call(workflow);
	};
	WorkflowManager.prototype.getState = function(stateId){
		if(!this.states || !this.states[stateId])
			return function(){};
		else
			return workflow.states[stateId];
	};
	WorkflowManager.prototype.setStates = function(steps){
		this.steps = _.extend(this.steps || {}, steps);
	};
	WorkflowManager.prototype.triggerState = function(stateId){
		this.states[stateId].call(this);
	};
	WorkflowManager.prototype.setNextState = function(stateId){
		this.nextState = stateId;
	};
	WorkflowManager.prototype.getContainer = function(){
		return this.wrapper.getManagedRegion$El();
	};
	WorkflowManager.prototype.getForm = function(classConstructor, modelConstructor){
		var model, data = this.serverResponse.toJSON() || {};

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
	WorkflowManager.prototype.submitContract = function(){
	};
	WorkflowManager.prototype.reset = function(){
		this.wizardData.clear();
		this.serverResponse.reset()/*.clear()*/;
		//this.nextStep = this.states['initialState'];
	};

	return WorkflowManager;
});