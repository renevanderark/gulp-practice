var EventEmitter = require('events').EventEmitter,
	assign = require('object-assign');

var ResultSet = assign({}, EventEmitter.prototype, {
	data: {
		results: [],
		numberOfRecords: 0,
		facets: []
	},

	emitUpdate: function() {
		this.emit('change');
	},

	addChangeListener: function(callback) { 
		this.on('change', callback); 
	}
});

module.exports = ResultSet;
