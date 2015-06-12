var React = require('react'),
	api = require('../api/search'),
	appDispatcher = require('../appDispatcher'),
	ResultSet = require('../stores/ResultSet'),
	QueryParams = require('../stores/QueryParams');


var SearchForm = React.createClass({
	componentDidMount: function() { 
		QueryParams.addChangeListener(this._onQueryChange);
	},

	_onQueryChange: function() {
		this.setState(QueryParams.data);
		this.performSearch();
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
	},

	performSearch: function() {
		api.query({query: this.state.query, coll: this.state.coll}, this.onSuccess, this.onError);
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
			params: {query: this.state.query, coll: this.state.coll}
		});
	},

	setColl: function(event) {
		appDispatcher.dispatch({
			actionType: 'query-update',
			params: {coll: event.target.value, query: this.state.query}
		});
	},

	render: function() {
		return (
			<div>
				<select onChange={this.setColl}>
					<option value="boeken">Boeken</option>
					<option value="ddd">Kranten</option>
					<option value="dts">Tijdschriften</option>
				</select>
				<input type="text" value={this.state.query} onKeyDown={this.handleKey} onChange={this.handleChange} />
				<button onClick={this.dispatchQuery}>Zoeken</button>
			</div>
		);
	}
});

module.exports = SearchForm;

