define(['jquery', 'backbone', 'views/Base'],
	function($, Backbone, BaseView){

	var HeaderView = BaseView.extend({
		template: function(){},
	    selectMenuItem: function (menuItem) {
	        $('.nav li').removeClass('active');
	        if (menuItem) {
	            $('.' + menuItem).addClass('active');
	        }
	    }
	});

	return HeaderView;
});
