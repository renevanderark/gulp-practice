var React = require('react'),
	ResultView = require('./components/ResultView'),
	FacetView = require('./components/FacetView'),
	SearchForm = require('./components/SearchForm'),
	QueryFeedbackView = require('./components/QueryFeedbackView');


var App = React.createClass({
	render: function() {
		return (
			<div>
				<SearchForm />
				<QueryFeedbackView />
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
