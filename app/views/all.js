define([
	// Libraries

	// Modules
	'./Header',
	'./Home',
	'./Main',
	'./List',
	'./About',
	'./Wrapper'

	// Library extensions
],
function(HeaderView, HomeView, MainView, ListView, AboutView, WrapperView){
	var Views = {};

	Views.Header = HeaderView;
	Views.Home = HomeView;
	Views.Main = MainView;
	Views.List = ListView;
	Views.About = AboutView;
	Views.Wrapper = WrapperView;

	return Views;	
});