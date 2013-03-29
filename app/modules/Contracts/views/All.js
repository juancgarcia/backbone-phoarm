define([
	// Libraries

	// Modules
	'./Detail',
	'./ContractList',
	'./ContractListItem'

	// Library extensions
],
function(DetailView, ContractListView, ContractListItemView){
	var Views = {};

	Views.Detail = DetailView;
	Views.List = ContractListView;
	Views.ListItem = ContractListItemView;

	return Views;	
});