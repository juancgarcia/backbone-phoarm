define(['jquery', 'backbone', 'views/Base'],
	function($, Backbone, BaseView){

	var HomeView = BaseView.extend({
		className: 'Home'
	});

	return HomeView;
});
