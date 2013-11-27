1var gzippo = require('gzippo');
var express = require('express');
var app = express();
 
app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'));
console.log(app.get('port'));