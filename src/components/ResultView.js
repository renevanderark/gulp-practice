var React = require('react'),
	ResultSet = require('../stores/ResultSet'),
	QueryParams = require('../stores/QueryParams'),
	appDispatcher = require('../appDispatcher'),
	qs = require("qs");


var ResultView = React.createClass({
	getInitialState() {
		return {resultPending: false};
	},

	componentDidMount() { 
		ResultSet.addChangeListener(this._onChange);
		QueryParams.addChangeListener(this._onQueryChange)

		window.onpopstate = function(event) {
			if(event.state && event.state.resultSet && event.state.queryParams) {
				appDispatcher.dispatch({
					actionType: 'result-update',
					records: event.state.resultSet.records,
					numberOfRecords: event.state.resultSet.numberOfRecords,
					facets: event.state.resultSet.facets
				});
				appDispatcher.dispatch({
					actionType: 'query-reset',
					params: event.state.queryParams
				});
			}
		};

		window.onload = function(event) {
			if(location.href.match(/\?/)) {
				appDispatcher.dispatch({
					actionType: 'query-update',
					params: qs.parse(location.href.replace(/.*\?/, ""))
				});
			}
		};
	},

	_onChange() {
		this.setState(ResultSet.data);
		this.setState({resultPending: false});
	},

	_onQueryChange() {
		this.setState({resultPending: true});
	},

	render() {
		if(this.state.resultPending) {
			return (<div>Bezig met zoeken...</div>);
		} else if(ResultSet.data.numberOfRecords > 0) {
			return (
				<div>
					<h2>Gevonden: {ResultSet.data.numberOfRecords} </h2>
					{ResultSet.data.results.map(function(obj, i) {
						return (
							<div key={obj.identifier.replace(/.*\?urn=/, "").replace(/:/g, "-")}>
								<a href={"/view?identifier=" + encodeURIComponent(obj.identifier.replace(/.*\?urn=/, "").replace(":ocr", "")) + "&coll=" + QueryParams.data.coll}>
									{obj.title}
								</a>
							</div>
						);
					})}
				</div>
			);
		} else {
			return (<div />);
		}
	}
});





module.exports = ResultView;
