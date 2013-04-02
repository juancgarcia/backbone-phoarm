define([
	// Libraries

	// Modules
	'./Master',
	'./ContractSearch',
	'./Detail',
	'./ContractList',
	'./ContractListItem'

	// Library extensions
],
function(MasterView, SearchView, DetailView, ContractListView, ContractListItemView){
	var Views = {};

	Views.Master = MasterView;
	Views.Search = SearchView;
	Views.Detail = DetailView;
	Views.List = ContractListView;
	Views.ListItem = ContractListItemView;

	return Views;	
});