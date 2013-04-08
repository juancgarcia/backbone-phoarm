define([
	// Libraries
	'jquery',
	'backbone',

	// Modules
	'modules/Base'

	// Library extensions
],
function($, Backbone, BaseModule){

	var ListView = BaseModule.Views.Base.extend({
		className: 'List'
	});

	return ListView;
});
