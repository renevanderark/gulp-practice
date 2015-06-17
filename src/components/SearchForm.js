var React = require('react'),
	api = require('../api/search'),
	appDispatcher = require('../appDispatcher'),
	ResultSet = require('../stores/ResultSet'),
	QueryParams = require('../stores/QueryParams'),
	qs = require('qs');


var SearchForm = React.createClass({
	componentDidMount() { 
		QueryParams.addChangeListener(this._onQueryChange);
		QueryParams.addResetListener(this._onQueryReset);
	},

	_onQueryChange() {
		this.setState(QueryParams.data, this.performSearch);
	},

	_onQueryReset() {
		this.setState(QueryParams.data);
	},

	getInitialState() {
		return QueryParams.data;
	},

	onError(data) {
		console.log(data);
	},

	onSuccess(data) {
		appDispatcher.dispatch({
			actionType: 'result-update',
			records: data.records,
			numberOfRecords: data.numberOfRecords,
			facets: data.facets
		});
		history.pushState({resultSet: data, queryParams: QueryParams.data}, "", "?" + qs.stringify(QueryParams.data))
	},

	performSearch() {
		api.query(QueryParams.data, this.onSuccess, this.onError);
	},

	handleChange(event) {
		this.setState({query: event.target.value});
	},


	dispatchQuery(event) {
		appDispatcher.dispatch({
			actionType: 'query-update',
			params: {query: this.state.query, coll: this.state.coll, facets: {}}
		});
		return false;
	},

	setColl(event) {
		this.setState({coll: event.target.value}, this.dispatchQuery);
	},

	render() {
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

