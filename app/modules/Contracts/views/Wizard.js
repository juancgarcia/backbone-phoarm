define([
	// Libraries
	'underscore',
	'backbone',

	// Modules
	'modules/Base',
	'./WizardSearch',
	'./WizardSelection',
	'require'

	// Library extensions
],
function(_, Backbone, BaseModule, Search, Selection, relativeRequire){

	var SearchView = BaseModule.Views.Base.extend({
		
		className: 'Wizard',
		
		_relativeRequire: relativeRequire,

		_templatePath: '../tpl/',

		events: {
			"click button.next": "next",
			"click button.reset": "reset",
			"click button.submit": "submit"
		},

		initialize: function(args){
			// this.searchView = new Search();
			// this.selectionView = require('./WizardSelection');

			BaseModule.Views.Base.prototype.initialize.apply(this, arguments);
			this.steps = args.steps || [];
			this.reset();
		},
		// show: function(action, context){
		// 	//action is a callback
		// 	context = context || this;

		// 	if(!this.rendered){
		// 		this.on('rendered', action, context);
		// 		if(!this.rendering)
		// 			this.render();
		// 	}
		// 	else
		// 		action.call(context);
		// },
		showStepAt: function(index){
			if(_.isArray(this.steps) && 0 <= index && index < this.steps.length){
				this.currentStep = index;
				this.showStep(this.steps[index]);
				this.setButtonState('button.next', this.hasNext());
				var submitState = index == this.steps.length - 1;
				this.setButtonState('button.submit', submitState);
			}
		},
		showStep: function(view){
			if(this.currentView)
				this.currentView.remove();

			view.parentView = this;
			view.render();
			this.currentView = view;
		},
		reset: function(){
			this.showStepAt(0);
		},
		addSteps: function(views){
			var that = this,
				wasEmpty = (this.steps)? this.steps.length < 1: true;
			_.each(views, function(view){
				that.steps = that.steps || [];
				that.steps.push(view);
				view.parentView = that;
			});

			if(wasEmpty) this.initialView = this.steps[0];
		},
		next: function(){
			// currentView.doValidation()

			// get data from sub form
			this.model.set(_.clone(this.currentView.model.attributes));

			// advance to next
			if(this.hasNext()){				
				this.showStepAt(++this.currentStep);
			} else {
				this.setButtonState('button.next', !this.hasNext());
			}
		},
		hasNext: function(){
			return this.currentStep < this.steps.length - 1;
		},
		setButtonState: function(btnSelector, state){
			if(state === undefined)
				state = true;
			this.$(btnSelector).attr({"disabled":!state});
		},
		submit: function(){

		}
	    
	});

	return SearchView;
});