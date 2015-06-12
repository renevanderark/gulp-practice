var React = require('react'),
	ResultSet = require('../stores/ResultSet'),
	QueryParams = require('../stores/QueryParams');


var QueryFeedbackView = React.createClass({
	getInitialState: function() {
		return {
			queryParams: QueryParams.data,
			numberOfRecords: ResultSet.data.numberOfRecords,
		}
	},

	componentDidMount: function() { 
		QueryParams.addChangeListener(this._onQueryChange);
		ResultSet.addChangeListener(this._onResultSetChange)
	},

	_onQueryChange: function() {
		this.setState({queryParams: QueryParams.data});
		this.setState({numberOfRecords: 0});
	},

	_onResultSetChange: function() {
		this.setState({numberOfRecords: ResultSet.data.numberOfRecords});
	},

	getCollName: function() {
		return this.state.queryParams.coll;
	},

	render: function() {
		if(this.state.numberOfRecords > 0) {
			return (
				<div>
					<h3>Gezocht op {this.state.queryParams.query} in {this.getCollName()}</h3>
				</div>
			);
		} else {
			return (<div />);
		}
	}
});

module.exports = QueryFeedbackView;