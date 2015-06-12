var Dispatcher = require('./lib/dispatcher'),
	ResultSet = require('./stores/ResultSet'),
	QueryParams = require('./stores/QueryParams'),
	appDispatcher = new Dispatcher();

appDispatcher.register(function(payload) {
	switch(payload.actionType) {
		case 'result-update':
			ResultSet.data.results = payload.records;
			ResultSet.data.numberOfRecords = payload.numberOfRecords;
			ResultSet.data.facets = payload.facets;
			ResultSet.emitUpdate();
			break;
		case 'query-update':
			QueryParams.data = payload.params;
			QueryParams.emitUpdate();
			break;
	}
});

module.exports = appDispatcher;
