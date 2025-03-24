// A custom Nightwatch assertion.
// the name of the method is the filename.
// can be used in tests like this:
//
//   browser.assert.elementCount(selector, count)
//
// for how to write custom assertions see
// http://nightwatchjs.org/guide#writing-custom-assertions
// Gray - That link is mostly dead.
// 		This was blatantly stolen from
// 		https://stackoverflow.com/questions/32749175/correct-way-to-get-a-count-of-matching-elements-in-nightwatch/46214189
exports.assertion = function (selector, count, msg="") {
	// Gray - I modified this to take either a pure CSS Selector as originally written, or
	// to take a page object alias. I also added an optional "msg" argument, similar to the other
	// assert methods with an optional message.
	if (typeof(selector) === "object") {
		selector = selector.selector;
	}
	if (msg === "") {
		this.message = "Testing if element <" + selector + "> has count: " + count;
	} else {
		this.message = msg;
	}
	this.expected = count;
	this.pass = function (val) {
		return val === this.expected;
	}
	this.command = function (cb) {
		var self = this;
		return this.api.execute(function (selector) {
			return document.querySelectorAll(selector).length;
		}, [selector], function (res) {
			cb.call(self, res);
		});
	}
}