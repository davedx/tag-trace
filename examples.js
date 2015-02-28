"use strict";

var T = require("./trace");

function catfish() {
	T("CAT", "All the cat components are working properly");
	T("DOG", "Dog component has a problem, error: ", "Bad file name");
}

catfish();
catfish();

// you can change Trace settings at runtime
T.settings["DOG"] = true;

catfish();
