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
}

module.exports = AbstractStore;
