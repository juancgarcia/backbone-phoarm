define([
	// Libraries
	'backbone',

	// Modules
	'modules/Base',
	'require'

	// Library extensions
],
function(Backbone, BaseModule, relativeRequire){

	var SearchView = BaseModule.Views.Base.extend({

		className: 'WizardSearch',

		_relativeRequire: relativeRequire,

		_templatePath: '../tpl/',

		events: {
			"click button.next": "next"/*,
			"click button.reset": "reset",
			"click button.submit": "submit"*/
		},

		next: function(){
			// do validation
			var valid = true;

			if(valid){
				// run search
				var success = true;
				if(success)
					this.trigger("complete");
			}
		}

	});

	return SearchView;
});