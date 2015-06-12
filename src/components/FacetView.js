var React = require('react'),
	ResultSet = require('../stores/ResultSet'),
	QueryParams = require('../stores/QueryParams');


var FacetView = React.createClass({
	getInitialState: function() {
		return {resultPending: false};
	},

	componentDidMount: function() { 
		QueryParams.addChangeListener(this._onQueryChange);
		ResultSet.addChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(ResultSet.data);
		this.setState({resultPending: false});

	},

	_onQueryChange: function() {
		this.setState({resultPending: true});
	},

	render: function() {
		if(ResultSet.data.numberOfRecords === 0 || this.state.resultPending) {
			return (<div />);
		} else {
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
		}
	}
});

module.exports = FacetView;
