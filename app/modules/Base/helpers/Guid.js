define([], function(){

	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	};

	function guid() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
	}

	var Guid = {};
	Guid.uniqueID = null;
	Guid.getUniqueId = function(){
		if(!this.uniqueID)
			this.uniqueID = guid();
		return this.uniqueID;
	};

	return Guid;
});