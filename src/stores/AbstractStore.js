var EventEmitter = require('events').EventEmitter;

class AbstractStore extends EventEmitter {
	emitUpdate() {
		this.emit('change');
	}

	addChangeListener(callback) { 
		this.on('change', callback); 
	}

	emitReset() {
		this.emit('reset');
	}

	addResetListener(callback) {
		this.on('reset', callback);
	}
 
 	removeChangeListener(callback) { 
 		this.removeListener('change', callback); 
 	}

 	removeResetListener(callback) { 
 		this.removeListener('reset', callback); 
 	}
}

module.exports = AbstractStore;
