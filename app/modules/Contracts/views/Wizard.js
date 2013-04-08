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

		initialize: function(args){
			// this.searchView = new Search();
			// this.selectionView = require('./WizardSelection');

			BaseModule.Views.Base.prototype.initialize.apply(this, arguments);
		},
		reset: function(){
			_.invoke(this.children, 'trigger', ['hide']);

			if(this.initialView)
				this.initialView.trigger('show');
		}
	    
	});

	return SearchView;
});