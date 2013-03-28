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

	var PubSub = {};
	PubSub.uniqueID = null;
	PubSub.getUniqueId = function(){
		if(!this.uniqueID)
			this.uniqueID = guid();
		return this.uniqueID;
	};
	PubSub.sub = function(eventName, callback){
		this.on(this.getUniqueId()+':'+eventName, callback);
	};
	PubSub.pub = function(eventName, message){
		this.trigger(this.getUniqueId()+':'+eventName, message)
	};

	return PubSub;
});