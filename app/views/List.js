define(['jquery', 'backbone', 'views/Base'],
	function($, Backbone, BaseView){

	var ListView = BaseView.extend({
		className: 'List'
	});

	return ListView;
});
