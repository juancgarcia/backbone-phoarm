define([
	// Libraries
	'backbone',

	// Modules

	// Library extensions
	'backbone.forms'
],
function(Backbone){

	var SelectionForm = Backbone.Form.extend({

		send: function(){
			var form = this;
			$.ajax({
				url: 'http://localhost:8000/data/detail-all.json'
			}).done(function(data, textStatus, jqXHR){
				form.succeeded(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				form.failed(jqXHR, textStatus, errorThrown);
			});
		},
		// placeholders
		failed: function(){},
		succeeded: function(){}

	});

	return SelectionForm;
});