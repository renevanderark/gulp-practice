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


	dispatchQuery: function(event) {
		appDispatcher.dispatch({
			actionType: 'query-update',
			params: {query: this.state.query, coll: this.state.coll, facets: {}}
		});
		return false;
	},

	setColl: function(event) {
		this.setState({coll: event.target.value}, this.dispatchQuery);
	},

	render: function() {
		return (
			<form className="search-form" onSubmit={this.dispatchQuery}>
				<select onChange={this.setColl} value={this.state.coll}>
					<option value="boeken">Boeken</option>
					<option value="ddd">Kranten</option>
					<option value="dts">Tijdschriften</option>
					<option value="anp">Radiobulletins</option>
				</select>
				<input type="text" value={this.state.query} onChange={this.handleChange} />
				<button type="submit">Zoeken</button>
			</form>
		);
	}
});

module.exports = SearchForm;

