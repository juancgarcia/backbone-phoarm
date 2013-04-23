define([
	// Libraries

	// Modules
	'./Master',
	'./ContractHome',
	'./Detail',
	'./ContractList',
	'./ContractListItem',
	'./Wizard',
	'./WizardForm'

	// Library extensions
],
function(MasterView, HomeView, DetailView, ListView, ListItemView,
	WizardView, WizardForm){
	var Views = {};

	Views.Master = MasterView;
	Views.Home = HomeView;
	Views.Detail = DetailView;
	Views.List = ListView;
	Views.ListItem = ListItemView;
	Views.Wizard = WizardView;
	Views.WizardForm = WizardForm;

	return Views;
});