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

		wizard
			.on("prev", workflow.prev, workflow)
			.on("next", workflow.next, workflow)
			.on("submit", workflow.submit, workflow)
			.on("reset", workflow.reset, workflow);

		workflow.reset();
	};

	// button handlers
	WorkflowManager.prototype.prev = function(validate) {
		// default: no validation
		var workflow = this,
			advance = function(){
				workflow.advanceState('prev');
			};
		if(!validate) advance();
		else this.validate(advance);
	};
	WorkflowManager.prototype.next = function(noValidate) {
		// default: always validate
		var workflow = this,
			advance = function(){
				workflow.advanceState('next');
			};
		if(noValidate) advance();
		else this.validate(advance);
	};
	WorkflowManager.prototype.submit = function(noValidate){
		// default: always validate
		var workflow = this,
			advance = function(){
				workflow.triggerState('finalState');
			};
		if(noValidate) advance();
		else this.validate(advance);
	};
	WorkflowManager.prototype.reset = function(){
		this.wizardData.clear();
		this.serverResponse.reset();
		this.triggerState('initialState');
	};

	WorkflowManager.prototype.validate = function(callback){
		var workflow = this;
		callback = callback || function(){
			workflow.advanceState('next');
		};

		var submitSucceeded = function(data){
				workflow.serverResponse.reset(data);
				this.trigger('complete');
			},
			submitFailed = function(){
				this.trigger('incomplete');
			},
			onFormComplete = function(){
				workflow.currentForm.off('complete', onFormComplete);
				// optionally extract data out of form
				console.log(workflow.currentForm.model.toJSON());
				workflow.currentForm.commit();
				console.log(workflow.currentForm.model.toJSON());
				var formData = workflow.currentForm.model.toJSON();

				// save step data to wizard
				workflow.wizardData.set(formData);
				// console.log(JSON.stringify(workflow.wizardData.toJSON()));
				workflow.unsetForm();

				callback();
			};

		// locally validate currentState's form
		if(_.isEmpty(workflow.currentForm.validate())){
			workflow.currentForm.on('complete', onFormComplete);

			// if successful, grab form data (and server response, if any)
			workflow.currentForm.succeeded = submitSucceeded;
			// if failed report errors
			workflow.currentForm.failed = submitFailed;

			// trigger form to make it's server call
			workflow.currentForm.send();
		}
	};
	// temporary backup of next method
	var next = function(){
		var workflow = this;
		// validates locally
		if(_.isEmpty(workflow.currentForm.validate())){

			workflow.currentForm.on('complete', function(){
				// optionally extract data out of form
				workflow.currentForm.commit();
				var formData = workflow.currentForm.model.toJSON();

				// save step data to wizard
				workflow.wizardData.set(formData);

				// workflow.currentForm.trigger("complete");
				workflow.next();
			});

			// trigger server validation/submission
			workflow.currentForm.succeeded = function(data){
				workflow.serverResponse.reset(data)/*.clear()*/;
				//workflow.serverResponse.set(data);

				this.trigger('complete');
			};

			workflow.currentForm.failed = function(){
				this.trigger('incomplete');
			};

			workflow.currentForm.send();
		}
	};

	WorkflowManager.prototype.setButtons = function(state){
		this.wrapper.setButtonState(state);
	};

	// Accessors/Helpers for handling the states DS
	WorkflowManager.prototype.setStates = function(steps){
		this.steps = _.extend(this.steps || {}, steps);
	};
	WorkflowManager.prototype.getState = function(stateId){
		if(!this.states || !this.states[stateId])
			return void 0;
		else
			return this.states[stateId];
	};
	WorkflowManager.prototype.getCurrentState = function(){
		return this.currentState;
	};
	WorkflowManager.prototype.setCurrentState = function(stateId){
		this.currentState = this.getState(stateId) || this.currentState;
		return this.currentState;
	};
	WorkflowManager.prototype.triggerState = function(stateId){
		this.setCurrentState(stateId).action.call(this);
		this.setButtons({
			'prev': this.getCurrentState().prev !== void 0,
			'next': this.getCurrentState().next !== 'finalState' &&
					this.getCurrentState().next !== void 0,
			'reset': true,
			'submit': this.getCurrentState().next === 'finalState'/* ||
					this.getCurrentState().next === void 0*/
		});
	};
	WorkflowManager.prototype.advanceState = function(direction){
		if(direction !== 'next' && direction != 'prev')
			direction = 'next';
		this.triggerState(this.getCurrentState()[direction]);
	};

	// Backbone.View related helpers
	WorkflowManager.prototype.setForm = function(form){
		var data = this.serverResponse.toJSON() || {};
		// form.model.set(data);
		if(form.setExtras) form.setExtras({preFetch: data});
		this.wrapper.swapChild(form);
		this.currentForm = form;
		return form;
	};
	WorkflowManager.prototype.unsetForm = function(){
		this.wrapper.swapChild(null);
	};

	return WorkflowManager;
});