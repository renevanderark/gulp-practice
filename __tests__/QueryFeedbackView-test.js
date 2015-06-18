jest.dontMock('../src/components/QueryFeedbackView');

describe('QueryfeedbackView', function() {

	it('renders', function() {
		var React = require('react/addons');
		var QueryFeedbackView = require('../src/components/QueryFeedbackView');
		var TestUtils = React.addons.TestUtils;
 		var component = TestUtils.renderIntoDocument( <QueryFeedbackView /> );
 		var div = TestUtils.findRenderedDOMComponentWithTag(component, 'div'); 
 		expect(div.getDOMNode().textContent).toEqual('Gezocht op alles in ');
	});
});