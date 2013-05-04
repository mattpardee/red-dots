var users = {};

function addDot (guid) {
	var userDot = document.createElement('div');
	userDot.classList.add("adot");
	document.body.appendChild(userDot);
	users[guid] = {
		dot: userDot
	};
}

window.addEventListener("load", function() {
	var socket = io.connect();

	socket.on('hello', function (data) {
		var users = Object.keys(data);
		for (var i = 0, len = users.length; i < len; i++)
			addDot(users[i]);
	});
	socket.on('newuser', function (data) {
		addDot(data.guid);
	});
	socket.on('move', function (data) {
		users[data.guid].dot.style.left = (data.x+15) + "px";
		users[data.guid].dot.style.top = (data.y+15) + "px";
	});

	window.addEventListener("mousemove", function(e) {
		//console.log(e.x, e.y);
		socket.emit('move', { x: e.x, y: e.y });
	});
});