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
			"click button.next": "next"
		},

		initialize: function(args){
			// this.searchView = new Search();
			// this.selectionView = require('./WizardSelection');

			BaseModule.Views.Base.prototype.initialize.apply(this, arguments);
		},
		show: function(action, context){
			//action is a callback
			context = context || this;
			if(!this.rendered){
				this.on('rendered', action, context);
				if(!this.rendering)
					this.render();
			}
			else
				action.call(context);
		},
		reset: function(){
			_.invoke(this.children, 'trigger', ['hide']);

			if(this.initialView)
				this.initialView.trigger('show');
			this.currentStep = 0;
		},
		addSteps: function(views){
			var that = this,
				wasEmpty = (this.children)? this.children.length < 1: true;
			_.each(views, function(view){
				//that.appendChild(view);
				that.children = that.children || [];
				that.children.push(view);
				view.parentView = that;
			});

			if(wasEmpty) this.initialView = this.children[0];
			this.setNextButtonState(this.hasNext());
		},
		next: function(){
			if(this.currentStep == undefined)
				this.currentStep = 0;

			var currentView = this.children[this.currentStep];

			// currentView.doValidation()

			this.model.set(_.clone(currentView.model.attributes));

			//advance to next
			if(this.children.length > this.currentStep + 1){
				currentView.$el.hide();
				currentView = this.children[++this.currentStep];
				currentView.trigger('show');

				this.setNextButtonState(this.hasNext());
			}
		},
		hasNext: function(){
			return this.currentStep < this.children.length - 1;
		},
		setNextButtonState: function(hasNext){
			if(hasNext === undefined)
				hasNext = true;
			this.$('button.next').attr({"disabled":!hasNext});
		},

		appendChild: function(childView){
			var that = this;
			that.children = that.children || [];
			that.children.push(childView);
			return that;
		}
	    
	});

	return SearchView;
});