define([
	// Libraries
	'jquery',
	'underscore',
	'backbone'

	// Modules

	// Library extensions
],
function($, _, Backbone){

	var Credential = Backbone.Model.extend({
		initialize: function(){
			// this.on('all', function(eventName){
			// 	console.log('Credential Model event: '+eventName);
			// });
		},
		schema: {
			username: {type: 'Text', validators: ['required']},
			password: {type: 'Password', validators: ['required']}
		},
		defaults: {
			username: '',
			password: ''
		}
	});
	var Credentials = Backbone.Collection.extend({
		defaults: {
			model: Credential
		},
		Model: Credential
	});

	return {
		Model: Credential,
		Collection: Credentials
	};
});