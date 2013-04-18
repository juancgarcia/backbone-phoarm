define([
	// Libraries
	'underscore',
	'backbone',

	// Modules
	'text!../tpl/Wizard.html'
	// 'modules/Base',
	// 'require'

	// Library extensions
],
function(_, Backbone, templateHtml/*BaseModule, relativeRequire*/){

	// var SearchView = BaseModule.Views.Base.extend({
	var SearchView = Backbone.View.extend({

		containerSelector: '.ContractWizardContainer',

		// className: 'Wizard',

		// _relativeRequire: relativeRequire,

		// _templatePath: '../tpl/',

		template: _.template(templateHtml),

		events: {
			"click button.prev": "prev",
			"click button.next": "next",
			"click button.reset": "reset",
			"click button.submit": "submit"
		},

		initialize: function(args){
			// BaseModule.Views.Base.prototype.initialize.apply(this, arguments);
			// this.reset();
		},

		prev: function(){
			this.trigger('prev');
		},
		next: function(){
			this.trigger('next');
		},
		reset: function(){
			this.trigger('reset');
		},
		submit: function(){
			this.trigger('submit');
		},
		setButtonState: function(options){
			if(_.isString(options))
				_setIndividualButtonState.apply(this, arguments);
			else
				_.each(options, function(state, key, list){
					var selector = 'button.'+key;
					this._setIndividualButtonState(selector, state);
				}, this);
		},
		_setIndividualButtonState: function(btnSelector, state){
			if(state === undefined)
				state = true;
			this.$(btnSelector).attr({"disabled":!state});
		},
		// swapChild: function(view){
		// 	if(this.childView) this.childView.off();
		// 	this.childView = this.showView(view);
		// },
		// showView: function(view){
		// 	this.$(this.containerSelector).append(view.$el);
		// 	view.setElement(this.$(this.containerSelector)).render();
		// },
		render: function(){
			this.$el.html(this.template());
			// if(this.childView)
			// 	this.showView(this.childView);
			return this;
		}

	});

	return SearchView;
});