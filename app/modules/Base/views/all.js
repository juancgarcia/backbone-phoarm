define([
	// Libraries
	'jquery',
	'underscore',
	'backbone',

	// Modules
	'./Base',
	'./HierarchyNode',
	'./AmdTemplate'

	// Library extensions
],
function($, _, Backbone, BaseView, HierarchyNodeView, AmdTemplateView){
	var Views = {};

	Views.Base = BaseView;
	Views.HiearchyNode = HierarchyNodeView;
	Views.AmdTemplate = AmdTemplateView;

	return Views;
});