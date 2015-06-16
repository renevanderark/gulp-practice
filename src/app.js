var React = require('react'),
	appDispatcher = require('./appDispatcher'),
	ResultView = require('./components/ResultView'),
	FacetView = require('./components/FacetView'),
	SearchForm = require('./components/SearchForm'),
	QueryFeedbackView = require('./components/QueryFeedbackView'),
	qs = require('qs');


var App = React.createClass({
	render: function() {
		return (
			<div>
				<SearchForm />
				<FacetView periode="Periode" spatial="Verspreidingsgebied" type="Soort bericht" shelfmark="Herkomst" typeFacet="Tijschriftonderdeel" />
				<QueryFeedbackView anp="radiobulletins" ddd="kranten" boeken="boeken" dts="tijdschriften" periode="Periode" spatial="Verspreidingsgebied" type="Soort bericht" shelfmark="Herkomst" typeFacet="Tijschriftonderdeel" />
				<ResultView />
			</div>
		);
	}
});

React.render(
	<App />,
	document.getElementById('app')
);

window.onpopstate = function(event) {
	if(event.state && event.state.resultSet && event.state.queryParams) {
		appDispatcher.dispatch({
			actionType: 'result-update',
			records: event.state.resultSet.records,
			numberOfRecords: event.state.resultSet.numberOfRecords,
			facets: event.state.resultSet.facets
		});
		appDispatcher.dispatch({
			actionType: 'query-reset',
			params: event.state.queryParams
		});
	}
};

window.onload = function(event) {
	if(location.href.match(/\?/)) {
		appDispatcher.dispatch({
			actionType: 'query-update',
			params: qs.parse(location.href.replace(/.*\?/, ""))
		});
	}
};

