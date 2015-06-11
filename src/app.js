var React = require('react'),
	appDispatcher = require('./appDispatcher'),
	ResultSet = require('./ResultSet'),
	ResultView = require('./ResultView'),
	FacetView = require('./FacetView'),
	SearchForm = require('./SearchForm');


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
