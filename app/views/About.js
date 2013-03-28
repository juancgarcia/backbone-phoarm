define(['jquery', 'backbone', 'views/Base'],
	function($, Backbone, BaseView){

	var AboutView = BaseView.extend({
		className: 'About'
	});

	return AboutView;
});
