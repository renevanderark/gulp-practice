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

	getFacetName: function(name) {
		return this.props[name];
	},

	addFilter: function(event) {
		console.log(event.target);
	},

	render: function() {
		if(ResultSet.data.numberOfRecords === 0 || this.state.resultPending) {
			return (<div />);
		} else {
			var _self = this;
			return (
				<div className="facet-view">
					<h3>Facetten</h3>
					{ResultSet.data.facets.map(function(fac, i) {
						return (<div key={i}>
							<h4>{_self.getFacetName(fac.name)}</h4>
							{fac.values.map(function(val, j) { 
								return (
									<li key={j}>
										<a onClick={_self.addFilter} data-facetname={fac.name} data-facetvalue={val}>
											{val}
										</a>
									</li>
								)
							})}
						</div>);
					})}
				</div>
			);
		}
	}
});

module.exports = FacetView;
