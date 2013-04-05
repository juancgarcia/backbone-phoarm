define([
	'underscore',
	'./Guid'
], function(_, Guid){

	var Classy = _.extend(Guid);

	Classy.getClassName = function(){
		return this.className || 'Classy';
	};

	Classy.getInstanceId = function(){
		return this.getClassName()+' ('+this.getUniqueId()+')'
	};

	return Classy;
});