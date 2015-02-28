"use strict";

var safeStringify = require("json-stringify-safe");
/**
To enable traces, toggle tags on or off on the settings object.
TODO: Add alternative local settings manager
*/
console.warn("Be aware that 'console.log' is now overridden in 'Trace'");
var cl = console.log;
console.log = function() {};

var profiles = {};
var TraceSettings = {};

var getSetting = function(name) {
	return TraceSettings[name];
}

var TraceLog = function() {
	if (getSetting("disabled")) {
		// early out for most efficient trace gagging
		// you probably want to disable traces in release builds
		return;
	}
	var type = arguments[0];
	var typeString = (type === "ANONYMOUS") ? "" : "[" + type + "]";
	var args = Array.prototype.slice.call(arguments, 1);
	if (getSetting(type) !== true && getSetting("matrixMode") !== true) {
		return;
	}
	if (type === "PROFILE") {
		if (args[0] === "start") {
			profiles[args[1]] = Date.now();
		} else {
			var t = Date.now() - profiles[args[1]];
			args = args.concat(t + " ms");
		}
	}
	if (getSetting("timestampTraces")) {
		args.unshift(Date.now());
	}
	if (getSetting("concat")) {
		var output = typeString;
		_.forEach(args, function(val) {
			output += " ";
			output += (_.isObject(val)) ? safeStringify(val) : val;
		});
		cl.call(console, output);
	} else {
		args = [typeString].concat(args);
		cl.apply(console, args);
	}
};

module.exports = TraceLog;
module.exports.allowConsoleLog = function() {
	console.log = cl;
};
module.exports.settings = TraceSettings;