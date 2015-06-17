var React = require('react'),
	qs = require('qs'),
	api = require('../api/search');

var Viewer = React.createClass({
	getInitialState() {
		return {
			params: qs.parse(location.href.replace(/^.*\?/,"")),
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
			<dl>
				{Object.keys(this.state.data).map(function(key, i) {
					return <div key={i}><dt>{key}:</dt><dd>{_self.state.data[key]}</dd></div>
				})}
			</dl>
		);
	}
});

module.exports = Viewer;
