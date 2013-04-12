define([
	// Libraries
	'underscore',
	'backbone',

	// Modules
	'modules/Base',
	'require'

	// Library extensions
],
function(_, Backbone, BaseModule, relativeRequire){

	var SearchView = BaseModule.Views.Base.extend({

		className: 'Wizard',

		_relativeRequire: relativeRequire,

		_templatePath: '../tpl/',

		events: {
			"click button.prev": "prev",
			"click button.next": "next",
			"click button.reset": "reset",
			"click button.submit": "submit"
		},

		initialize: function(args){
			BaseModule.Views.Base.prototype.initialize.apply(this, arguments);
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
		}

	});

	return SearchView;
});