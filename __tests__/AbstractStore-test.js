jest.dontMock('../src/stores/AbstractStore');

describe('AbstractStore', function() {
	it('emits "change" on emitUpdate()', function () {
		var AbstractStore = require('../src/stores/AbstractStore');
		var store = new AbstractStore();
		var callback = jest.genMockFunction();
		store.addChangeListener(callback);
		store.emitUpdate();
		expect(callback.mock.calls.length).toEqual(1);
	});


	it('emits "reset" on emitReset()', function () {
		var AbstractStore = require('../src/stores/AbstractStore');
		var store = new AbstractStore();
		var callback = jest.genMockFunction();
		store.addResetListener(callback);
		store.emitReset();
		expect(callback.mock.calls.length).toEqual(1);
	});
});