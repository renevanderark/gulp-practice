var React = require('react'),
	ResultSet = require('./ResultSet');


var FacetView = React.createClass({
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
					<h3>Facetten</h3>
					{ResultSet.data.facets.map(function(fac, i) {
						return (<div key={i}>
							{fac.name}:
							{fac.values.map(function(val, j) { return <li key={j}>{val}</li>})}
						</div>);
					})}
				</div>
			);
		} else {
			return (<div />);
		}
	}
});

module.exports = FacetView;
