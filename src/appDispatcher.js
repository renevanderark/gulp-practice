var Dispatcher = require('./lib/dispatcher'),
	ResultSet = require('./stores/ResultSet'),
	appDispatcher = new Dispatcher();

appDispatcher.register(function(payload) {
	if(payload.actionType === 'result-update') {
		ResultSet.data.results = payload.records;
		ResultSet.data.numberOfRecords = payload.numberOfRecords;
		ResultSet.data.facets = payload.facets;
		ResultSet.emitUpdate();
	}
});

module.exports = appDispatcher;
