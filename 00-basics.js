'use strict';
let buf = new Buffer(26);
console.log(
	buf,
	buf.length,
	buf.toString());

	for (var i = buf.length - 1; i >= 0; i--) {
		buf[i]=i+97
	}
	console.log(buf.toString());