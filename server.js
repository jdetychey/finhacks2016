"use strict";

var winston = require("winston");
var _ = require("lodash");
var env = require("node-env-file");

var Workers = require('./server/workers/workers');
var srv = require ("./server/core/srv");
var config = require("./server/core/config");

var logger = srv.logger;
logger.setLevels(winston.config.syslog.levels);

var commands = require('./commands');

var telethBot = require("./server/telethBot");


var request = require('request');
request({
	url: "https://www.cryptocompare.com/api/data/price?fsym=ETH&tsyms=USD",
	method: "GET"
}, function(error, response, body) {
	body = JSON.parse(body);
	console.log(body.Data[0]);
});

try {
	env('./.env', {verbose: false, overwrite: false});
} catch (err) {
	logger.notice(err.message);
}

srv.config = _.cloneDeep(config);

/*
var i, signals = ["SIGTERM"];
for (i in signals) {
	process.on(signals[i], function() {
		srv.workers.closeGracefully(signals[i]);
	});
}
*/

srv.workers = new Workers();
srv.workers.start();

