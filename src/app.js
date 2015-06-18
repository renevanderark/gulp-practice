var React = require('react'),
	Router = require('react-router'),
	Route = Router.Route,
	RouteHandler = Router.RouteHandler,
	DefaultRoute = Router.DefaultRoute,
	Link = Router.Link,
	api = require('./api/search'),
	QueryParams = require('./stores/QueryParams'),
	ResultView = require('./components/ResultView'),
	FacetView = require('./components/FacetView'),
	SearchForm = require('./components/SearchForm'),
	QueryFeedbackView = require('./components/QueryFeedbackView'),
	Viewer = require('./components/Viewer'),
	appDispatcher = require('./appDispatcher'),
	qs = require("qs");

var App = React.createClass({
	mixins : [Router.State, Router.Navigation],
	componentDidMount() {
		QueryParams.addChangeListener(this._onQueryChange);
		QueryParams.addResetListener(this._onQueryReset);

		if(this.getQuery().query && this.getQuery().coll) {
			appDispatcher.dispatch({
				actionType: 'query-update',
				params: {query: this.getQuery().query || "", coll: this.getQuery().coll || "boeken", facets: this.getQuery().facets || {}}
			});
		}
	},
 	componentWillUnmount() { 
		QueryParams.removeChangeListener(this._onQueryChange);
		QueryParams.removeResetListener(this._onQueryReset);
 	},
	_onQueryChange() {
		this.transitionTo("results", null, QueryParams.data);
		api.query(QueryParams.data, this.onSearchResults, this.onSearchError);
	},


	_onQueryReset() {
		api.query(QueryParams.data, this.onSearchResults, this.onSearchError);
	},

	onSearchError(data) {
		console.log(data);
	},

	onSearchResults(data) {
		appDispatcher.dispatch({
			actionType: 'result-update',
			records: data.records,
			numberOfRecords: data.numberOfRecords,
			facets: data.facets
		});
	},

	render() {
		return (
			<div>
				<Link to="app">Home</Link>
				<SearchForm />
				<RouteHandler />
			</div>
		);		
	}
});

var Results = React.createClass({

	render() {
		return (
			<div>
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

var Home = React.createClass({
	render() {
		return (<div>Welcome...</div>);
	}
});

var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="results" path="/results" handler={Results} />

		<Route name="viewer" path="/view" handler={View} />
		<DefaultRoute handler={Home} />
	</Route>
);

Router.HistoryLocation.addChangeListener(function (event) {
	if(event.type === "pop") {
		var params = qs.parse(event.path.replace(/^.*\?/, "").replace(/#.*$/, ""));
		appDispatcher.dispatch({
			actionType: 'query-reset',
			params: {query: params.query || "", coll: params.coll || "boeken", facets: params.facets || {}}
		});
	}
	console.log(event.type, event);
});

Router.run(routes, Router.HistoryLocation, function(Handler) {
	React.render(<Handler />, document.getElementById('app'));
});
