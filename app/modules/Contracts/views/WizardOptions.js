define([
	// Libraries
	'backbone',

	// Modules

	// Library extensions
	'backbone.forms'
],
function(Backbone){

	var OptionsView = Backbone.Form.extend({

		schema: {
			option: {
				type: 'Select',
				options: ['A', 'B', 'C']
			}
		}

	});

	return OptionsView;
});