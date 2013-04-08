define([
	// Libraries

	// Modules
	'./Master',
	'./ContractSearch',
	'./Detail',
	'./ContractList',
	'./ContractListItem',
	'./Wizard',
	'./WizardSearch',
	'./WizardSelection'

	// Library extensions
],
function(MasterView, SearchView, DetailView, ListView, ListItemView, Wiz, WizSearch, WizSelection){
	var Views = {};

	Views.Master = MasterView;
	Views.Search = SearchView;
	Views.Detail = DetailView;
	Views.List = ListView;
	Views.ListItem = ListItemView;
	Views.Wizard = Wiz;
	Views.WizardSearch = WizSearch;
	Views.WizardSelection = WizSelection;

	return Views;	
});