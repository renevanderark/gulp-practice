var React = require('react'),
	ResultSet = require('../stores/ResultSet'),
	facetString = require('../util/facetString'),
	appDispatcher = require('../appDispatcher'),
	assign = require('object-assign'),
	QueryParams = require('../stores/QueryParams');

var FacetView = React.createClass({

	getInitialState() {
		return {resultPending: false};
	},

	componentDidMount() { 
		QueryParams.addChangeListener(this._onQueryChange);
		QueryParams.addResetListener(this._onQueryChange);

		ResultSet.addChangeListener(this._onChange);
	},

 	componentWillUnmount() { 
		ResultSet.removeChangeListener(this._onChange);
		QueryParams.removeChangeListener(this._onQueryChange);
		QueryParams.removeResetListener(this._onQueryChange);
 	},

	_onChange() {
		if(this.isMounted()) {
			this.setState(ResultSet.data);
			this.setState({resultPending: false});
		}
	},

	_onQueryChange() {
		if(this.isMounted()) { this.setState({resultPending: true}); }
	},

	addFilter(event) {
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
				facets: assign(QueryParams.data.facets || {}, params || {}),
				page: 1
			}
		});
	},

	render() {
		if(ResultSet.data.numberOfRecords === 0 || this.state.resultPending) {
			return (<div />);
		} else {
			var _self = this;
			return (
				<div className="facet-view">
					<input type="checkbox" id="toggle-filters" />
					<h3><label htmlFor="toggle-filters">Filters</label></h3>
					<div>
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
				</div>
			);
		}
	}
});

module.exports = FacetView;
