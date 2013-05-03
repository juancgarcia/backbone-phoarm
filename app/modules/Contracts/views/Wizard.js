define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'text!../tpl/Wizard.html',
	'modules/Auth'

	// Library extensions
],
function($, _, Backbone, templateHtml, AuthModule){

	var SearchView = Backbone.View.extend({

		containerSelector: '.ContractWizardContainer',

		template: _.template(templateHtml),

		events: {
			"click button": "click"
		},

		click: function(event){
			var method = $(event.target).attr("class");
			if(_.isFunction(this[method]))
				AuthModule.assertPermission({}, this[method], this);
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
			if(this.childView) this.childView.off().remove();
			this.childView = this.showView(view);
		},
		showView: function(view){
			if(!this.$(this.containerSelector).length)
				this.$el.prepend($('<div class="'+this.containerSelector.slice(1)+'"></div>'));
			if(view && view instanceof Backbone.View)
				view.setElement(this.$(this.containerSelector)).render();
			return view;
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