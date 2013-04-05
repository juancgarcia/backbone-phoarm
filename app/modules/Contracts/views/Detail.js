define([
	// Libraries
	'backbone',

	// Modules
	'modules/Base/Main',
	'require'

	// Library extensions
],
function(Backbone, BaseModule, relativeRequire){

	var DetailView = BaseModule.Views.Base.extend({
		
		className: 'ContractDetail',

		_relativeRequire: relativeRequire,

		_templatePath: '../tpl/',

		initialize: function(){
			var theView = this;	
			this.model.on('change:_id', function(){
				this.model.fetch({
					success: function(){
						theView.render().trigger('show');
					}
				});
			}, this);
			BaseModule.Views.Base.prototype.initialize.apply(this, arguments);
		}
	    
	});

	return DetailView;
});