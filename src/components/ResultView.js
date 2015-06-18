var React = require('react'),
	Router =  require('react-router'),
	Link = Router.Link,
	ResultSet = require('../stores/ResultSet'),
	QueryParams = require('../stores/QueryParams');

var ResultView = React.createClass({
	getInitialState() {
		return {resultPending: false};
	},

	componentDidMount() { 
		ResultSet.addChangeListener(this._onChange);
		QueryParams.addResetListener(this._onQueryChange);
		QueryParams.addChangeListener(this._onQueryChange);
	},
 
 	componentWillUnmount() { 
		ResultSet.removeChangeListener(this._onChange);
		QueryParams.removeChangeListener(this._onQueryChange);
		QueryParams.removeResetListener(this._onQueryChange);
 	},

	_onChange() {
		if(this.isMounted()) {
			this.setState(ResultSet.data);
			this.setState({resultPending: false});
		}
	},

	_onQueryChange() {
		if(this.isMounted()) {
			this.setState({resultPending: true});
		}
	},

	render() {
		var _self = this;
		if(this.state.resultPending) {
			return (<div>Bezig met zoeken...</div>);
		} else if(ResultSet.data.numberOfRecords > 0) {
			return (
				<div>
					<h2>Gevonden: {ResultSet.data.numberOfRecords} </h2>
					{ResultSet.data.results.map(function(obj, i) {
						return (
							<div key={i}>
								<Link to="viewer" query={{identifier: obj.identifier.replace(/.*\?urn=/, "").replace(":ocr", ""), coll: QueryParams.data.coll}}>
									{obj.title}
								</Link>
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
