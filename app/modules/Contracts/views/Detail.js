define([
	// Libraries
	'backbone',

	// Modules
	'modules/Base/Main'

	// Library extensions
],
function(Backbone, BaseModule){

	var DetailView = BaseModule.Views.Base.extend({
		
		className: 'ContractDetail'
	    
	});

	return DetailView;
});