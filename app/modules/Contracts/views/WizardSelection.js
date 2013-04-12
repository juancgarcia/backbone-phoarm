define([
	// Libraries
	'backbone',

	// Modules

	// Library extensions
	'backbone.forms'
],
function(Backbone){

	var SelectionView = Backbone.Form.extend({

		schema: {
			product: {
				type: 'Select',
				options: [
					'Product1',
					'Product2',
					'Product3'
					]
			}
		}

	});

	return SelectionView;
});