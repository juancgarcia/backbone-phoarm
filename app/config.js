require.config({
	deps: ["app"],
	paths: {
		jquery: 'vendor/jquery-1.9.1',// //cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js
		underscore: 'vendor/underscore-1.4.4',// //cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js
		backbone: 'vendor/backbone-1.0.0',// //cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js
		'backbone.localStorage': 'vendor/backbone.localStorage',
		'backbone.subroute':'vendor/backbone.subroute-0.3.2',
		'backbone.forms':'vendor/backbone-forms',
		'text': 'vendor/requirejs.text-2.0.5'
		// //cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.1.1/bootstrap.min.js
	},
	shim: {
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'backbone.localStorage': {
			deps: ['backbone'],
			exports: 'Backbone'
		},
		'backbone.subroute':{
			deps: ['backbone']
		},
		'backbone.forms':{
			deps: ['backbone']
		}
	},
	'packages': [
		'modules/Base',
		'modules/Contracts'
	]
});