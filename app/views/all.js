define([
	// Libraries

	// Modules
	'./Header',
	'./Home',
	'./List',
	'./About'

	// Library extensions
],
function(HeaderView, HomeView, ListView, AboutView){
	var Views = {};

	Views.Header = HeaderView;
	Views.Home = HomeView;
	Views.List = ListView;
	Views.About = AboutView;

	return Views;
});