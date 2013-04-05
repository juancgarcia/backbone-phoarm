define([
	// Libraries

	// Modules
	'./Header',
	'./Home',
	'./List',
	'./About',
	'./Wrapper'

	// Library extensions
],
function(HeaderView, HomeView, ListView, AboutView, WrapperView){
	var Views = {};

	Views.Header = HeaderView;
	Views.Home = HomeView;
	Views.List = ListView;
	Views.About = AboutView;
	Views.Wrapper = WrapperView;

	return Views;	
});