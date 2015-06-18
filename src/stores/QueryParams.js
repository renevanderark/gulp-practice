var AbstractStore = require('./AbstractStore');

class QueryParams extends AbstractStore {
	constructor() { 
		super();
		this.data = {
			query: "",
			coll: "boeken",
			facets: {},
			page: 1
		}
	}
}

module.exports = new QueryParams();
