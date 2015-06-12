var facetString = {
	getFacetName: function(props, name) {
		return props[name];
	},


	getFacetValue: function(val) {
		return val
			.replace(/^[0-9]\//, "")
			.replace(/.*\/([^\/]+)\/\s*(\([0-9]+\))$/, "$1 $2")
			.replace(/_/g, " ")
			.replace(/\/\s+\(/, " (");
	},

	getFacetQueryValue: function(val) {
		return val
			.replace(/.*\|([^\/]+)\|\s*$/, "$1")
			.replace(/_/g, " ")
			.replace(/\|/g, "/");
	}
}

module.exports = facetString;