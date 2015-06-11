var React = require('react'),
	ResultSet = require('./ResultSet');

var ResultView = React.createClass({
	componentDidMount: function() { 
		ResultSet.addChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(ResultSet.data);
	},

	render: function() {
		if(ResultSet.data.numberOfRecords > 0) {
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
