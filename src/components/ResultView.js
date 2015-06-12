var React = require('react'),
	ResultSet = require('../stores/ResultSet'),
	QueryParams = require('../stores/QueryParams');


var ResultView = React.createClass({
	getInitialState: function() {
		return {resultPending: false};
	},

	componentDidMount: function() { 
		ResultSet.addChangeListener(this._onChange);
		QueryParams.addChangeListener(this._onQueryChange)
	},

	_onChange: function() {
		this.setState(ResultSet.data);
		this.setState({resultPending: false});
	},

	_onQueryChange: function() {
		this.setState({resultPending: true});
	},

	render: function() {
		if(this.state.resultPending) {
			return (<div>Bezig met zoeken...</div>);
		} else if(ResultSet.data.numberOfRecords > 0) {
			return (
				<div>
					<h2>Gevonden: {ResultSet.data.numberOfRecords} </h2>
					{ResultSet.data.results.map(function(obj, i) {
						return <div key={obj.identifier.replace(/.*\?urn=/, "").replace(/:/g, "-")}>{obj.title}</div>;
					})}
				</div>
			);
		} else {
			return (<div />);
		}
	}
});

module.exports = ResultView;
