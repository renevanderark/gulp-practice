var React = require('react'),
	appDispatcher = require('../appDispatcher'),
	ResultSet = require('../stores/ResultSet'),
	QueryParams = require('../stores/QueryParams'),
	facetString = require('../util/facetString');


var FacetView = React.createClass({
	getInitialState: function() {
		return {resultPending: false};
	},

	componentDidMount: function() { 
		QueryParams.addChangeListener(this._onQueryChange);
		ResultSet.addChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(ResultSet.data);
		this.setState({resultPending: false});

	},

	_onQueryChange: function() {
		this.setState({resultPending: true});
	},

	addFilter: function(event) {
		var facetName = event.target.getAttribute("data-facetname"),
			facetValue = event.target.getAttribute("data-facetvalue")
				.replace(/\//g, "|")
				.replace(/\s+\([0-9]+\)\s*$/, ""),
			params = {};
		params[facetName] = [facetValue];
		appDispatcher.dispatch({
			actionType: 'query-update',
			params: {
				query: QueryParams.data.query,
				coll: QueryParams.data.coll,
				facets: Object.assign(QueryParams.data.facets || {}, params || {})
			}
		});
	},

	render: function() {
		if(ResultSet.data.numberOfRecords === 0 || this.state.resultPending) {
			return (<div />);
		} else {
			var _self = this;
			return (
				<div className="facet-view">
					<h3>Facetten</h3>
					{ResultSet.data.facets.map(function(fac, i) {
						return (<div key={i}>
							<h4>{facetString.getFacetName(_self.props, fac.name)}</h4>
							{fac.values.map(function(val, j) { 
								return (
									<li key={j}>
										<a onClick={_self.addFilter} data-facetname={fac.name} data-facetvalue={val}>
											{facetString.getFacetValue(val)}
										</a>
									</li>
								)
							})}
						</div>);
					})}
				</div>
			);
		}
	}
});

module.exports = FacetView;
