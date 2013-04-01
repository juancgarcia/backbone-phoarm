define([
	// Libraries

	// Modules
	'./ContractSearch',
	'./Detail',
	'./ContractList',
	'./ContractListItem'

	// Library extensions
],
function(SearchView, DetailView, ContractListView, ContractListItemView){
	var Views = {};

	Views.Search = SearchView;
	Views.Detail = DetailView;
	Views.List = ContractListView;
	Views.ListItem = ContractListItemView;

	return Views;	
});