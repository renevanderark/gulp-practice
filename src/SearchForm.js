var React = require('react'),
	api = require('./api'),
	appDispatcher = require('./appDispatcher'),
	ResultSet = require('./ResultSet');

var SearchForm = React.createClass({
	getInitialState: function() {
		return {query: "water", coll: "boeken"};
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

	performSearch: function(e) {
		api.query({query: this.state.query, coll: this.state.coll}, this.onSuccess, this.onError);
	},

	handleChange: function(event) {
		this.setState({query: event.target.value});
	},

	handleKey: function(event) {
		if(event.keyCode === 13) { this.performSearch(); }
	},

	setColl: function(event) {
		this.setState({coll: event.target.value}, this.performSearch);
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
				<button onClick={this.performSearch}>test</button>
			</div>
		);
	}
});

module.exports = SearchForm;

