define(['jquery', 'backbone', 'views/Base'],
	function($, Backbone, BaseView){

	var HeaderView = BaseView.extend({
		className: 'Header',
		//template: function(){},
	    selectMenuItem: function (menuItem) {
	        $('.nav li').removeClass('active');
	        if (menuItem) {
	            $('.' + menuItem).addClass('active');
	        }
	    }
	});

	return HeaderView;
});
