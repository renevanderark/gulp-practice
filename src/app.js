var React = require('react'),
	appDispatcher = require('./appDispatcher'),
	ResultSet = require('./stores/ResultSet'),
	ResultView = require('./components/ResultView'),
	FacetView = require('./components/FacetView'),
	SearchForm = require('./components/SearchForm');


var App = React.createClass({
	render: function() {
		return (
			<div>
				<SearchForm />
				<ResultView />
				<FacetView />
			</div>
		);
	}
});

React.render(
	<App />,
	document.getElementById('app')
);
