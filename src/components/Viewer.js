var React = require('react'),
	Router = require('react-router'),
	api = require('../api/search');

var Viewer = React.createClass({
	mixins : [Router.State],

	getInitialState() {		
		return {
			params: this.getQuery(),
			data: {}
		};
	},

	onFetch(data) {
		this.setState({data: data});
	},

	onError(data) {
		console.log(data);
	},

	componentDidMount() { 
		api.view(this.state.params, this.onFetch, this.onError);
	},

	render() {
		var _self = this;
		return (
			<div>
				{Object.keys(this.state.data).map(function(key, i) {
					return <div key={i}><span className="blocky">{key}:</span><span>{_self.state.data[key]}</span></div>
				})}
			</div>
		);
	}
});

module.exports = Viewer;
