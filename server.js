var http = require("http");

var server = http.createServer(function(req, res) {
	if (req.url === "/")
		res.end("Hai");
	else
		res.end("Bai");
});

server.listen(3003);