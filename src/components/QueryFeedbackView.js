var React = require('react'),
	ResultSet = require('../stores/ResultSet'),
	QueryParams = require('../stores/QueryParams'),
	facetString = require('../util/facetString'),
	appDispatcher = require('../appDispatcher');


var QueryFeedbackView = React.createClass({
	getInitialState() {
		return {
			queryParams: QueryParams.data,
			numberOfRecords: ResultSet.data.numberOfRecords,
		}
	},

	componentDidMount() { 
		QueryParams.addChangeListener(this._onQueryChange);
		QueryParams.addResetListener(this._onQueryReset);

		ResultSet.addChangeListener(this._onResultSetChange);
	},

	_onQueryChange() {
		this.setState({queryParams: QueryParams.data});
		this.setState({numberOfRecords: 0});
	},

	_onQueryReset() {
		this.setState({queryParams: QueryParams.data});
	},

	_onResultSetChange() {
		this.setState({numberOfRecords: ResultSet.data.numberOfRecords});
	},

	getCollName() {
		return this.props[this.state.queryParams.coll];
	},

	removeFilter(event) {
		console.log(event.target);
		var params = QueryParams.data;
		console.log(event.target.getAttribute("data-facetname"));
		delete(params.facets[event.target.getAttribute("data-facetname")]);
		appDispatcher.dispatch({
			actionType: 'query-update',
			params:  params
		});
	},

	renderFacetFilters() {
		if(!this.state.queryParams.facets) { return; }
		var _self = this;
		return Object.keys(this.state.queryParams.facets).map(function(key, i) {
			return (<span className="blocky" key={i}>
				<span className="blocky">{facetString.getFacetName(_self.props, key)}:</span>
				<a onClick={_self.removeFilter} data-facetvalue={_self.state.queryParams.facets[key][0]} data-facetname={key}>
					{facetString.getFacetQueryValue(_self.state.queryParams.facets[key][0])}
				</a>
			</span>);
		});
	},

	render() {
		if(this.state.numberOfRecords > 0) {
			return (
				<div>
					<h3>Gezocht op {this.state.queryParams.query} in {this.getCollName()}</h3>
					{ this.renderFacetFilters() }
				</div>
			);
		} else {
			return (<div />);
		}
	}
});

module.exports = QueryFeedbackView;