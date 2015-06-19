var React = require('react'),
	Router = require('react-router'),
	QueryParams = require('../stores/QueryParams'),
	facetString = require('../util/facetString'),
	appDispatcher = require('../appDispatcher');

var QueryFeedbackView = React.createClass({

	mixins : [Router.Navigation],
	getInitialState() {
		return {queryParams: QueryParams.data };
	},

	componentDidMount() { 
		QueryParams.addChangeListener(this._onQueryChange);
		QueryParams.addResetListener(this._onQueryChange);
	},

 	componentWillUnmount() { 
		QueryParams.removeChangeListener(this._onQueryChange);
		QueryParams.removeResetListener(this._onQueryChange);
 	},
 
	_onQueryChange() {
		if(this.isMounted()) { this.setState({queryParams: QueryParams.data}); }
	},

	getCollName() {
		return this.props[this.state.queryParams.coll];
	},

	removeFilter(event) {
		var params = QueryParams.data;
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
			return (
				<a key={i} onClick={_self.removeFilter} data-facetvalue={_self.state.queryParams.facets[key][0]} data-facetname={key}>
					<span className="inner">{facetString.getFacetName(_self.props, key)}:</span>
					{facetString.getFacetQueryValue(_self.state.queryParams.facets[key][0])}
				</a>
			);
		});
	},

	render() {
		return (
			<div className="feedback-view">
				<h3>Gezocht op {this.state.queryParams.query === "" ? "alles" : this.state.queryParams.query} in {this.getCollName()}</h3>
				{ this.renderFacetFilters() }
			</div>
		);
	}
});

module.exports = QueryFeedbackView;