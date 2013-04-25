define([
	// Libraries
	'underscore',
	'backbone',

	// Modules

	// Library Extensions
	'backbone.forms',
	'jquery.ui',
	'moment'
],
function(_, Backbone){
	Backbone.Form.editors.DatePicker = Backbone.Form.editors.Text.extend({
		render: function() {
			// Call the parent's render method
			Backbone.Form.editors.Text.prototype.render.call(this);
			// Then make the editor's element a datepicker.
			this.$el.datepicker({
				format: 'yyyy-mm-dd',
				autoclose: true,
				weekStart: 1
			});

			return this;
		},

		// The set value must correctl
		setValue: function(value) {
			this.$el.val(moment(value).format('YYYY-MM-DD'));
		}
	});

	var VehicleValidator = Backbone.Model.extend({
		defaults: {
			vin: '',
			stock: '',
			miles: 0,
			condition: 'used',
			saleDate: 0
		},
		schema: {
			vin: { type:'Text', validators: ['required'] },
			stock: { type:'Text', validators: ['required'] },
			mileage: { type: 'Number', validators: ['required'] },
			condition: { type: 'Select', options: ['new', 'used'], validators: ['required'] },
			"saleDate": { type: 'DatePicker', validators: ['required'] }
		}
	});

	var VehicleValidators = Backbone.Collection.extend({
		defaults: {
			model: VehicleValidator
		},
		url: '/data/contracts.json',
		Model: VehicleValidator
	});

	return {
		Model: VehicleValidator,
		Collection: VehicleValidators
	};
});