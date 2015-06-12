var AbstractStore = require('./AbstractStore')

class QueryParams extends AbstractStore {
	constructor() { 
		super();
		this.data = {
			query: "water",
			coll: "boeken"
		}
	}
}

module.exports = new QueryParams();
