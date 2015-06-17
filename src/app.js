var React = require('react'),
	appDispatcher = require('./appDispatcher'),
	ResultView = require('./components/ResultView'),
	FacetView = require('./components/FacetView'),
	SearchForm = require('./components/SearchForm'),
	QueryFeedbackView = require('./components/QueryFeedbackView'),
	Viewer = require('./components/Viewer'),
	ReactRouter = require('react-router'),	
	Route = ReactRouter.Route,
	RouteHandler = ReactRouter.RouteHandler,
	DefaultRoute =ReactRouter.DefaultRoute,
	qs = require('qs');


var App = React.createClass({
	render() {
		return (
			<div>
				<h1>Experimental app</h1>
				<RouteHandler />
			</div>
		);		
	}
});

var Results = React.createClass({
	render() {
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

var View = React.createClass({
	render() {
		return (
			<div>
				<Viewer />
			</div>
		);
	}
});



var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="view" path="/view" handler={View} />
		<DefaultRoute handler={Results} />
	</Route>
);

ReactRouter.run(routes, ReactRouter.HistoryLocation, function(Handler) {
	React.render(<Handler />, document.getElementById('app'));
});

