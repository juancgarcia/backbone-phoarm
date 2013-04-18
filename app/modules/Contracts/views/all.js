define([
	// Libraries

	// Modules
	'./Master',
	'./ContractHome',
	'./Detail',
	'./ContractList',
	'./ContractListItem',
	'./Wizard',
	'./WizardSearch',
	'./WizardSelection',
	'./WizardOptions',
	'./WizardCustomer'

	// Library extensions
],
function(MasterView, HomeView, DetailView, ListView, ListItemView,
	Wiz, WizSearch, WizSelection, WizOptions, WizCustomer){
	var Views = {};

	Views.Master = MasterView;
	Views.Home = HomeView;
	Views.Detail = DetailView;
	Views.List = ListView;
	Views.ListItem = ListItemView;
	Views.Wizard = Wiz;
	Views.WizardSearch = WizSearch;
	Views.WizardSelection = WizSelection;
	Views.WizardOptions = WizOptions;
	Views.WizardCustomer = WizCustomer;

	return Views;
});