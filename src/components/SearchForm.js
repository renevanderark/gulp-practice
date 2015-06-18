var React = require('react'),
	Router = require('react-router'),
	appDispatcher = require('../appDispatcher'),
	api = require('../api/search'),
	QueryParams = require('../stores/QueryParams');

var SearchForm = React.createClass({
	mixins : [Router.Navigation, Router.State],

	componentDidMount() { 
		QueryParams.addChangeListener(this._onQueryChange);
		QueryParams.addResetListener(this._onQueryChange);
	},

 	componentWillUnmount() { 
		QueryParams.removeChangeListener(this._onQueryChange);
		QueryParams.removeResetListener(this._onQueryChange);
 	},


	_onQueryChange() {
		if(this.isMounted()) { this.setState(QueryParams.data); }
	},

	getInitialState() {
		return QueryParams.data;
	},

	handleChange(event) {
		this.setState({query: event.target.value});
	},

	dispatchQuery(event) {
		appDispatcher.dispatch({
			actionType: 'query-update',
			params: {query: this.state.query, coll: this.state.coll, facets: {}}
		});

		if(typeof event !== 'undefined') { return event.preventDefault(); }
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
				<input placeholder="enter search" type="text" value={this.state.query} onChange={this.handleChange} />
				<button type="submit">Zoeken</button>
			</form>
		);
	}
});

module.exports = SearchForm;

