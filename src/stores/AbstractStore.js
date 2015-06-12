var EventEmitter = require('events').EventEmitter;

class AbstractStore extends EventEmitter {
	emitUpdate() {
		this.emit('change');
	}

	addChangeListener(callback) { 
		this.on('change', callback); 
	}
}

module.exports = AbstractStore;
