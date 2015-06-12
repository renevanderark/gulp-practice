var React = require('react'),
	api = require('../api/search'),
	appDispatcher = require('../appDispatcher'),
	ResultSet = require('../stores/ResultSet'),
	QueryParams = require('../stores/QueryParams'),
	qs = require('qs');


var SearchForm = React.createClass({
	componentDidMount: function() { 
		QueryParams.addChangeListener(this._onQueryChange);
		QueryParams.addResetListener(this._onQueryReset);
	},

	_onQueryChange: function() {
		this.setState(QueryParams.data, this.performSearch);
	},

	_onQueryReset: function() {
		this.setState(QueryParams.data);
	},

	getInitialState: function() {
		return QueryParams.data;
	},

	onError: function(data) {
		console.log(data);
	},

	onSuccess: function(data) {
		appDispatcher.dispatch({
			actionType: 'result-update',
			records: data.records,
			numberOfRecords: data.numberOfRecords,
			facets: data.facets
		});
		history.pushState({resultSet: data, queryParams: QueryParams.data}, "", "?" + qs.stringify(QueryParams.data))
	},

	performSearch: function() {
		api.query(QueryParams.data, this.onSuccess, this.onError);
	},

	handleChange: function(event) {
		this.setState({query: event.target.value});
	},

	handleKey: function(event) {
		if(event.keyCode === 13) { 
			this.dispatchQuery();
		}
	},

	dispatchQuery: function() {
		appDispatcher.dispatch({
			actionType: 'query-update',
			params: {query: this.state.query, coll: this.state.coll, facets: {}}
		});
	},

	setColl: function(event) {
		appDispatcher.dispatch({
			actionType: 'query-update',
			params: {coll: event.target.value, query: this.state.query, facets: {}}
		});
	},

	render: function() {
		return (
			<div className="search-form">
				<select onChange={this.setColl} value={this.state.coll}>
					<option value="boeken">Boeken</option>
					<option value="ddd">Kranten</option>
					<option value="dts">Tijdschriften</option>
					<option value="anp">Radiobulletins</option>
				</select>
				<input type="text" value={this.state.query} onKeyDown={this.handleKey} onChange={this.handleChange} />
				<button onClick={this.dispatchQuery}>Zoeken</button>
			</div>
		);
	}
});

module.exports = SearchForm;

