define([
	// Libraries
	'underscore',
	'backbone',

	// Modules
	'text!../tpl/Wizard.html'

	// Library extensions
],
function(_, Backbone, templateHtml){

	var SearchView = Backbone.View.extend({

		containerSelector: '.ContractWizardContainer',

		template: _.template(templateHtml),

		events: {
			"click button.prev": "prev",
			"click button.next": "next",
			"click button.reset": "reset",
			"click button.submit": "submit"
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
			options = options || this.btnState || {};
			if(_.isString(options))
				_setIndividualButtonState.apply(this, arguments);
			else
				_.each(options, function(state, key, list){
					this._setIndividualButtonState(key, state);
				}, this);
		},
		_setIndividualButtonState: function(key, state){
			if(state === void 0) state = true;
			var btnSelector = 'button.'+key,
				currBtn = {}; currBtn[key] = state;
			if(this.btnState === void 0) this.btnState = {};
			_.extend(this.btnState, currBtn);
			this.$(btnSelector).attr({"disabled":!state});
		},
		swapChild: function(view){
			if(this.childView) this.childView.off();
			this.childView = this.showView(view);
		},
		showView: function(view){
			return view.setElement(this.$(this.containerSelector)).render();
		},
		render: function(){
			this.$el.html(this.template());
			this.setButtonState();
			if(this.childView)
				this.showView(this.childView);
			return this;
		}

	});

	return SearchView;
});