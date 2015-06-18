var AbstractStore = require('./AbstractStore');

class QueryParams extends AbstractStore {
	constructor() { 
		super();
		this.data = {
			query: "",
			coll: "boeken",
			facets: {}
		}
	}
}

module.exports = new QueryParams();
