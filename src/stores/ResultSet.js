var AbstractStore = require('./AbstractStore'),
	QueryParams = require('./QueryParams');

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
