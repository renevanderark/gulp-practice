var AbstractStore = require('./AbstractStore');

class QueryParams extends AbstractStore {
	constructor() { 
		super();
		this.data = {
			query: "water",
			coll: "boeken",
			facets: {}
		}
	}
}

module.exports = new QueryParams();
