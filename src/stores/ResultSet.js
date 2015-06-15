var AbstractStore = require('./AbstractStore');

class ResultSet extends AbstractStore {
	constructor() { 
		super();
		this.data = {
			results: [],
			numberOfRecords: 0,
			facets: []
		}
	}
}

module.exports = new ResultSet();
