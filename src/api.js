var xhr = require('xhr'),
	qs = require('qs');

module.exports = (function (my) {
	"use strict";
	my.query = function(params, success, error) {
		xhr({
			uri: "http://delpher.kbresearch.nl/nl/api/results?" + qs.stringify(params)
		}, function(err, resp, body) {
			if(resp.statusCode !== 200) {
				error(JSON.parse(body));
			} else {
				success(JSON.parse(body));
			}
		});
	};

	return my;
}(module.exports || {}));
