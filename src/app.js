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
				<FacetView periode="Periode" spatial="Verspreidingsgebied" type="Soort bericht" shelfmark="Herkomst" typeFacet="Tijschriftonderdeel" />
				<QueryFeedbackView ddd="kranten" boeken="boeken" dts="tijdschriften" />
				<ResultView />
			</div>
		);
	}
});

React.render(
	<App />,
	document.getElementById('app')
);
