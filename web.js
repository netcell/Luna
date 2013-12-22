var http = require('http'),
	connect = require('connect');
var app = connect();

app.use( connect.static( __dirname + "/app" ) );
http.createServer(app).listen(process.env.PORT || 5000);